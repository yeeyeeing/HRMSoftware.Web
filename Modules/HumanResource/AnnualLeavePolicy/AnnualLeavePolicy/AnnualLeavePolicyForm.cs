using Serenity.ComponentModel;
using System;

namespace HRMSoftware.AnnualLeavePolicy.Forms;

[FormScript("AnnualLeavePolicy.AnnualLeavePolicy")]
[BasedOnRow(typeof(AnnualLeavePolicyRow), CheckNames = true)]
public class AnnualLeavePolicyForm
{
    //public int Year { get; set; }
    public int ServiceFromYear { get; set; }
    public int ServiceUntilYear { get; set; }
    public int EligibleDays { get; set; }
    public int MaximumAccumulated { get; set; }
}