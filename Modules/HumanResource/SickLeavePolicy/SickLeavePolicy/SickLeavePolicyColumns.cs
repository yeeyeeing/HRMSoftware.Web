using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.SickLeavePolicy.Columns;

[ColumnsScript("SickLeavePolicy.SickLeavePolicy")]
[BasedOnRow(typeof(SickLeavePolicyRow), CheckNames = true)]
public class SickLeavePolicyColumns
{
    [EditLink, Width(100, Min = 50, Max = 200)]
    public int EligibleDays { get; set; }
    [Width(150, Min = 50, Max = 200)]
    public int ServiceFromYear { get; set; }
    [Width(150, Min = 50, Max = 200)]
    public int ServiceUntilYear { get; set; }
}