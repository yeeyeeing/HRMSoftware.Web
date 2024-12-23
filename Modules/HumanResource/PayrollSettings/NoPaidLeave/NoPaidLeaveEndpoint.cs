using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using MyRow = HRMSoftware.PayrollSettings.NoPaidLeaveRow;

namespace HRMSoftware.PayrollSettings.Endpoints;

[Route("Services/PayrollSettings/NoPaidLeave/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class NoPaidLeaveEndpoint : ServiceEndpoint
{

    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] INoPaidLeaveSaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] INoPaidLeaveSaveHandler handler)
    {
        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] INoPaidLeaveDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] INoPaidLeaveRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] INoPaidLeaveListHandler handler)
    {
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] INoPaidLeaveListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.NoPaidLeaveColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "NoPaidLeaveList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }

    [HttpGet]
    public double? CalculateNoPaidLeaveRate(IDbConnection connection, int EmployeeRowID)
    {
        ListResponse<MyRow> x = new ListResponse<MyRow>();
        x.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.CalculateNoPaidLeaveRate",
        param: new
        {
            @EmployeeRowID = EmployeeRowID
        },
        commandType: System.Data.CommandType.StoredProcedure);
        return x.Entities[0].Deductions.Value;
    }

}