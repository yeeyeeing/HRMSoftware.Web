using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.MoneyClaimApplication.Forms;

[FormScript("MoneyClaimApplication.MoneyClaimApplication")]
[BasedOnRow(typeof(MoneyClaimApplicationRow), CheckNames = true)]
public class MoneyClaimApplicationForm
{
    // public string RejectedEmployeeName { get; set; }

    //public string ApproveEmployeeName { get; set; }
    public string EmployeeUpdatedName{ get; set; }
    [HideOnUpdate, HideOnInsert]
    public string SuperiorRejectReason { get; set; }
    public string HrUpdatedName { get; set; }

    [HideOnUpdate, HideOnInsert]
    public string HrRejectReason { get; set; }
    public int EmployeeUpdated { get; set; }
    public int HrUpdated { get; set; }

    [OneThirdWidth]
    public int EmployeeRowId { get; set; }

    [OneThirdWidth]
    public string EmployeeName { get; set; }
    [OneThirdWidth]
    public DateTime ClaimingDate { get; set; }

    [OneThirdWidth]
    public double ClaimAmount { get; set; }

    [OneThirdWidth]
    public int ClaimReasonId { get; set; }
    [OneThirdWidth]
    public string ClaimingCategory { get; set; }

    [Category("Allowance Subjections")]
    public int SubjectionEis { get; set; }
    public int SubjectionEpf { get; set; }
    public int SubjectionHrdf { get; set; }
    public int SubjectionPcb { get; set; }
    public int SubjectionSocso { get; set; }

    [TextAreaEditor(Rows = 5)]
    public string Description { get; set; }
    public string SupportingDocument { get; set; }

}