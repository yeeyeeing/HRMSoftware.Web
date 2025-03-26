using Serenity.ComponentModel;
using System;

namespace HRMSoftware.LeaveApplication.Forms;

[FormScript("LeaveApplication.LeaveApplicationReject")]
[BasedOnRow(typeof(LeaveApplicationRejectRow), CheckNames = true)]
public class LeaveApplicationRejectForm
{
    //public string RejectedEmployeeName { get; set; }

    // public string ApproveEmployeeName { get; set; }
    public string RejectReason { get; set; }
   
}