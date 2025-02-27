using HRMSoftware.Administration;
using HRMSoftware.Administration.Endpoints;
using Microsoft.AspNetCore.Mvc;
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
using MyRow = HRMSoftware.PayrollSettings.PayrollRow;
using Row1 = HRMSoftware.PayrollSettings.Endpoints.PayrollEndpoint.Ask;

using System.Text.Json;
using Microsoft.Data.SqlClient;

using Newtonsoft.Json.Linq;
//using System.Data.SqlClient;
namespace HRMSoftware.PayrollSettings.Endpoints;

[Route("Services/PayrollSettings/Payroll/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class PayrollEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IPayrollSaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IPayrollSaveHandler handler)
    {
        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IPayrollDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IPayrollRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IPayrollListHandler handler)
    {
        if (Permissions.HasPermission(PermissionKeys.HumanResources))//if user is HR guy
        {
            request.Sort = new[] { new SortBy("PayDate", true) };
            return handler.List(connection, request);
        }
        
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.RetrieveEmployeeRowIDBasedOnUserID",
            param: new
            {
                @UserID =  User.GetIdentifier()
            },
        commandType: System.Data.CommandType.StoredProcedure) ;
        
        request.Criteria = new Criteria("EmployeeRowID") == latest.Entities[0].EmployeeRowId.Value;
        request.Sort = new[] { new SortBy("PayDate", true) };
       
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IPayrollListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.PayrollColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "PayrollList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }

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

    [HttpGet]
    public ListResponse<MyRow> CalculateGovernmentPaymentSpecial(IDbConnection connection, ListRequest request,
         int EisCategory, int EpfCategory, int SocsoCategory, int HrdfCategory,float PcbOffset,
        float EpfAmount, float EisAmount, float PcbAmount, float SocsoAmount, float HrdfAmount,
         float WorkingSpouse, float ChildrenUnderEighteen, float ChildrenInUniversity, float NumberOfDisabledChild, float NumberOfDisabledChildInUni)

    {
        ListResponse<MyRow> x = new ListResponse<MyRow>();
        x.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.CalculateGovernmentPaymentSpecial",
        param: new
        {
            @HrdfCategory = HrdfCategory,

            @EisCategory = EisCategory,
            @EpfCategory = EpfCategory,
            @SocsoCategory = SocsoCategory,
            @EpfAmount = EpfAmount,
            @EisAmount = EisAmount,
            @PcbAmount = PcbAmount,
            @SocsoAmount = SocsoAmount,
            @HrdfAmount = HrdfAmount,
            @PcbOffset = PcbOffset,

            @WorkingSpouse = WorkingSpouse,
            @ChildrenUnderEighteen = ChildrenUnderEighteen,
            @ChildrenInUniversity = ChildrenInUniversity,
            @NumberOfDisabledChild = NumberOfDisabledChild,
            @NumberOfDisabledChildInUni = NumberOfDisabledChildInUni,

        },
        commandType: System.Data.CommandType.StoredProcedure);
        return x;
    }
    [HttpGet]
    public ListResponse<MyRow> CalculateGovernmentPaymentBonus(IDbConnection connection, ListRequest request,
        int EisCategory, int EpfCategory, int SocsoCategory, int HrdfCategory,
       float EpfAmount, float EisAmount, float PcbAmount, float SocsoAmount, float HrdfAmount,
        float WorkingSpouse, float ChildrenUnderEighteen, float ChildrenInUniversity, float NumberOfDisabledChild, float NumberOfDisabledChildInUni,
        float Bonus)
    {
        ListResponse<MyRow> x = new ListResponse<MyRow>();
        x.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.CalculateGovernmentPaymentBonus",
        param: new
        {
            @HrdfCategory = HrdfCategory,

            @EisCategory = EisCategory,
            @EpfCategory = EpfCategory,
            @SocsoCategory = SocsoCategory,
            @EpfAmount = EpfAmount,
            @EisAmount = EisAmount,
            @PcbAmount = PcbAmount,
            @SocsoAmount = SocsoAmount,
            @HrdfAmount = HrdfAmount,
            @Bonus = Bonus,
            @WorkingSpouse = WorkingSpouse,
            @ChildrenUnderEighteen = ChildrenUnderEighteen,
            @ChildrenInUniversity = ChildrenInUniversity,
            @NumberOfDisabledChild = NumberOfDisabledChild,
            @NumberOfDisabledChildInUni = NumberOfDisabledChildInUni,

        },
        commandType: System.Data.CommandType.StoredProcedure);
        return x;
    }

    public class Ask
    {
        public string Run { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }

    }

    [HttpGet]
    public List<int> AskGenerationOfPayslip(IDbConnection connection, ListRequest request)
    {
        List<Row1> x = new List<Row1>();
        List<int> response = new List<int>();

        x = (List<Row1>)connection.Query<Row1>("dbo.AskGenerationOfPayslip",
        param: new
        {

        },
        commandType: System.Data.CommandType.StoredProcedure);
        var json = JsonSerializer.Serialize(x);
        JObject obj = JObject.Parse(x[0].ToJson());
        int Run = int.Parse(obj["Run"].ToString());
        int Month = int.Parse(obj["Month"].ToString());
        int Year = int.Parse(obj["Year"].ToString());
        response.Add(Run);        // Adds a single element
        response.Add(Month);        // Adds a single element
        response.Add(Year);        // Adds a single element

        return response;
    }
    [HttpGet]
    public int LogGeneration(IDbConnection connection, ListRequest request, int Month,
        int Year )
    {

        ConnectionState originalState = connection.State;
        if (originalState != ConnectionState.Open)
            connection.Open();

        try
        {
            IDbCommand command = connection.CreateCommand();
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandText = "dbo.LogGeneration";

            SqlParameter param1 = new SqlParameter("@Month", Month);
            command.Parameters.Add(param1);

            SqlParameter param2 = new SqlParameter("@Year", Year);
            command.Parameters.Add(param2);

            command.ExecuteNonQuery();
        }

        finally
        {
            if (originalState == ConnectionState.Closed)
                connection.Close();
        }
        return 1;
    }

    [HttpGet]
    public int AppendPayslipPathToPayroll(IDbConnection connection, ListRequest request,
        int PayslipID, string PayslipPath)
    {

        ConnectionState originalState = connection.State;
        if (originalState != ConnectionState.Open)
            connection.Open();

        try
        {
            IDbCommand command = connection.CreateCommand();
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandText = "dbo.AppendPayslipPathToPayroll";

            SqlParameter param1 = new SqlParameter("@PayslipID", PayslipID);
            command.Parameters.Add(param1);

            SqlParameter param2 = new SqlParameter("@PayslipPath", PayslipPath);
            command.Parameters.Add(param2);

            command.ExecuteNonQuery();
        }

        finally
        {
            if (originalState == ConnectionState.Closed)
                connection.Close();
        }
        return 1;
    }


    [HttpGet]
    public ListResponse<MyRow> CalculateAllowance(IDbConnection connection, int EmployeeRowID)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.CalculateAllowance",
            param: new
            {
                @EmployeeRowID = EmployeeRowID
            },
                commandType: System.Data.CommandType.StoredProcedure);

        return latest;

    }
    

    [HttpGet]
    public ListResponse<MyRow> CalculateNplAbsentOtSpecial(IDbConnection connection, int EmployeeRowID, string Date
        , float MeanDailyWorkingHour, float MeanWorkingDays)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.CalculateNplAbsentEarlyLeavingLateArrival",
        param: new
        {
            @EmployeeRowID = EmployeeRowID,
            @Date = Date
        },
        commandType: System.Data.CommandType.StoredProcedure);
        return latest;
    }
}