using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Data;
using System.Globalization;
using MyRow = HRMSoftware.Shift.ShiftRow;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Text;
using Org.BouncyCastle.Bcpg.OpenPgp;
using Serenity;
using Serenity.Abstractions;

using System.Collections;
using System.Threading;
namespace HRMSoftware.Shift.Endpoints;

[Route("Services/Shift/Shift/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class ShiftEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IShiftSaveHandler handler)
    {
        string[] Days = { "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" };

        /*
        string StartingtimeString = request.Entity.StartingTimeString;
        string[] StartingtimeParts = StartingtimeString.Split(':');
        int.TryParse(StartingtimeParts[0], out int startHour);
        int.TryParse(StartingtimeParts[1], out int startMinute);
        string EndingtimeString = request.Entity.EndingTimeString;
        string[] EndingTimeParts = EndingtimeString.Split(':');
        int.TryParse(EndingTimeParts[0], out int endHour);
        int.TryParse(EndingTimeParts[1], out int endMinute);
        request.Entity.StartingHour = startHour;
        request.Entity.StartingMinute = startMinute;
        request.Entity.EndingHour = endHour;
        request.Entity.EndingMinute = endMinute;
        int From = (int)request.Entity.FromDay;
        int Until = (int)request.Entity.UntilDay;

        string FromDay = Days[From];
        string UntilDay = Days[Until];


        // Format the start time
        string startTime = request.Entity.StartingTimeString.Trim();

        // Format the end time
        string endTime = request.Entity.EndingTimeString.Trim();

        // Combine start and end times into the desired format
        string formattedRange = $"[{startTime}-{endTime}] {FromDay}-{UntilDay}";
        request.Entity.ShiftName = formattedRange;
        double time = Math.Abs(endHour - startHour) + Math.Abs(endMinute - startMinute) * 1.0 / 60.0;
        request.Entity.WorkingHour = time;
        */
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IShiftSaveHandler handler)
    {

        string[] Days = { "Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat" };

        /*
        string StartingtimeString = request.Entity.StartingTimeString;
        string[] StartingtimeParts = StartingtimeString.Split(':');
        int.TryParse(StartingtimeParts[0], out int startHour);
        int.TryParse(StartingtimeParts[1], out int startMinute);
        string EndingtimeString = request.Entity.EndingTimeString;
        string[] EndingTimeParts = EndingtimeString.Split(':');
        int.TryParse(EndingTimeParts[0], out int endHour);
        int.TryParse(EndingTimeParts[1], out int endMinute);
        request.Entity.StartingHour = startHour;
        request.Entity.StartingMinute = startMinute;
        request.Entity.EndingHour = endHour;
        request.Entity.EndingMinute = endMinute;
        int From = (int)request.Entity.FromDay;
        int Until = (int)request.Entity.UntilDay;

        string FromDay = Days[From];
        string UntilDay = Days[Until];


        string startTime = request.Entity.StartingTimeString.Trim();

        // Format the end time
        string endTime = request.Entity.EndingTimeString.Trim();

        // Combine start and end times into the desired format
        string formattedRange = $"[{startTime}-{endTime}] {FromDay}-{UntilDay}";
        request.Entity.ShiftName = formattedRange;
        double time = Math.Abs(endHour - startHour) + Math.Abs(endMinute - startMinute) * 1.0 / 60.0;
        request.Entity.WorkingHour = time;
        */
        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IShiftDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IShiftRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IShiftListHandler handler)
    {
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IShiftListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.ShiftColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "ShiftList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }


    
    [HttpGet]
    public int CountNumberOfEmployeeInShifts(IDbConnection connection)
    {
        ConnectionState originalState = connection.State;
        if (originalState != ConnectionState.Open)
            connection.Open();

        try
        {

       IDbCommand command = connection.CreateCommand();
        command.CommandType = System.Data.CommandType.StoredProcedure;
        command.CommandText = "dbo.CountNumberOfEmployeeInShifts";
        command.ExecuteNonQuery();

            return 0;
        }

        finally
        {
            if (originalState == ConnectionState.Closed)
                connection.Close();
        }

    }







    [HttpGet]
    public ListResponse<MyRow> ListShift(IDbConnection connection)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.ListShift",
            param: new
            {
            },
                commandType: System.Data.CommandType.StoredProcedure);

        return latest;

    }




}