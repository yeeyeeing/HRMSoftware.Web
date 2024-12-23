using Serenity.ComponentModel;
using System;

namespace HRMSoftware.LeaveApplication.Forms;

[FormScript("LeaveApplication.LeaveReason")]
[BasedOnRow(typeof(LeaveReasonRow), CheckNames = true)]
public class LeaveReasonForm
{
    public string LeaveReason { get; set; }
    public string Description { get; set; }
}