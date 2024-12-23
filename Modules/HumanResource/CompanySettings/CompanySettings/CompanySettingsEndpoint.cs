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
using HRMSoftware.OrganisationChart.Endpoints;
using Serenity;
using System.Data;
using System.Globalization;
using MyRow = HRMSoftware.CompanySettings.CompanySettingsRow;
using MyRow2 = HRMSoftware.LeaveApplication.LeaveApplicationRow;

namespace HRMSoftware.CompanySettings.Endpoints;

[Route("Services/CompanySettings/CompanySettings/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class CompanySettingsEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] ICompanySettingsSaveHandler handler)
    {


        request.Entity.InsertDate = DateTime.Today;
        request.Entity.EffectiveSince = DateTime.Today;
        return handler.Create(uow, request);
    }





    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(SaveRequest<MyRow> request, IDbConnection connection)
    {
        ListResponse<MyRow2> latest = new ListResponse<MyRow2>();
        latest.Entities = (List<MyRow2>)connection.Query<MyRow2>("dbo.RetrieveEmployeeRowIDBasedOnUserID",
            param: new
            {
                @UserID = User.GetIdentifier()
            },
                commandType: System.Data.CommandType.StoredProcedure);
        var userId = latest.Entities[0].EmployeeRowId.Value;





        ConnectionState originalState = connection.State;
        if (originalState != ConnectionState.Open)
            connection.Open();

        try
        {
            IDbCommand command = connection.CreateCommand();
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandText = "dbo.CompanySettingNextVersion";


            SqlParameter param5 = new SqlParameter("@FixedTime", request.Entity.FixedTime);
            command.Parameters.Add(param5);
            SqlParameter param3 = new SqlParameter("@FixedHour", request.Entity.FixedHour);
            command.Parameters.Add(param3);
            SqlParameter param4 = new SqlParameter("@FixedHourFlexiTime", request.Entity.FixedHourFlexiTime);
            command.Parameters.Add(param4);
            SqlParameter param1 = new SqlParameter("@EntitleAnnualBasedOnJobGrade", request.Entity.EntitleAnnualBasedOnJobGrade);
            command.Parameters.Add(param1);
            SqlParameter param2 = new SqlParameter("@EntitleAnnualBasedOnYearOfService", request.Entity.EntitleAnnualBasedOnYearOfService);
            command.Parameters.Add(param2);





            SqlParameter param7 = new SqlParameter("@RefreshLeaveOnSpecificDate", request.Entity.RefreshLeaveOnSpecificDate);
            command.Parameters.Add(param7);
            SqlParameter param8 = new SqlParameter("@RefreshLeaveOnYearOfService", request.Entity.RefreshLeaveOnYearOfService);
            command.Parameters.Add(param8);

            SqlParameter param9 = new SqlParameter("@OneOffEntitlementAnnualLeave", request.Entity.OneOffEntitlementAnnualLeave);
            command.Parameters.Add(param9);
            SqlParameter param10 = new SqlParameter("@MonthlyEntitlementAnnualLeave", request.Entity.MonthlyEntitlementAnnualLeave);
            command.Parameters.Add(param10);

            SqlParameter param12 = new SqlParameter("@OTMinimumMinute", request.Entity.OTMinimumMinute);
            command.Parameters.Add(param12);
      

            SqlParameter param13 = new SqlParameter("@MaximumBasicSalaryToEntitleForOTPay", request.Entity.MaximumBasicSalaryToEntitleForOTPay);
            command.Parameters.Add(param13);

            SqlParameter param14 = new SqlParameter("@MaximumPositionToEntitleForOTPay", request.Entity.MaximumJobGradeToEntitleForOTPay);
            command.Parameters.Add(param14);

            SqlParameter param15 = new SqlParameter("@MaximumBasicSalary", request.Entity.MaximumBasicSalary);
            command.Parameters.Add(param15);

            SqlParameter param6 = new SqlParameter("@InsertUserId", userId);
            command.Parameters.Add(param6);


            SqlParameter param17 = new SqlParameter("@CompanySettingId", request.Entity.Id);
            command.Parameters.Add(param17);

   
            SqlParameter param19 = new SqlParameter("@CompanyName", request.Entity.CompanyName);
            command.Parameters.Add(param19);

            SqlParameter param20 = new SqlParameter("@ClockInGracePeriod", request.Entity.ClockInGracePeriod);
            command.Parameters.Add(param20);

            SqlParameter param25 = new SqlParameter("@ClockOutGracePeriod", request.Entity.ClockOutGracePeriod);
            command.Parameters.Add(param25);
            SqlParameter param28 = new SqlParameter("@CompanyAddress", request.Entity.CompanyAddress);
            command.Parameters.Add(param28);

            SqlParameter param29 = new SqlParameter("@BasedCountry", request.Entity.BasedCountry);
            command.Parameters.Add(param29);


            DateTime today = DateTime.Today;
            DateTime paydate = new DateTime(today.Year, today.Month, request.Entity.PayDay.Value);



            SqlParameter param30 = new SqlParameter("@PayDate", paydate);
            command.Parameters.Add(param30);
            SqlParameter param11 = new SqlParameter("@LeaveRefreshMonth", request.Entity.LeaveRefreshMonth);
            command.Parameters.Add(param11);


            DateTime result = new DateTime(today.Year, request.Entity.LeaveRefreshMonth.Value, request.Entity.LeaveRefreshDay.Value);


            SqlParameter param16 = new SqlParameter("@LeaveRefreshDay", request.Entity.LeaveRefreshDay);
            command.Parameters.Add(param16);

            SqlParameter param24 = new SqlParameter("@LeaveRefreshDate", result);
            command.Parameters.Add(param24);



            string JobGradeIdBuffer = null;
            string MaximumHourBuffer = null;
            if (request.Entity.OTJobGradeTime.Count != 0)
            {
                for (int index = 0; index < request.Entity.OTJobGradeTime.Count; index++)
                {
                    JobGradeIdBuffer = JobGradeIdBuffer + request.Entity.OTJobGradeTime[index].JobGradeId + ',';
                    MaximumHourBuffer = MaximumHourBuffer + request.Entity.OTJobGradeTime[index].OTMaximumMinutes + ',';
                }
            }
            else
            {
                JobGradeIdBuffer = ",";
                MaximumHourBuffer = ",";
            }
            SqlParameter param21 = new SqlParameter("@JobGradeIdString", JobGradeIdBuffer);
            command.Parameters.Add(param21);

            SqlParameter param22 = new SqlParameter("@MaximumOtMinute", MaximumHourBuffer);
            command.Parameters.Add(param22);
            SqlParameter param23 = new SqlParameter("@PayDay", request.Entity.PayDay);
            command.Parameters.Add(param23);


            SqlParameter param18 = new SqlParameter("@EntitleAnualLeaveBeforeProbationPeriodEnd", request.Entity.EntitleAnualLeaveBeforeProbationPeriodEnd);
            command.Parameters.Add(param18);


            var MaximumOtMinute = request.Entity.MaximumOtMinute;
            if (!request.Entity.MaximumOtMinute.HasValue)
                MaximumOtMinute = -1;

            SqlParameter param32 = new SqlParameter("@MaximumOtMinuteValue", MaximumOtMinute);
            command.Parameters.Add(param32);



            var LateArrivalEqualHalfDayLeave = request.Entity.LateArrivalEqualHalfDayLeave;
            if (!request.Entity.LateArrivalEqualHalfDayLeave.HasValue)
                LateArrivalEqualHalfDayLeave = -1;

            SqlParameter param33 = new SqlParameter("@LateArrivalEqualHalfDayLeave", LateArrivalEqualHalfDayLeave);
            command.Parameters.Add(param33);





            var LateArrivalEqualFullDayLeave = request.Entity.LateArrivalEqualFullDayLeave;
            if (!request.Entity.LateArrivalEqualFullDayLeave.HasValue)
                LateArrivalEqualFullDayLeave = -1;
            SqlParameter param34 = new SqlParameter("@LateArrivalEqualFullDayLeave", LateArrivalEqualFullDayLeave);
            command.Parameters.Add(param34);






            var DeductSalaryIfLate = request.Entity.DeductSalaryIfLate.Value;
            
            SqlParameter param35 = new SqlParameter("@DeductSalaryIfLate", DeductSalaryIfLate);
            command.Parameters.Add(param35);



            var DeductSalaryIfEarlyLeaving = request.Entity.DeductSalaryIfEarlyLeaving;
            SqlParameter param36 = new SqlParameter("@DeductSalaryIfEarlyLeaving", DeductSalaryIfEarlyLeaving);
            command.Parameters.Add(param36);


            var SundayWeekday = request.Entity.SundayWeekday;
            SqlParameter param37 = new SqlParameter("@SundayWeekday", SundayWeekday);
            command.Parameters.Add(param37);


            var MondayWeekday = request.Entity.MondayWeekday;
            SqlParameter param38 = new SqlParameter("@MondayWeekday", MondayWeekday);
            command.Parameters.Add(param38);


            var TuesdayWeekday = request.Entity.TuesdayWeekday;
            SqlParameter param39 = new SqlParameter("@TuesdayWeekday", TuesdayWeekday);
            command.Parameters.Add(param39);




            var WednesdayWeekday = request.Entity.WednesdayWeekday;
            SqlParameter param40 = new SqlParameter("@WednesdayWeekday", WednesdayWeekday);
            command.Parameters.Add(param40);




            var ThursdayWeekday = request.Entity.ThursdayWeekday;
            SqlParameter param41 = new SqlParameter("@ThursdayWeekday", ThursdayWeekday);
            command.Parameters.Add(param41);



            var FridayWeekday = request.Entity.FridayWeekday;
            SqlParameter param42 = new SqlParameter("@FridayWeekday", FridayWeekday);
            command.Parameters.Add(param42);




            var SaturdayWeekday = request.Entity.SaturdayWeekday;
            SqlParameter param43 = new SqlParameter("@SaturdayWeekday", SaturdayWeekday);
            command.Parameters.Add(param43);



            var CompanyLogo = request.Entity.CompanyLogo;
            SqlParameter param44 = new SqlParameter("@CompanyLogo", CompanyLogo);
            command.Parameters.Add(param44);


            var CompanyRegistrationNumber = request.Entity.CompanyRegistrationNumber;
            SqlParameter param45 = new SqlParameter("@CompanyRegistrationNumber", CompanyRegistrationNumber);
            command.Parameters.Add(param45);

            var CompanyPhone = request.Entity.CompanyPhone;
            SqlParameter param46 = new SqlParameter("@CompanyPhone", CompanyPhone);
            command.Parameters.Add(param46);
            var RetireAge = request.Entity.RetireAge;
            SqlParameter param47 = new SqlParameter("@RetireAge", RetireAge);
            command.Parameters.Add(param47);

            
            SqlParameter param48 = new SqlParameter("@EpfAccountNumber",request.Entity.EPFAccountNumber);
            command.Parameters.Add(param48);
            SqlParameter param49 = new SqlParameter("@BankAccountNumber", request.Entity.BankAccountNumber);
            command.Parameters.Add(param49);
            SqlParameter param50 = new SqlParameter("@SocsoAccountNumber", request.Entity.SocsoAccountNumber);
            command.Parameters.Add(param50);
            SqlParameter param51 = new SqlParameter("@IncomeTaxAccountNumber", request.Entity.IncomeTaxAccountNumber);
            command.Parameters.Add(param51);
            SqlParameter param52 = new SqlParameter("@ZakatAccountNumber", request.Entity.ZakatAccountNumber);
            command.Parameters.Add(param52);
            SqlParameter param53 = new SqlParameter("@BankId", request.Entity.BankId);
            command.Parameters.Add(param53);




            
            SqlParameter param54 = new SqlParameter("@OTApplicationEmployeeApproval", request.Entity.OTApplicationEmployeeApproval);
            command.Parameters.Add(param54);
            SqlParameter param55 = new SqlParameter("@OTApplicationHrApproval", request.Entity.OTApplicationHrApproval);
            command.Parameters.Add(param55);
            SqlParameter param62 = new SqlParameter("@OTEitherOne", request.Entity.OTEitherOne);
            command.Parameters.Add(param62);



            SqlParameter param56 = new SqlParameter("@LeaveApplicationEmployeeApproval", request.Entity.LeaveApplicationEmployeeApproval);
            command.Parameters.Add(param56);
            SqlParameter param57 = new SqlParameter("@LeaveApplicationHrApproval", request.Entity.LeaveApplicationHrApproval);
            command.Parameters.Add(param57);
            SqlParameter param63 = new SqlParameter("@LeaveApplicationEitherOne", request.Entity.LeaveApplicationEitherOne);
            command.Parameters.Add(param63);



            SqlParameter param58 = new SqlParameter("@MoneyClaimingHrApproval", request.Entity.MoneyClaimingHrApproval);
            command.Parameters.Add(param58);
            SqlParameter param59 = new SqlParameter("@MoneyClaimingEmployeeApproval", request.Entity.MoneyClaimingEmployeeApproval);
            command.Parameters.Add(param59);
            SqlParameter param64 = new SqlParameter("@MoneyClaimingEitherOne", request.Entity.MoneyClaimingEitherOne);
            command.Parameters.Add(param64);




            SqlParameter param65 = new SqlParameter("@FixedOtRateCalculation", request.Entity.FixedOtRateCalculation);
            command.Parameters.Add(param65);
            SqlParameter param66 = new SqlParameter("@VariableOtRateCalculation", request.Entity.VariableOtRateCalculation);
            command.Parameters.Add(param66);

            SqlParameter param67 = new SqlParameter("@WeekdayTwo", request.Entity.WeekdayTwo);
            command.Parameters.Add(param67);

            SqlParameter param68 = new SqlParameter("@WeekdayOnePointFive", request.Entity.WeekdayOnePointFive);
            command.Parameters.Add(param68);

            SqlParameter param69 = new SqlParameter("@PublicHolidayTwo", request.Entity.PublicHolidayTwo);
            command.Parameters.Add(param69);
            SqlParameter param70 = new SqlParameter("@PublicHolidayOnePointFive", request.Entity.PublicHolidayOnePointFive);
            command.Parameters.Add(param70);

            SqlParameter param71 = new SqlParameter("@FixedOtRateDenominator", request.Entity.FixedOtRateDenominator);
            command.Parameters.Add(param71);


            SqlParameter param72 = new SqlParameter("@WeekendTwo", request.Entity.WeekendTwo);
            command.Parameters.Add(param72);

            SqlParameter param73 = new SqlParameter("@WeekendOnePointFive", request.Entity.WeekendOnePointFive);
            command.Parameters.Add(param73);



            SqlParameter param74 = new SqlParameter("@EarlyLeavingBasedOnWorkingHour", request.Entity.EarlyLeavingBasedOnWorkingHour);
            command.Parameters.Add(param74);
            SqlParameter param75 = new SqlParameter("@EarlyLeavingBasedOnFixedDenominator", request.Entity.EarlyLeavingBasedOnFixedDenominator);
            command.Parameters.Add(param75);
            SqlParameter param76 = new SqlParameter("@LateArrivalBasedOnWorkingHour", request.Entity.LateArrivalBasedOnWorkingHour);
            command.Parameters.Add(param76);
            SqlParameter param77 = new SqlParameter("@LateArrivalBasedOnFixedDenominator", request.Entity.LateArrivalBasedOnFixedDenominator);
            command.Parameters.Add(param77);
            SqlParameter param78 = new SqlParameter("@DailyNplBasedOnWorkingHour", request.Entity.DailyNplBasedOnWorkingHour);
            command.Parameters.Add(param78);
            SqlParameter param79 = new SqlParameter("@DailyNplBasedOnFixedDenominator", request.Entity.DailyNplBasedOnFixedDenominator);
            command.Parameters.Add(param79);
            SqlParameter param80 = new SqlParameter("@AbsentBasedOnWorkingHour", request.Entity.AbsentBasedOnWorkingHour);
            command.Parameters.Add(param80);
            SqlParameter param81 = new SqlParameter("@AbsentBasedOnFixedDenominator", request.Entity.AbsentBasedOnFixedDenominator);
            command.Parameters.Add(param81);

            if (!request.Entity.FixedEarlyLeavingDenominator.HasValue)
                request.Entity.FixedEarlyLeavingDenominator = 0;
            if (!request.Entity.FixedLateArrivalDenominator.HasValue)
                request.Entity.FixedLateArrivalDenominator = 0;
            if (!request.Entity.FixedNPLDenominator.HasValue)
                request.Entity.FixedNPLDenominator = 0;
            if (!request.Entity.FixedAbsentDenominator.HasValue)
                request.Entity.FixedAbsentDenominator = 0;

            SqlParameter param82 = new SqlParameter("@FixedEarlyLeavingDenominator", request.Entity.FixedEarlyLeavingDenominator);
            command.Parameters.Add(param82);
            SqlParameter param83 = new SqlParameter("@FixedLateArrivalDenominator", request.Entity.FixedLateArrivalDenominator);
            command.Parameters.Add(param83);
            SqlParameter param84 = new SqlParameter("@FixedNPLDenominator", request.Entity.FixedNPLDenominator);
            command.Parameters.Add(param84);
            SqlParameter param85 = new SqlParameter("@FixedAbsentDenominator", request.Entity.FixedAbsentDenominator);
            command.Parameters.Add(param85);
            SqlParameter param86 = new SqlParameter("@AbsentMonthDays", request.Entity.AbsentMonthDays);
            command.Parameters.Add(param86);
            SqlParameter param87 = new SqlParameter("@EarlyLeavingMonthDays", request.Entity.EarlyLeavingMonthDays);
            command.Parameters.Add(param87);
            SqlParameter param88 = new SqlParameter("@LateArrivalMonthDays", request.Entity.LateArrivalMonthDays);
            command.Parameters.Add(param88);
            SqlParameter param89 = new SqlParameter("@DailyNplMonthDays", request.Entity.DailyNplMonthDays);
            command.Parameters.Add(param89);
            SqlParameter param90 = new SqlParameter("@OTMonthDays", request.Entity.OTMonthDays);
            command.Parameters.Add(param90);

            SqlParameter param91 = new SqlParameter("@HourlyNoPaidLeaveNPL", request.Entity.HourlyNoPaidLeaveNPL);
            command.Parameters.Add(param91);

            SqlParameter param92 = new SqlParameter("@HourlyNoPaidLeaveAbsent", request.Entity.HourlyNoPaidLeaveAbsent);
            command.Parameters.Add(param92);

            SqlParameter param93 = new SqlParameter("@MonthlyDays", request.Entity.MonthlyDays);
            command.Parameters.Add(param93);


            command.ExecuteNonQuery();

        }

        finally
        {
            if (originalState == ConnectionState.Closed)
                connection.Close();
        }
        return new SaveResponse();
     
    }





    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] ICompanySettingsDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] ICompanySettingsRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] ICompanySettingsListHandler handler)
    {
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] ICompanySettingsListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.CompanySettingsColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "CompanySettingsList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }
}