using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using MyRow = HRMSoftware.Announcement.AnnouncementGeneratedRow;
using HRMSoftware.Administration;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Options;
using Serenity;
using Serenity.Abstractions;
using Serenity.Extensions;
using System.IO;

namespace HRMSoftware.Announcement.Endpoints;

[Route("Services/Announcement/AnnouncementGenerated/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class AnnouncementGeneratedEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IAnnouncementGeneratedSaveHandler handler)
    {
        if (request.Entity.Delayed == true)
        {
            DateTime AnnouncementDateTime = (System.DateTime)request.Entity.AnnouncementDateTime;
            string[] AnnouncementTimeParts = request.Entity.AnnouncementTime.Split(':');
            if (AnnouncementTimeParts.Length == 2 &&
            int.TryParse(AnnouncementTimeParts[0], out int AnnouncementHour) &&
            int.TryParse(AnnouncementTimeParts[1], out int AnnouncementMinute))
                AnnouncementDateTime = new DateTime(AnnouncementDateTime.Year, AnnouncementDateTime.Month,
                    AnnouncementDateTime.Day, AnnouncementHour, AnnouncementMinute, AnnouncementDateTime.Second);
            request.Entity.AnnouncementDateTime = AnnouncementDateTime;
        }
        else if (request.Entity.Immediate == true)
        {
            var connection = uow.Connection;

            DateTime today = new AnnouncementWizardEndpoint().GetTodayDateTime(connection);
            request.Entity.AnnouncementDateTime = today;
            request.Entity.Viewed = 0;

        }



        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IAnnouncementGeneratedSaveHandler handler)
    {
        if (request.Entity.Delayed == true)
        {
            DateTime AnnouncementDateTime = (System.DateTime)request.Entity.AnnouncementDateTime;
            string[] AnnouncementTimeParts = request.Entity.AnnouncementTime.Split(':');
            if (AnnouncementTimeParts.Length == 2 &&
            int.TryParse(AnnouncementTimeParts[0], out int AnnouncementHour) &&
            int.TryParse(AnnouncementTimeParts[1], out int AnnouncementMinute))
                AnnouncementDateTime = new DateTime(AnnouncementDateTime.Year, AnnouncementDateTime.Month,
                    AnnouncementDateTime.Day, AnnouncementHour, AnnouncementMinute, AnnouncementDateTime.Second);
            request.Entity.AnnouncementDateTime = AnnouncementDateTime;
        }
        else if (request.Entity.Immediate == true)
        {
            var connection = uow.Connection;

            DateTime today = new AnnouncementWizardEndpoint().GetTodayDateTime(connection);
            request.Entity.AnnouncementDateTime = today;
            request.Entity.Viewed = 0;
        }
        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IAnnouncementGeneratedDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IAnnouncementGeneratedRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IAnnouncementGeneratedListHandler handler)
    {
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IAnnouncementGeneratedListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.AnnouncementGeneratedColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "AnnouncementGeneratedList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }
}