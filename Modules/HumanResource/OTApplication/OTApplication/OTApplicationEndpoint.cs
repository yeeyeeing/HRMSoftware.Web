using HRMSoftware.Administration;
using HRMSoftware.OrganisationChart.Endpoints;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Serenity;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using MyRow = HRMSoftware.OTApplication.OTApplicationRow;

namespace HRMSoftware.OTApplication.Endpoints;

public class Rights
{
    public string EmployeeRights { get; set; }
    public string children { get; set; }
}

[Route("Services/OTApplication/OTApplication/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class OTApplicationEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IOTApplicationSaveHandler handler)
    {
        DateTime originalDateTime = request.Entity.OtDate.Value;
        // Time string in format "HH:mm"
        string timeString = request.Entity.StartingAt;
        // Parse the time string into hours and minutes
        string[] timeParts = timeString.Split(':');
        int hours = int.Parse(timeParts[0]);
        int minutes = int.Parse(timeParts[1]);
        // Create a new DateTime object with the same date but the specified time
        DateTime newDateTime = new DateTime(
            originalDateTime.Year,
            originalDateTime.Month,
            originalDateTime.Day,
            hours,
            minutes,
            0); // Seconds set to 0
        request.Entity.StartingTime = newDateTime;




         timeString = request.Entity.EndingAt;
        // Parse the time string into hours and minutes
        string[] timeParts2 = timeString.Split(':');
         hours = int.Parse(timeParts2[0]);
         minutes = int.Parse(timeParts2[1]);
        // Create a new DateTime object with the same date but the specified time
        DateTime newDateTime2 = new DateTime(
            originalDateTime.Year,
            originalDateTime.Month,
            originalDateTime.Day,
            hours,
            minutes,
            0); // Seconds set to 0
        request.Entity.EndingTime = newDateTime2;

        if(request.Entity.StartingTime> request.Entity.EndingTime)
            request.Entity.EndingTime.Value.AddDays(1);

        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IOTApplicationSaveHandler handler)
    {
        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IOTApplicationDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IOTApplicationRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IOTApplicationListHandler handler)
    {
      
        
        if (Permissions.HasPermission(PermissionKeys.HumanResources))//if user is HR guy
        {
            
            request.Sort = new[] { new SortBy("OTDate", true) };
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
      

        var ListOfEmployee = new OrganisationChartEndpoint().GetEmployeeUserCanView(connection, latest.Entities[0].EmployeeRowId.Value, PermissionKeys.OtApproval);
        foreach (int number in ListOfEmployee)
            request.Criteria = (request.Criteria || new Criteria("EmployeeRowID") == number);
       

        request.Sort = new[] { new SortBy("OTDate", true) };
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IOTApplicationListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.OTApplicationColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "OTApplicationList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }


    [HttpGet]
    public ListResponse<MyRow> CalculateOtFlatRate(IDbConnection connection, int EmployeeRowID)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.CalculateOtFlatRate",
            param: new
            {
                @EmployeeRowID = EmployeeRowID
            },
                commandType: System.Data.CommandType.StoredProcedure);

        return latest;
    }
    [HttpGet]
    public ListResponse<MyRow> CalculateOtPay(IDbConnection connection, int EmployeeRowID)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.CalculateOtPay",
        param: new
        {
            @EmployeeRowID = EmployeeRowID
        },
        commandType: System.Data.CommandType.StoredProcedure);

        return latest;

    }


    [HttpGet]
    public ListResponse<MyRow> EmployeeOTBasedOnID(IDbConnection connection, int EmployeeRowID)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.EmployeeOTBasedOnIDs",
        param: new
        {
            @EmployeeRowID = EmployeeRowID
        },
        commandType: System.Data.CommandType.StoredProcedure);

        return latest;

    }

}