using System.ComponentModel;
namespace HRMSoftware.PayrollSettings;
[Serenity.ComponentModel.EnumKey("HumanResource.PayrollSettings.TestingMode")]
public enum TestingMode
{

    [Description("No")]
    No = 0,
    [Description("Yes")]
    Yes = 1
}