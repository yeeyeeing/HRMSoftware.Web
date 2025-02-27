using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;
[Serenity.ComponentModel.EnumKey("HumanResource.EmployeeProfile.MasterCareerPathType")]
public enum MasterCareerPathType
{
    [Description("INCREMENT")]
    increment = 0,
    [Description("DECREMENT")]
    decrement = 1,
    [Description("PROMOTION")]
    promotion = 2,
    [Description("DEMOTION")]
    demotion = 3,
    [Description("TRANSFER")]
    transfer = 4
}