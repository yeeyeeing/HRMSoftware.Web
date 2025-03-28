using Serenity.Navigation;
using MyPages = HRMSoftware.PayrollSettings.Pages;

//[assembly: NavigationLink(int.MaxValue, "Payroll/Epf Subjection", typeof(MyPages.EpfSubjectionPage), icon: "fa-list-alt")]
//[assembly: NavigationLink(int.MaxValue, "Payroll/Eis Subjection", typeof(MyPages.EisSubjectionPage), icon: "fa-list-alt")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Payroll Management/Payroll", typeof(MyPages.PayrollPage), icon: "fa-money-check")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Payroll Management/Weekly Payroll Settings", typeof(MyPages.WeeklyPayrollSettingsPage), icon: "fa-money-check")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Payroll Management/Weekly Payroll", typeof(MyPages.WeeklyPayrollPage), icon: "fa-money-check")]

//[assembly: NavigationLink(int.MaxValue, "Payroll/Hrdf Subjection", typeof(MyPages.HrdfSubjectionPage), icon: "fa-list-alt")]
//[assembly: NavigationLink(int.MaxValue, "Payroll/Socso Subjection", typeof(MyPages.SocsoSubjectionPage), icon: "fa-list-alt")]
[assembly: NavigationLink(5000, "HumanResource/Employee Management/Unpaid Leave", typeof(MyPages.NoPaidLeavePage), icon: "fa-calendar-minus")]
//[assembly: NavigationLink(int.MaxValue, "Payroll/Pcb Subjection", typeof(MyPages.PcbSubjectionPage), icon: "fa-list-alt")]
//[assembly: NavigationLink(int.MaxValue, "Payroll/No Paid Leave", typeof(MyPages.NoPaidLeavePage), icon: "fa-calendar-minus")]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payroll Wizard", typeof(MyPages.PayrollWizardPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payroll Generating Wizard", typeof(MyPages.PayrollGeneratingWizardPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payroll Wiz", typeof(MyPages.PayrollWizPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payslip Paid Ot", typeof(MyPages.PayslipPaidOtPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payslip Paid Money Claiming", typeof(MyPages.PayslipPaidMoneyClaimingPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payslip Deducted Late Arrival", typeof(MyPages.PayslipDeductedLateArrivalPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payslip Deducted No Paid Leave", typeof(MyPages.PayslipDeductedNoPaidLeavePage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payslip Deducted Early Leaving", typeof(MyPages.PayslipDeductedEarlyLeavingPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payslip Deducted Early Leaving", typeof(MyPages.PayslipDeductedEarlyLeavingPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payslip Deducted Late Arrival", typeof(MyPages.PayslipDeductedLateArrivalPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payslip Deducted No Paid Leave", typeof(MyPages.PayslipDeductedNoPaidLeavePage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payslip Paid Money Claiming", typeof(MyPages.PayslipPaidMoneyClaimingPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payslip Paid Ot", typeof(MyPages.PayslipPaidOtPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payslip Deducted No Paid Leave", typeof(MyPages.PayslipDeductedNoPaidLeavePage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payroll Earnings", typeof(MyPages.PayrollEarningsPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payroll Deductions", typeof(MyPages.PayrollDeductionsPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payslip Paid One Time Allowance", typeof(MyPages.PayslipPaidOneTimeAllowancePage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Payslip Deducted One Time Deductions", typeof(MyPages.PayslipDeductedOneTimeDeductionsPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "PayrollSettings/Employer Contributions", typeof(MyPages.EmployerContributionsPage), icon: null)]