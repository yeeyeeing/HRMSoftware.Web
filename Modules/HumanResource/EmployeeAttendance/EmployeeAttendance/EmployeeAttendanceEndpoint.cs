using Bellatrix.Api.Extensions;
using HRMSoftware.Administration;
using HRMSoftware.Administration.Columns;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
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
using System.Text.Json;
using MyRow = HRMSoftware.EmployeeAttendance.EmployeeAttendanceRow;

namespace HRMSoftware.EmployeeAttendance.Endpoints;

[Route("Services/EmployeeAttendance/EmployeeAttendance/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class EmployeeAttendanceEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IEmployeeAttendanceSaveHandler handler)
    {

        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IEmployeeAttendanceSaveHandler handler)
    {
           return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IEmployeeAttendanceDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IEmployeeAttendanceRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }
    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IEmployeeAttendanceListHandler handler)
    {
        var haha = connection.Query(@"
                select TimeInRowId,TimeOutRowId from dbo.HumanResourcesShiftAttendanceRecord");
        /*
        Console.WriteLine(haha.ToEntityList()[0].ToJson());
        Console.WriteLine(haha.ToEntityList()[0].ToJson());
        Console.WriteLine(haha.ToEntityList()[0].ToJson());
        Console.WriteLine(JSON.Parse(haha[0].ToJson()));
        Console.WriteLine(JSON.Parse(haha[0].ToJson()));
        Console.WriteLine(JSON.Parse(haha[0].ToJson()));
        Console.WriteLine(JSON.Parse(haha[0].ToJson()));
        Console.WriteLine(JSON.Parse(haha[0].ToJson()));

        Console.WriteLine(haha.ToEntityList()[0].ToEntityList()[0]);
        Console.WriteLine(haha.ToEntityList()[0].ToEntityList()[0]);
        Console.WriteLine(haha.ToEntityList()[0].ToEntityList()[0]);
        Console.WriteLine(haha.ToEntityList()[0].ToEntityList()[0]);

        
        Console.WriteLine(haha);
        Console.WriteLine(haha);
        Console.WriteLine(haha);

        var obj = JObject.Parse(haha.ToEntityList()[0].ToJson());
        Console.WriteLine(obj);
        Console.WriteLine(obj);
        Console.WriteLine(obj);
        Console.WriteLine(obj);
        Console.WriteLine(obj);

        Console.WriteLine(obj[0]);
        Console.WriteLine(obj[0]);
        Console.WriteLine(obj[0]);
        Console.WriteLine(obj[0]);
        

        Console.WriteLine(haha);
        Console.WriteLine(haha);
        Console.WriteLine(haha);
        Console.WriteLine(haha);
        Console.WriteLine(haha);
        */
        if (Permissions.HasPermission(PermissionKeys.HumanResources))//if user is HR guy
            return handler.List(connection, request);
        
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.RetrieveEmployeeRowIDBasedOnUserID",
            param: new
            {
                @UserID = User.GetIdentifier()
            },
                commandType: System.Data.CommandType.StoredProcedure);

        request.Criteria = new Criteria("EmployeeRowID") == latest.Entities[0].EmployeeRowID.Value;


        
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IEmployeeAttendanceListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.EmployeeAttendanceColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "EmployeeAttendanceList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }

    [HttpGet]
    public ListResponse<MyRow> EmployeeAttendanceRecord(IDbConnection connection, int EmployeeID)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.EmployeeAttendanceRecord",
            param: new
            {
                @EmployeeRowID = EmployeeID
            },
                commandType: System.Data.CommandType.StoredProcedure);

        return latest;

    }

}