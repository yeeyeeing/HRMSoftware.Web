using System.ComponentModel;

namespace HRMSoftware.MoneyClaimApplication;
[Serenity.ComponentModel.EnumKey("LeaveApplication.MoneyClaimingStatus")]
public enum MoneyClaimingStatus
{
    [Description("Rejected")]
    Rejected = -1,
    [Description("Pending")]
    Pending = 0,
    [Description("Approved")]
    Approved = 1,
    [Description("Not Needed")]
    NotNeeded = 2
}