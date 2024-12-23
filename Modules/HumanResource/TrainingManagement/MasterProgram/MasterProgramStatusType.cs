using System.ComponentModel;
using Serenity.Data;

namespace HRMSoftware.TrainingManagement;
[Serenity.ComponentModel.EnumKey("HumanResource.TrainingManagement.MasterProgramStatusType")]
public enum MasterProgramStatusType : int
{
    [Description("Waiting Approval")]
    WaitingApproval = 0,
    [Description("Approved")]
    Approved = 1,
    [Description("Rejected")]
    Rejected = 2
}