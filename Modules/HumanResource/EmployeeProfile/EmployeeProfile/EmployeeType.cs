using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;
[Serenity.ComponentModel.EnumKey("HumanResource.EmployeeProfile.EmployeeType")]
public enum EmployeeType
{
    [Description("Local")]
    Local = 1,
    [Description("Foreigner")]
    Foreigner = 2
}