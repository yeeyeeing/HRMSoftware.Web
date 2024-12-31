using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile.Forms;

[FormScript("EmployeeProfile.MasterDeduction")]
[BasedOnRow(typeof(MasterDeductionRow), CheckNames = true)]
public class MasterDeductionForm
{
    [HalfWidth]
    public string DeductionCode { get; set; }

    [HalfWidth]
    public double Amount { get; set; }
    [TextAreaEditor(Rows = 3)]
    public string Description { get; set; }
    [Category("Deduction Frequency")]
    [QuarterWidth]
    public int Recurring { get; set; }
    [QuarterWidth]
    public int OneTime { get; set; }
}