using HRMSoftware.Administration;
using HRMSoftware.EmployeeProfile;
using HRMSoftware.EmployeeProfile.Endpoints;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Threading;
using MyRow = HRMSoftware.PayrollSettings.EisSubjectionRow;

namespace HRMSoftware.PayrollSettings.Endpoints;

[Route("Services/PayrollSettings/EisSubjection/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class EisSubjectionEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IEisSubjectionSaveHandler handler)
    {

       // request.Entity.InsertDate = DateTime.Today;
       // request.Entity.EffectiveSince = DateTime.Today;
       // request.Entity.IsActive = 1;
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IEisSubjectionSaveHandler handler)
    {
        return handler.Update(uow, request);

        /*
        ConnectionState originalState = connection.State;
        if (originalState != ConnectionState.Open)
            connection.Open();

        try
        {
            IDbCommand command = connection.CreateCommand();
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandText = "dbo.PaymentSubjectionNextVersion";


            SqlParameter param5 = new SqlParameter("@BasicSalary", request.Entity.BasicSalary);
            command.Parameters.Add(param5);
            SqlParameter param3 = new SqlParameter("@PaymentsForUnutilisedAnnualOrMedicalLeaves", request.Entity.PaymentsForUnutilisedAnnualOrMedicalLeaves);
            command.Parameters.Add(param3);
            SqlParameter param4 = new SqlParameter("@Bonuses", request.Entity.Bonuses);
            command.Parameters.Add(param4);
            SqlParameter param1 = new SqlParameter("@Allowances", request.Entity.Allowances);
            command.Parameters.Add(param1);
            SqlParameter param2 = new SqlParameter("@Commisions", request.Entity.Commisions);
            command.Parameters.Add(param2);





            SqlParameter param7 = new SqlParameter("@Incentives", request.Entity.Incentives);
            command.Parameters.Add(param7);
            SqlParameter param8 = new SqlParameter("@ArrearsOfWages", request.Entity.ArrearsOfWages);
            command.Parameters.Add(param8);

            SqlParameter param9 = new SqlParameter("@WagesForPaternityLeave", request.Entity.WagesForPaternityLeave);
            command.Parameters.Add(param9);
            SqlParameter param10 = new SqlParameter("@WagesForMaternityLeave", request.Entity.WagesForMaternityLeave);
            command.Parameters.Add(param10);

            SqlParameter param12 = new SqlParameter("@WagesForStudyLeave", request.Entity.WagesForStudyLeave);
            command.Parameters.Add(param12);


            SqlParameter param13 = new SqlParameter("@ServiceCharges", request.Entity.ServiceCharges);
            command.Parameters.Add(param13);

            SqlParameter param14 = new SqlParameter("@OvertimePayments", request.Entity.OvertimePayments);
            command.Parameters.Add(param14);

            SqlParameter param15 = new SqlParameter("@Gratuity", request.Entity.Gratuity);
            command.Parameters.Add(param15);

            SqlParameter param6 = new SqlParameter("@RetirementBenefits", request.Entity.RetirementBenefits);
            command.Parameters.Add(param6);


            SqlParameter param17 = new SqlParameter("@TerminationBenefits", request.Entity.TerminationBenefits);
            command.Parameters.Add(param17);


            SqlParameter param19 = new SqlParameter("@PaymentInLieuOfNoticeOfTerminationOfService", request.Entity.PaymentInLieuOfNoticeOfTerminationOfService);
            command.Parameters.Add(param19);

            SqlParameter param20 = new SqlParameter("@TravelAllowances", request.Entity.TravelAllowances);
            command.Parameters.Add(param20);

            SqlParameter param25 = new SqlParameter("@DirectorFee", request.Entity.DirectorFee);
            command.Parameters.Add(param25);
            SqlParameter param28 = new SqlParameter("@Gifts", request.Entity.Gifts);
            command.Parameters.Add(param28);
            SqlParameter param29 = new SqlParameter("@SubjectionTo", 2);
            command.Parameters.Add(param29);






            command.ExecuteNonQuery();

        }

        finally
        {
            if (originalState == ConnectionState.Closed)
                connection.Close();
        }

        return new SaveResponse();
        */
    }

    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IEisSubjectionDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IEisSubjectionRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IEisSubjectionListHandler handler)
    {
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IEisSubjectionListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.EisSubjectionColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "EisSubjectionList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }
}