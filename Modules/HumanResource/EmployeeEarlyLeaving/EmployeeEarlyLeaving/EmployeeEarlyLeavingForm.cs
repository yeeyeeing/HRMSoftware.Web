using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeEarlyLeaving.Forms;

[FormScript("EmployeeEarlyLeaving.EmployeeEarlyLeaving")]
[BasedOnRow(typeof(EmployeeEarlyLeavingRow), CheckNames = true)]
public class EmployeeEarlyLeavingForm
{
    public int EmployeeRowId { get; set; }
    public string EmployeeName { get; set; }
    public DateTime Date { get; set; }
    public int EarlyMins { get; set; }
}