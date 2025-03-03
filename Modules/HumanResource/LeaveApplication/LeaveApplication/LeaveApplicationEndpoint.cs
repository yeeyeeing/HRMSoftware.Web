using HRMSoftware.Administration;
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
using MyRow = HRMSoftware.LeaveApplication.LeaveApplicationRow;
namespace HRMSoftware.LeaveApplication.Endpoints;

[Route("Services/LeaveApplication/LeaveApplication/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class LeaveApplicationEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] ILeaveApplicationSaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] ILeaveApplicationSaveHandler handler)
    {
        return handler.Update(uow, request);
    }

    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] ILeaveApplicationDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] ILeaveApplicationRetrieveHandler handler)
    {

        return handler.Retrieve(connection, request);
        /*
        if (Permissions.HasPermission("Administration:HumanResources"))
        {
            return handler.Retrieve(connection, request);
        }
        return null;
        */
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] ILeaveApplicationListHandler handler)
    {
        if (Permissions.HasPermission(PermissionKeys.HumanResources))//if user is HR guy
        {

            request.Sort = new[] { new SortBy("StartDate", true) };
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

        var ListOfEmployee = new OrganisationChartEndpoint().GetEmployeeUserCanView(connection, latest.Entities[0].EmployeeRowId.Value, PermissionKeys.LeaveApproval);
        foreach (int number in ListOfEmployee)
            request.Criteria = (request.Criteria || new Criteria("EmployeeRowID") == number);


        request.Sort = new[] { new SortBy("StartDate", true) };
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] ILeaveApplicationListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.LeaveApplicationColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "LeaveApplicationList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }

    [HttpGet]
    public ListResponse<MyRow> RetrieveEmployeeLeave(IDbConnection connection, int EmployeeRowID)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.RetrieveEmployeeLeave",
            param: new
            {
                @EmployeeRowID = EmployeeRowID
            },
                commandType: System.Data.CommandType.StoredProcedure);

        return latest;

    }
    [HttpGet]
    public double? RetrieveLeaveTaken(IDbConnection connection, int EmployeeID,string StartingDate, string EndingDate,int TypeOfLeave)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.RetrieveLeaveTaken",
            param: new
            {
                @EmployeeRowID = EmployeeID,
                @StartingDate = StartingDate,
                @EndingDate = EndingDate,
                @TypeOfLeave = TypeOfLeave
            },
                commandType: System.Data.CommandType.StoredProcedure);

            return latest.Entities[0].BalanceLeave;

    }




    [HttpGet]
    public ListResponse<MyRow> ListTakenLeave(IDbConnection connection, int EmployeeRowID)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.ListTakenLeave",
            param: new
            {
                @EmployeeRowID = EmployeeRowID
            },
                commandType: System.Data.CommandType.StoredProcedure);

        return latest;

    }


    [HttpGet]
    public ListResponse<MyRow> ListTakenLeaveFromID(IDbConnection connection, int EmployeeRowID)
    {
        /*
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.RetrieveEmployeeRowIDBasedOnEmployeeID",
            param: new
            {
                @EmployeeID = Context.User.Identity.Name
            },
        commandType: System.Data.CommandType.StoredProcedure);
        */


        ListResponse<MyRow> latest_2 = new ListResponse<MyRow>();
        latest_2.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.ListTakenLeave",
            param: new
            {
                @EmployeeRowID = EmployeeRowID
            },
                commandType: System.Data.CommandType.StoredProcedure);

        return latest_2;

    }


    [HttpGet]
    public ListResponse<MyRow> CalculateHolidayToTake(IDbConnection connection, string startDate, string endDate)
    {
        
        ListResponse<MyRow> latest_2 = new ListResponse<MyRow>();
        latest_2.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.CalculateHolidayToTake",
            param: new
            {
                @startDate = startDate,
                @endDate = endDate,


            },
                commandType: System.Data.CommandType.StoredProcedure);

        return latest_2;

    }
    [HttpPost, Route("/uploadFile"), ServiceAuthorize("*")]
    public async Task<IActionResult> UploadFile()
    {
        try
        {
            var filename = Request.Headers["Filename"].ToString();
            if (string.IsNullOrEmpty(filename))
            {
                return BadRequest("Filename is required");
            }

            var appDataPath = Path.Combine(Directory.GetCurrentDirectory(), "App_Data/upload/temporary");

            // Ensure App_Data directory exists
            if (!Directory.Exists(appDataPath))
            {
                Directory.CreateDirectory(appDataPath);
            }

            var filePath = Path.Combine(appDataPath, filename);

            // Read the file from the request body
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await Request.Body.CopyToAsync(fileStream);
            }

            return Ok(new { message = "File uploaded successfully", path = filePath });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}