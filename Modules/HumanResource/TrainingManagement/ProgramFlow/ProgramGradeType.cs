using System.ComponentModel;
using Serenity.Data;

namespace HRMSoftware.TrainingManagement;
[Serenity.ComponentModel.EnumKey("HumanResource.TrainingManagement.ProgramGradeType")]
public enum ProgramGradeType : int
{
    [Description("N/A")]
    Na = 0,
    [Description("Pass & Fail")]
    PassFail = 1,
    [Description("Grade")]
    Grade = 2,
    [Description("Score")]
    Score = 3,
}