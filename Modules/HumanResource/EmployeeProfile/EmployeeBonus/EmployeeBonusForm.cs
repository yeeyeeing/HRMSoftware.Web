using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeProfile.Forms;

[FormScript("EmployeeProfile.EmployeeBonus")]
[BasedOnRow(typeof(EmployeeBonusRow), CheckNames = true)]
public class EmployeeBonusForm
{
    public int EmployeeRowId { get; set; }
    [HalfWidth]
    public int PayMonth { get; set; }
    [HalfWidth]
    public int PayYear { get; set; }
    public double BonusAmount { get; set; }
    [TextAreaEditor(Rows = 3)]
    public string BonusDescription { get; set; }

}