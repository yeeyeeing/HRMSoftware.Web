using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Data;
using System.Globalization;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeProfileRow;
using MyRow2 = HRMSoftware.Administration.UserPermissionRow;

using System.Collections.Generic;
using Serenity.Web.Providers;
using Serenity;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using HRMSoftware.Administration;
using HRMSoftware.Administration.Endpoints;
using HRMSoftware.Announcement.Endpoints;
namespace HRMSoftware.EmployeeProfile.Endpoints;

[Route("Services/EmployeeProfile/EmployeeProfile/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class EmployeeProfileEndpoint : ServiceEndpoint
{


    [HttpGet]
    public ListResponse<MyRow> CalculateOtRate(IDbConnection connection, int EmployeeRowID, string Date)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.CalculateOtFlatRate",
            param: new
            {
                @EmployeeRowID = EmployeeRowID,
                @DateString = Date

            },
                commandType: System.Data.CommandType.StoredProcedure);

        return latest;
    }

    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IEmployeeProfileSaveHandler handler)
    {
        DateTime today = DateTime.Today; // Get today's date
        DateTime Birthday = (System.DateTime)request.Entity.Birthday; 
        int age = today.Year - Birthday.Year;
        if (today < Birthday.AddYears(age))
            age--; // Subtract 1 if the birthday hasn't occurred yet this year
        request.Entity.Age = age;

        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IEmployeeProfileSaveHandler handler)
    {
     
        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IEmployeeProfileDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IEmployeeProfileRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IEmployeeProfileListHandler handler)
    {
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IEmployeeProfileListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.EmployeeProfileColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "EmployeeProfileList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }
    [HttpGet]
    public ListResponse<MyRow> CreatePublicHolidayRecord(IDbConnection connection, string HolidayName, string Date, string CountryCode)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.CreatePublicHolidayRecord",
            param: new
            {
                @HolidayName = HolidayName,
                @Date = Date,
                @CountryCode = CountryCode
            },
                commandType: System.Data.CommandType.StoredProcedure);
      
        return latest;

    }


    [HttpGet]
    public ListResponse<MyRow> GrantPermission(IDbConnection connection, int EmployeeID, string Permission,bool state)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.GrantPermission",
            param: new
            {
                @EmployeeID = EmployeeID,
                @Permission = Permission,
                @State = state
            },
                commandType: System.Data.CommandType.StoredProcedure);

        return latest;

    }


    [HttpGet]
    public ListResponse<MyRow> EmployeeProfileBasedOnID(IDbConnection connection, int EmployeeID)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.EmployeeProfileBasedOnID",
            param: new
            {
                @EmployeeRowID = EmployeeID
            },
                commandType: System.Data.CommandType.StoredProcedure);

        return latest;

    }
    [HttpGet]
    public ListResponse<MyRow> CalculateWorkingHourAndDay(IDbConnection connection, int EmployeeRowID)
    {
        DateTime today = new AnnouncementWizardEndpoint().GetTodayDateTime(connection);
        DateTime todayDate = today.Date;

        string todayDateString = todayDate.ToString("yyyy-MM-dd");


        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.CalculateWorkingHourAndDay",
            param: new
            {
                @EmployeeRowID = EmployeeRowID,
                @Date = todayDateString
            },
                commandType: System.Data.CommandType.StoredProcedure);

        return latest;

    }
    [HttpGet]
    public ListResponse<MyRow> CalculateWorkingHourAndDayWithDate(IDbConnection connection, int EmployeeRowID,string Date)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.CalculateWorkingHourAndDay",
        param: new
        {
            @EmployeeRowID = EmployeeRowID,
            @Date = Date
        },
        commandType: System.Data.CommandType.StoredProcedure);

        return latest;

    }

    /*
    [HttpGet]
    public ListResponse<MyRow2>RetrieveAllPermission(IDbConnection connection, string EmployeeID)
    {
        ListResponse<MyRow2> latest = new ListResponse<MyRow2>();
        latest.Entities = (List<MyRow2>)connection.Query<MyRow2>("dbo.RetrieveAllPermission",
            param: new
            {
                @EmployeeID = EmployeeID
            },
                commandType: System.Data.CommandType.StoredProcedure);

        return latest;

    }
    */

}