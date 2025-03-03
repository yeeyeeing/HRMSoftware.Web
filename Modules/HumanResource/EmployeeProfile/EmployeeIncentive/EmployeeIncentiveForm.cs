using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeProfile.Forms;

[FormScript("EmployeeProfile.EmployeeIncentive")]
[BasedOnRow(typeof(EmployeeIncentiveRow), CheckNames = true)]
public class EmployeeIncentiveForm
{
    public int EmployeeRowId { get; set; }
    [HalfWidth]
    public int PayMonth { get; set; }
    [HalfWidth]
    public int PayYear { get; set; }
    public double IncentiveAmount { get; set; }
    [TextAreaEditor(Rows = 3)]
    public string IncentiveDescription { get; set; }
}