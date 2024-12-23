using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;
[Serenity.ComponentModel.EnumKey("HumanResource.EmployeeProfile.MaritalStatus")]
public enum MaritalStatus
{
    [Description("Single/Spouse Not Claimed Children")]
    Single = 0,
    [Description("Married/Divorced with Claimed Children")]
    Married = 1
}