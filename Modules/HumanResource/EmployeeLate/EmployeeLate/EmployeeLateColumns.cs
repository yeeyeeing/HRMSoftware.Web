using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeLate.Columns;

[ColumnsScript("EmployeeLate.EmployeeLate")]
[BasedOnRow(typeof(EmployeeLateRow), CheckNames = true)]
public class EmployeeLateColumns
{
    [EditLink]
    public string EmployeeName { get; set; }
    public string EmployeeId { get; set; }
    [EditLink, QuickFilter(CssClass = "hidden-xs")]
    public DateTime Date { get; set; }
    public int LateMins { get; set; }
    public int Deducted { get; set; }
    public double Deductions { get; set; }

    [DisplayName("Job Grade"), Hidden]
    public string JobGradeName { get; set; }
    [DisplayName("Occupation"), Hidden]
    public string OccupationName { get; set; }
    [DisplayName("Department"), Hidden]
    public string DepartmentName { get; set; }
    [DisplayName("Division"), Hidden]
    public string DivisionName { get; set; }
}