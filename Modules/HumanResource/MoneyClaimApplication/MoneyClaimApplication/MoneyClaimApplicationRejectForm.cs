using HRMSoftware.MoneyClaimApplication;
using Serenity.ComponentModel;
using System;

namespace HRMSoftware.LeaveApplication.Forms;

[FormScript("MoneyClaimApplication.MoneyClaimApplicationReject")]
[BasedOnRow(typeof(MoneyClaimApplicationRejectRow), CheckNames = true)]
public class MoneyClaimApplicationRejectForm
{
    //public string RejectedEmployeeName { get; set; }

    // public string ApproveEmployeeName { get; set; }
    public string RejectReason { get; set; }
   
}