using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Data;
using System.Globalization;
using MyRow = HRMSoftware.Announcement.AnnouncementWizardRow;
using System.Collections.Generic;

namespace HRMSoftware.Announcement.Endpoints;

[Route("Services/Announcement/AnnouncementWizard/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class AnnouncementWizardEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IAnnouncementWizardSaveHandler handler)
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
            for (int i = 0; i < request.Entity.AnnouncementList.Count; i++)
            {
                request.Entity.AnnouncementList[i].AnnouncementDateTime = today;
            }
            request.Entity.AnnouncementDateTime = today;

        }
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IAnnouncementWizardSaveHandler handler)
    {
        
        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IAnnouncementWizardDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IAnnouncementWizardRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IAnnouncementWizardListHandler handler)
    {
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IAnnouncementWizardListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.AnnouncementWizardColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "AnnouncementWizardList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }

    /*
    [HttpGet]
    public ListResponse<MyRow> CalculateGovernmentPayments(IDbConnection connection, ListRequest request, int EmployeeRowID,
        float EpfAmount, float EisAmount, float PcbAmount, float SocsoAmount, float HrdfAmount)
    {
        ListResponse<MyRow> x = new ListResponse<MyRow>();
        x.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.CalculateGovernmentPayments",
        param: new
        {
            @EmployeeRowID = EmployeeRowID,
            @EpfAmount = EpfAmount,
            @EisAmount = EisAmount,
            @PcbAmount = PcbAmount,
            @SocsoAmount = SocsoAmount,
            @HrdfAmount = HrdfAmount

        },
        commandType: System.Data.CommandType.StoredProcedure);
        return x;
    }
    */

    [HttpGet]
    public DateTime GetTodayDateTime(IDbConnection connection)
    {
               ListResponse<MyRow> x = new ListResponse<MyRow>();
        x.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.GetTodayDateTime",
        param: new
        {

        },
        commandType: System.Data.CommandType.StoredProcedure);
        return x.Entities[0].Today.Value;
    }

}