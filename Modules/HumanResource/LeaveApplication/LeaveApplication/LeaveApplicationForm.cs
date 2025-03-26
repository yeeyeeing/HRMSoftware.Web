using Serenity.ComponentModel;
using System;

namespace HRMSoftware.LeaveApplication.Forms;

[FormScript("LeaveApplication.LeaveApplication")]
[BasedOnRow(typeof(LeaveApplicationRow), CheckNames = true)]
public class LeaveApplicationForm
{
    //public string RejectedEmployeeName { get; set; }

    // public string ApproveEmployeeName { get; set; }
    public string EmployeeUpdatedName { get; set; }
    [HideOnUpdate, HideOnInsert]
    public string SuperiorRejectReason { get; set; }
    public string HrUpdatedName { get; set; }
    [HideOnUpdate, HideOnInsert]
    public string HrRejectReason { get; set; }
    public int EmployeeUpdated { get; set; }
    public int HrUpdated { get; set; }

    [HalfWidth]
    public int EmployeeRowId { get; set; }
    [HalfWidth]
    public string EmployeeName { get; set; }

    public int LeaveReasonId { get; set; }

    public int LeaveDescriptionID { get; set; }

    public string LeaveDescriptions { get; set; }


    public string SupportingDocument { get; set; }
    [HalfWidth]
    public DateTime StartDate { get; set; }
    [HalfWidth]
    public DateTime EndDate { get; set; }
    public int HalfDay { get; set; }
    [OneThirdWidth]
    public int MorningSession { get; set; }
    [OneThirdWidth]
    public int AfternoonSession { get; set; }
    [HalfWidth]
    public float EligibleDay { get; set; }
    [HalfWidth]
    public float BalanceLeave { get; set; }
    [HalfWidth]
    public float LeaveTaken { get; set; }
}