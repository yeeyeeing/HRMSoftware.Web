using Serenity.ComponentModel;
using System;

namespace HRMSoftware.SickLeavePolicy.Forms;

[FormScript("SickLeavePolicy.SickLeavePolicy")]
[BasedOnRow(typeof(SickLeavePolicyRow), CheckNames = true)]
public class SickLeavePolicyForm
{
   // public int Year { get; set; }
    public int ServiceFromYear { get; set; }
    public int ServiceUntilYear { get; set; }
    public int EligibleDays { get; set; }
}