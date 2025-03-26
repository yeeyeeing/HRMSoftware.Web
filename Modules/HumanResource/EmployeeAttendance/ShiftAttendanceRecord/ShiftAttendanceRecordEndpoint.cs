using Dapper;
using HRMSoftware.Administration;
using HRMSoftware.Administration.Columns;
using HRMSoftware.OrganisationChart.Endpoints;
using Microsoft.AspNetCore.Mvc;
using NUglify.JavaScript.Syntax;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using Serenity;
using Serenity.Abstractions;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Net;
using MyRow = HRMSoftware.EmployeeAttendance.ShiftAttendanceRecordRow;
using System.Linq;
using Bellatrix;

namespace HRMSoftware.EmployeeAttendance.Endpoints;
public class EmployeeShiftRecord
{
    public string EmployeeID { get; set; }
    public string EmployeeName { get; set; }
    public string DepartmentName { get; set; }
    public string ShiftName { get; set; }
    public string ShiftStartDate { get; set; }
    public string ShiftEndDate { get; set; }
    public string SundayStartingFrom { get; set; }
    public string SundayEndingAt { get; set; }
    public string MondayStartingFrom { get; set; }
    public string MondayEndingAt { get; set; }

    public string TuesdayEndingAt { get; set; }
    public string TuesdayStartingFrom { get; set; }

    public string WednesdayEndingAt { get; set; }
    public string WednesdayStartingFrom { get; set; }

    public string ThursdayEndingAt { get; set; }
    public string ThursdayStartingFrom { get; set; }

    public string FridayEndingAt { get; set; }
    public string FridayStartingFrom { get; set; }

    public string SaturdayEndingAt { get; set; }
    public string SaturdayStartingFrom { get; set; }
    public int otEntitlement { get; set; }
    public int SundayWorkingTime { get; set; }
    public int MondayWorkingTime { get; set; }
    public int TuesdayWorkingTime { get; set; }
    public int WednesdayWorkingTime { get; set; }
    public int ThursdayWorkingTime { get; set; }
    public int FridayWorkingTime { get; set; }
    public int SaturdayWorkingTime { get; set; }
    public int OtMinute { get; set; }
    public int LateMins { get; set; }
    public int EarlyMins { get; set; }
    public string TimeIn { get; set; }
    public string TimeOut { get; set; }
    public DateTime ShiftStartTime { get; set; }
    public DateTime ShiftEndTime { get; set; }
    public int WeekdayOt { get; set; }
    public int WeekendOt { get; set; }
    public int PublicHolidayOt { get; set; }

    public string CompanyName { get; set; }

}
public class EmployeeOtSettings
{
    public int FixedOtRateOption { get; set; }
    public int WeekdayTwo { get; set; }
    public int WeekdayOnePointFive { get; set; }
    public int WeekendTwo { get; set; }
    public int WeekendOnePointFive { get; set; }
    public int PublicHolidayTwo { get; set; }
    public int PublicHolidayOnePointFive { get; set; }
    public double OtRatePublicHoliday { get; set; }
    public double OtRateWeekday { get; set; }
    public double OtRateWeekend { get; set; }
}



[Route("Services/EmployeeAttendance/ShiftAttendanceRecord/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class ShiftAttendanceRecordEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IShiftAttendanceRecordSaveHandler handler)
    {
        DateTime ShiftStartTimeBuffer = (System.DateTime)request.Entity.ShiftStartTime;
        string[] ShiftStartTimeHourParts = request.Entity.ShiftStartTimeHour.Split(':');
        if (ShiftStartTimeHourParts.Length == 2 &&
        int.TryParse(ShiftStartTimeHourParts[0], out int ShiftStartTimeHour) &&
        int.TryParse(ShiftStartTimeHourParts[1], out int ShiftStartTimeMinute))
            ShiftStartTimeBuffer = new DateTime(ShiftStartTimeBuffer.Year, ShiftStartTimeBuffer.Month,
                ShiftStartTimeBuffer.Day, ShiftStartTimeHour, ShiftStartTimeMinute, ShiftStartTimeBuffer.Second);
        request.Entity.ShiftStartTime = ShiftStartTimeBuffer;


        DateTime ShiftEndTimeBuffer = (System.DateTime)request.Entity.ShiftEndTime;
        string[] ShiftEndTimeHourParts = request.Entity.ShiftEndTimeHour.Split(':');
        if (ShiftEndTimeHourParts.Length == 2 &&
        int.TryParse(ShiftEndTimeHourParts[0], out int ShiftEndTimeHour) &&
        int.TryParse(ShiftEndTimeHourParts[1], out int ShiftEndTimeMinute))
            ShiftEndTimeBuffer = new DateTime(ShiftEndTimeBuffer.Year, ShiftEndTimeBuffer.Month,
                ShiftEndTimeBuffer.Day, ShiftEndTimeHour, ShiftEndTimeMinute, ShiftEndTimeBuffer.Second);
        request.Entity.ShiftEndTime = ShiftEndTimeBuffer;



        DateTime ClockInTimeBuffer = (System.DateTime)request.Entity.TimeIn;
        string[] ClockInHourParts = request.Entity.TimeInHour.Split(':');
        if (ClockInHourParts.Length == 2 &&
        int.TryParse(ClockInHourParts[0], out int ClockInHour) &&
        int.TryParse(ClockInHourParts[1], out int ClockInMinute))
            ClockInTimeBuffer = new DateTime(ClockInTimeBuffer.Year, ClockInTimeBuffer.Month,
                ClockInTimeBuffer.Day, ClockInHour, ClockInMinute, ClockInTimeBuffer.Second);
        request.Entity.TimeIn = ClockInTimeBuffer;






        DateTime ClockOutTimeBuffer = (System.DateTime)request.Entity.TimeOut;
        string[] ClockOutHourParts = request.Entity.TimeOutHour.Split(':');
        if (ClockOutHourParts.Length == 2 &&
        int.TryParse(ClockOutHourParts[0], out int ClockOutHour) &&
        int.TryParse(ClockOutHourParts[1], out int ClockOutMinute))
            ClockOutTimeBuffer = new DateTime(ClockOutTimeBuffer.Year, ClockOutTimeBuffer.Month,
                ClockOutTimeBuffer.Day, ClockOutHour, ClockOutMinute, ClockOutTimeBuffer.Second);
        request.Entity.TimeOut = ClockOutTimeBuffer;


        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IShiftAttendanceRecordSaveHandler handler)
    {
        
        DateTime ShiftStartTimeBuffer = (System.DateTime)request.Entity.ShiftStartTime;
        string[] ShiftStartTimeHourParts = request.Entity.ShiftStartTimeHour.Split(':');
        if (ShiftStartTimeHourParts.Length == 2 &&
        int.TryParse(ShiftStartTimeHourParts[0], out int ShiftStartTimeHour) &&
        int.TryParse(ShiftStartTimeHourParts[1], out int ShiftStartTimeMinute))
            ShiftStartTimeBuffer = new DateTime(ShiftStartTimeBuffer.Year, ShiftStartTimeBuffer.Month,
                ShiftStartTimeBuffer.Day, ShiftStartTimeHour, ShiftStartTimeMinute, ShiftStartTimeBuffer.Second);
        request.Entity.ShiftStartTime = ShiftStartTimeBuffer;

        DateTime ShiftEndTimeBuffer = (System.DateTime)request.Entity.ShiftEndTime;
        string[] ShiftEndTimeHourParts = request.Entity.ShiftEndTimeHour.Split(':');
        if (ShiftEndTimeHourParts.Length == 2 &&
        int.TryParse(ShiftEndTimeHourParts[0], out int ShiftEndTimeHour) &&
        int.TryParse(ShiftEndTimeHourParts[1], out int ShiftEndTimeMinute))
            ShiftEndTimeBuffer = new DateTime(ShiftEndTimeBuffer.Year, ShiftEndTimeBuffer.Month,
                ShiftEndTimeBuffer.Day, ShiftEndTimeHour, ShiftEndTimeMinute, ShiftEndTimeBuffer.Second);
        request.Entity.ShiftEndTime = ShiftEndTimeBuffer;


        DateTime ClockInTimeBuffer = (System.DateTime)request.Entity.TimeIn;
        string[] ClockInHourParts = request.Entity.TimeInHour.Split(':');
        if (ClockInHourParts.Length == 2 &&
        int.TryParse(ClockInHourParts[0], out int ClockInHour) &&
        int.TryParse(ClockInHourParts[1], out int ClockInMinute))
            ClockInTimeBuffer = new DateTime(ClockInTimeBuffer.Year, ClockInTimeBuffer.Month,
                ClockInTimeBuffer.Day, ClockInHour, ClockInMinute, ClockInTimeBuffer.Second);
        request.Entity.TimeIn = ClockInTimeBuffer;


        DateTime ClockOutTimeBuffer = (System.DateTime)request.Entity.TimeOut;
        string[] ClockOutHourParts = request.Entity.TimeOutHour.Split(':');
        if (ClockOutHourParts.Length == 2 &&
        int.TryParse(ClockOutHourParts[0], out int ClockOutHour) &&
        int.TryParse(ClockOutHourParts[1], out int ClockOutMinute))
            ClockOutTimeBuffer = new DateTime(ClockOutTimeBuffer.Year, ClockOutTimeBuffer.Month,
                ClockOutTimeBuffer.Day, ClockOutHour, ClockOutMinute, ClockOutTimeBuffer.Second);
        request.Entity.TimeOut = ClockOutTimeBuffer;






        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IShiftAttendanceRecordDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IShiftAttendanceRecordRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IShiftAttendanceRecordListHandler handler)
    {
      //  request.Sort = new[] { new SortBy("ShiftStartTime", true) };

        if (Permissions.HasPermission(PermissionKeys.HumanResources))//if user is HR guy
                    return handler.List(connection, request);
        
        /*
        MyRow latest = connection.QueryFirstOrDefault<MyRow>("dbo.RetrieveEmployeeRowIDBasedOnUserID",
            param: new
            {
                @UserID = User.GetIdentifier()
            },
                commandType: System.Data.CommandType.StoredProcedure);
        */
        var EmployeeRowId = new ShiftAttendanceRecordEndpoint().GetEmployeeRowIdFromUserRowId(connection, User.GetIdentifier().ToInt());

        request.Criteria = new Criteria("EmployeeRowId") == EmployeeRowId;

        var ListOfEmployee = new OrganisationChartEndpoint().GetEmployeeUserCanView(connection, EmployeeRowId, PermissionKeys.ViewShiftAttendance);
        foreach (int number in ListOfEmployee)
            request.Criteria = (request.Criteria || new Criteria("EmployeeRowId") == number);



        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IShiftAttendanceRecordListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.ShiftAttendanceRecordColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "ShiftAttendanceRecordList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }

    [HttpGet]
    public int GetEmployeeRowIdFromUserRowId(IDbConnection sqlConnections, int UserRowId)
    {
        var sql = @"declare @EmployeeRowID as int;" +
            "select @EmployeeRowID = EmployeeRowID from dbo.Users where " +
            "Users.UserId = @UserRowId;" +
            "select @EmployeeRowID as EmployeeRowId ";
        ShiftAttendanceRecordRow result = sqlConnections.QueryFirstOrDefault<ShiftAttendanceRecordRow>(sql, new
        {
            UserRowId = UserRowId
        });
        return result.EmployeeRowId.Value;
    }


    [PageAuthorize, HttpGet, Route("/EmployeeAttendance/ShiftAttendanceRecord/GenerateShiftAttendanceTable")]
    public IActionResult GenerateShiftAttendanceTable( IDbConnection sqlConnections, int EmployeeRowId
        , string startDateStr, string endDateStr)
    {
        
        var sql = @"
            SELECT 
                Employee.EmployeeID,
                Employee.EmployeeName,
                Department.Name AS DepartmentName,
                EmployeeShiftPattern.ShiftName AS ShiftName,
                EmployeeShiftHistory.ShiftStartDate,
                EmployeeShiftHistory.ShiftEndDate,
                EmployeeShiftPattern.MondayStartingFrom,
                EmployeeShiftPattern.MondayEndingAt,
                CompanySettings.CompanyName
            FROM dbo.HumanResourcesEmployee AS Employee
            LEFT JOIN HumanResourcesDepartment AS Department 
                ON Department.ID = Employee.DepartmentID 
            LEFT JOIN HumanResourcesEmployeeShiftHistory AS EmployeeShiftHistory 
                ON EmployeeShiftHistory.EmployeeRowID = Employee.ID 
                AND (EmployeeShiftHistory.ShiftStartDate <= @endDate 
                AND EmployeeShiftHistory.ShiftEndDate >= @startDate)
            LEFT JOIN HumanResourcesShiftPattern AS EmployeeShiftPattern 
                ON EmployeeShiftPattern.ID = EmployeeShiftHistory.ShiftID
            LEFT JOIN HumanResourcesCompanySettings AS CompanySettings 
                ON CompanySettings.isactive =1 
            WHERE Employee.ID = @EmployeeRowId;";
        EmployeeShiftRecord results = sqlConnections.QueryFirstOrDefault<EmployeeShiftRecord>(sql, new
        {
            EmployeeRowId = EmployeeRowId,
            StartDate = startDateStr,
            EndDate = endDateStr
        });
        var EnquiringEmployeeOt = @"
        select FixedOtRateOption,OtRatePublicHoliday,OtRateWeekday,OtRateWeekend,companySettings.PublicHolidayOnePointFive,
        companySettings.PublicHolidayTwo,companySettings.WeekdayOnePointFive,companySettings.WeekdayTwo,companySettings.WeekendOnePointFive,
        companySettings.WeekdayTwo
        from dbo.HumanResourcesEmployee Employee
        left join HumanResourcesCompanySettings companySettings on companySettings.IsActive = 1
        where Employee.ID = @EmployeeRowId;";
        EmployeeOtSettings otSettings = sqlConnections.QueryFirstOrDefault<EmployeeOtSettings>(EnquiringEmployeeOt, new
        {
            EmployeeRowId = EmployeeRowId
        });

        /*
        Dictionary<string, float> columnSizes = new Dictionary<string, float>
        {
            { "Status", 1 }, { "Shift", 1 }, { "Actual Shift", 2 }, { "Date", 1 },
            { "Day", 1 }, { "Emp Remark", 2 }, { "Sup Remark", 2 }, { "LV/PH Remark", 2 },
            { "Odd Clocking", 2 }, { "TimeIn", (float)1.5 }, { "TimeOut", (float)1.5 },
            { "Adj TimeIn", 2 }, { "Adj TimeOut", 2 },
            { "Work Hrs", 2 }, { "Normal Hours", 2 }, { "Late Hours", 2 },
            { "U.T Hours", 2 }, { "O.T #1.0", 2 }, { "O.T #1.5", 2 },
            { "O.T #2.0", 2 }, { "Shift$", 2 }
        };
        */
        Dictionary<string, float> columnSizes = new Dictionary<string, float>
        {
            { "Status", 1 }, { "Shift", 1 }, { "Actual Shift", 2 }, { "Date", 1 },
            { "Day", 1 }, { "Emp Remark", 1 }, { "Sup Remark", 2 }, { "LV/PH Remark", 2 },
            { "Odd Clocking", 1 }, { "TimeIn", (float)1 }, { "TimeOut", (float)1.5 },
            { "Adj TimeIn", 1 }, { "Adj TimeOut", 1 },
            { "Work Hrs", 1 }, { "Normal Hours", 1 }, { "Late Hours", 1 },
            { "U.T Hours", 1 }, { "O.T #1.0", 1 }, { "O.T #1.5", 1 },
            { "O.T #2.0", 1 }, { "Shift$", 1 }
        };

        var pdfbytes = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(20);
                page.Content().Column(column =>
                {
                    column.Item().Row(row =>
                    {
                       
                        row.AutoItem().Text(text =>
                        {
                            text.AlignLeft();
                            
                            text.Line($"{results.CompanyName}").Bold().FontSize(10);
                            text.Line("Timesheet In Details").Bold().FontSize(8);

                            text.Span("Date Range: ").Bold().Bold().FontSize(8);
                            text.Span($" {startDateStr} - {endDateStr}").FontSize(7);

                        });
                    });
                    column.Item().Row(row =>
                    {
                   
                        row.RelativeItem().Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                foreach (var header in columnSizes)
                                {
                                    float size = header.Value;  // Correct way to get the column size
                                    columns.RelativeColumn(size);
                                }
                            });


                            table.Header(header =>
                            {
                                foreach (var column in columnSizes)
                                {
                                    string columnName = column.Key;  // The header name (not used here)
                                    header.Cell().Element(HeaderStyle).Text(columnName).FontSize((float)4.4).Bold();
                                }
                            });


                        });
                        
                        });
                    column.Item().Row(row =>
                    {    
                        row.RelativeItem().Table(table =>
                        {
                            List<string> shortHeaderList = new List<string> { "Department", "Employee Number", "Employee Name" };
                            table.ColumnsDefinition(columns =>
                            {
                                foreach (var _ in shortHeaderList)
                                    columns.RelativeColumn();
                            });
                            table.Header(header =>
                            {
                                header.Cell().Element(HeaderStyle).Text(text =>
                                    {
                                        text.Span($"{shortHeaderList[0]}: ").Bold().FontSize(5);
                                        text.Span(results.DepartmentName).FontSize(5);
                                    });
                                header.Cell().Element(HeaderStyle).Text(text =>
                                {
                                    text.Span($"{shortHeaderList[1]}: ").Bold().FontSize(5);
                                    text.Span(results.EmployeeID).FontSize(5);
                                });
                                header.Cell().Element(HeaderStyle).Text(text =>
                                {
                                    text.Span($"{shortHeaderList[2]}: ").Bold().FontSize(5);
                                    text.Span(results.EmployeeName).FontSize(5);
                                });
                            });
                        });
                    });
                    column.Item().Row(row =>
                    {
                      row.RelativeItem().Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                foreach (var header in columnSizes)
                                {
                                    float size = header.Value;  // Correct way to get the column size
                                    columns.RelativeColumn(size);
                                }
                            });
                            DateTime startDate = DateTime.ParseExact(startDateStr, "yyyy-MM-dd", null);
                            DateTime endDate = DateTime.ParseExact(endDateStr, "yyyy-MM-dd", null);
                            double TotalWorkHours = 0;
                            double TotalNormalHours = 0;
                            double TotalLateHours = 0;
                            double TotalUnderWorkedTimeHours = 0;
                            double TotalOtOnePointZeroHours = 0;
                            double TotalOtOnePointFiveHours = 0;
                            double TotalOtTwoPointZeroHours = 0;
                            double TotalShift = 0;

                            for (DateTime date = startDate; date <= endDate; date = date.AddDays(1))
                            {
                                string shortDayName = date.ToString("ddd");  // "Thu"
                                string dateTargeted = date.ToString("dd/MM/yyyy");
                                string datePassedIntoSql = date.ToString("yyyy-MM-dd");

                                var DataInquiry = @"
                                SELECT 
                                   COALESCE(ShiftAttendanceRecord.TimeIn, '') AS TimeIn,
                                   COALESCE(ShiftAttendanceRecord.TimeOut, '') AS TimeOut,
                                   COALESCE(ShiftPattern.ShiftName, '') AS ShiftName,
                                   COALESCE(ShiftPattern.MondayWorkingTime, 0) AS MondayWorkingTime,
                                   COALESCE(ShiftPattern.SundayWorkingTime, 0) AS SundayWorkingTime,
                                   COALESCE(ShiftPattern.TuesdayWorkingTime, 0) AS TuesdayWorkingTime,
                                   COALESCE(ShiftPattern.WednesdayWorkingTime, 0) AS WednesdayWorkingTime,
                                   COALESCE(ShiftPattern.ThursdayWorkingTime, 0) AS ThursdayWorkingTime,
                                   COALESCE(ShiftPattern.FridayWorkingTime, 0) AS FridayWorkingTime,
                                   COALESCE(ShiftPattern.SaturdayWorkingTime, 0) AS SaturdayWorkingTime,
                                   COALESCE(EmployeeOt.OtMinute, 0) AS OtMinute,
                                   COALESCE(Late.LateMins, 0) AS LateMins,
                                   COALESCE(EarlyLeave.EarlyMins, 0) AS EarlyMins,
                                   COALESCE(ShiftAttendanceRecord.ShiftEndTime, 0) AS ShiftEndTime,
                                   COALESCE(ShiftAttendanceRecord.ShiftStartTime, 0) AS ShiftStartTime,
                                   COALESCE(EmployeeOt.WeekdayOt, 0) as WeekdayOt,
                                   COALESCE(EmployeeOt.WeekendOt, 0) as WeekendOt,
                                   COALESCE(EmployeeOt.PublicHolidayOt, 0) as PublicHolidayOt
                                   from dbo.HumanResourcesShiftAttendanceRecord ShiftAttendanceRecord 
                                   left join HumanResourcesOT EmployeeOt on EmployeeOt.ShiftAttendanceRecordID = ShiftAttendanceRecord.ID 
                                   left join HumanResourcesShiftPattern ShiftPattern on ShiftPattern.ID = ShiftAttendanceRecord.ShiftId 
                                   left join HumanResourcesLate Late on Late.ShiftAttendanceRecordID = ShiftAttendanceRecord.ID
                                   left join HumanResourcesEarlyLeaving EarlyLeave on EarlyLeave.ShiftAttendanceRecordID = ShiftAttendanceRecord.ID
                                   where ShiftAttendanceRecord.EmployeeRowId = @EmployeeRowId and ShiftAttendanceRecord.ShiftDate = @DateTargeted 
                                   and ShiftAttendanceRecord.TimeOut is not null and ShiftAttendanceRecord.TimeIn is not null
                                ";
                                 EmployeeShiftRecord results = sqlConnections.QueryFirstOrDefault<EmployeeShiftRecord>(DataInquiry, new
                                {
                                    EmployeeRowId = EmployeeRowId,
                                     DateTargeted = datePassedIntoSql
                                 });
                                if (results == null)
                                    continue;
                                DateTime timeIn = DateTime.ParseExact(results.TimeIn, "MM/dd/yyyy HH:mm:ss", null);
                                string InTimePart = timeIn.ToString("HH:mm:ss");
                                DateTime timeOut = DateTime.ParseExact(results.TimeOut, "MM/dd/yyyy HH:mm:ss", null);
                                string OutTimePart = timeOut.ToString("HH:mm:ss");
                                double workingTime = Math.Round((timeOut - timeIn).TotalHours,2);
                                if (workingTime < 0)
                                    workingTime = 0;
                                TotalWorkHours += workingTime;
                                double normalWorkingTime = Math.Round((results.ShiftEndTime - results.ShiftStartTime).TotalHours,2);
                                if (normalWorkingTime < 0)
                                    normalWorkingTime = 0;
                                TotalNormalHours += normalWorkingTime;
                                double LateHours = Math.Round(results.LateMins/ 60.0, 2);
                                if (LateHours < 0)
                                    LateHours = 0;
                                TotalLateHours += LateHours;

                                double UnderworkedTimeHours = Math.Round(results.EarlyMins/ 60.0, 2);
                                if (UnderworkedTimeHours < 0)
                                    UnderworkedTimeHours = 0;
                                TotalUnderWorkedTimeHours += UnderworkedTimeHours;

                                double OtHours = Math.Round(results.OtMinute / 60.0, 2);
                                double otOne = 0;
                                double otOnePointFive = 0;
                                double otTwo = 0;
                                if (results.PublicHolidayOt == 1)
                                {
                                    if (otSettings.PublicHolidayTwo == 1)
                                        otTwo += OtHours;
                                    else if (otSettings.PublicHolidayOnePointFive == 1)
                                        otOnePointFive += OtHours;
                                    else
                                        otOne += OtHours;
                                }
                                else if (results.WeekdayOt == 1)
                                {
                                    if (otSettings.WeekdayTwo == 1)
                                        otTwo += OtHours;
                                    else if (otSettings.WeekdayOnePointFive == 1)
                                        otOnePointFive += OtHours;
                                    else
                                        otOne += OtHours;
                                }
                                else if (results.WeekendOt == 1)
                                {
                                    if (otSettings.WeekendTwo == 1)
                                        otTwo += OtHours;
                                    else if (otSettings.WeekendOnePointFive == 1)
                                        otOnePointFive += OtHours;
                                    else
                                        otOne += OtHours;
                                 }
                                otOne = Math.Round(otOne / 60.0, 2);
                                otOnePointFive = Math.Round(otOnePointFive / 60.0, 2);
                                otTwo = Math.Round(otTwo / 60.0, 2);
                                TotalOtOnePointZeroHours += otOne;
                                TotalOtOnePointFiveHours += otOnePointFive;
                                TotalOtTwoPointZeroHours += otTwo;

                                table.Cell().Element(CellStyle).Text("").FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text(results.ShiftName).FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text("").FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text(dateTargeted).FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text(shortDayName).FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text("").FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text("").FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text("").FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text("").FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text(InTimePart).FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text(OutTimePart).FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text(InTimePart).FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text(OutTimePart).FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text(workingTime).FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text(normalWorkingTime).FontSize(3).Bold();

                                table.Cell().Element(CellStyle).Text(LateHours).FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text(UnderworkedTimeHours).FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text(otOne).FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text(otOnePointFive).FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text(otTwo).FontSize(3).Bold();
                                table.Cell().Element(CellStyle).Text("").FontSize(3).Bold();

                            }

                            table.Footer(row =>
                            {
                                for(int i =0;i<12;i++)
                                    row.Cell().Element(FooterStyle).Text("").FontSize(3).Bold();

                                row.Cell().Element(FooterStyle).BorderBottom((float)0.5).Text("Total").FontSize(3).Bold(); // First cell (bold)

                                row.Cell().Element(FooterStyle).BorderBottom((float)0.5).Text(TotalWorkHours.ToString("F2")).Bold().FontSize(3).Bold(); // Second cell (bold)

                                row.Cell().Element(FooterStyle).BorderBottom((float)0.5).Text(TotalNormalHours.ToString("F2")).FontSize(3).Bold(); // Third cell (bold)

                                // Remaining cells with normal text
                                row.Cell().Element(FooterStyle).BorderBottom((float)0.5).Text(TotalLateHours.ToString("F2")).FontSize(3).Bold();
                                row.Cell().Element(FooterStyle).BorderBottom((float)0.5).Text(TotalUnderWorkedTimeHours.ToString("F2")).FontSize(3).Bold();
                                row.Cell().Element(FooterStyle).BorderBottom((float)0.5).Text(TotalOtOnePointZeroHours.ToString("F2")).FontSize(3).Bold();
                                row.Cell().Element(FooterStyle).BorderBottom((float)0.5).Text(TotalOtOnePointFiveHours.ToString("F2")).FontSize(3).Bold();
                                row.Cell().Element(FooterStyle).BorderBottom((float)0.5).Text(TotalOtTwoPointZeroHours.ToString("F2")).FontSize(3).Bold();
                                row.Cell().Element(FooterStyle).BorderBottom((float)0.5).Text(TotalShift.ToString("F2")).FontSize(3).Bold();
                                for(int i =0;i<columnSizes.Count;i++)
                                row.Cell().BorderBottom((float)0.5).BorderColor(Colors.Black).PaddingTop(1);
                            });

                        });

                    });

                });

                });
            
        }).GeneratePdf();

        // Save the PDF

        // Define Cell Styling Function
        static IContainer CellStyle(IContainer container)
             => container.Background(Colors.White);

        static IContainer HeaderStyle(IContainer container)
            => container.BorderTop((float)0.5).BorderColor(Colors.Black).Background("#b8cde4");
        static IContainer FooterStyle(IContainer container)
            => container.BorderTop((float)0.5).BorderBottom((float)0.5).BorderColor(Colors.Black);

        string path = "buffer";
        return File(pdfbytes, "application/pdf", path);

    }


}