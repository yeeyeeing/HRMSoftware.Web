using System.ComponentModel;

namespace HRMSoftware.PayrollSettings;
[Serenity.ComponentModel.EnumKey("HumanResource.PayrollSettings.TextFormatEisSocso")]
public enum TextFormatEisSocso
{
    [Description("CIMB")]
    CIMB = 1,
    [Description("SOCSO/EIS")]
    SOCSO = 2
}