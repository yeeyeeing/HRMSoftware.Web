using System.ComponentModel;

namespace HRMSoftware.TrainingManagement;
[Serenity.ComponentModel.EnumKey("HumanResource.TrainingManagement.ProgramParticipantRoleType")]
public enum ProgramParticipantRoleType
{
    [Description("Trainee")]
    Trainee = 0,
    [Description("Trainer")]
    Trainer = 1,
    [Description("Staff")]
    Staff = 2,
}