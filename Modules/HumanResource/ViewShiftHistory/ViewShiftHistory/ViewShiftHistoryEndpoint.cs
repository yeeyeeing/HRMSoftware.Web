using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Data;
using System.Globalization;
using MyRow = HRMSoftware.ViewShiftHistory.ViewShiftHistoryRow;
using System.Collections.Generic;

namespace HRMSoftware.ViewShiftHistory.Endpoints;

[Route("Services/ViewShiftHistory/ViewShiftHistory/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class ViewShiftHistoryEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IViewShiftHistorySaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IViewShiftHistorySaveHandler handler)
    {
        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IViewShiftHistoryDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IViewShiftHistoryRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IViewShiftHistoryListHandler handler)
    {
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IViewShiftHistoryListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.ViewShiftHistoryColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "ViewShiftHistoryList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }

    [HttpGet]
    public ListResponse<MyRow>RetriveShiftHistory(IDbConnection connection, int EmployeeID)
    {
        ListResponse<MyRow> x = new ListResponse<MyRow>();
        x.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.RetriveShiftHistory",
        param: new
        {
            @EmployeeRowID = EmployeeID
        },
        commandType: System.Data.CommandType.StoredProcedure);
        return x;
    }
}