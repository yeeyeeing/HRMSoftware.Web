using Serenity.Navigation;
using MyPages = HRMSoftware.EmployeeGroup.Pages;

[assembly: NavigationLink(2000, "HumanResource/Employee Management/Employee Group", typeof(MyPages.EmployeeGroupPage), icon: "fa-users")]
//[assembly: NavigationLink(int.MaxValue, "EmployeeGroup/Employee Group Shift", typeof(MyPages.EmployeeGroupShiftPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "EmployeeGroup/Employee Group Shift Pattern", typeof(MyPages.EmployeeGroupShiftPatternPage), icon: null)]
//[assembly: NavigationLink(int.MaxValue, "EmployeeGroup/Employee Groupings", typeof(MyPages.EmployeeGroupingsPage), icon: null)]