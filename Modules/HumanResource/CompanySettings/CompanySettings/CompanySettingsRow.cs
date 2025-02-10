using HRMSoftware.Administration;
using HRMSoftware.AnnualLeaveJobGradePolicy;
using HRMSoftware.AnnualLeaveJobGradePolicy.Columns;
using HRMSoftware.OTJobGradeTime;
using HRMSoftware.OTJobGradeTime.Columns;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using Serenity.Extensions.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.CompanySettings;

[ConnectionKey("Default"), Module("CompanySettings"), TableName("HumanResourcesCompanySettings")]
[DisplayName("Company Settings"), InstanceName("Company Settings")]
[ReadPermission("*")]
[ModifyPermission(PermissionKeys.HumanResources)]
public sealed class CompanySettingsRow : Row<CompanySettingsRow.RowFields>, IIdRow // no need logging row
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Minimum OT"), Column("OTMinimumMinute"), NotNull]
    public int? OTMinimumMinute
    {
        get => fields.OTMinimumMinute[this];
        set => fields.OTMinimumMinute[this] = value;
    }

    [DisplayName("Retire Age"), Column("RetireAge"), NotNull]
    public int? RetireAge
    {
        get => fields.RetireAge[this];
        set => fields.RetireAge[this] = value;
    }


    [DisplayName("Pay Day"), Column("PayDay"),NotNull]
    public int? PayDay
    {
        get => fields.PayDay[this];
        set => fields.PayDay[this] = value;
    }

    [DisplayName("Leave Refresh Day"), Column("LeaveRefreshDay")]
    public int? LeaveRefreshDay
    {
        get => fields.LeaveRefreshDay[this];
        set => fields.LeaveRefreshDay[this] = value;
    }


    [DisplayName("Leave Refresh Month"), Column("LeaveRefreshMonth")]
    public int? LeaveRefreshMonth
    {
        get => fields.LeaveRefreshMonth[this];
        set => fields.LeaveRefreshMonth[this] = value;
    }

    [DisplayName("Maximum Basic Salary"), Column("MaximumBasicSalary")]
    public int? MaximumBasicSalary
    {
        get => fields.MaximumBasicSalary[this];
        set => fields.MaximumBasicSalary[this] = value;
    }

    [DisplayName("Is Active"), Column("IsActive")]
    public int? IsActive
    {
        get => fields.IsActive[this];
        set => fields.IsActive[this] = value;
    }


    [DisplayName("Late Arrival Equal Half Day Leave"), Column("LateArrivalEqualHalfDayLeave"),NotNull,DefaultValue(0)]
    public int? LateArrivalEqualHalfDayLeave
    {
        get => fields.LateArrivalEqualHalfDayLeave[this];
        set => fields.LateArrivalEqualHalfDayLeave[this] = value;
    }


    [DisplayName("Late Arrival Equal Full Day Leave"), Column("LateArrivalEqualFullDayLeave"), NotNull, DefaultValue(0)]
    public int? LateArrivalEqualFullDayLeave
    {
        get => fields.LateArrivalEqualFullDayLeave[this];
        set => fields.LateArrivalEqualFullDayLeave[this] = value;
    }
    
    [DisplayName("Clock in grace period"), Column("ClockInGracePeriod"), NotNull, DefaultValue(0)]
    public int? ClockInGracePeriod
    {
        get => fields.ClockInGracePeriod[this];
        set => fields.ClockInGracePeriod[this] = value;
    }


    [DisplayName("Clock out grace period"), Column("ClockOutGracePeriod"), NotNull, DefaultValue(0)]
    public int? ClockOutGracePeriod
    {
        get => fields.ClockOutGracePeriod[this];
        set => fields.ClockOutGracePeriod[this] = value;
    }



    //[DisplayName("Entitle Annual Based On Job Grade")]
    [DisplayName("Job Grade")]
    [BooleanEditor]
    public bool? EntitleAnnualBasedOnJobGrade
    {
        get => fields.EntitleAnnualBasedOnJobGrade[this];
        set => fields.EntitleAnnualBasedOnJobGrade[this] = value;
    }





    [DisplayName("Maximum Ot Time"),NotNull]
    public double? MaximumOtMinute
    {
        get => fields.MaximumOtMinute[this];
        set => fields.MaximumOtMinute[this] = value;
    }

    //[DisplayName("Entitle Annual Based On Year Of Service")]
    [DisplayName("Year Of Service")]
    [BooleanEditor]
    public bool? EntitleAnnualBasedOnYearOfService
    {
        get => fields.EntitleAnnualBasedOnYearOfService[this];
        set => fields.EntitleAnnualBasedOnYearOfService[this] = value;
    }

    [DisplayName("Fixed Ot Rate Calculation")]
    [BooleanEditor]
    public bool? FixedOtRateCalculation
    {
        get => fields.FixedOtRateCalculation[this];
        set => fields.FixedOtRateCalculation[this] = value;
    }

    [DisplayName("Variable Ot Rate Calculation")]
    [BooleanEditor]
    public bool? VariableOtRateCalculation
    {
        get => fields.VariableOtRateCalculation[this];
        set => fields.VariableOtRateCalculation[this] = value;
    }

    [DisplayName("2x Ot Pay"), BooleanEditor]
    public bool? WeekdayTwo
    {
        get => fields.WeekdayTwo[this];
        set => fields.WeekdayTwo[this] = value;
    }

    [DisplayName("1.5x Ot Pay"), BooleanEditor]
    public bool? WeekdayOnePointFive
    {
        get => fields.WeekdayOnePointFive[this];
        set => fields.WeekdayOnePointFive[this] = value;
    }
    [DisplayName("2x Ot Pay"), BooleanEditor]
    public bool? WeekendTwo
    {
        get => fields.WeekendTwo[this];
        set => fields.WeekendTwo[this] = value;
    }

    [DisplayName("1.5x Ot Pay"), BooleanEditor]
    public bool? WeekendOnePointFive
    {
        get => fields.WeekendOnePointFive[this];
        set => fields.WeekendOnePointFive[this] = value;
    }
    [DisplayName("2x Ot Pay"), BooleanEditor]
    public bool? PublicHolidayTwo
    {
        get => fields.PublicHolidayTwo[this];
        set => fields.PublicHolidayTwo[this] = value;
    }

    [DisplayName("1.5x Ot Pay"), BooleanEditor]
    public bool? PublicHolidayOnePointFive
    {
        get => fields.PublicHolidayOnePointFive[this];
        set => fields.PublicHolidayOnePointFive[this] = value;
    }




    [DisplayName("One Off Entitlement")]
    [BooleanEditor]
    public bool? OneOffEntitlementAnnualLeave
    {
        get => fields.OneOffEntitlementAnnualLeave[this];
        set => fields.OneOffEntitlementAnnualLeave[this] = value;
    }

    [DisplayName("Monthly Entitlement")]
    [BooleanEditor]
    public bool? MonthlyEntitlementAnnualLeave
    {
        get => fields.MonthlyEntitlementAnnualLeave[this];
        set => fields.MonthlyEntitlementAnnualLeave[this] = value;
    }

    [DisplayName("Fixed Time")]
    [BooleanEditor]
    public bool? FixedTime
    {
        get => fields.FixedTime[this];
        set => fields.FixedTime[this] = value;
    }

    [DisplayName("Fixed Hour")]
    [BooleanEditor]
    public bool? FixedHour
    {
        get => fields.FixedHour[this];
        set => fields.FixedHour[this] = value;
    }

    [DisplayName("Fixed Hour Flexi Time")]
    [BooleanEditor]
    public bool? FixedHourFlexiTime
    {
        get => fields.FixedHourFlexiTime[this];
        set => fields.FixedHourFlexiTime[this] = value;
    }


    //[DisplayName("Refresh Leave On Year Of Service")]
    [DisplayName("Year Of Service")]
    [BooleanEditor]
    public bool? RefreshLeaveOnYearOfService
    {
        get => fields.RefreshLeaveOnYearOfService[this];
        set => fields.RefreshLeaveOnYearOfService[this] = value;
    }




    //    [DisplayName("Refresh Leave On Specific Date")]
    [DisplayName("Specific Date")]
    [BooleanEditor]
    public bool? RefreshLeaveOnSpecificDate
    {
        get => fields.RefreshLeaveOnSpecificDate[this];
        set => fields.RefreshLeaveOnSpecificDate[this] = value;
    }


    [DisplayName("Maximum Basic Salary")]
    [BooleanEditor]
    public bool? MaximumBasicSalaryToEntitleForOTPay
    {
        get => fields.MaximumBasicSalaryToEntitleForOTPay[this];
        set => fields.MaximumBasicSalaryToEntitleForOTPay[this] = value;
    }

    [DisplayName("Job Grade")]
    [BooleanEditor]
    public bool? MaximumJobGradeToEntitleForOTPay
    {
        get => fields.MaximumJobGradeToEntitleForOTPay[this];
        set => fields.MaximumJobGradeToEntitleForOTPay[this] = value;
    }


    [DisplayName("Entitle Annual Leave Before Passing Probation Period")]
    [BooleanEditor]
    public bool? EntitleAnualLeaveBeforeProbationPeriodEnd
    {
        get => fields.EntitleAnualLeaveBeforeProbationPeriodEnd[this];
        set => fields.EntitleAnualLeaveBeforeProbationPeriodEnd[this] = value;
    }

    [DisplayName("Leave Refresh Date")]
    public DateTime? LeaveRefreshDate
    {
        get => fields.LeaveRefreshDate[this];
        set => fields.LeaveRefreshDate[this] = value;
    }

    [DisplayName("Effective Since")]
    public DateTime? EffectiveSince
    {
        get => fields.EffectiveSince[this];
        set => fields.EffectiveSince[this] = value;
    }

    [DisplayName("Effective Until")]
    public DateTime? EffectiveUntil
    {
        get => fields.EffectiveUntil[this];
        set => fields.EffectiveUntil[this] = value;
    }
    [DisplayName("Pay Date"), Column("PayDate")]
    public DateTime? Paydate
    {
        get => fields.Paydate[this];
        set => fields.Paydate[this] = value;
    }

    [DisplayName("Insert Date")]
    public DateTime? InsertDate
    {
        get => fields.InsertDate[this];
        set => fields.InsertDate[this] = value;
    }

    [MasterDetailRelation(foreignKey: nameof(OTJobGradeTimeRow.CompanySettingId), ColumnsType = typeof(OTJobGradeTimeColumns))]
    [DisplayName(""), NotMapped]
    public List<OTJobGradeTimeRow> OTJobGradeTime { get => fields.OTJobGradeTime[this]; set => fields.OTJobGradeTime[this] = value; }

 

    [DisplayName("Company Name"),  NotNull]
    public string CompanyName
    {
        get => fields.CompanyName[this];
        set => fields.CompanyName[this] = value;
    }

    [DisplayName("Ot Calculation Description"), NotMapped,NotNull]
    public string OtCalculationDescription
    {
        get => fields.OtCalculationDescription[this];
        set => fields.OtCalculationDescription[this] = value;
    }
    [DisplayName("Company Registration Number"), NotNull]
    public string CompanyRegistrationNumber
    {
        get => fields.CompanyRegistrationNumber[this];
        set => fields.CompanyRegistrationNumber[this] = value;
    }

    [DisplayName("Company Address"), NotNull]
    public string CompanyAddress
    {
        get => fields.CompanyAddress[this];
        set => fields.CompanyAddress[this] = value;
    }

    [DisplayName("Country"), NotNull]
    public string BasedCountry
    {
        get => fields.BasedCountry[this];
        set => fields.BasedCountry[this] = value;
    }


    [DisplayName("Deduct Late")]
    [BooleanEditor]
    public bool? DeductSalaryIfLate
    {
        get => fields.DeductSalaryIfLate[this];
        set => fields.DeductSalaryIfLate[this] = value;
    }
    [DisplayName("Deduct Early Leaving")]
    [BooleanEditor]
    public bool? DeductSalaryIfEarlyLeaving
    {
        get => fields.DeductSalaryIfEarlyLeaving[this];
        set => fields.DeductSalaryIfEarlyLeaving[this] = value;
    }
    [DisplayName("Overtime Payment Working Days"), DefaultValue(26)]
    public double? FixedOtRateDenominator
    {
        get => fields.FixedOtRateDenominator[this];
        set => fields.FixedOtRateDenominator[this] = value;
    }
    [DisplayName("Early Leaving Days"), DefaultValue(26)]
    public double? FixedEarlyLeavingDenominator
    {
        get => fields.FixedEarlyLeavingDenominator[this];
        set => fields.FixedEarlyLeavingDenominator[this] = value;
    }
    [DisplayName("Late Arrival Days"), DefaultValue(26)]
    public double? FixedLateArrivalDenominator
    {
        get => fields.FixedLateArrivalDenominator[this];
        set => fields.FixedLateArrivalDenominator[this] = value;
    }
    [DisplayName("NPL Days"), DefaultValue(26)]
    public double? FixedNPLDenominator
    {
        get => fields.FixedNPLDenominator[this];
        set => fields.FixedNPLDenominator[this] = value;
    }
    [DisplayName("Absent Days"), DefaultValue(26)]
    public double? FixedAbsentDenominator
    {
        get => fields.FixedAbsentDenominator[this];
        set => fields.FixedAbsentDenominator[this] = value;
    }
    [DisplayName("ProbationPeriod(In Months)"), DefaultValue(3)]
    public double? ProbationPeriod
    {
        get => fields.ProbationPeriod[this];
        set => fields.ProbationPeriod[this] = value;
    }


    
    [DisplayName("Based On No Paid Leave Rate"), BooleanEditor]
    public bool? HourlyNoPaidLeaveNPL
    {
        get => fields.HourlyNoPaidLeaveNPL[this];
        set => fields.HourlyNoPaidLeaveNPL[this] = value;
    }
    [DisplayName("Based On Daily Absent Rate"), BooleanEditor]
    public bool? HourlyNoPaidLeaveAbsent
    {
        get => fields.HourlyNoPaidLeaveAbsent[this];
        set => fields.HourlyNoPaidLeaveAbsent[this] = value;
    }
    /*
    [DisplayName("Ot Rate Multiplier Weekend")]
    public double? OtRateMultiplierWeekend
    {
        get => fields.OtRateMultiplierWeekend[this];
        set => fields.OtRateMultiplierWeekend[this] = value;
    }
    [DisplayName("Ot Rate Multiplier Weekday")]
    public double? OtRateMultiplierWeekday
    {
        get => fields.OtRateMultiplierWeekday[this];
        set => fields.OtRateMultiplierWeekday[this] = value;
    }
    [DisplayName("Ot Rate Multiplier Public Holiday")]
    public double? OtRateMultiplierPublicHoliday
    {
        get => fields.OtRateMultiplierPublicHoliday[this];
        set => fields.OtRateMultiplierPublicHoliday[this] = value;
    }
    */

    [DisplayName("Sunday")]
    [BooleanEditor]
    public bool? SundayWeekday
    {
        get => fields.SundayWeekday[this];
        set => fields.SundayWeekday[this] = value;
    }


    [DisplayName("Monday")]
    [BooleanEditor]
    public bool? MondayWeekday
    {
        get => fields.MondayWeekday[this];
        set => fields.MondayWeekday[this] = value;
    }

    [DisplayName("Tuesday")]
    [BooleanEditor]
    public bool? TuesdayWeekday
    {
        get => fields.TuesdayWeekday[this];
        set => fields.TuesdayWeekday[this] = value;
    }

    [DisplayName("Wednesday")]
    [BooleanEditor]
    public bool? WednesdayWeekday
    {
        get => fields.WednesdayWeekday[this];
        set => fields.WednesdayWeekday[this] = value;
    }

    [DisplayName("Thursday")]
    [BooleanEditor]
    public bool? ThursdayWeekday
    {
        get => fields.ThursdayWeekday[this];
        set => fields.ThursdayWeekday[this] = value;
    }

    [DisplayName("Friday")]
    [BooleanEditor]
    public bool? FridayWeekday
    {
        get => fields.FridayWeekday[this];
        set => fields.FridayWeekday[this] = value;
    }

    [DisplayName("Saturday")]
    [BooleanEditor]
    public bool? SaturdayWeekday
    {
        get => fields.SaturdayWeekday[this];
        set => fields.SaturdayWeekday[this] = value;
    }
    [DisplayName("Company Logo"), Size(100), NotNull]
    [ImageUploadEditor(FilenameFormat = "CompanySettings/Logo/~")]
    public string CompanyLogo
    {
        get => fields.CompanyLogo[this];
        set => fields.CompanyLogo[this] = value;
    }
    [DisplayName("Company Phone"), NotNull]
    public string CompanyPhone
    {
        get => fields.CompanyPhone[this];
        set => fields.CompanyPhone[this] = value;
    }

    [DisplayName("EPF Account Number")]
    public string EPFAccountNumber
    {
        get => fields.EPFAccountNumber[this];
        set => fields.EPFAccountNumber[this] = value;
    }
    [DisplayName("Bank Account Number")]
    public string BankAccountNumber
    {
        get => fields.BankAccountNumber[this];
        set => fields.BankAccountNumber[this] = value;
    }
    [DisplayName("Socso Account Number")]
    public string SocsoAccountNumber
    {
        get => fields.SocsoAccountNumber[this];
        set => fields.SocsoAccountNumber[this] = value;
    }
    [DisplayName("Income Tax Account Number")]
    public string IncomeTaxAccountNumber
    {
        get => fields.IncomeTaxAccountNumber[this];
        set => fields.IncomeTaxAccountNumber[this] = value;
    }
    [DisplayName("Zakat Account Number")]
    public string ZakatAccountNumber
    {
        get => fields.ZakatAccountNumber[this];
        set => fields.ZakatAccountNumber[this] = value;
    }
    const string jBank = nameof(jBank);

    [DisplayName("Bank"), Column("BankID"), ForeignKey("MasterBanks", "ID"), LeftJoin(jBank), TextualField(nameof(BankName))]
    [LookupEditor(typeof(Master.MasterBankRow))]
    public int? BankId
    {
        get => fields.BankId[this];
        set => fields.BankId[this] = value;
    }
    [DisplayName("Month Days To Consider")]
    public double? MonthlyDays
    {
        get => fields.MonthlyDays[this];
        set => fields.MonthlyDays[this] = value;
    }



    [DisplayName("Bank Name"), Expression($"{jBank}.[Name]")]
    public string BankName
    {
        get => fields.BankName[this];
        set => fields.BankName[this] = value;
    }
    
    [DisplayName("Superior Approval")]
    [BooleanEditor]
    public bool? OTApplicationEmployeeApproval
    {
        get => fields.OTApplicationEmployeeApproval[this];
        set => fields.OTApplicationEmployeeApproval[this] = value;
    }
    [DisplayName("HR Approval")]
    [BooleanEditor]
    public bool? OTApplicationHrApproval
    {
        get => fields.OTApplicationHrApproval[this];
        set => fields.OTApplicationHrApproval[this] = value;
    }
    [DisplayName("Superior Approval")]
    [BooleanEditor]
    public bool? LeaveApplicationEmployeeApproval
    {
        get => fields.LeaveApplicationEmployeeApproval[this];
        set => fields.LeaveApplicationEmployeeApproval[this] = value;
    }
    [DisplayName("HR Approval")]
    [BooleanEditor]
    public bool? LeaveApplicationHrApproval
    {
        get => fields.LeaveApplicationHrApproval[this];
        set => fields.LeaveApplicationHrApproval[this] = value;
    }
    [DisplayName("Superior Approval")]
    [BooleanEditor]
    public bool? MoneyClaimingEmployeeApproval
    {
        get => fields.MoneyClaimingEmployeeApproval[this];
        set => fields.MoneyClaimingEmployeeApproval[this] = value;
    }
    [DisplayName("HR Approval")]
    [BooleanEditor]
    public bool? MoneyClaimingHrApproval
    {
        get => fields.MoneyClaimingHrApproval[this];
        set => fields.MoneyClaimingHrApproval[this] = value;
    }
    [DisplayName("Either One")]
    [BooleanEditor]
    public bool? MoneyClaimingEitherOne
    {
        get => fields.MoneyClaimingEitherOne[this];
        set => fields.MoneyClaimingEitherOne[this] = value;
    }
    [DisplayName("Either One")]
    [BooleanEditor]
    public bool? LeaveApplicationEitherOne
    {
        get => fields.LeaveApplicationEitherOne[this];
        set => fields.LeaveApplicationEitherOne[this] = value;
    }
    [DisplayName("Either One")]
    [BooleanEditor]
    public bool? OTEitherOne
    {
        get => fields.OTEitherOne[this];
        set => fields.OTEitherOne[this] = value;
    }



    [DisplayName("Employee Working Time"), BooleanEditor]
    public bool? EarlyLeavingBasedOnWorkingHour
    {
        get => fields.EarlyLeavingBasedOnWorkingHour[this];
        set => fields.EarlyLeavingBasedOnWorkingHour[this] = value;
    }
    [DisplayName("Company Setting Working Days"), BooleanEditor]
    public bool? EarlyLeavingBasedOnFixedDenominator
    {
        get => fields.EarlyLeavingBasedOnFixedDenominator[this];
        set => fields.EarlyLeavingBasedOnFixedDenominator[this] = value;
    }

    [DisplayName("Employee Working Time"), BooleanEditor]
    public bool? LateArrivalBasedOnWorkingHour
    {
        get => fields.LateArrivalBasedOnWorkingHour[this];
        set => fields.LateArrivalBasedOnWorkingHour[this] = value;
    }
    [DisplayName("Company Setting Working Days"), BooleanEditor]
    public bool? LateArrivalBasedOnFixedDenominator
    {
        get => fields.LateArrivalBasedOnFixedDenominator[this];
        set => fields.LateArrivalBasedOnFixedDenominator[this] = value;
    }

    [DisplayName("Employee Working Time"), BooleanEditor]
    public bool? DailyNplBasedOnWorkingHour
    {
        get => fields.DailyNplBasedOnWorkingHour[this];
        set => fields.DailyNplBasedOnWorkingHour[this] = value;
    }
    [DisplayName("Company Setting Working Days"), BooleanEditor]
    public bool? DailyNplBasedOnFixedDenominator
    {
        get => fields.DailyNplBasedOnFixedDenominator[this];
        set => fields.DailyNplBasedOnFixedDenominator[this] = value;
    }

    [DisplayName("Employee Working Time"), BooleanEditor]
    public bool? AbsentBasedOnWorkingHour
    {
        get => fields.AbsentBasedOnWorkingHour[this];
        set => fields.AbsentBasedOnWorkingHour[this] = value;
    }
    [DisplayName("Company Setting Working Days"), BooleanEditor]
    public bool? AbsentBasedOnFixedDenominator
    {
        get => fields.AbsentBasedOnFixedDenominator[this];
        set => fields.AbsentBasedOnFixedDenominator[this] = value;
    }

    

    [DisplayName("Month Days"),BooleanEditor]
    public bool? AbsentMonthDays
    {
        get => fields.AbsentMonthDays[this];
        set => fields.AbsentMonthDays[this] = value;
    }
    [DisplayName("Month Days"),BooleanEditor]
    public bool? EarlyLeavingMonthDays
    {
        get => fields.EarlyLeavingMonthDays[this];
        set => fields.EarlyLeavingMonthDays[this] = value;
    }
    [DisplayName("Month Days"),BooleanEditor]
    public bool? LateArrivalMonthDays
    {
        get => fields.LateArrivalMonthDays[this];
        set => fields.LateArrivalMonthDays[this] = value;
    }
    [DisplayName("Month Days"),BooleanEditor]
    public bool? DailyNplMonthDays
    {
        get => fields.DailyNplMonthDays[this];
        set => fields.DailyNplMonthDays[this] = value;
    }
    [DisplayName("Month Days"),BooleanEditor]
    public bool? OTMonthDays
    {
        get => fields.OTMonthDays[this];
        set => fields.OTMonthDays[this] = value;
    }
    [DisplayName("Early Leaving Penalty Description"),NotMapped, NotNull]
    public string EarlyLeavingDes
    {
        get => fields.EarlyLeavingDes[this];
        set => fields.EarlyLeavingDes[this] = value;
    }
    [DisplayName("No Paid Leave Penalty Description"), NotMapped, NotNull]
    public string NoPaidLeaveDes
    {
        get => fields.NoPaidLeaveDes[this];
        set => fields.NoPaidLeaveDes[this] = value;
    }
    [DisplayName("Hourly No Paid Leave Penalty Description"), NotMapped, NotNull]
    public string HourlyNoPaidLeaveDes
    {
        get => fields.HourlyNoPaidLeaveDes[this];
        set => fields.HourlyNoPaidLeaveDes[this] = value;
    }

    [DisplayName("Late Arrival Penalty Description"), NotMapped, NotNull]
    public string LateArrivalDes
    {
        get => fields.LateArrivalDes[this];
        set => fields.LateArrivalDes[this] = value;
    }
    [DisplayName("Absent Penalty Description"), NotMapped,NotNull]
    public string AbsentDes
    {
        get => fields.AbsentDes[this];
        set => fields.AbsentDes[this] = value;
    }
    public class RowFields : RowFieldsBase
    {
        public BooleanField HourlyNoPaidLeaveNPL;
        public BooleanField HourlyNoPaidLeaveAbsent;



        public BooleanField AbsentMonthDays;
        public BooleanField EarlyLeavingMonthDays;
        public BooleanField LateArrivalMonthDays;
        public BooleanField DailyNplMonthDays;
        public BooleanField OTMonthDays;

        public StringField EarlyLeavingDes;
        public StringField NoPaidLeaveDes;
        public StringField HourlyNoPaidLeaveDes;
        public StringField LateArrivalDes;
        public StringField AbsentDes;


        public DoubleField FixedOtRateDenominator;
        public DoubleField FixedEarlyLeavingDenominator;
        public DoubleField FixedLateArrivalDenominator;
        public DoubleField FixedNPLDenominator;
        public DoubleField FixedAbsentDenominator;
        public DoubleField ProbationPeriod;


        public BooleanField EarlyLeavingBasedOnWorkingHour;
        public BooleanField EarlyLeavingBasedOnFixedDenominator;

        public BooleanField LateArrivalBasedOnWorkingHour;
        public BooleanField LateArrivalBasedOnFixedDenominator;

        public BooleanField DailyNplBasedOnWorkingHour;
        public BooleanField DailyNplBasedOnFixedDenominator;

        public BooleanField AbsentBasedOnWorkingHour;
        public BooleanField AbsentBasedOnFixedDenominator;


        public BooleanField OTApplicationEmployeeApproval;
        public BooleanField OTApplicationHrApproval;
        public BooleanField OTEitherOne;

        
        public BooleanField LeaveApplicationEmployeeApproval;
        public BooleanField LeaveApplicationHrApproval;
        public BooleanField LeaveApplicationEitherOne;

        public BooleanField MoneyClaimingEmployeeApproval;
        public BooleanField MoneyClaimingHrApproval;
        public BooleanField MoneyClaimingEitherOne;

        public BooleanField FixedOtRateCalculation;
        public BooleanField VariableOtRateCalculation;

        public BooleanField WeekdayTwo;
        public BooleanField WeekdayOnePointFive;
        public BooleanField WeekendTwo;
        public BooleanField WeekendOnePointFive;
        public BooleanField PublicHolidayTwo;
        public BooleanField PublicHolidayOnePointFive;





        public StringField EPFAccountNumber;
        public StringField BankAccountNumber;
        public StringField SocsoAccountNumber;
        public StringField IncomeTaxAccountNumber;
        public StringField ZakatAccountNumber;
        public Int32Field BankId;
        public DoubleField MonthlyDays;

        public StringField BankName;





        public BooleanField SundayWeekday;
        public BooleanField MondayWeekday;
        public BooleanField TuesdayWeekday;
        public BooleanField WednesdayWeekday;
        public BooleanField ThursdayWeekday;
        public BooleanField FridayWeekday;
        public BooleanField SaturdayWeekday;








        
        public Int32Field RetireAge;

        public Int32Field ClockInGracePeriod;
        public Int32Field IsActive;
        public Int32Field LateArrivalEqualHalfDayLeave;
        public Int32Field LateArrivalEqualFullDayLeave;

        public Int32Field PayDay;
        public Int32Field LeaveRefreshDay;
        public Int32Field LeaveRefreshMonth;

        public Int32Field ClockOutGracePeriod;

        
        public Int32Field Id;
        public Int32Field OTMinimumMinute;
        public DateTimeField Paydate;
        public StringField CompanyName;
        public StringField OtCalculationDescription;

        public StringField CompanyRegistrationNumber;
        public StringField CompanyLogo;
        public StringField CompanyPhone;


        public StringField CompanyAddress;
        public Int32Field MaximumBasicSalary;
        public BooleanField DeductSalaryIfLate;
        public BooleanField DeductSalaryIfEarlyLeaving;

        public BooleanField FixedTime;
        public BooleanField FixedHour;
        public BooleanField FixedHourFlexiTime;
        public BooleanField RefreshLeaveOnYearOfService;
        public BooleanField RefreshLeaveOnSpecificDate;
        public BooleanField EntitleAnualLeaveBeforeProbationPeriodEnd;

        public DateTimeField LeaveRefreshDate;

        public DateTimeField EffectiveUntil;
        public DateTimeField EffectiveSince;
        public DateTimeField InsertDate;


        public BooleanField EntitleAnnualBasedOnJobGrade;
        public BooleanField EntitleAnnualBasedOnYearOfService;


        public StringField BasedCountry;
        
        public DoubleField MaximumOtMinute;

        public BooleanField OneOffEntitlementAnnualLeave;
        public BooleanField MonthlyEntitlementAnnualLeave;


        public BooleanField MaximumBasicSalaryToEntitleForOTPay;
        public BooleanField MaximumJobGradeToEntitleForOTPay;

        
        public RowListField<OTJobGradeTimeRow> OTJobGradeTime;
        
    }
}