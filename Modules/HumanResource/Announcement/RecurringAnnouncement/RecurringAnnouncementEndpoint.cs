using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Data;
using System.Globalization;
using MyRow = HRMSoftware.Announcement.RecurringAnnouncementRow;

namespace HRMSoftware.Announcement.Endpoints;

[Route("Services/Announcement/RecurringAnnouncement/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class RecurringAnnouncementEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IRecurringAnnouncementSaveHandler handler)
    {

        DateTime StartingDateTime = (System.DateTime)request.Entity.StartingDateTime;
        string[] RecurringTimeParts = request.Entity.RecurringTime.Split(':');
        if (RecurringTimeParts.Length == 2 &&
        int.TryParse(RecurringTimeParts[0], out int RecurringHour) &&
        int.TryParse(RecurringTimeParts[1], out int RecurringMinute))
            StartingDateTime = new DateTime(StartingDateTime.Year, StartingDateTime.Month,
                StartingDateTime.Day, RecurringHour, RecurringMinute, StartingDateTime.Second);
        request.Entity.StartingDateTime = StartingDateTime;

        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IRecurringAnnouncementSaveHandler handler)
    {
        DateTime StartingDateTime = (System.DateTime)request.Entity.StartingDateTime;
        string[] RecurringTimeParts = request.Entity.RecurringTime.Split(':');
        if (RecurringTimeParts.Length == 2 &&
        int.TryParse(RecurringTimeParts[0], out int RecurringHour) &&
        int.TryParse(RecurringTimeParts[1], out int RecurringMinute))
            StartingDateTime = new DateTime(StartingDateTime.Year, StartingDateTime.Month,
                StartingDateTime.Day, RecurringHour, RecurringMinute, StartingDateTime.Second);
        request.Entity.StartingDateTime = StartingDateTime;

        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IRecurringAnnouncementDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IRecurringAnnouncementRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IRecurringAnnouncementListHandler handler)
    {
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IRecurringAnnouncementListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.RecurringAnnouncementColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "RecurringAnnouncementList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }
}