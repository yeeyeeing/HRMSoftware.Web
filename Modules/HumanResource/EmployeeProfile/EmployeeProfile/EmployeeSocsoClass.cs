using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;
[Serenity.ComponentModel.EnumKey("HumanResource.EmployeeProfile.SOCSOClass")]
public enum SOCSOClass
{
    [Description("NONE")]
    None = 0,
    [Description("Employment Injury and Invalidity Scheme(CLASS1)")]
    Class_1 = 1,
    [Description("Employment Injury Scheme(CLASS2)")]
    Class_2 = 2

}