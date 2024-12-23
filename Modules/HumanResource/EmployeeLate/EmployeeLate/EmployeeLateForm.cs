using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeLate.Forms;

[FormScript("EmployeeLate.EmployeeLate")]
[BasedOnRow(typeof(EmployeeLateRow), CheckNames = true)]
public class EmployeeLateForm
{
    public int EmployeeRowId { get; set; }
    public string EmployeeName { get; set; }
    public DateTime Date { get; set; }
    public int LateMins { get; set; }
}