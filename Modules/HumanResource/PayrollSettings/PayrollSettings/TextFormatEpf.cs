using System.ComponentModel;
namespace HRMSoftware.PayrollSettings;
[Serenity.ComponentModel.EnumKey("HumanResource.PayrollSettings.TextFormatEpf")]
public enum TextFormatEpf
{
    [Description("CIMB")]
    CIMB = 1,
    [Description("KWSP")]
    KWSP = 2
}