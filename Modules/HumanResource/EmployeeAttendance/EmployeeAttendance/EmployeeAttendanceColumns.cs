using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeAttendance.Columns;

[ColumnsScript("EmployeeAttendance.EmployeeAttendance")]
[BasedOnRow(typeof(EmployeeAttendanceRow), CheckNames = true)]
public class EmployeeAttendanceColumns
{
    [EditLink, QuickFilter]
    public DateTime AuthenticationDate { get; set; }
    //public TimeSpan AuthenticationTime { get; set; }
   // public DateTime AuthenticationDateTime { get; set; }
    public TimeSpan AuthenticationTime { get; set; }

    
    public string EmployeeId { get; set; }
    public string EmployeeName { get; set; }

   // public string PersonName { get; set; }
    public string DeviceName { get; set; }
    public string CardNo { get; set; }

    [DisplayName("Job Grade"), Hidden]
    public string JobGradeName { get; set; }
    [DisplayName("Occupation"), Hidden]
    public string OccupationName { get; set; }
    [DisplayName("Department"), Hidden]
    public string DepartmentName { get; set; }
    [DisplayName("Division"), Hidden]
    public string DivisionName { get; set; }
}