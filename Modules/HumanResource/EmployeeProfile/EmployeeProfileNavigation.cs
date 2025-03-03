using HRMSoftware.Administration;
using HRMSoftware.EmployeeProfile.Pages;
using Serenity.Navigation;
using MyPages = HRMSoftware.EmployeeProfile.Pages;

[assembly: NavigationLink(1000, "HumanResource/Employee Management/Employee Profile", url:"~/", permission: "", icon: "fa-user-tie") ]
[assembly: NavigationLink(500, "HumanResource/Employee Management/Employee Personal Profile", typeof(MyPages.EmployeePersonalProfilePage), icon: "fa-user")]



[assembly: NavigationLink(500, "HumanResource/Employee Management/Employee Cp38", typeof(EmployeeCp38Page), icon: "fa fa-receipt")]
[assembly: NavigationLink(500, "HumanResource/Employee Management/Employee Bonus", typeof(EmployeeBonusPage), icon: "fa fa-gift")]
[assembly: NavigationLink(500, "HumanResource/Employee Management/Employee Incentive", typeof(EmployeeIncentivePage), icon: "fa fa-hand-holding-usd")]


//[assembly: NavigationLink(int.MaxValue, "EmployeeProfile/User Creation", typeof(MyPages.UserCreationPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "EmployeeProfile/Employee Allowance", typeof(MyPages.EmployeeAllowancePage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "EmployeeProfile/Fixed Deduction", typeof(MyPages.FixedDeductionPage), icon: null)]