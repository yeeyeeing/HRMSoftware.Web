using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Web;
using System.Collections.Generic;
using System.Data;
using MyRow = HRMSoftware.PayrollSettings.PayrollRow;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;
using QRCoder;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using Serenity;
using Serenity.Abstractions;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using System.Runtime.InteropServices;
using System.Text.Json;
using System.Linq;

using Row1 = HRMSoftware.PayrollSettings.Pages.PayrollPage.PayrollDetail;
using Markdig.Extensions.Footers;
namespace HRMSoftware.PayrollSettings.Pages
{
    public enum KnownFolder
    {
        Contacts,
        Downloads,
        Favorites,
        Links,
        SavedGames,
        SavedSearches
    }

    public static class KnownFolders
    {
        private static readonly Dictionary<KnownFolder, Guid> _guids = new()
        {
            [KnownFolder.Contacts] = new("56784854-C6CB-462B-8169-88E350ACB882"),
            [KnownFolder.Downloads] = new("374DE290-123F-4565-9164-39C4925E467B"),
            [KnownFolder.Favorites] = new("1777F761-68AD-4D8A-87BD-30B759FA33DD"),
            [KnownFolder.Links] = new("BFB9D5E0-C6A9-404C-B2B2-AE6DB6AF4968"),
            [KnownFolder.SavedGames] = new("4C5C32FF-BB9D-43B0-B5B4-2D72E54EAAA4"),
            [KnownFolder.SavedSearches] = new("7D1D3A04-DEBB-4115-95CF-2F29DA2920DA")
        };

        public static string GetPath(KnownFolder knownFolder)
        {
            return SHGetKnownFolderPath(_guids[knownFolder], 0);
        }

        [DllImport("shell32",
            CharSet = CharSet.Unicode, ExactSpelling = true, PreserveSig = false)]
        private static extern string SHGetKnownFolderPath(
            [MarshalAs(UnmanagedType.LPStruct)] Guid rfid, uint dwFlags,
            nint hToken = 0);
    }
    [Route("PayrollSettings/Payroll/[action]")]

    public class PayrollPage : Controller
    {
        private IWebHostEnvironment _hostingEnvironment;
        protected IUserAccessor UserAccessor { get; }
        //private readonly PdfGenerationService _pdfService;
        public List<string> EarningsString { get; private set; }
        public List<string> DeductionsString { get; private set; }
        public List<string> EmployerString { get; private set; }

        public PayrollPage(IWebHostEnvironment environment)
       {
            _hostingEnvironment = environment;
           // _pdfService = pdfService;
        }
        [PageAuthorize(typeof(PayrollRow)), HttpGet, Route("/PayrollSettings/Payroll")]

        public ActionResult Index()
        {
            return this.GridPage("@/HumanResource/PayrollSettings/Payroll/PayrollPage",
                PayrollRow.Fields.PageTitle());
        }

        public class PayrollDetail
        {
            public string EmployeeName { get; set; }
            public string EmployeeID { get; set; }
            public string Address { get; set; }
            public string EmployeeEmail { get; set; }
            public string TelNumber1 { get; set; }
            public string PayDate { get; set; }
            public string Remarks { get; set; }
            public string Occupation { get; set; }
            public string Division { get; set; }
            public string JobGrade { get; set; }
            public string Section { get; set; }
            public string Department { get; set; }
            public string CompanyAddress { get; set; }
            public string CompanyRegistrationNumber { get; set; }
            public string BasicPay { get; set; }

            public string CompanyLogo { get; set; }
            public string CompanyName { get; set; }
            public string PayPeriodStart { get; set; }
            public string PayPeriodEnd { get; set; }
            public string CompanyPhone { get; set; }
            public string EntitledAnnualLeave { get; set; }
            public string IdentityNumber { get; set; }


            public string PayrollEarningsAmountList { get; set; }
            public string PayrollEarningsDescriptionList { get; set; }
            public string PayrollEarningsCodeList { get; set; }


            public string PayrollDeductionsAmountList { get; set; }
            public string PayrollDeductionsDescriptionList { get; set; }
            public string PayrollDeductionsCodeList { get; set; }


            public string DeductionAmountList { get; set; }
            public string DeductionDescriptionList { get; set; }
            public string DeductionCodeList { get; set; }
            public string AllowanceAmountList { get; set; }
            public string AllowanceDescriptionList { get; set; }
            public string AllowanceCodeList { get; set; }
            public string MoneyClaimAmountList { get; set; }
            public string MoneyClaimDescriptionList { get; set; }
            public string MoneyClaimCodeList { get; set; }

            public string EmployeeEPF { get; set; }
            public string EmployeeEIS { get; set; }
            public string EmployeePCB { get; set; }
            public string EmployeeSOCSO { get; set; }

            public string EmployerSOCSO { get; set; }
            public string EmployerEIS { get; set; }
            public string EmployerEPF { get; set; }

            public string NPLDailyRate { get; set; }
            public string NPLDaily { get; set; }
            public string NPLHourlyRate { get; set; }
            public string NPLHourly { get; set; }
            public string AbsentDailyRate { get; set; }
            public string AbsentDaily { get; set; }
            public string LateArrivalRate { get; set; }
            public string LateArrival { get; set; }
            public string EarlyLeavingRate { get; set; }
            public string EarlyLeaving { get; set; }
            public string FlatOt { get; set; }
            public string OtOne { get; set; }
            public string OtOnePointFive { get; set; }
            public string OtTwo { get; set; }
            public string OtOnePointFiveRate { get; set; }
            public string OtTwoRate { get; set; }


        }
        public class Earnings
        {
            public string Amount { get; set; }
            public string Description { get; set; }
            public string Code { get; set; }

            public Earnings(string amount, string description, string code)
            {
                Amount = amount;
                Description = description;
                Code = code;
            }
            public override string ToString()
            {
                return $"Amount: {Amount}, Description: {Description}, Code: {Code}";
            }
        }

        public List<string> PayrollDeductionsAmountList { get; private set; }
        public List<string> PayrollDeductionsDescriptionList { get; private set; }
        public List<string> PayrollDeductionsCodeList { get; private set; }

        public List<string> PayrollEarningsAmountList { get; private set; }
        public List<string> PayrollEarningsDescriptionList { get; private set; }
        public List<string> PayrollEarningsCodeList { get; private set; }

        public List<string> AllowanceAmountList { get; private set; }
        public List<string> AllowanceDescriptionList { get; private set; }
        public List<string> AllowanceCodeList { get; private set; }

        public List<string> MoneyClaimAmountList { get; private set; }
        public List<string> MoneyClaimDescriptionList { get; private set; }
        public List<string> MoneyClaimCodeList { get; private set; }
        public List<string> DeductionAmountList { get; private set; }
        public List<string> DeductionDescriptionList { get; private set; }
        public List<string> DeductionCodeList { get; private set; }

    
        void ProcessArray(string data, List<string> resultList)
        {
            bool inverter = true;
            string buffer = "";
            bool start = false;
            byte starter = 0x88;
            byte ender = 0x99;
            for (int i = 0; i < data.Length; i++)
            {
                byte charCode = (byte)data[i];

                if (charCode == starter || (start && charCode != ender))
                {
                    if (start)
                        buffer += (char)charCode;  // Use (char) to add the character directly
                    start = true;
                }
                else if (charCode == ender)
                {
                    resultList.Add(buffer);
                    start = false;
                    buffer = "";  // Reset buffer after adding to list
                }
            }
        }
        void ArraysToObject(List<string> amountData, List<string> descriptionData, List<string> codeData, List<Earnings> resultList)
        {
            for (int i = 0; i < descriptionData.Count; i++)
            {
                string amount = amountData[i];
                string description = descriptionData[i];
                string code = codeData[i];
                // Create a MoneyClaiming object with parsed values and add to the list
                resultList.Add(new Earnings(amount, description, code));

            }
        }
        [PageAuthorize, HttpGet, Route("/PayrollSettings/Payroll/PdfSharpConvert")]
        public IActionResult PdfSharpConvert([FromServices] ISqlConnections sqlConnections, int PayrollRowId)
        {
            List<Row1> x = new List<Row1>();
            var connection = sqlConnections.NewByKey("Default");
            x = (List<Row1>)connection.Query<Row1>("dbo.PayrollDetail",
                param: new
                {
                    @ID = PayrollRowId
                },
                commandType: CommandType.StoredProcedure);
            var json = JsonSerializer.Serialize(x);
            JObject obj = JObject.Parse(x[0].ToJson());
            float BasicPay = obj["BasicPay"].ToObject<float>();
            float EmployeeEPF = 0;
            float EmployeeEIS = 0;
            float EmployeeSOCSO = 0;
            float EmployeePCB = 0;
            float EmployerEPF = 0;
            float EmployerEIS = 0;
            float EmployerSOCSO = 0;

            float NPLDailyRate = 0;
            if (obj.ContainsKey("NPLDailyRate"))
                NPLDailyRate = obj["NPLDailyRate"].ToObject<float>();
            float NPLDaily = 0;
            if (obj.ContainsKey("NPLDaily"))
                NPLDaily = obj["NPLDaily"].ToObject<float>();
            float NPLHourlyRate = 0;
            if (obj.ContainsKey("NPLHourlyRate"))
                NPLHourlyRate = obj["NPLHourlyRate"].ToObject<float>();
            float NPLHourly = 0;
            if (obj.ContainsKey("NPLHourly"))
                NPLHourly = obj["NPLHourly"].ToObject<float>();
            float AbsentDailyRate = 0;
            if (obj.ContainsKey("AbsentDailyRate"))
                AbsentDailyRate = obj["AbsentDailyRate"].ToObject<float>();
            float AbsentDaily = 0;
            if (obj.ContainsKey("AbsentDaily"))
                AbsentDaily = obj["AbsentDaily"].ToObject<float>();
            float LateArrivalRate = 0;
            if (obj.ContainsKey("LateArrivalRate"))
                LateArrivalRate = obj["LateArrivalRate"].ToObject<float>();
            float LateArrival = 0;
            if (obj.ContainsKey("LateArrival"))
                LateArrival = obj["LateArrival"].ToObject<float>();
            float EarlyLeavingRate = 0;
            if (obj.ContainsKey("EarlyLeavingRate"))
                EarlyLeavingRate = obj["EarlyLeavingRate"].ToObject<float>();
            float EarlyLeaving = 0;
            if (obj.ContainsKey("EarlyLeaving"))
                EarlyLeaving = obj["EarlyLeaving"].ToObject<float>();
            float FlatOt = 0;
            if (obj.ContainsKey("FlatOt"))
                FlatOt = obj["FlatOt"].ToObject<float>();
            float OtOne = 0;
            if (obj.ContainsKey("OtOne"))
                OtOne = obj["OtOne"].ToObject<float>();
            float OtOnePointFive = 0;
            if (obj.ContainsKey("OtOnePointFive"))
                OtOnePointFive = obj["OtOnePointFive"].ToObject<float>();
            float OtTwo = 0;
            if (obj.ContainsKey("OtTwo"))
                OtTwo = obj["OtTwo"].ToObject<float>();
            float OtOnePointFiveRate = 0;
            if (obj.ContainsKey("OtOnePointFiveRate"))
                OtOnePointFiveRate = obj["OtOnePointFiveRate"].ToObject<float>();
            float OtTwoRate = 0;
            if (obj.ContainsKey("OtTwoRate"))
                OtTwoRate = obj["OtTwoRate"].ToObject<float>();



            if (obj.ContainsKey("EmployeeEPF"))    
                 EmployeeEPF = obj["EmployeeEPF"].ToObject<float>();
            if (obj.ContainsKey("EmployeeEIS"))
                 EmployeeEIS = obj["EmployeeEIS"].ToObject<float>();
            if (obj.ContainsKey("EmployeePCB"))
                 EmployeePCB = obj["EmployeePCB"].ToObject<float>();
            if (obj.ContainsKey("EmployeeSOCSO"))
                 EmployeeSOCSO = obj["EmployeeSOCSO"].ToObject<float>();

            if (obj.ContainsKey("EmployerEPF"))
                EmployerEPF = obj["EmployerEPF"].ToObject<float>();
            if (obj.ContainsKey("EmployerEIS"))
                EmployerEIS = obj["EmployerEIS"].ToObject<float>();
            if (obj.ContainsKey("EmployerSOCSO"))
                EmployerSOCSO = obj["EmployerSOCSO"].ToObject<float>();


            var EmployerTableBuffer = obj["EmployerTable"];
            var tableDescBuffer = obj["PayrollTable"];
            var EmployeeName = obj["EmployeeName"];
            var EmployeeID = obj["EmployeeID"];
            var Address = obj["Address"];
            var EmployeeEmail = obj["EmployeeEmail"];
            var TelNumber1 = obj["TelNumber1"];
            string PayDate = obj["PayDate"].ToString();
            string CompanyRegistrationNumber = obj["CompanyRegistrationNumber"].ToString();
            PayDate = PayDate.ToString().Substring(0, 10);
            DateTime buffer4 = DateTime.ParseExact(PayDate, "MM/dd/yyyy", null);

            // Format the date to the desired format
            PayDate = buffer4.ToString("dd/MM/yyyy");
            var Remark = obj["Remarks"];
            var Occupation = obj["Occupation"];
            var Division = obj["Division"];
            var JobGrade = obj["JobGrade"];
            var Section = obj["Section"];
            var Department = obj["Department"];
            var CompanyAddress = obj["CompanyAddress"];
            var CompanyLogo = obj["CompanyLogo"];
            var CompanyName = obj["CompanyName"];
         //   string EntitledAnnualLeave = obj["EntitledAnnualLeave"].ToString();
            string PayPeriodStart = obj["PayPeriodStart"].ToString();
            string IdentityNumber = obj["IdentityNumber"].ToString();
            string PayPeriodEnd = obj["PayPeriodEnd"].ToString();
            PayPeriodStart = PayPeriodStart.ToString().Substring(0, 10);
            PayPeriodEnd = PayPeriodEnd.ToString().Substring(0, 10);
            var buffer2 = DateTime.ParseExact(PayPeriodStart, "MM/dd/yyyy", null);
            PayPeriodStart = buffer2.ToString("dd/MM/yyyy");

            var buffer3 = DateTime.ParseExact(PayPeriodEnd, "MM/dd/yyyy", null);
            PayPeriodEnd = buffer3.ToString("dd/MM/yyyy");
            var CompanyPhone = obj["CompanyPhone"];


            List<Earnings> earnings = new List<Earnings>();
            if (obj.ContainsKey("PayrollEarningsAmountList")){
                var PayrollEarningsAmountString = obj["PayrollEarningsAmountList"].Value<string>();
                var PayrollEarningsDescriptionString = obj["PayrollEarningsDescriptionList"].Value<string>();
                var PayrollEarningsCodeString = obj["PayrollEarningsCodeList"].Value<string>();
                PayrollEarningsAmountList = new List<string>();
                PayrollEarningsDescriptionList = new List<string>();
                PayrollEarningsCodeList = new List<string>();
                ProcessArray(PayrollEarningsAmountString, PayrollEarningsAmountList);
                ProcessArray(PayrollEarningsDescriptionString, PayrollEarningsDescriptionList);
                ProcessArray(PayrollEarningsCodeString, PayrollEarningsCodeList);
                ArraysToObject(PayrollEarningsAmountList, PayrollEarningsDescriptionList, PayrollEarningsCodeList, earnings);
            }

            List<Earnings> deductions = new List<Earnings>();
            if (obj.ContainsKey("PayrollDeductionsAmountList")) {
                var PayrollDeductionsAmountString = obj["PayrollDeductionsAmountList"].Value<string>();
                var PayrollDeductionsDescriptionString = obj["PayrollDeductionsDescriptionList"].Value<string>();
                var PayrollDeductionsCodeString = obj["PayrollDeductionsCodeList"].Value<string>();
                PayrollDeductionsAmountList = new List<string>();
                PayrollDeductionsDescriptionList = new List<string>();
                PayrollDeductionsCodeList = new List<string>();
                ProcessArray(PayrollDeductionsAmountString, PayrollDeductionsAmountList);
                ProcessArray(PayrollDeductionsDescriptionString, PayrollDeductionsDescriptionList);
                ProcessArray(PayrollDeductionsCodeString, PayrollDeductionsCodeList);
                ArraysToObject(PayrollDeductionsAmountList, PayrollDeductionsAmountList, PayrollDeductionsCodeList, deductions);
            }

            List<Earnings> allowances = new List<Earnings>();
            if (obj.ContainsKey("AllowanceAmountList")){
                var AllowanceAmountString = obj["AllowanceAmountList"].Value<string>();
                var AllowanceDescriptionString = obj["AllowanceDescriptionList"].Value<string>();
                var AllowanceCodeString = obj["AllowanceCodeList"].Value<string>();
                AllowanceAmountList = new List<string>();
                AllowanceDescriptionList = new List<string>();
                AllowanceCodeList = new List<string>();
                ProcessArray(AllowanceAmountString, AllowanceAmountList);
                ProcessArray(AllowanceDescriptionString, AllowanceDescriptionList);
                ProcessArray(AllowanceCodeString, AllowanceCodeList);
                ArraysToObject(AllowanceAmountList, AllowanceDescriptionList, AllowanceCodeList, allowances);
            }

            List<Earnings> moneyClaiming = new List<Earnings>();
            if (obj.ContainsKey("MoneyClaimAmountList")){
                var MoneyClaimAmountString = obj["MoneyClaimAmountList"].Value<string>();
                var MoneyClaimDescriptionString = obj["MoneyClaimDescriptionList"].Value<string>();
                var MoneyClaimCodeString = obj["MoneyClaimCodeList"].Value<string>();
                MoneyClaimAmountList = new List<string>();
                MoneyClaimDescriptionList = new List<string>();
                MoneyClaimCodeList = new List<string>();
                ProcessArray(MoneyClaimAmountString, MoneyClaimAmountList);
                ProcessArray(MoneyClaimDescriptionString, MoneyClaimDescriptionList);
                ProcessArray(MoneyClaimCodeString, MoneyClaimCodeList);
                ArraysToObject(MoneyClaimAmountList, MoneyClaimDescriptionList, MoneyClaimCodeList, moneyClaiming);
            }

            List<Earnings> moneyDeductions = new List<Earnings>();
            if (obj.ContainsKey("DeductionAmountList")){
                var DeductionAmountString = obj["DeductionAmountList"].Value<string>();
                var DeductionDescriptionString = obj["DeductionDescriptionList"].Value<string>();
                var DeductionCodeString = obj["DeductionCodeList"].Value<string>();
                DeductionAmountList = new List<string>();
                DeductionDescriptionList = new List<string>();
                DeductionCodeList = new List<string>();
                ProcessArray(DeductionAmountString, DeductionAmountList);
                ProcessArray(DeductionDescriptionString, DeductionDescriptionList);
                ProcessArray(DeductionCodeString, DeductionCodeList);
                ArraysToObject(DeductionAmountList, DeductionDescriptionList, DeductionCodeList, moneyDeductions);
            }
            IContainer CellStyle1(IContainer container) => container.BorderHorizontal(1).BorderColor(Colors.Black).PaddingVertical(0).PaddingHorizontal(0).BorderLeft(0).BorderColor(Colors.White).AlignLeft().PaddingLeft(5);
            IContainer CellStyle2(IContainer container) => container.BorderHorizontal(1).BorderColor(Colors.Black).PaddingVertical(0).PaddingHorizontal(0).BorderRight(0).BorderColor(Colors.White).AlignRight();
            IContainer CellStyle3(IContainer container) => container.BorderHorizontal(1).BorderColor(Colors.Black).PaddingVertical(0).PaddingHorizontal(0).BorderLeft(1).BorderColor(Colors.Black).AlignLeft().PaddingLeft(5);
            IContainer CellStyle4(IContainer container) => container.BorderHorizontal(1).BorderColor(Colors.Black).PaddingVertical(0).PaddingHorizontal(0).BorderRight(0).BorderColor(Colors.White).AlignRight();
            IContainer ContentCellStyle1(IContainer container) => container.PaddingVertical(0).BorderLeft(0).BorderColor(Colors.White).AlignLeft().PaddingLeft(5).ShowOnce();
            IContainer ContentCellStyle2(IContainer container) => container.PaddingVertical(0).BorderRight(1).BorderColor(Colors.Black).AlignRight().PaddingRight(5).ShowOnce();
            IContainer ContentCellStyle3(IContainer container) => container.PaddingVertical(0).BorderLeft(1).BorderColor(Colors.Black).AlignLeft().PaddingLeft(5).ShowOnce();
            IContainer ContentCellStyle4(IContainer container) => container.PaddingVertical(0).BorderRight(0).BorderColor(Colors.White).AlignRight().PaddingRight(5).ShowOnce();

            IContainer ContentCellStyle5(IContainer container) => container.Border(1).PaddingVertical(1).BorderColor(Colors.Black).AlignLeft().AlignMiddle().PaddingLeft(5).ShowOnce();
            IContainer ContentCellStyle6(IContainer container) => container.Border(1).PaddingVertical(1).BorderColor(Colors.Black).AlignRight().AlignMiddle().PaddingRight(5).ShowOnce();
            IContainer ContentCellStyle7(IContainer container) => container.Border(1).PaddingVertical(1).BorderColor(Colors.Black).AlignLeft().AlignMiddle().PaddingLeft(5).ShowOnce();
            IContainer ContentCellStyle8(IContainer container) => container.Border(1).PaddingVertical(1).BorderColor(Colors.Black).AlignRight().AlignMiddle().PaddingRight(5).ShowOnce();


            var webroot = _hostingEnvironment.ContentRootPath;
            var logo_path = webroot + $"\\App_Data\\upload\\{CompanyLogo}";
            byte[] LogoImage = System.IO.File.ReadAllBytes(logo_path);
            var pdfbytes = Document.Create(container =>
            {
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
                            row.ConstantItem(100).Image(LogoImage);
                            row.RelativeItem(300).Text(text =>
                            {
                                text.AlignRight();
                                text.Line($"{CompanyName}").Bold().FontSize(10);
                                text.Line($"{CompanyAddress}").FontSize(6);
                                text.Line($"Phone: {CompanyPhone}").FontSize(6);
                            });
                        });
                        column.Item().Row(row =>
                        {
                            row.ConstantItem(300).Text(text =>
                            {
                                text.Line(CompanyRegistrationNumber).Bold().FontSize(10);
                            });
                        });
                        column.Item().PaddingVertical(5).LineHorizontal((float)0.6).LineColor(Colors.Black);
                        column.Item().PaddingVertical(5).Row(row =>
                        {
                            row.RelativeItem(300).Text(text =>
                            {
                                text.AlignCenter();
                                text.Line("EMPLOYEE PAYSLIP").Bold().FontSize(25);
                            });
                        });
                        
                        column.Item().Row(row =>
                        {
                            row.RelativeItem(300).Column(column =>
                            {
                                column.Item().AlignLeft();
                                column.Item().DefaultTextStyle(x => x.FontSize(10));
                                column.Item().Text(text =>
                                {
                                    text.DefaultTextStyle(x => x.FontSize(10));
                                    text.Span($"Employee Name :  {EmployeeName}  ").SemiBold();
                                });
                                column.Item().Text(text =>
                                {
                                    text.DefaultTextStyle(x => x.FontSize(10));
                                    text.Span($"Department :  {Department}  ").SemiBold();
                                });
                                column.Item().Text(text =>
                                {
                                    text.DefaultTextStyle(x => x.FontSize(10));
                                    text.Span($"Employee ID :  {EmployeeID} ");
                                });
                                column.Item().Text(text =>
                                {
                                    text.DefaultTextStyle(x => x.FontSize(10));
                                    text.Span($"IC / Passport : {IdentityNumber}");
                                });
                            });
                            row.RelativeItem(300).Column(column =>
                            {
                                column.Item().DefaultTextStyle(x => x.FontSize(10));
                                column.Item().AlignRight();
                                column.Item().Text(text =>
                                {
                                    text.DefaultTextStyle(x => x.FontSize(10));
                                    text.Span($"Pay Date:  {PayDate}").SemiBold();
                                });
                                column.Item().Text(text =>
                                {
                                    text.DefaultTextStyle(x => x.FontSize(10));
                                    text.Span($"Pay Period:  {PayPeriodStart} - {PayPeriodEnd}");
                                });
                            });
                        });
                        column.Item().PaddingVertical(15).Row(row =>
                        {
                            double GrossEarnings = 0;
                            double Deductions = 0;
                            int EmptyRows = 5;
                            
                            // First Table: Earnings/Income
                            row.RelativeItem().Table(table =>
                            {
                                table.ColumnsDefinition(columns =>
                                {
                                    columns.RelativeColumn(1.0f);
                                    columns.RelativeColumn(0.2f);
                                });
                                // Table Header for Earnings/Income
                                table.Header(header =>
                                {
                                    header.Cell().Element(CellStyle1).Text("Earnings/Income").FontSize(10);
                                    header.Cell().Element(CellStyle2).Text("Amount").FontSize(10);
                                });
                                string EarningDesc;
                                string EarningAmount;
                                if (BasicPay > 0)
                                {
                                    GrossEarnings += BasicPay;
                                    EarningDesc = $"Basic Salary";
                                    table.Cell().Element(ContentCellStyle1).Text(EarningDesc).FontSize(10);
                                    EarningAmount = $"{BasicPay}";
                                    table.Cell().Element(ContentCellStyle2).Text(EarningAmount).FontSize(10);
                                }
                                if (OtOne > 0) {
                                    GrossEarnings += OtOne * FlatOt;
                                    EarningDesc = $"Overtime Claim {OtOne}Hr x {FlatOt}/Hr";
                                    table.Cell().Element(ContentCellStyle1).Text(EarningDesc).FontSize(10);
                                    EarningAmount = $"{OtOne * FlatOt}";
                                    table.Cell().Element(ContentCellStyle2).Text(EarningAmount).FontSize(10);
                                }
                                if (OtOnePointFive > 0){
                                    GrossEarnings += OtOnePointFive * OtOnePointFiveRate;
                                    EarningDesc = $"Overtime Claim {OtOnePointFive}Hr x {OtOnePointFiveRate}/Hr";
                                    table.Cell().Element(ContentCellStyle1).Text(EarningDesc).FontSize(10);
                                    EarningAmount = $"{OtOnePointFive * OtOnePointFiveRate}";
                                    table.Cell().Element(ContentCellStyle2).Text(EarningAmount).FontSize(10);
                                }
                                if (OtTwo > 0){
                                    GrossEarnings += OtTwo * OtTwoRate;
                                    EarningDesc = $"Overtime Claim {OtTwo}Hr x {OtTwoRate}/Hr";
                                    table.Cell().Element(ContentCellStyle1).Text(EarningDesc).FontSize(10);
                                    EarningAmount = $"{OtTwo * OtTwoRate}";
                                    table.Cell().Element(ContentCellStyle2).Text(EarningAmount).FontSize(10);
                                }
                                foreach (var allowance in allowances)
                                {
                                     EarningDesc = $"{allowance.Description}({allowance.Code})";
                                    table.Cell().Element(ContentCellStyle1).Text(EarningDesc).FontSize(10);
                                     EarningAmount = $"{allowance.Amount}";
                                    GrossEarnings += float.Parse(EarningAmount);

                                    table.Cell().Element(ContentCellStyle2).Text(EarningAmount).FontSize(10);
                                }
                                foreach (var moneyClaim in moneyClaiming)
                                {
                                     EarningDesc = $"{moneyClaim.Description}({moneyClaim.Code})";
                                    table.Cell().Element(ContentCellStyle1).Text(EarningDesc).FontSize(10);
                                     EarningAmount = $"{moneyClaim.Amount}";
                                    table.Cell().Element(ContentCellStyle2).Text(EarningAmount).FontSize(10);
                                    GrossEarnings += float.Parse(moneyClaim.Amount);

                                }
                                foreach (var earning in earnings)
                                {
                                     EarningDesc = $"{earning.Description}({earning.Code})";
                                    table.Cell().Element(ContentCellStyle1).Text(EarningDesc).FontSize(10);
                                     EarningAmount = $"{earning.Amount}";
                                    table.Cell().Element(ContentCellStyle2).Text(EarningAmount).FontSize(10);
                                    GrossEarnings += float.Parse(earning.Amount);

                                }
                            });
                            // Second Table: Deductions
                            row.RelativeItem().Table(table =>
                            {
                                table.ColumnsDefinition(columns =>
                                {
                                    columns.RelativeColumn(1.0f);
                                    columns.RelativeColumn(0.2f);
                                });
                                table.Header(header =>
                                {
                                    header.Cell().Element(CellStyle3).Text("Deductions").FontSize(10);
                                    header.Cell().Element(CellStyle4).Text("Amount").FontSize(10);

                                });
                                string DeductionDesc;
                                string DeductionAmount;

                                foreach (var deduction in deductions)
                                {
                                     DeductionDesc = $"{deduction.Description}({deduction.Code})";
                                    table.Cell().Element(ContentCellStyle3).Text(DeductionDesc).FontSize(10);
                                     DeductionAmount = $"{deduction.Amount}";
                                    table.Cell().Element(ContentCellStyle4).Text(DeductionAmount).FontSize(10);
                                    Deductions += float.Parse(DeductionAmount);
                                }
                                foreach (var moneyDeduction in moneyDeductions)
                                {
                                     DeductionDesc = $"{moneyDeduction.Description}({moneyDeduction.Code})";
                                    table.Cell().Element(ContentCellStyle3).Text(DeductionDesc).FontSize(10);
                                     DeductionAmount = $"{moneyDeduction.Amount}";
                                    table.Cell().Element(ContentCellStyle4).Text(DeductionAmount).FontSize(10);
                                    Deductions += float.Parse(DeductionAmount);

                                }
                                if (NPLDaily > 0)
                                {
                                    Deductions += NPLDaily * NPLDailyRate;
                                    DeductionDesc = $"NPL Daily";
                                    table.Cell().Element(ContentCellStyle3).Text(DeductionDesc).FontSize(10);
                                    DeductionAmount = $"-{NPLDaily * NPLDailyRate}";
                                    table.Cell().Element(ContentCellStyle4).Text(DeductionAmount).FontSize(10);
                                }
                                if (NPLHourly > 0)
                                {
                                    Deductions += NPLHourly * NPLHourlyRate;
                                    DeductionDesc = $"NPL Hourly";
                                    table.Cell().Element(ContentCellStyle3).Text(DeductionDesc).FontSize(10);
                                    DeductionAmount = $"-{NPLHourly * NPLHourlyRate}";
                                    table.Cell().Element(ContentCellStyle4).Text(DeductionAmount).FontSize(10);
                                }
                                if (AbsentDaily > 0)
                                {
                                    Deductions += AbsentDaily * AbsentDailyRate;
                                    DeductionDesc = $"Absent Daily";
                                    table.Cell().Element(ContentCellStyle3).Text(DeductionDesc).FontSize(10);
                                    DeductionAmount = $"-{AbsentDaily * AbsentDailyRate}";
                                    table.Cell().Element(ContentCellStyle4).Text(DeductionAmount).FontSize(10);
                                }
                                if (LateArrival > 0)
                                {
                                    Deductions += LateArrival * LateArrivalRate;
                                    DeductionDesc = $"Late Arrival";
                                    table.Cell().Element(ContentCellStyle3).Text(DeductionDesc).FontSize(10);
                                    DeductionAmount = $"-{LateArrival * LateArrivalRate}";
                                    table.Cell().Element(ContentCellStyle4).Text(DeductionAmount).FontSize(10);
                                }
                                if (EarlyLeaving > 0)
                                {
                                    Deductions += EarlyLeaving * EarlyLeavingRate;
                                    DeductionDesc = $"Late Arrival";
                                    table.Cell().Element(ContentCellStyle3).Text(DeductionDesc).FontSize(10);
                                    DeductionAmount = $"-{EarlyLeaving * EarlyLeavingRate}";
                                    table.Cell().Element(ContentCellStyle4).Text(DeductionAmount).FontSize(10);
                                }
                                if (EmployeeEPF > 0) {
                                     DeductionDesc = $"Employee EPF";
                                    table.Cell().Element(ContentCellStyle3).Text(DeductionDesc).FontSize(10);
                                     DeductionAmount = $"-{EmployeeEPF}";
                                    table.Cell().Element(ContentCellStyle4).Text(DeductionAmount).FontSize(10);
                                    Deductions += float.Parse(DeductionAmount);
                                }
                                if (EmployeeEIS > 0) {
                                     DeductionDesc = $"Employee EIS";
                                    table.Cell().Element(ContentCellStyle3).Text(DeductionDesc).FontSize(10);
                                     DeductionAmount = $"-{EmployeeEIS}";
                                    table.Cell().Element(ContentCellStyle4).Text(DeductionAmount).FontSize(10);
                                    Deductions += float.Parse(DeductionAmount);
                                }
                                if (EmployeeSOCSO > 0)
                                {
                                    DeductionDesc = $"Employee SOCSO";
                                    table.Cell().Element(ContentCellStyle3).Text(DeductionDesc).FontSize(10);
                                    DeductionAmount = $"-{EmployeeSOCSO}";
                                    table.Cell().Element(ContentCellStyle4).Text(DeductionAmount).FontSize(10);
                                    Deductions += float.Parse(DeductionAmount);
                                }
                                if (EmployeePCB > 0) {
                                     DeductionDesc = $"Employee PCB";
                                    table.Cell().Element(ContentCellStyle3).Text(DeductionDesc).FontSize(10);
                                     DeductionAmount = $"-{EmployeePCB}";
                                    table.Cell().Element(ContentCellStyle4).Text(DeductionAmount).FontSize(10);
                                    Deductions += float.Parse(DeductionAmount);
                                }


                                for (int i = 0; i < EmptyRows; i++)
                                {
           
                                    table.Cell().Element(ContentCellStyle3).Text("").FontSize(10);
                                    table.Cell().Element(ContentCellStyle4).Text("").FontSize(10);
                                }
   

                                if (EmployerEPF > 0)
                                {

                                    DeductionDesc = $"Employer EPF";
                                    table.Cell().Element(ContentCellStyle3).Text(DeductionDesc).FontSize(10);
                                    DeductionAmount = $"{EmployerEPF}";
                                    table.Cell().Element(ContentCellStyle4).Text(DeductionAmount).FontSize(10);
                                }

                                if (EmployerEIS > 0)
                                {
                                    DeductionDesc = $"Employer EIS";
                                    DeductionAmount = $"{EmployerEIS}";

                                    table.Cell().Element(ContentCellStyle3).Text(DeductionDesc).FontSize(10);
                                    table.Cell().Element(ContentCellStyle4).Text(DeductionAmount).FontSize(10);
                                }

                                if (EmployerSOCSO > 0)
                                {
 
                                    DeductionDesc = $"Employer SOCSO";
                                    table.Cell().Element(ContentCellStyle3).Text(DeductionDesc).FontSize(10);
                                    DeductionAmount = $"{EmployerSOCSO}";
                                    table.Cell().Element(ContentCellStyle4).Text(DeductionAmount).FontSize(10);
                                }

                                table.Cell().Element(ContentCellStyle5).Text("Gross Total").FontSize(10);
                                string FormattedGrossEarnings = GrossEarnings.ToString("F2"); // "123.46"

                                table.Cell().Element(ContentCellStyle6).Text(FormattedGrossEarnings).FontSize(10);
                                table.Cell().Element(ContentCellStyle7).Text("Total Deduction").FontSize(10);
                                string FormattedDeductions = Deductions.ToString("F2"); // "123.46"

                                table.Cell().Element(ContentCellStyle8).Text(FormattedDeductions).FontSize(10);
                                
                                table.Cell().Element(ContentCellStyle7).Text("Nett Pay").FontSize(10);
                                double NettEarnings = GrossEarnings + Deductions;
                                string FormattedNettEarnings = NettEarnings.ToString("F2");

                                table.Cell().Element(ContentCellStyle8).Text(FormattedNettEarnings).FontSize(10);


                            });
                        });

                        /*
                        column.Item().PaddingVertical(15).Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                columns.RelativeColumn((float)1.0);
                                columns.RelativeColumn((float)1.0);
                                columns.RelativeColumn((float)1.0);
                                columns.RelativeColumn((float)1.0);
                            });
                            table.Header(header =>
                            {
                                header.Cell().Element(CellStyle1).Text("Earnings/Income").FontSize(10);
                                header.Cell().Element(CellStyle2).Text("").FontSize(10);
                                header.Cell().Element(CellStyle3).Text("Deductions").FontSize(10);
                                header.Cell().Element(CellStyle4).Text("").FontSize(10);
});


                            foreach (var moneyClaim in moneyClaiming)
                            {
                                string EarningDesc
                                = $"{moneyClaim.Description}({moneyClaim.Code})";
                                table.Cell().Element(ContentCellStyle1).Text(EarningDesc).FontSize(10);
                                string EarningAmount = $"{moneyClaim.Amount}";
                                table.Cell().Element(ContentCellStyle2).Text(EarningAmount).FontSize(10);
                                Console.WriteLine(moneyClaim);
                            }


                            
                            int maxIndex = Math.Max(DeductionsString.Count, EarningsString.Count);
                            double GrossEarnings = 0;
                            double Deductions = 0;
                            double NettEarnings = 0;
                            for (int i = 0; i < maxIndex; i++)
                            {
                                var EarningCriteria = "";
                                double EarningAmount = 0;

                                var DeductionCriteria = "";
                                double DeductionAmount = 0;

                                string[] EarningParts = EarningsString[i].Split(':', 2).Select(part => part.Trim()).ToArray();
                                string[] DeductionParts = DeductionsString[i].Split(':', 2).Select(part => part.Trim()).ToArray();


                                if (EarningParts[0] != "-")
                                {
                                    string[] parts = EarningsString[i].Split(':', 2).Select(part => part.Trim()).ToArray();

                                    EarningCriteria = parts[0];

                                    if (parts[1].Contains("="))
                                    {

                                        // Find the index of '='
                                        int equalsIndex = parts[1].IndexOf('=');

                                        // Extract the substring between ':' and '='
                                        string overtimePayments = parts[1].Substring(parts[1].IndexOf(':') + 1, equalsIndex - parts[1].IndexOf(':') - 1).Trim();
                                        EarningCriteria = EarningCriteria + overtimePayments;

                                        // Extract the substring after '='
                                        string overtimeAmountString = parts[1].Substring(equalsIndex + 1).Trim();


                                        EarningAmount = double.Parse(overtimeAmountString);

                                    }
                                    else
                                        EarningAmount = double.Parse(parts[1]);
                                    GrossEarnings += EarningAmount;
                                    string FormattedEarningAmount = EarningAmount.ToString("F2"); // "123.46"

                                    table.Cell().Element(ContentCellStyle1).Text(EarningCriteria).FontSize(10);
                                    table.Cell().Element(ContentCellStyle2).Text(FormattedEarningAmount).FontSize(10);

                                }
                                else
                                {

                                    EarningCriteria = "";
                                    EarningAmount = 0;
                                    table.Cell().Element(ContentCellStyle1).Text("").FontSize(10);
                                    table.Cell().Element(ContentCellStyle2).Text("").FontSize(10);

                                }
                                if (DeductionParts[0] != "-")
                                {
                                    string[] parts = DeductionsString[i].Split(':', 2).Select(part => part.Trim()).ToArray();
                                    DeductionCriteria = parts[0];
                                    DeductionAmount = double.Parse(parts[1]);
                                    Deductions += DeductionAmount;
                                    string FormattedDeductionAmount = DeductionAmount.ToString("F2"); // "123.46"
                                    table.Cell().Element(ContentCellStyle3).Text(DeductionCriteria).FontSize(10);
                                    table.Cell().Element(ContentCellStyle4).Text(FormattedDeductionAmount).FontSize(10);
                                }
                                else
                                {
                                    DeductionCriteria = "";
                                    DeductionAmount = 0;
                                    table.Cell().Element(ContentCellStyle3).Text("").FontSize(10);
                                    table.Cell().Element(ContentCellStyle4).Text("").FontSize(10);
                                }
                            }
                            
                            double NettEarnings = 0;
                        
                            NettEarnings = GrossEarnings - Deductions;
                            string FormattedNettEarnings = NettEarnings.ToString("F2"); // "123.46"
                            IContainer ContentCellStyle1(IContainer container) => container.PaddingVertical(0).BorderLeft(0).BorderColor(Colors.White).AlignLeft().PaddingLeft(5).ShowOnce();
                            IContainer ContentCellStyle2(IContainer container) => container.PaddingVertical(0).BorderRight(0).BorderColor(Colors.White).AlignRight().PaddingRight(5).ShowOnce();
                            IContainer ContentCellStyle3(IContainer container) => container.PaddingVertical(0).BorderLeft(1).BorderColor(Colors.Black).AlignLeft().PaddingLeft(5).ShowOnce();
                            IContainer ContentCellStyle4(IContainer container) => container.PaddingVertical(0).BorderRight(0).BorderColor(Colors.White).AlignRight().PaddingRight(5).ShowOnce();
                            IContainer ContentCellStyle5(IContainer container) => container.Border(1).PaddingVertical(1).BorderColor(Colors.Black).AlignLeft().AlignMiddle().PaddingLeft(5).ShowOnce();
                            IContainer ContentCellStyle6(IContainer container) => container.Border(1).PaddingVertical(1).BorderColor(Colors.Black).AlignRight().AlignMiddle().PaddingRight(5).ShowOnce();
                            IContainer ContentCellStyle7(IContainer container) => container.Border(1).PaddingVertical(1).BorderColor(Colors.Black).AlignLeft().AlignMiddle().PaddingLeft(5).ShowOnce();
                            IContainer ContentCellStyle8(IContainer container) => container.Border(1).PaddingVertical(1).BorderColor(Colors.Black).AlignRight().AlignMiddle().PaddingRight(5).ShowOnce();
                            
                            int EmptyRows = 5;
                            for (int i = 0; i < EmptyRows; i++)
                            {
                                table.Cell().Element(ContentCellStyle1).Text("").FontSize(10);
                                table.Cell().Element(ContentCellStyle2).Text("").FontSize(10);
                                table.Cell().Element(ContentCellStyle3).Text("").FontSize(10);
                                table.Cell().Element(ContentCellStyle4).Text("").FontSize(10);
                            }
                            int EmployerTableLength = EmployerString.Count;
                            for (int i = 0; i < EmployerTableLength; i++)
                            {
                                table.Cell().Element(ContentCellStyle1).Text("").FontSize(10);
                                table.Cell().Element(ContentCellStyle2).Text("").FontSize(10);

                                string[] EmployerParts = EmployerString[i].Split(':', 2).Select(part => part.Trim()).ToArray();
                                var DeductionCriteria = "Employer " + EmployerParts[0];
                                var DeductionAmount = double.Parse(EmployerParts[1]);
                                string FormattedDeductionAmount = DeductionAmount.ToString("F2"); // "123.46"

                                table.Cell().Element(ContentCellStyle3).Text(DeductionCriteria).FontSize(10);
                                table.Cell().Element(ContentCellStyle4).Text(FormattedDeductionAmount).FontSize(10);

                            }
                            
                            table.Cell().Element(ContentCellStyle5).Text("Gross Total").FontSize(10);
                            string FormattedGrossEarnings = GrossEarnings.ToString("F2"); // "123.46"

                            table.Cell().Element(ContentCellStyle6).Text(FormattedGrossEarnings).FontSize(10);
                            table.Cell().Element(ContentCellStyle7).Text("Total Deduction").FontSize(10);
                            string FormattedDeductions = Deductions.ToString("F2"); // "123.46"

                            table.Cell().Element(ContentCellStyle8).Text(FormattedDeductions).FontSize(10);
                            table.Cell().Element(ContentCellStyle1).Text("").FontSize(10);
                            table.Cell().Element(ContentCellStyle2).Text("").FontSize(10);

                            table.Cell().Element(ContentCellStyle7).Text("Nett Pay").FontSize(10);

                            table.Cell().Element(ContentCellStyle8).Text(FormattedNettEarnings).FontSize(10);

                        });
                        */
                    }
                    );
                    page.Footer().AlignRight().Column(column =>
                    {
                        column.Item().PaddingVertical(10).Row(row =>
                        {
                            row.RelativeItem(300).Column(column =>
                            {
                                column.Item().AlignRight();
                                column.Item().AlignRight().Text(text =>
                                {
                                    text.DefaultTextStyle(x => x.FontSize(10));
                                    text.Line("INITIAL SIGNATURE").Bold();
                                    text.Line("___________________________");

                                });

                            });

                        });

                    });
                });
        
            }).GeneratePdf();

            string directory = webroot + $"\\App_Data\\upload\\Payroll\\Payslip";
            if (!Directory.Exists(directory))
                Directory.CreateDirectory(directory);
            string path = webroot + $"\\App_Data\\upload\\Payroll\\Payslip\\{PayrollRowId}.pdf";
            
            if (System.IO.File.Exists(path))
                System.IO.File.Delete(path);
            
            System.IO.File.WriteAllBytesAsync(path, pdfbytes);



            return File(pdfbytes, "application/pdf", path);

        }
       
    }
}