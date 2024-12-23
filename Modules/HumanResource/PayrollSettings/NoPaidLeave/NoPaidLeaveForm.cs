using Serenity.ComponentModel;
using System;

namespace HRMSoftware.PayrollSettings.Forms;

[FormScript("PayrollSettings.NoPaidLeave")]
[BasedOnRow(typeof(NoPaidLeaveRow), CheckNames = true)]
public class NoPaidLeaveForm
{
    public int EmployeeRowId { get; set; }
    public string EmployeeName { get; set; }
    public DateTime LeaveDate { get; set; }
    public int HalfDay { get; set; }
    public double Deductions { get; set; }
}