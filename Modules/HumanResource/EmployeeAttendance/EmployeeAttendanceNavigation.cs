using Serenity.Navigation;
using MyPages = HRMSoftware.EmployeeAttendance.Pages;

//[assembly: NavigationLink(3000, "Employee Management/Attendance", typeof(MyPages.EmployeeAttendancePage), icon: "fa-clipboard-check")]
[assembly: NavigationLink(int.MaxValue, "HumanResource/Employee Management/Shift Attendance Record", typeof(MyPages.ShiftAttendanceRecordPage), icon: "fa-clipboard-check")]