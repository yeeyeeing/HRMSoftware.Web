using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using MyRow = HRMSoftware.PublicHoliday.PublicHolidayRow;

namespace HRMSoftware.PublicHoliday.Endpoints;

[Route("Services/PublicHoliday/PublicHoliday/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class PublicHolidayEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IPublicHolidaySaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IPublicHolidaySaveHandler handler)
    {
        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IPublicHolidayDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IPublicHolidayRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }








    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IPublicHolidayListHandler handler)
    {

        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.RetrieveBasedCountry",
        param: new
        {
        },
        commandType: System.Data.CommandType.StoredProcedure);

        var required_country_code = latest.Entities[0].CountryCode;
        request.Criteria = new Criteria("CountryCode") == required_country_code;
        request.Sort = new[] { new SortBy("Date", false) };

        return handler.List(connection, request);
    }














    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IPublicHolidayListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.PublicHolidayColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "PublicHolidayList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }

    [HttpGet]
    public ListResponse<MyRow> ListPublicHoliday(IDbConnection connection)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.ListPublicHoliday",
            param: new
            {
            },
                commandType: System.Data.CommandType.StoredProcedure);

        return latest;

    }






}