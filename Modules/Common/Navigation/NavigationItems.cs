using HRMSoftware.Administration;
using Serenity.Navigation;

[assembly: NavigationGroup(9000,"HRMSoftware", "fa-home", Default = true)]
[assembly: NavigationLink(1000, "HRMSoftware/User Management", url: "", icon: "fa-tachometer", permission: PermissionKeys.Security)]


[assembly: NavigationGroup(9000, "Administration", icon: "fa-tools",Permission =PermissionKeys.Security)]

[assembly: NavigationSection("Administration/General",Permission =PermissionKeys.Security)]



[assembly: NavigationSection("Administration/Localization",
    Include = new[] { "Administration/Languages", "Administration/Translations" })]

[assembly: NavigationSection("Administration/Security",
    Include = new[] { "Administration/Roles" })]

[assembly: NavigationMenu(order:int.MaxValue, title: "HumanResource/Company Management", icon : "fa-suitcase")]
[assembly: NavigationMenu(int.MaxValue, title: "HumanResource/Employee Management", icon: "fa-user-tie")]
//[assembly: NavigationMenu(int.MaxValue, title: "Payroll",icon: "fa-calculator")]

//[assembly: NavigationMenu(int.MaxValue, title: "Shift", icon: "fa-clock")]
[assembly: NavigationMenu(int.MaxValue, title: "HumanResource/Leave", icon:"fa-plane-departure")]

[assembly: NavigationMenu(int.MaxValue, title: "HumanResource/Working Over Time", icon: "fa-wrench")]

[assembly: NavigationMenu(int.MaxValue, title: "HumanResource/Money Claiming", icon: "fa-money-bill")]
[assembly: NavigationMenu(int.MinValue, title: "HumanResource/Master Data", icon: "fa-anchor", Permission = PermissionKeys.HumanResources)]


[assembly: NavigationMenu(order: int.MaxValue, title: "HumanResource", icon: "fa fa-sitemap")]

[assembly: NavigationMenu(order: int.MaxValue, title: "HumanResource/Announcement Management", icon: "fa-solid fa-paper-plane")]
//[assembly: NavigationMenu(order: int.MaxValue, title: "HumanResource/Organisation Hierarchy", icon: "fa fa-sitemap")]


//[assembly: NavigationLink(1000, "Employee Management/Employee Profile", url:"~/",permission:"", icon: "fa-user-tie")]

/*
[assembly: NavigationSection("HRMSoftware/Employee Management",
    Include = new[] {  "EmployeeProfile/Employee Profile", "InitYear/Init Year", 
        "CompanySettings/Company Settings","EntitledLeave/Entitled Leave", "EmployeeGroup/Employee Group","EmployeeAttendance/Employee Attendance","EmployeeLate/Employee Late","EmployeeEarlyLeaving/Employee Early Leaving","AbsentRecord/Absent Record" })]

[assembly: NavigationSection("HRMSoftware/Payroll Management",
    Include = new[] { "PayrollSettings/Epf Subjection", "PayrollSettings/Eis Subjection", "PayrollSettings/Hrdf Subjection", "PayrollSettings/Socso Subjection", "PayrollSettings/Payroll", "PayrollSettings/Pcb Subjection" })]
*/


//[assembly: NavigationSection("HRMSoftware/Holidays",
//   Include = new[] { "PublicHoliday/Public Holiday", "LeaveApplication/Leave Application", "LeaveReason/Leave Reason" })]

//[assembly: NavigationSection("HRMSoftware/Holidays",Include = new[] { "PublicHoliday/Public Holiday", "LeaveApplication/Leave Application" })]


//[assembly: NavigationSection("HRMSoftware/OT Management",Include = new[] { "OTApplication/Ot Application", "OTReason/Ot Reason" })]


//[assembly: NavigationSection("HRMSoftware/Money Claiming",Include = new[] { "MoneyClaimReason/Money Claim Reason", "MoneyClaimApplication/Money Claim Application" })]

//[assembly: NavigationSection("HRMSoftware/Shift Management",
//    Include = new[] {"ShiftHistory/Shift History", "Shift/Shift" })]

//[assembly: NavigationSection("HRMSoftware/Shift Management",Include = new[] {  "Shift/Shift"})]

/*
[assembly: NavigationSection("HRMSoftware/Master",
    Include = new[] {  "MasterBank/Master Bank", "MasterState/Master State", "MasterCity/Master City", "Department/Department", "Division/Division", "JobGrade/Job Grade", "MasterCountry/Master Country", "Occupation/Occupation", "Race/Race", "Section/Section"})]


[assembly: NavigationSection("HRMSoftware/Demo Modules",
    Include = new[] { "Northwind", "Basic Samples", "Advanced Samples", "UI Elements", "Theme Samples","Employee"})]

[assembly: NavigationSection("HRMSoftware/Pro Features",
    Include = new[] { "Meeting", "Organization", "Work Log" })]

[assembly: NavigationGroup(9000, "Administration", icon: "fa-tools")]

[assembly: NavigationSection("Administration/General", Default = true)]

[assembly: NavigationSection("Administration/Localization",
    Include = new[] { "Administration/Languages", "Administration/Translations" })]

[assembly: NavigationSection("Administration/Security",
    Include = new[] { "Administration/Roles", "Administration/User Management" })]

[assembly: NavigationLink(1000, "Employee", url: "~/", permission: "", icon: "fa-tachometer")]
*/
