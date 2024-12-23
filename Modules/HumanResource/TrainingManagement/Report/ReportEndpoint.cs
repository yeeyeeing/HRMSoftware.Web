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
using HRMSoftware.PerformanceAppraisal;
using HRMSoftware.Web.Modules.TrainingManagement;
using Microsoft.AspNetCore.Hosting;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using Serenity.Abstractions;
using MyRow = HRMSoftware.TrainingManagement.ReportRow;

namespace HRMSoftware.TrainingManagement.Endpoints;

[Route("Services/TrainingManagement/Report/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class ReportEndpoint : ServiceEndpoint
{
    private static IHostingEnvironment _hostingEnvironment;
    private static IWebHostEnvironment _hostingWebEnvironment;
    private readonly PdfGenerationService _pdfService;

    public ReportEndpoint(IWebHostEnvironment environment, IUserAccessor userAccessor,
        IHostingEnvironment hostingEnvironment, PdfGenerationService pdfService)
    {
        _hostingEnvironment = hostingEnvironment;
        _hostingWebEnvironment = environment;
        _pdfService = pdfService;
    }

    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IReportSaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IReportSaveHandler handler)
    {
        return handler.Update(uow, request);
    }

    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IReportDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IReportRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IReportListHandler handler)
    {
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IReportListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.ReportColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "ReportList_" +
                                                DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) +
                                                ".xlsx");
    }

    public class PdfGenerationService
    {
        public byte[] GeneratePdf(IWebHostEnvironment hostingEnvironment, [FromServices] ISqlConnections sqlConnections,
            int FormId)
        {
            var connection = sqlConnections.NewByKey("Default");

            var company = (List<CompanyProfileRow>)connection.Query<CompanyProfileRow>(
                "dbo.GetCompanyDetail",
                commandType: CommandType.StoredProcedure);
            var programSession = (List<ProgramSessionRow>)connection.Query<ProgramSessionRow>(
                "dbo.GetTrainingManagementProgram",
                param: new
                {
                    @ID = FormId
                },
                commandType: CommandType.StoredProcedure);
            var programSessionDepartments = (List<OrganisationHierarchy.DepartmentRow>)connection.Query<OrganisationHierarchy.DepartmentRow>(
                "dbo.GetTrainingManagementProgramDepartment",
                param: new
                {
                    @ID = FormId
                },
                commandType: CommandType.StoredProcedure);
            var participants = (List<ParticipantPDF>)connection.Query<ParticipantPDF>(
                "dbo.GetTrainingManagementProgramParticipant",
                param: new
                {
                    @ID = FormId
                },
                commandType: CommandType.StoredProcedure);
            var ProgramFlows = (List<FlowResponsePDF>)connection.Query<FlowResponsePDF>(
                "dbo.GetTrainingManagementProgramFlow",
                param: new
                {
                    @ID = FormId
                },
                commandType: CommandType.StoredProcedure);
            var ProgramFlowResponses = (List<FlowResponsePDF>)connection.Query<FlowResponsePDF>(
                "dbo.GetTrainingManagementProgramFlowResponse",
                param: new
                {
                    @ID = FormId
                },
                commandType: CommandType.StoredProcedure);

            var webroot = Path.Combine(_hostingEnvironment.ContentRootPath, "App_Data");
            var logo_path = webroot + "\\upload\\" + company[0].Picture;
            byte[] LogoImage = System.IO.File.ReadAllBytes(logo_path);
            var questionPerPage = 5;

            var pdfbytes = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(1, Unit.Centimetre);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontSize(12));

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
                                text.Line("Training Report").FontSize(15).FontColor("#394e93").Bold();
                            });
                        });
                        column.Item().Column(innerColumn =>
                        {
                            innerColumn.Item().Row(row =>
                            {
                                row.ConstantItem(100).Text("Training Session Name");
                                row.ConstantItem(20).Text(":");
                                row.RelativeItem().Text(programSession[0].ProgramName);
                            });
                            innerColumn.Item().Row(row =>
                            {
                                var departments = "";
                                for (int i = 0; i < programSessionDepartments.Count; i++)
                                {
                                    if (i < programSessionDepartments.Count - 1)
                                    {
                                        departments = departments + programSessionDepartments[i].Name + " , ";
                                    }
                                    else
                                    {
                                        departments = departments + programSessionDepartments[i].Name;
                                    }
                                }

                                row.ConstantItem(100).Text("Department");
                                row.ConstantItem(20).Text(":");
                                row.RelativeItem().Text(departments);
                            });
                            innerColumn.Item().Row(row =>
                            {
                                row.ConstantItem(100).Text("Start Date");
                                row.ConstantItem(20).Text(":");
                                if (programSession[0].StartDate != null)
                                {
                                    row.RelativeItem().Text(programSession[0].StartDate.Value.ToString("dd/MM/yyyy"));
                                }
                                else
                                {
                                    row.RelativeItem().Text(" - ");
                                }
                            });
                            innerColumn.Item().Row(row =>
                            {
                                row.ConstantItem(100).Text("End Date");
                                row.ConstantItem(20).Text(":");
                                if (programSession[0].EndDate != null)
                                {
                                    row.RelativeItem().Text(programSession[0].EndDate.Value.ToString("dd/MM/yyyy"));
                                }
                                else
                                {
                                    row.RelativeItem().Text(" - ");
                                }
                            });

                            innerColumn.Item().Row(row =>
                            {
                                row.ConstantItem(100).Text("Detail");
                                row.ConstantItem(20).Text(":");
                                row.RelativeItem().Text(programSession[0].Detail);
                            });
                        });

                        column.Item().PaddingVertical(5).LineHorizontal(1).LineColor(Colors.Black);

                        column.Item().AlignCenter().Text(text =>
                        {
                            text.AlignCenter();
                            text.Line("Activity Summary").FontSize(15).Bold();
                        });

                        // column.Item().Table(table =>
                        // {
                        //     table.ColumnsDefinition(columns =>
                        //     {
                        //         columns.ConstantColumn(25);
                        //         columns.RelativeColumn();
                        //         columns.RelativeColumn();
                        //         columns.RelativeColumn();
                        //         columns.RelativeColumn();
                        //     });
                        //
                        //     table.Cell().Row(1).Column(1).Element(FormHeaderBlock).Text("No.");
                        //     table.Cell().Row(1).Column(2).Element(FormHeaderBlock).Text("Activity");
                        //     table.Cell().Row(1).Column(3).Element(FormHeaderBlock).Text("Date");
                        //     table.Cell().Row(1).Column(4).Element(FormHeaderBlock).Text("Percentage");
                        //     table.Cell().Row(1).Column(5).Element(FormHeaderBlock).Text("");
                        //
                        //
                        //     table.Cell().Row(2).Column(1).ColumnSpan(5);
                        // });
                    });
                });
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(1, Unit.Centimetre);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontSize(10));

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
                                text.Line("Training Report").FontSize(15).FontColor("#394e93").Bold();
                            });
                        });

                        column.Item().Column(innerColumn =>
                        {
                            innerColumn.Item().Row(row =>
                            {
                                row.ConstantItem(100).Text("Training Session Name").FontSize(10);
                                row.ConstantItem(20).Text(":").FontSize(10);
                                row.RelativeItem().Text(programSession[0].ProgramName).FontSize(10);
                            });
                        });

                        column.Item().PaddingVertical(5).LineHorizontal(1).LineColor(Colors.Black);

                        column.Item().AlignCenter().Text(text =>
                        {
                            text.AlignCenter();
                            text.Line("Participant List").FontSize(15).Bold();
                        });

                        column.Item().Border(1).Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                columns.ConstantColumn(25);
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                            });

                            table.Cell().Row(1).Column(1).Element(FormHeaderBlock).Text("No.");
                            table.Cell().Row(1).Column(2).Element(FormHeaderBlock).Text("Employee Id");
                            table.Cell().Row(1).Column(3).Element(FormHeaderBlock).Text("Employee Name");
                            table.Cell().Row(1).Column(4).Element(FormHeaderBlock).Text("Department");
                            table.Cell().Row(1).Column(5).Element(FormHeaderBlock).Text("Job Title");
                            uint rowCount = 2;
                            for (int i = 0; i < participants.Count; i++)
                            {
                                table.Cell().Row(rowCount).Column(1).Element(FormHeaderBlock)
                                    .Text((rowCount - 1).ToString());
                                table.Cell().Row(rowCount).Column(2).Element(FormBodyBlock)
                                    .Text(participants[i].EmployeeId);
                                table.Cell().Row(rowCount).Column(3).Element(FormBodyBlock)
                                    .Text(participants[i].EmployeeName);
                                table.Cell().Row(rowCount).Column(4).Element(FormBodyBlock)
                                    .Text(participants[i].DepartmentName);
                                table.Cell().Row(rowCount).Column(5).Element(FormBodyBlock)
                                    .Text(participants[i].OccupationName);
                                rowCount++;
                            }
                        });
                    });
                });
                container.Page(page =>
                {
                    page.Size(PageSizes.A4.Landscape());
                    page.Margin(1, Unit.Centimetre);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontSize(10));

                    page.Content().Column(column =>
                    {
                        column.Item().Row(row =>
                        {
                            row.ConstantItem(120);
                            row.ConstantItem(80).AlignRight().Image(LogoImage);
                            row.RelativeItem().PaddingRight(200).AlignCenter().Text(text =>
                            {
                                text.AlignCenter();
                                text.Line($"{company[0].Title}").Bold().FontColor("#003366").FontSize(20);

                                var address = company[0].Address;
                                var wrappedAddress = WrapText(address, 70);
                                text.Line($"{wrappedAddress}").FontSize(9);

                                text.Line($"Tel: {company[0].Tel}").FontSize(9);
                                text.Line($"{company[0].Website}").FontSize(9).FontColor("#2136f6").Underline();
                                text.Line("Training Report").FontSize(15).FontColor("#394e93").Bold();
                            });
                        });

                        column.Item().Column(innerColumn =>
                        {
                            innerColumn.Item().Row(row =>
                            {
                                row.ConstantItem(100).Text("Training Session Name");
                                row.ConstantItem(20).Text(":");
                                row.RelativeItem().Text(programSession[0].ProgramName);
                            });
                        });

                        column.Item().PaddingVertical(5).LineHorizontal(1).LineColor(Colors.Black);

                        column.Item().Border(1).Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                columns.ConstantColumn(25);
                                columns.ConstantColumn(60);
                                columns.ConstantColumn(100);
                                foreach (var ProgramFlow in ProgramFlows)
                                {
                                    columns.RelativeColumn();
                                }
                            });

                            table.Cell().Row(1).RowSpan(3).Column(1).Element(FormHeaderBlock).Text("No.");
                            table.Cell().Row(1).RowSpan(3).Column(2).Element(FormHeaderBlock).Text("Employee Id");
                            table.Cell().Row(1).RowSpan(3).Column(3).Element(FormHeaderBlock).Text("Employee Name");
                            uint countHeaderColumn = 4;
                            foreach (var ProgramFlow in ProgramFlows)
                            {
                                table.Cell().Row(1).Column(countHeaderColumn).Element(FormHeaderBlock)
                                    .Text(ProgramFlow.FlowType);
                                if (ProgramFlow.Date.CompareTo(DateTime.MinValue) > 0)
                                {
                                    table.Cell().Row(2).Column(countHeaderColumn).Element(FormHeaderBlock)
                                        .Text(ProgramFlow.Date.ToString("dd/MM/yyyy")).FontSize(8);
                                }
                                else
                                {
                                    table.Cell().Row(2).Column(countHeaderColumn).Element(FormHeaderBlock).Text(" - ");
                                }

                                table.Cell().Row(3).Column(countHeaderColumn).Element(FormHeaderBlock)
                                    .Text(ProgramFlow.Remark).FontSize(8);

                                countHeaderColumn++;
                            }

                            uint rowCount = 4;
                            uint columnCount = 4;
                            var i = 0; // pointer for FlowResponse
                            var j = 0; // pointer for Flow 
                            for (int k = 0; k < participants.Count; k++)
                            {
                                table.Cell().Row(rowCount).Column(1).Element(FormHeaderBlock)
                                    .Text((rowCount - 3).ToString());
                                table.Cell().Row(rowCount).Column(2).Element(FormBodyBlock)
                                    .Text(participants[k].EmployeeId);
                                table.Cell().Row(rowCount).Column(3).Element(FormBodyBlock)
                                    .Text(participants[k].EmployeeName);
                                while (j < ProgramFlows.Count)
                                {
                                    if (i < ProgramFlowResponses.Count &&
                                        ProgramFlowResponses[i].EmployeeId == participants[k].EmployeeRowId &&
                                        ProgramFlowResponses[i].FlowId == ProgramFlows[j].FlowId)
                                    {
                                        if (ProgramFlowResponses[i].FlowType == ProgramFlowType.Attendance)
                                        {
                                            table.Cell().Row(rowCount).Column(columnCount).Element(FormBodyBlock)
                                                .AlignCenter().Text(ProgramFlowResponses[i].Attendance == 1 ? " / " : "X");
                                        }
                                        else if (ProgramFlowResponses[i].FlowType == ProgramFlowType.Assessment ||
                                                 ProgramFlowResponses[i].FlowType == ProgramFlowType.Document)
                                        {
                                            if (ProgramFlowResponses[i].GradeType == ProgramGradeType.Score)
                                            {
                                                table.Cell().Row(rowCount).Column(columnCount).Element(FormBodyBlock)
                                                    .AlignCenter().Text(ProgramFlowResponses[i].GradeValue);
                                            }
                                            else if (ProgramFlowResponses[i].GradeType == ProgramGradeType.Grade)
                                            {
                                                table.Cell().Row(rowCount).Column(columnCount).Element(FormBodyBlock)
                                                    .AlignCenter().Text(ProgramFlowResponses[i].GradeValue == 1
                                                        ? "A"
                                                        : (ProgramFlowResponses[i].GradeValue == 2 ? "B" :
                                                            ProgramFlowResponses[i].GradeValue == 3 ? "C" :
                                                            (ProgramFlowResponses[i].GradeValue == 4
                                                                ? "Fail"
                                                                : (ProgramFlowResponses[i].GradeValue == -1
                                                                    ? "N/A"
                                                                    : " - "))));
                                            }
                                            else if (ProgramFlowResponses[i].GradeType == ProgramGradeType.PassFail)
                                            {
                                                table.Cell().Row(rowCount).Column(columnCount).Element(FormBodyBlock)
                                                    .AlignCenter().Text(ProgramFlowResponses[i].GradeValue == 1
                                                        ? "Pass"
                                                        : (ProgramFlowResponses[i].GradeValue == 2
                                                            ? "Fail"
                                                            : (
                                                                ProgramFlowResponses[i].GradeValue == -1
                                                                    ? "N/A"
                                                                    : " - ")
                                                        ));
                                            }
                                        }
                                        i++;
                                    }
                                    else
                                    {
                                        table.Cell().Row(rowCount).Column(columnCount).Element(FormBodyBlock)
                                            .AlignCenter().Text(" - ");
                                    }

                                    j++;
                                    columnCount++;
                                }

                                j = 0;
                                columnCount = 4;
                                rowCount++;
                            }
                        });
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

        static IContainer FormHeaderBlock(IContainer container)
        {
            return container
                .Border(1)
                .Background(Colors.Grey.Lighten3)
                .ShowOnce()
                .MinHeight(25)
                .AlignCenter()
                .AlignMiddle()
                .Padding(3);
        }

        static IContainer FormBodyBlock(IContainer container)
        {
            return container
                .Border(1)
                .ShowOnce()
                .MinHeight(25)
                .AlignLeft()
                .AlignTop()
                .Padding(3);
        }
    }

    [PageAuthorize, HttpGet, Route("/TrainingManagement/PdfSharpConvert")]
    public IActionResult PdfSharpConvert([FromServices] ISqlConnections sqlConnections, int FormId)
    {
        var pdfBytes = _pdfService.GeneratePdf(_hostingWebEnvironment, sqlConnections, FormId);
        Response.Headers.Add("Content-Disposition", "attachment; filename=abc.pdf");
        Response.Headers.Add("Content-Type", "application/pdf");

        return File(pdfBytes, "application/pdf", "abc.pdf");
    }
}