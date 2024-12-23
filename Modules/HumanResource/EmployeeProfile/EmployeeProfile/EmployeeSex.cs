using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;
[Serenity.ComponentModel.EnumKey("HumanResource.EmployeeProfile.SexType")]
public enum SexType
{
    [Description("Male")]
    Male = 1,
    [Description("Female")]
    Female = 2
}