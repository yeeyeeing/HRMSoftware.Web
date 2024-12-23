using System.ComponentModel;

namespace HRMSoftware.TrainingManagement;
[Serenity.ComponentModel.EnumKey("HumanResource.TrainingManagement.ProgramParticipantType")]
public enum ProgramParticipantType
{
    [Description("Trainee")]
    None = 0,
    [Description("Trainer")]
    Attendance = 1,
    [Description("Staff")]
    AttendanceDraft = 2,
}