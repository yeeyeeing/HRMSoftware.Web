using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.AnnualLeavePolicy.Columns;

[ColumnsScript("AnnualLeavePolicy.AnnualLeavePolicy")]
[BasedOnRow(typeof(AnnualLeavePolicyRow), CheckNames = true)]
public class AnnualLeavePolicyColumns
{

    // public int Year { get; set; }
    [EditLink, Width(100)]
    public int EligibleDays { get; set; }
    [Width(150, Min = 50, Max = 200)]
    public int ServiceFromYear { get; set; }
    [Width(150, Min = 50, Max = 200)]
    public int ServiceUntilYear { get; set; }
    [Width(170, Min = 50, Max = 200)]
    public int MaximumAccumulated { get; set; }
}