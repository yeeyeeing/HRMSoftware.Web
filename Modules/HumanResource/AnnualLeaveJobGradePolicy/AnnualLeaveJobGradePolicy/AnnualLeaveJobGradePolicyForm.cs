using Serenity.ComponentModel;
using System;

namespace HRMSoftware.AnnualLeaveJobGradePolicy.Forms;

[FormScript("AnnualLeaveJobGradePolicy.AnnualLeaveJobGradePolicy")]
[BasedOnRow(typeof(AnnualLeaveJobGradePolicyRow), CheckNames = true)]
public class AnnualLeaveJobGradePolicyForm
{
    public int JobGradeLevel { get; set; }
    public int EligibleDays { get; set; }
    public int MaximumAccumulated { get; set; }
}