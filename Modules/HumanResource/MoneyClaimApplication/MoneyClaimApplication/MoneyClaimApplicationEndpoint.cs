using Bellatrix;
using HRMSoftware.Administration;
using HRMSoftware.EmployeeAttendance.Endpoints;
using HRMSoftware.EmployeeProfile.Endpoints;
using HRMSoftware.OrganisationChart.Endpoints;
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
using System.IO;
using System.Threading.Tasks;
using System.Linq;
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
           // request.Sort = new[] { new SortBy("ClaimingDate", true) };
            return handler.List(connection, request);
        }
        

        var EmployeeRowId = new ShiftAttendanceRecordEndpoint().GetEmployeeRowIdFromUserRowId(connection, User.GetIdentifier().ToInt());

        request.Criteria = new Criteria(MoneyClaimApplicationRow.Fields.EmployeeRowId.Name) == EmployeeRowId;
        var ListOfEmployee = new OrganisationChartEndpoint().GetEmployeeUserCanView(connection, EmployeeRowId, PermissionKeys.MoneyClaiming);
        //foreach (int number in ListOfEmployee)
      //  {
      //      request.Criteria = (request.Criteria || new Criteria(MoneyClaimApplicationRow.Fields.EmployeeRowId.Name) == number);
      //  }

        
        if (ListOfEmployee.Count > 0)
        {
            request.Criteria = ListOfEmployee
                .Select(number => new Criteria(MoneyClaimApplicationRow.Fields.EmployeeRowId.Name) == number)
                .Aggregate((current, next) => current || next);
        }
        
        // request.Sort = new[] { new SortBy("ClaimingDate", true) };
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