using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile.Forms;

[FormScript("EmployeeProfile.FixedDeduction")]
[BasedOnRow(typeof(FixedDeductionRow), CheckNames = true)]
public class FixedDeductionForm
{
    [HalfWidth]
    public int MasterDeductionId { get; set; }

    [HalfWidth]
    public double Amount { get; set; }
    [HalfWidth]
    public DateTime EffectiveFrom { get; set; }
    [HalfWidth]
    public DateTime EffectiveUntil { get; set; }
    [TextAreaEditor(Rows = 3)]
    public string Description { get; set; }
    [Category("Deduction Frequency")]
    [QuarterWidth]
    public int Recurring { get; set; }
    [QuarterWidth]
    public int OneTime { get; set; }
    [QuarterWidth, HideOnInsert, HideOnUpdate]
    public int DeductedOneTime { get; set; }


}