using HRMSoftware.Administration;
using Serenity.Navigation;
using MyPages = HRMSoftware.EmployeeProfile.Pages;

[assembly: NavigationLink(1000, "HumanResource/Employee Management/Employee Profile", url:"~/", permission: "", icon: "fa-user-tie") ]

//[assembly: NavigationLink(int.MaxValue, "EmployeeProfile/Terminate Employee", typeof(MyPages.TerminateEmployeePage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "EmployeeProfile/Employee Resign", typeof(MyPages.EmployeeResignPage), icon: null)]
[assembly: NavigationLink(500, "HumanResource/Employee Management/Employee Personal Profile", typeof(MyPages.EmployeePersonalProfilePage), icon: "fa-user")]
//[assembly: NavigationLink(int.MaxValue, "EmployeeProfile/User Creation", typeof(MyPages.UserCreationPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "EmployeeProfile/Employee Allowance", typeof(MyPages.EmployeeAllowancePage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "EmployeeProfile/Fixed Deduction", typeof(MyPages.FixedDeductionPage), icon: null)]