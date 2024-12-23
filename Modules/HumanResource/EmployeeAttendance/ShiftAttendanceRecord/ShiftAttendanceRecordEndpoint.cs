using HRMSoftware.Administration;
using HRMSoftware.Administration.Columns;
using HRMSoftware.OrganisationChart.Endpoints;
using Microsoft.AspNetCore.Mvc;
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

namespace HRMSoftware.EmployeeAttendance.Endpoints;

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
        request.Sort = new[] { new SortBy("ShiftStartTime", true) };

        if (Permissions.HasPermission(PermissionKeys.HumanResources))//if user is HR guy
                    return handler.List(connection, request);
        
        
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.RetrieveEmployeeRowIDBasedOnUserID",
            param: new
            {
                @UserID = User.GetIdentifier()
            },
                commandType: System.Data.CommandType.StoredProcedure);

        request.Criteria = new Criteria("EmployeeRowId") == latest.Entities[0].EmployeeRowId.Value;


        var ListOfEmployee = new OrganisationChartEndpoint().GetEmployeeUserCanView(connection, latest.Entities[0].EmployeeRowId.Value, PermissionKeys.LeaveApproval);
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
}