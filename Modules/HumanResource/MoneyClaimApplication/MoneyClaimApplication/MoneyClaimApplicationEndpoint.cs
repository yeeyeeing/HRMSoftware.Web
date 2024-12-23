using HRMSoftware.Administration;
using HRMSoftware.OrganisationChart.Endpoints;
using HRMSoftware.OTApplication.Endpoints;
using Microsoft.AspNetCore.Mvc;
using Serenity;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using MyRow = HRMSoftware.MoneyClaimApplication.MoneyClaimApplicationRow;

namespace HRMSoftware.MoneyClaimApplication.Endpoints;

[Route("Services/MoneyClaimApplication/MoneyClaimApplication/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class MoneyClaimApplicationEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IMoneyClaimApplicationSaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IMoneyClaimApplicationSaveHandler handler)
    {
        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IMoneyClaimApplicationDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IMoneyClaimApplicationRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IMoneyClaimApplicationListHandler handler)
    {
        
        if (Permissions.HasPermission(PermissionKeys.HumanResources))//if user is HR guy
        {
            request.Sort = new[] { new SortBy("ClaimingDate", true) };
            return handler.List(connection, request);
        }
        
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.RetrieveEmployeeRowIDBasedOnUserID",
            param: new
            {
                @UserID = User.GetIdentifier()
            },
                commandType: System.Data.CommandType.StoredProcedure);


        request.Criteria = new Criteria("EmployeeRowID") == latest.Entities[0].EmployeeRowId.Value;

        var ListOfEmployee = new OrganisationChartEndpoint().GetEmployeeUserCanView(connection, latest.Entities[0].EmployeeRowId.Value, PermissionKeys.MoneyClaiming);
        foreach (int number in ListOfEmployee)
            request.Criteria = (request.Criteria || new Criteria("EmployeeRowID") == number);

        request.Sort = new[] { new SortBy("ClaimingDate", true) };
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IMoneyClaimApplicationListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.MoneyClaimApplicationColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "MoneyClaimApplicationList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }


   
}