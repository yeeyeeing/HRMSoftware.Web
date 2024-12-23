using System.ComponentModel;

namespace HRMSoftware.LeaveApplication;
[Serenity.ComponentModel.EnumKey("LeaveApplication.LeaveStatus")]
public enum LeaveStatus
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