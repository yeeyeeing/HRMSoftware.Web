using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings.Columns;

[ColumnsScript("PayrollSettings.NoPaidLeave")]
[BasedOnRow(typeof(NoPaidLeaveRow), CheckNames = true)]
public class NoPaidLeaveColumns
{
    //[EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    // public int Id { get; set; }
    [EditLink]
    public string EmployeeName { get; set; }
    public DateTime LeaveDate { get; set; }
    public int HalfDay { get; set; }
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