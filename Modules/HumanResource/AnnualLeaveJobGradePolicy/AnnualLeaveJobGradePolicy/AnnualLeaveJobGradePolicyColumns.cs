using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.AnnualLeaveJobGradePolicy.Columns;

[ColumnsScript("AnnualLeaveJobGradePolicy.AnnualLeaveJobGradePolicy")]
[BasedOnRow(typeof(AnnualLeaveJobGradePolicyRow), CheckNames = true)]
public class AnnualLeaveJobGradePolicyColumns
{
    [EditLink, Width(100, Max = 300)]
    public string JobGradeName { get; set; }

    [Width(100,Min =100, Max = 300)]
    public int EligibleDays { get; set; }
    [Width(170, Min = 100, Max = 300)]
    public int MaximumAccumulated { get; set; }
}