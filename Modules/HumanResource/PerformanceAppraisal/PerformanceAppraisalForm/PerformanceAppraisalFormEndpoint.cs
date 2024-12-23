using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Text;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using HRMSoftware.Administration;
using HRMSoftware.OrganisationChart.Endpoints;
using HRMSoftware.Web.Modules.PerformanceAppraisal;
using Microsoft.AspNetCore.Hosting;
using Serenity;
using Serenity.Abstractions;
using Document = QuestPDF.Fluent.Document;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFormRow;

namespace HRMSoftware.PerformanceAppraisal.Endpoints;

[Route("Services/PerformanceAppraisal/PerformanceAppraisalForm/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class PerformanceAppraisalFormEndpoint : ServiceEndpoint
{
    private static  IHostingEnvironment _hostingEnvironment;
    private static  IWebHostEnvironment _hostingWebEnvironment;
    private readonly PdfGenerationService _pdfService;
    
    public PerformanceAppraisalFormEndpoint(IWebHostEnvironment environment,IUserAccessor userAccessor,IHostingEnvironment hostingEnvironment,PdfGenerationService pdfService)
    {
        _hostingEnvironment = hostingEnvironment;
        _hostingWebEnvironment = environment;
        _pdfService = pdfService;
    }
    
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IPerformanceAppraisalFormSaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IPerformanceAppraisalFormSaveHandler handler)
    {
        
        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IPerformanceAppraisalFormDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }
  
    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IPerformanceAppraisalFormRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    // [HttpPost, AuthorizeList(typeof(MyRow))]
    // public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
    //     [FromServices] IPerformanceAppraisalFormListHandler handler)
    // {
    //     return handler.List(connection, request);
    // }
    
    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IPerformanceAppraisalFormListHandler handler)
    {
        if (Permissions.HasPermission(PermissionKeys.HumanResources))//if user is HR guy
        {
            request.Sort = new[] { new SortBy("ID", true) };
            return handler.List(connection, request);
        }
        
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.RetrieveEmployeeRowIDBasedOnUserID",
            param: new
            {
                @UserID = User.GetIdentifier()
            },
        
            commandType: System.Data.CommandType.StoredProcedure);
        
        int currentUserId = latest.Entities[0].EmployeeRowId.Value;
        
        request.Criteria = new Criteria("EmployeeRowID") == latest.Entities[0].EmployeeRowId.Value;
        
        var ListOfEmployee = new OrganisationChartEndpoint().GetEmployeeUserCanView(connection, latest.Entities[0].EmployeeRowId.Value, PermissionKeys.Appraisal);
        
        connection.Execute(@"
            UPDATE PerformanceAppraisalForm
            SET HodID = @CurrentUserId
            WHERE EmployeeRowID IN @EmployeeIds
            AND EmployeeRowID != @CurrentUserId
            AND EXISTS (
                SELECT 1
                FROM PerformanceAppraisalForm
                WHERE EmployeeRowID = PerformanceAppraisalForm.EmployeeRowID
            )",
            new
            {
                CurrentUserId = currentUserId,
                EmployeeIds = ListOfEmployee
            }
        );

        
        foreach (int number in ListOfEmployee)
            request.Criteria = (request.Criteria || new Criteria("EmployeeRowID") == number);

        request.Sort = new[] { new SortBy("ID", true) };
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IPerformanceAppraisalFormListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.PerformanceAppraisalFormColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "PerformanceAppraisalFormList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }
    
    public class PdfGenerationService
    {
        public byte[] GeneratePdf(IWebHostEnvironment hostingEnvironment, [FromServices] ISqlConnections sqlConnections, int FormId, string EmployeeId, int EmployeeRowId)
        {
            var connection = sqlConnections.NewByKey("Default");
            
            var company = (List<CompanyProfileRow>)connection.Query<CompanyProfileRow>(
                "dbo.GetCompanyDetail",
                commandType: CommandType.StoredProcedure);
            var emp = (List<EmployeePDF>)connection.Query<EmployeePDF>("dbo.GetEmployeeDetail",
                param: new
                {
                    @ID = EmployeeRowId
                },
                commandType: CommandType.StoredProcedure);
            var response = (List<PerformanceAppraisalResponseRow>)connection.Query<PerformanceAppraisalResponseRow>("dbo.GetResponseDetail",
                param: new
                {
                    @ID = FormId
                },
                commandType: CommandType.StoredProcedure);
            var form = (List<FormPDF>)connection.Query<FormPDF>("dbo.GetFormDetail",
                param: new
                {
                    @ID = FormId
                },
                commandType: CommandType.StoredProcedure);
            var evaluate = (List<PerformanceAppraisalEvaluationRow>)connection.Query<PerformanceAppraisalEvaluationRow>("dbo.GetEvaluationDetail",
                param: new
                {
                    @ID = FormId
                },
                commandType: CommandType.StoredProcedure);
            

            if (company.Count == 0)
            {
                throw new Exception("Missing company for PDF generation.");
            }else if (form.Count == 0)
            {
                throw new Exception("Missing form for PDF generation.");
            }else if (emp.Count == 0)
            {
                throw new Exception("Missing emp for PDF generation.");
            }else if (response.Count == 0)
            {
                throw new Exception("Missing response for PDF generation.");
            }else if (evaluate.Count == 0)
            {
                throw new Exception("Missing evaluate for PDF generation.");
            }
            
            // if (response.Count != 0)
            // {
            //     // throw new Exception($"Questions count: {questionCount}, Answers count: {answerCount}");
            //     throw new Exception($"Response count: {response[0].Question.Length}");
            // }
            
            var webroot = Path.Combine(_hostingEnvironment.ContentRootPath, "App_Data");
            var logo_path = webroot + "\\upload\\" + company[0].Picture;
            byte[] LogoImage = System.IO.File.ReadAllBytes(logo_path);

            var webroot1 = Path.Combine(_hostingEnvironment.ContentRootPath, "App_Data");
            var empSignPath = webroot1 + "\\upload\\" + evaluate[0].EmployeeSignature;
            byte[] empSignImage = System.IO.File.ReadAllBytes(empSignPath);
            
            var webroot2 = Path.Combine(_hostingEnvironment.ContentRootPath, "App_Data");
            var hodSignPath = webroot2 + "\\upload\\" + evaluate[0].HodSignature;
            byte[] hodSignImage = System.IO.File.ReadAllBytes(hodSignPath);
            
            var webroot3 = Path.Combine(_hostingEnvironment.ContentRootPath, "App_Data");
            var gmSignPath = webroot3 + "\\upload\\" + evaluate[0].GeneralManagerSignature;
            byte[] gmSignImage = System.IO.File.ReadAllBytes(gmSignPath);
            
            var questionPerPage = 5;
            
            var pdfbytes = Document.Create(container =>
            {
                float total = 0;
                int count = 1;
                int startCount = 0;
                int endCount = questionPerPage;
                container.Page(page =>
                    {
                        page.Size(PageSizes.A4);
                        page.Margin(1, Unit.Centimetre);
                        page.PageColor(Colors.White);
                        page.DefaultTextStyle(x => x.FontSize(20));
        
                        page.Content().Column(column =>
                        {
                            column.Item().Row(row =>
                            {
                                row.ConstantItem(80).AlignRight().Image(LogoImage);
                                row.RelativeItem().PaddingRight(80).AlignCenter().Text(text =>
                                {
                                    text.AlignCenter();
                                    text.Line($"{company[0].Title}").Bold().FontColor("#003366").FontSize(20);

                                    var address = company[0].Address;
                                    var wrappedAddress = WrapText(address, 70);
                                    text.Line($"{wrappedAddress}").FontSize(9);

                                    text.Line($"Tel: {company[0].Tel}").FontSize(9);
                                    text.Line($"{company[0].Website}").FontSize(9).FontColor("#2136f6").Underline();
                                    text.Line("Performance Appraisal").FontSize(15).FontColor("#394e93").Bold();
                                });
                            });
                            
                            column.Item().Row(row =>
                            {
                                row.RelativeItem(300).PaddingLeft(5).PaddingRight(5).Text(text =>
                                {
                                    text.AlignLeft();
                                    text.Line($"Appraisal Type :     {form[0].Type}").FontSize(14);
                                });
                            });
                            
                            column.Item().PaddingVertical(5).LineHorizontal(1).LineColor(Colors.Black);
                            column.Item().Row(row =>
                            {
                                row.RelativeItem(500).Text(text =>
                                {
                                    text.AlignLeft();
                                    text.Line("Employee Information").Bold().FontSize(14);
                                });
                                
                            });
                            
                            column.Item().Row(row =>
                            {
                                row.ConstantItem(100).Text(text =>
                                {
                                    text.DefaultTextStyle(x => x.FontSize(12));
                                    text.AlignRight();
                                    text.Line($"Employee Name    :");
                                });
                                row.RelativeItem(30).Text(text =>
                                {
                                    text.DefaultTextStyle(x => x.FontSize(12));
                                    text.AlignLeft();
                                    text.Line(" ");
                                });
                                row.RelativeItem(200).Text(text =>
                                {
                                    text.DefaultTextStyle(x => x.FontSize(12));
                                    text.AlignLeft();
                                    text.Line($" {emp[0].EmployeeName}");
                                });
                                row.RelativeItem(100).Text(text =>
                                {
                                    text.DefaultTextStyle(x => x.FontSize(12));
                                    text.AlignRight();
                                    text.Line($"    Employee ID    :");
                                });
                                row.RelativeItem(30).Text(text =>
                                {
                                    text.DefaultTextStyle(x => x.FontSize(12));
                                    text.AlignLeft();
                                    text.Line(" ");
                                });
                                row.RelativeItem(100).Text(text =>
                                {
                                    text.DefaultTextStyle(x => x.FontSize(12));
                                    text.AlignLeft();
                                    text.Line($" {emp[0].EmployeeId}");
                                });
                            });
                            
                            column.Item().Row(row =>
                            {
                                DateTime? date;
                                
                                if (response[0].UpdateDate.HasValue)
                                {
                                    date = response[0].UpdateDate;
                                }
                                else
                                {
                                    date = response[0].InsertDate;
                                }

                                var startDate = form[0].StartDate;
                                var endDate = form[0].EndDate;
                                
                                string formattedDate = date?.ToString("dd/MM/yyyy") ?? string.Empty;
                                string formattedStartDate = startDate.ToString("dd/MM/yyyy");
                                string formattedEndDate = endDate.ToString("dd/MM/yyyy");
                                
                                row.ConstantItem(100).Text(text =>
                                {
                                    text.ParagraphSpacing(5);
                                    text.DefaultTextStyle(x => x.FontSize(12));
                                    text.AlignRight();
                                    text.Line($"       Job Title    :");
                                    text.Line($"      Department    :");
                                    text.Line($"Appraisal Period    :");
                                });
                                row.RelativeItem(30).Text(text =>
                                {
                                    text.ParagraphSpacing(5);
                                    text.DefaultTextStyle(x => x.FontSize(12));
                                    text.AlignLeft();
                                    text.Line(" ");
                                    text.Line(" ");
                                    text.Line(" ");
                                });
                                row.RelativeItem(200).Text(text =>
                                {
                                    text.ParagraphSpacing(5);
                                    text.DefaultTextStyle(x => x.FontSize(12));
                                    text.AlignLeft();
                                    text.Line($" {emp[0].OccupationName}");
                                    text.Line($" {emp[0].DepartmentName}");
                                    text.Line($" {formattedStartDate}     to     {formattedEndDate}");
                                });
                                row.RelativeItem(100).Text(text =>
                                {
                                    text.ParagraphSpacing(5);
                                    text.DefaultTextStyle(x => x.FontSize(12));
                                    text.AlignRight();
                                    text.Line($"           Date    :");
                                    text.Line($"   Head of Dept    :");
                                });
                                row.RelativeItem(30).Text(text =>
                                {
                                    text.ParagraphSpacing(5);
                                    text.DefaultTextStyle(x => x.FontSize(12));
                                    text.AlignLeft();
                                    text.Line(" ");
                                    text.Line(" ");
                                    text.Line(" ");
                                });
                                row.RelativeItem(100).Text(text =>
                                {
                                    text.ParagraphSpacing(5);
                                    text.DefaultTextStyle(x => x.FontSize(12));
                                    text.AlignLeft();
                                    text.Line($" {formattedDate}");
                                    text.Line($" {form[0].EmployeeName}");
                                    text.Line(" ");
                                });
                            });
                            column.Item().LineHorizontal(1).LineColor(Colors.Black);
                            
                            column.Item().PaddingVertical(5).Row(row =>
                            {
                                row.ConstantItem(500).PaddingTop(5).Text(text =>
                                {
                                    text.Line("Appraisee to complete and return to the appraiser prior to the interview.")
                                        .FontColor("#273e9b").FontSize(13).Bold();
                                });
                            });
                            
                            int questCount = 1;
                            
                            column.Item().Column(column =>
                            {
                                foreach (var item in response)
                                {
                                    if (item.AnswerType == "text")
                                    {
                                        column.Item()
                                            .ShowEntire()
                                            .Border(0.6f)
                                            .Padding(5)
                                            .BorderColor(Colors.Black)
                                            .Text(text =>
                                            {
                                                text.Line($"#{count}.  {item.Question}").FontSize(12).Bold();
                                                text.Line(" ").FontSize(1);
                                                text.Line($"          {item.Answer}").FontSize(12);
                                            });
                                        count++;
                                        column.Item().Text(text => { text.Line(" ").FontSize(5); });
                                        // column.Item().PageBreak();
                                    }
                                }
                            });
                            
                            column.Item().PaddingVertical(5).Row(row =>
                            {
                                row.ConstantItem(500).PaddingTop(5).Text(text =>
                                {
                                    text.Line("Rate your capability or knowledge in the following areas based on your current role requirements. " +
                                              "Use the rating scale provided, where lower scores represent less capability and higher scores represent " +
                                              "greater capability, from left to right.")
                                        .FontColor("#273e9b").FontSize(13).Bold();
                                });
                            });
                            
                            column.Item().Column(column =>
                            {
                                foreach (var item in response)
                                {
                                    if (item.AnswerType == "rating")
                                    {
                                        string answer;
                                        
                                        answer = $"{item.Answer}  Score";
                                        
                                        column.Item()
                                            .ShowEntire()
                                            .Border(0.6f)
                                            .Padding(5)
                                            .BorderColor(Colors.Black)
                                            .Row(row =>
                                            {
                                                row.RelativeItem(4).Text($"{item.Question}").FontSize(12).Bold();
                
                                                row.ConstantItem(80);
                
                                                row.RelativeItem(1).AlignCenter().Text($"{answer}").FontSize(12).Bold();
                                            });
        
                                        column.Item().Text(text => { text.Line(" ").FontSize(5); });
                                    }
                                }
                                
                                column.Item()
                                    .ShowEntire()
                                    .Border(0.6f)
                                    .Padding(5)
                                    .BorderColor(Colors.Black)
                                    .Row(row =>
                                    {
                                        row.RelativeItem(4).Text("Overall Rating: ").FontSize(12).Bold();
                
                                        row.ConstantItem(80);
                
                                        row.RelativeItem(1).AlignCenter().Text($"{evaluate[0].OverallRate} %").FontSize(12).Bold().FontColor("#D70000");
                                    });

                                column.Item().AlignCenter().Text(text =>
                                {
                                    text.Line("--  End of Page  --").FontSize(10);
                                });
                            });
                            column.Item().PaddingTop(15).LineHorizontal(1).LineColor(Colors.Black);
                            
                            column.Item().PageBreak();
                            column.Item().PaddingTop(15).LineHorizontal(1).LineColor(Colors.Black);
                            column.Item().Row(row =>
                            {
                                row.RelativeItem().AlignCenter().Text(text =>
                                {
                                    text.Line("");
                                    text.Line("Evaluation").FontSize(18).FontColor("#394e93").Bold();
                                });
                            });
                            
                            column.Item()
                                .ShowEntire()
                                .Border(0.6f)
                                .Padding(5)
                                .BorderColor(Colors.Black)
                                .Text(text =>
                                {
                                    text.Line("To be completed during the appraisal by the appraiser - where " +
                                              "appropriate and safe to do so, certain items can completed by the appraiser " +
                                              "before the appraisal, and then discussed and validated or amended in " +
                                              "discussion with the appraise during the appraisal.").FontSize(12).Bold();
                                    text.Line(" ").FontSize(1);
                                    text.Line($"{evaluate[0].Evaluation}").FontSize(12).FontColor("#D70000");
                                });
                            count++;
                            column.Item().Text(text => { text.Line(" ").FontSize(5); });
                            
                            column.Item()
                                .ShowEntire()
                                .Border(0.6f)
                                .Padding(5)
                                .BorderColor(Colors.Black)
                                .Text(text =>
                                {
                                    text.Line("GOALS (as agreed upon by employee and Head Of Dept.)\n").FontSize(12).Bold();
                                    text.Line(" ").FontSize(1);
                                    text.Line($"{evaluate[0].Goals}").FontSize(12).FontColor("#D70000");
                                });
                            count++;
                            column.Item().Text(text => { text.Line(" ").FontSize(5); });
                            
                            column.Item()
                                .ShowEntire()
                                .Border(0.6f)
                                .Padding(5)
                                .BorderColor(Colors.Black)
                                .Text(text =>
                                {
                                    text.Line("Grade / Recommendation / Summary as applicable:").FontSize(12).Bold();
                                    text.Line(" ").FontSize(1);
                                    text.Line($"{evaluate[0].Summary}").FontSize(12).FontColor(("#D70000"));
                                });
                            count++;
                            column.Item().Text(text => { text.Line(" ").FontSize(5); });
                            
                            column.Item().PageBreak();
                            column.Item().PaddingTop(15).LineHorizontal(1).LineColor(Colors.Black);

                            column.Item().AlignCenter().PaddingTop(10).Text(text =>
                            {
                                text.Line("Verification of Review").FontSize(16).BackgroundColor("#9A9A9B");
                            });
                            
                            column.Item().Row(row =>
                            {
                                row.ConstantItem(100).Column(column =>
                                {
                                    column.Item().Text(text =>
                                    {
                                        text.ParagraphSpacing(10);
                                        text.DefaultTextStyle(x => x.FontSize(12));
                                        text.AlignLeft();
                                        text.Line("Employee Signature    :");
                                        // text.Line("Head Of Dept. Signature    :");
                                        // text.Line("General Manager Signature    :");
                                    });
                                });

                                row.RelativeItem(250).PaddingLeft(25).Column(column =>
                                {
                                    column.Item().AlignLeft().MaxWidth(80).MaxHeight(150).Image(empSignImage);
                                    // column.Item().AlignLeft().MaxWidth(50).Image(hodSignImage);
                                    // column.Item().AlignLeft().MaxWidth(50).Image(gmSignImage);
                                });
                                
                                row.ConstantItem(180).Column(column =>
                                {
                                    column.Item().Text(text =>
                                    {
                                        text.ParagraphSpacing(10);
                                        text.DefaultTextStyle(x => x.FontSize(12));
                                        text.AlignLeft();
                                        text.Line($"Date    :      {evaluate[0].EmployeeSignDate}");
                                    });
                                });
                                
                            });
                            
                            // column.Item().PageBreak();
                            
                            column.Item().Row(row =>
                            {
                                row.ConstantItem(100).Column(column =>
                                {
                                    column.Item().Text(text =>
                                    {
                                        text.ParagraphSpacing(10);
                                        text.DefaultTextStyle(x => x.FontSize(12));
                                        text.AlignLeft();
                                        // text.Line("Employee Signature    :");
                                        text.Line("Head Of Dept. Signature    :");
                                        // text.Line("General Manager Signature    :");
                                    });
                                });

                                row.RelativeItem(250).PaddingLeft(25).Column(column =>
                                {
                                    // column.Item().AlignLeft().MaxWidth(100).Image(empSignImage);
                                    column.Item().AlignLeft().MaxWidth(80).MaxHeight(150).Image(hodSignImage);
                                    // column.Item().AlignLeft().MaxWidth(50).Image(gmSignImage);
                                });
                                
                                row.ConstantItem(180).Column(column =>
                                {
                                    column.Item().Text(text =>
                                    {
                                        text.ParagraphSpacing(10);
                                        text.DefaultTextStyle(x => x.FontSize(12));
                                        text.AlignLeft();
                                        text.Line($"Date    :      {evaluate[0].HodSignDate}");
                                    });
                                });
                                
                            });
                            
                            // column.Item().PageBreak();
                            
                            column.Item().Row(row =>
                            {
                                row.ConstantItem(100).Column(column =>
                                {
                                    column.Item().Text(text =>
                                    {
                                        text.ParagraphSpacing(10);
                                        text.DefaultTextStyle(x => x.FontSize(12));
                                        text.AlignLeft();
                                        // text.Line("Employee Signature    :");
                                        // text.Line("Head Of Dept. Signature    :");
                                        text.Line("General Manager Signature    :");
                                    });
                                });

                                row.RelativeItem(250).PaddingLeft(25).Column(column =>
                                {
                                    // column.Item().AlignLeft().MaxWidth(100).Image(empSignImage);
                                    // column.Item().AlignLeft().MaxWidth(150).Image(hodSignImage);
                                    column.Item().AlignLeft().MaxWidth(80).MaxHeight(150).Image(gmSignImage);
                                });
                                
                                row.ConstantItem(180).Column(column =>
                                {
                                    column.Item().Text(text =>
                                    {
                                        text.ParagraphSpacing(10);
                                        text.DefaultTextStyle(x => x.FontSize(12));
                                        text.AlignLeft();
                                        text.Line($"Date    :      {evaluate[0].GeneralManagerSignDate}");
                                    });
                                });
                                
                            });
                            
                            column.Item().AlignCenter().Text(text =>
                            {
                                text.Line("--  End of Page  --").FontSize(10);
                            });
                            
                            column.Item().PaddingTop(15).LineHorizontal(1).LineColor(Colors.Black);
                        });
                    });
            }).GeneratePdf();
        
            return pdfbytes;
        }
        
        public static string WrapText(string text, int maxWidth)
        {
            var words = text.Split(' ');
            var lines = new List<string>();
            var currentLine = new StringBuilder();

            foreach (var word in words)
            {
                if (currentLine.Length + word.Length + 1 > maxWidth)
                {
                    lines.Add(currentLine.ToString());
                    currentLine.Clear();
                }

                if (currentLine.Length > 0)
                    currentLine.Append(' ');

                currentLine.Append(word);
            }

            if (currentLine.Length > 0)
                lines.Add(currentLine.ToString());

            return string.Join("\n", lines);
        }

    }
    
    [PageAuthorize, HttpGet, Route("/PerformanceAppraisalForm/PdfSharpConvert")]
    public IActionResult PdfSharpConvert([FromServices] ISqlConnections sqlConnections, int FormId, string EmployeeId, int EmployeeRowId)
    {
        var pdfBytes = _pdfService.GeneratePdf(_hostingWebEnvironment,sqlConnections, FormId , EmployeeId, EmployeeRowId);
        var empId = "AppraisalForm-"+ EmployeeId;
        Response.Headers.Add("Content-Disposition", "attachment; filename="+empId+".pdf");
        Response.Headers.Add("Content-Type", "application/pdf");
    
        return File(pdfBytes, "application/pdf", empId+".pdf");
    }
   
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse DeleteAll(IDbConnection connection, DeleteAllRequest request)
    {
        if (request.RecordIds == null || request.RecordIds.Length == 0)
            throw new ArgumentNullException(nameof(request.RecordIds));

        connection.Execute(@"
        UPDATE [PerformanceAppraisalForm]
        SET IsActive = -1, DeleteDate = @now
        WHERE Id IN @RecordIds", new { RecordIds = request.RecordIds, now = DateTime.Now });
        
        connection.Execute(@"
        UPDATE [PerformanceAppraisalResponse]
        SET IsActive = -1, DeleteDate = @now
        WHERE FormID IN @RecordIds", new { RecordIds = request.RecordIds, now = DateTime.Now });


        return new DeleteResponse();
    }
}


