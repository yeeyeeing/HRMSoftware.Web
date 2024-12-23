using System.ComponentModel;
using Serenity.Data;

namespace HRMSoftware.TrainingManagement;
[Serenity.ComponentModel.EnumKey("HumanResource.TrainingManagement.ProgramSessionStatusType")]
public enum ProgramSessionStatusType : int
{
    [Description("Waiting Approval - HR")]
    WaitingApprovalHR = 0,
    [Description("Waiting Approval - Management")]
    WaitingApprovalManagement = 1,
    [Description("Approved")]
    Approved = 2,
    [Description("Rejected")]
    Rejected = 3
}