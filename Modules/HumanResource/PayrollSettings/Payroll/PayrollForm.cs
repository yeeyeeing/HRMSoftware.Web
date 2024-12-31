using HRMSoftware.EmployeeProfile;
using HRMSoftware.MoneyClaimApplication;
using Serenity.ComponentModel;
using System;
using System.Collections.Generic;

namespace HRMSoftware.PayrollSettings.Forms;

[FormScript("PayrollSettings.Payroll")]
[BasedOnRow(typeof(PayrollRow), CheckNames = true)]
public class PayrollForm
{
    [HalfWidth]
    public int EmployeeRowId { get; set; }

    [HalfWidth]
    public string EmployeeName { get; set; }
    [OneThirdWidth]
    public int PayMonth { get; set; }
    [OneThirdWidth]
    public int PayYear { get; set; }
    [OneThirdWidth]
    public DateTime PayDate { get; set; }

    [HalfWidth]
    public DateTime PayPeriodStart { get; set; }
    [HalfWidth]
    public DateTime PayPeriodEnd { get; set; }

    [TextAreaEditor(Rows = 3)]
    public string Remarks { get; set; }

    //
    public double DaysWorked { get; set; }
    public double BasicPay { get; set; }
    public double DailyRate { get; set; }
    public double HourlyRate { get; set; }
    public double Age { get; set; }
    public DateTime BirthDay { get; set; }


    public int EisClass { get; set; }
    public int SocsoClass { get; set; }
    public int EpfClass { get; set; }
    public int HrdfClass { get; set; }

    public int TaxClass { get; set; }
    //



    public int MaritalStatus { get; set; }
    public int WorkingSpouse { get; set; }
    public double ChildrenUnderEighteen { get; set; }
    public double ChildrenInUniversity { get; set; }
    public double DisabledChild { get; set; }
    public double DisabledChildInUniversity { get; set; }

    //
    public double EarlyLeavingRate { get; set; }
    public double LateArrivalRate { get; set; }
    public double EarlyLeaving { get; set; }
    public double LateArrival { get; set; }
    public double FlatOt { get; set; }
    public double OtOnePointFiveRate { get; set; }
    public double OtTwoRate { get; set; }

    public double OtOne { get; set; }
    public double OtOnePointFive { get; set; }
    public double OtTwo { get; set; }


    public double NPLHourlyRate { get; set; }
    public double NPLDailyRate { get; set; }
    public double NPLHourly { get; set; }
    public double NPLDaily { get; set; }
    public double AbsentDailyRate { get; set; }

    public double AbsentDaily { get; set; }
    /*
    public double TotalAllowance { get; set; }
    public double TotalDeduction { get; set; }
    public double EpfWage { get; set; }
    public double HrdfWage { get; set; }
    public double SocsoWage { get; set; }
    public double EisWage { get; set; }
    public double TotalTaxableWage { get; set; }
    public double GrossWage { get; set; }
    public double NettWage { get; set; }
    */
    public bool OtSubjectEpf { get; set; }
    public bool OtSubjectEis { get; set; }
    public bool OtSubjectPcb { get; set; }
    public bool OtSubjectSocso { get; set; }
    public bool OtSubjectHrdf { get; set; }

    //


    [IgnoreName, LabelWidth("0"), MoneyClaimApplicationEditor]
    public List<MoneyClaimApplicationRow> PaidMoneyClaimingList { get; set; }

    //
    /*
    public List<int> PaidOtList { get; set; }
    public List<int> DeductedLateArrivalList { get; set; }
    public List<int> DeductedNoPaidLeaveList { get; set; }
    public List<int> DeductedEarlyLeavingList { get; set; }
    */
    [IgnoreName, LabelWidth("0"), PayslipPaidOneTimeAllowance]
    public List<PayslipPaidOneTimeAllowanceRow> AllowanceList { get; set; }
    [IgnoreName, LabelWidth("0"), PayslipDeductedOneTimeDeductions]
    public List<PayslipDeductedOneTimeDeductionsRow> DeductionList { get; set; }

    [IgnoreName, LabelWidth("0"), PayrollEarningsEditor]
    [HideOnInsert, HideOnUpdate]
    public List<PayrollEarningsRow> PayrollEarnings { get; set; }

    [IgnoreName, LabelWidth("0"), PayrollDeductionsEditor]
    [HideOnInsert, HideOnUpdate]
    public List<PayrollDeductionsRow> PayrollDeductions { get; set; }






    public double Deduction { get; set; }
    public double Earnings { get; set; }
    public double Nett { get; set; }
    public double EmployeeEIS { get; set; }
    public double EmployeePCB { get; set; }
    public double EmployeeSOCSO { get; set; }
    public double EmployeeEPF { get; set; }

    public double EmployerHRDF { get; set; }
    public double EmployerEPF { get; set; }
    public double EmployerEIS { get; set; }
    public double EmployerSOCSO { get; set; }

}