using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeEarlyLeaving.Columns;

[ColumnsScript("EmployeeEarlyLeaving.EmployeeEarlyLeaving")]
[BasedOnRow(typeof(EmployeeEarlyLeavingRow), CheckNames = true)]
public class EmployeeEarlyLeavingColumns
{
    [EditLink, Width(100, Max = 300)]
    public string EmployeeName { get; set; }
    [Width(100, Max = 300)]
    public string EmployeeId { get; set; }
    [Width(100, Max = 300)]
    public DateTime Date { get; set; }
    [Width(100, Max = 300)]
    public int EarlyMins { get; set; }

    [DisplayName("Job Grade"), Hidden]
    public string JobGradeName { get; set; }
    [DisplayName("Occupation"), Hidden]
    public string OccupationName { get; set; }
    [DisplayName("Department"), Hidden]
    public string DepartmentName { get; set; }
    [DisplayName("Division"), Hidden]
    public string DivisionName { get; set; }

}