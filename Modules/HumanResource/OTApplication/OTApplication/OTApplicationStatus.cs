using System.ComponentModel;

namespace HRMSoftware.OTApplication;
[Serenity.ComponentModel.EnumKey("HumanResource.LeaveApplication.OTApplicationStatus")]
public enum OTApplicationStatus
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