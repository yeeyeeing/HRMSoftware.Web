using Serenity.ComponentModel;
using System;
using System.ComponentModel;
using System.Collections.Generic;
using HRMSoftware.AnnualLeavePolicy;
using HRMSoftware.AnnualLeaveJobGradePolicy;
using HRMSoftware.OTJobGradeTime;

namespace HRMSoftware.CompanySettings.Forms;

[FormScript("HumanResource.CompanySettings.CompanySettings")]
[BasedOnRow(typeof(CompanySettingsRow), CheckNames = true)]
public class CompanySettingsForm
{
    [Tab("Company Information")]
    public string CompanyLogo { get; set; }
    public string CompanyRegistrationNumber { get; set; }
    [OneThirdWidth]
    public string CompanyPhone { get; set; }

    [OneThirdWidth]
    public string CompanyName { get; set; }
    [OneThirdWidth]
    public string BasedCountry { get; set; }
    public string CompanyAddress { get; set; }


    public string EPFAccountNumber { get; set; }
    public string BankAccountNumber { get; set; }
    public string SocsoAccountNumber { get; set; }
    public string IncomeTaxAccountNumber { get; set; }
    public string ZakatAccountNumber { get; set; }
    public int BankId { get; set; }


    [Tab("Shift Pattern Information")]

    [Category("You can choose more than one Shift Pattern Method")]
    [OneThirdWidth]
    public bool FixedTime { get; set; }
    [OneThirdWidth]
    public bool FixedHour { get; set; }
    [OneThirdWidth]
    public bool FixedHourFlexiTime { get; set; }
    [Tab("Leave Refresh Method")]

    [Category("Please choose only one Leave Refresh Method")]
    
    [HalfWidth]
    public int RefreshLeaveOnYearOfService { get; set; }
    [HalfWidth]
    public int RefreshLeaveOnSpecificDate { get; set; }
    [HalfWidth]
    public int LeaveRefreshMonth { get; set; }
    [HalfWidth]
    public int LeaveRefreshDay { get; set; }
    
    [Category("Please choose only one Leave Entitlement Method")]
    [QuarterWidth]
    public int EntitleAnnualBasedOnJobGrade { get; set; }
    [QuarterWidth]
    public int EntitleAnnualBasedOnYearOfService { get; set; }


    [Category("Please choose only one Leave Giving Method")]
    [QuarterWidth]
    public int OneOffEntitlementAnnualLeave { get; set; }
    [QuarterWidth]
    public int MonthlyEntitlementAnnualLeave { get; set; }
    [QuarterWidth]
    public int EntitleAnualLeaveBeforeProbationPeriodEnd { get; set; }


    [Tab("Salary Information")]
    [QuarterWidth]
    public int DeductSalaryIfLate { get; set; }
    [QuarterWidth]
    public int DeductSalaryIfEarlyLeaving { get; set; }
    //public DateTime LeaveRefreshDate { get; set; }

    [HalfWidth]
    public int RetireAge { get; set; }

    
    //[Category("Pay Date")]
    public int PayDay { get; set; }
    //public DateTime Paydate { get; set; }
    [Category("Please fill in minimum time in minutes to be considered as Half Day Leave or Absent")]
    [QuarterWidth]
    public int LateArrivalEqualHalfDayLeave { get; set; }
    [QuarterWidth]
    public int LateArrivalEqualFullDayLeave { get; set; }

    [QuarterWidth]
    public int ClockInGracePeriod { get; set; }

    [QuarterWidth]
    public int ClockOutGracePeriod { get; set;}

    [Tab("OT Settings")]
    [Category("Please select Ot Rate Calculation Method")]
    [OneThirdWidth]
    public bool FixedOtRateCalculation { get; set; }
    [OneThirdWidth]
    public bool VariableOtRateCalculation { get; set; }
    [OneThirdWidth]
    public bool OTMonthDays { get; set; }


    
    public float FixedOtRateDenominator { get; set; }
    public string OtCalculationDescription { get; set; }


    [Category("Weekday Rate")]
    public bool WeekdayTwo { get; set; }
    public bool WeekdayOnePointFive { get; set; }
    [Category("Weekend Rate")]
    public bool WeekendTwo { get; set; }
    public bool WeekendOnePointFive { get; set; }
    [Category("Public Holiday Rate")]
    public bool PublicHolidayTwo { get; set; }
    public bool PublicHolidayOnePointFive { get; set; }



    [Category("Please fill in minimum time in minutes to be considered as OT(in minutes)")]
    [OneThirdWidth]
    public int OTMinimumMinute { get; set; }
    [HalfWidth]
    public int MaximumOtMinute { get; set; }

    [Category("Maximum Basic to Entitle for OT Salary, can be left empty")]
    [QuarterWidth]
    public int MaximumBasicSalaryToEntitleForOTPay { get; set; }

    [HalfWidth]
    public int MaximumBasicSalary { get; set; }

    


    [Category("Job Grade OT Entitlement Condition, can be left empty")]
    [QuarterWidth]
    public int MaximumJobGradeToEntitleForOTPay { get; set; }

    [IgnoreName, LabelWidth("OT Maximum Time(hours)"), OTJobGradeTimeEditor]
    public List<OTJobGradeTimeRow> OTJobGradeTime { get; set; }

    [Tab("Penalty calculation settings")]
    [Category("Daily No Paid Leave Rate")]
    [QuarterWidth]
    public bool DailyNplBasedOnWorkingHour { get; set; }
    [QuarterWidth]
    public bool DailyNplBasedOnFixedDenominator { get; set; }
    [QuarterWidth]
    public float FixedNPLDenominator { get; set; }
    [QuarterWidth]
    public bool DailyNplMonthDays { get; set; }
    public string NoPaidLeaveDes { get; set; }
    [Category("Hourly No Paid Leave Rate")]
    [HalfWidth]
    public bool HourlyNoPaidLeaveNPL { get; set; }
    [HalfWidth]
    public bool HourlyNoPaidLeaveAbsent { get; set; }
    public string HourlyNoPaidLeaveDes { get; set; }
    [Category("Daily Absent Rate")]
    [QuarterWidth]
    public bool AbsentBasedOnWorkingHour { get; set; }
    [QuarterWidth]
    public bool AbsentBasedOnFixedDenominator { get; set; }
    [QuarterWidth]
    public float FixedAbsentDenominator { get; set; }
    [QuarterWidth]
    public bool AbsentMonthDays { get; set; }
    public string AbsentDes { get; set; }

    [Category("Early Leaving Rate")]
    [QuarterWidth]
    public bool EarlyLeavingBasedOnWorkingHour { get; set; }
    [QuarterWidth]
    public bool EarlyLeavingBasedOnFixedDenominator { get; set; }
    [QuarterWidth]
    public float FixedEarlyLeavingDenominator { get; set; }
    [QuarterWidth]
    public bool EarlyLeavingMonthDays { get; set; }

    public string EarlyLeavingDes { get; set; }


    [Category("Late Arrival Rate")]
    [QuarterWidth]
    public bool LateArrivalBasedOnWorkingHour { get; set; }
    [QuarterWidth]
    public bool LateArrivalBasedOnFixedDenominator { get; set; }
    [QuarterWidth]
    public float FixedLateArrivalDenominator { get; set; }
    [QuarterWidth]
    public bool LateArrivalMonthDays { get; set; }
    public string LateArrivalDes { get; set; }

    


    [Tab("Working Days Information")]
    public double ProbationPeriod { get; set; }
    public double MonthlyDays { get; set; }

    public bool SundayWeekday { get; set; }
    public bool MondayWeekday { get; set; }
    public bool TuesdayWeekday { get; set; }
    public bool WednesdayWeekday { get; set; }
    public bool ThursdayWeekday { get; set; }
    public bool FridayWeekday { get; set; }
    public bool SaturdayWeekday { get; set; }



    [Tab("Application Approvals")]
    [Category("OT Application")]
    [OneThirdWidth]
    public bool OTApplicationEmployeeApproval { get; set; }
    [OneThirdWidth]
    public bool OTApplicationHrApproval { get; set; }
    [OneThirdWidth]
    public bool OTEitherOne { get; set; }


    
    [Category("Leave Application")]
    [OneThirdWidth]
    public bool LeaveApplicationEmployeeApproval { get; set; }
    [OneThirdWidth]
    public bool LeaveApplicationHrApproval { get; set; }
    [OneThirdWidth]
    public bool LeaveApplicationEitherOne { get; set; }
    [Category("Money Claiming Application")]
    [OneThirdWidth]
    public bool MoneyClaimingEmployeeApproval { get; set; }
    [OneThirdWidth]
    public bool MoneyClaimingHrApproval { get; set; }
    [OneThirdWidth]
    public bool MoneyClaimingEitherOne { get; set; }
    
}