using System.ComponentModel;

namespace HRMSoftware.TrainingManagement;
[Serenity.ComponentModel.EnumKey("HumanResource.TrainingManagement.MasterProgramRoutineType")]
public enum MasterProgramRoutineType
{
    [Description("No Repeat")]
    No = 0,
    [Description("daily")]
    Daily = 1,
    [Description("Weekly")]
    Weekly = 2,
    [Description("Monthly")]
    Monthly = 3,
    [Description("Yearly")]
    Yearly = 4,
}