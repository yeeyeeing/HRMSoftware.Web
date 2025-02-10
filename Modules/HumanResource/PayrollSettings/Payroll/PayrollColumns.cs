using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings.Columns;

[ColumnsScript("PayrollSettings.Payroll")]
[BasedOnRow(typeof(PayrollRow), CheckNames = true)]
public class PayrollColumns
{
    //[EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
   // public int Id { get; set; }
   // public int EmployeeRowId { get; set; }
   // public string EmployeeId { get; set; }
    [EditLink,DisplayName("Employee Name")]
    public string EmployeeName { get; set; }

    [EditLink, DisplayName("Employee ID")]
    public string EmployeeId { get; set; }

    [EditLink, QuickFilter(CssClass = "hidden-xs")]
    public DateTime PayDate { get; set; }

    public double Earnings { get; set; }
    public double Deduction { get; set; }
    public double Nett { get; set; }
    [Width(100,Min =100,Max =200)]
    public string PayMonth { get; set; }

    public int PayYear { get; set; }
    [DisplayName("Job Grade"),Hidden]
    public string JobGradeName { get; set; }
    [DisplayName("Occupation"), Hidden]
    public string OccupationName { get; set; }
    [DisplayName("Department"), Hidden]
    public string DepartmentName { get; set; }
    [DisplayName("Division"), Hidden]
    public string DivisionName { get; set; }
    [DisplayName("Section"), Hidden]
    public string SectionName { get; set; }


}