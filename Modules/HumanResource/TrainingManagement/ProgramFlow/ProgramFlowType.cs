using System.ComponentModel;
using Serenity.Data;

namespace HRMSoftware.TrainingManagement;
[Serenity.ComponentModel.EnumKey("HumanResource.TrainingManagement.TrainingProgramFlowType")]
public enum ProgramFlowType : int
{
    [Description("None")]
    None = 0,
    [Description("Attendance")]
    Attendance = 1,
    [Description("Submit Document")]
    Document = 2,
    [Description("Grading")]
    Assessment = 3,
}