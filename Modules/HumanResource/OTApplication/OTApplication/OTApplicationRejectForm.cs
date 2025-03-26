using HRMSoftware.MoneyClaimApplication;
using HRMSoftware.OTApplication;
using Serenity.ComponentModel;
using System;

namespace HRMSoftware.LeaveApplication.Forms;

[FormScript("OTApplication.OTApplicationReject")]
[BasedOnRow(typeof(OTApplicationRejectRow), CheckNames = true)]
public class OTApplicationRejectForm
{
    //public string RejectedEmployeeName { get; set; }

    // public string ApproveEmployeeName { get; set; }
    public string RejectReason { get; set; }
   
}