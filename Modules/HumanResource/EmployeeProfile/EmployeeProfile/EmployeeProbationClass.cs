using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;
[Serenity.ComponentModel.EnumKey("HumanResource.EmployeeProfile.ProbationClass")]
public enum ProbationClass
{
    [Description("Under Probation")]
    UnderProbation = 0,
    [Description("Passed Probation")]
    PassedProbation = 1
   
}