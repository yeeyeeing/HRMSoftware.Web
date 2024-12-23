using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile.Columns;

[ColumnsScript("EmployeeProfile.FixedDeduction")]
[BasedOnRow(typeof(FixedDeductionRow), CheckNames = true)]
public class FixedDeductionColumns
{
  
    [EditLink]
    public string Description { get; set; }
    [Width(100, Max = 300)]
    public double Amount { get; set; }
    [Width(100, Max = 300)]
    public DateTime EffectiveFrom { get; set; }

    [Width(100, Max = 300)]
    public DateTime EffectiveUntil { get; set; }
}