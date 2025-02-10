using System.ComponentModel;

namespace HRMSoftware.PayrollSettings;
[Serenity.ComponentModel.EnumKey("HumanResource.PayrollSettings.TextClass")]
public enum TextClass
{
    [Description("EPF")]
    EPF = 1,
    [Description("EIS")]
    EIS = 2,
    [Description("LHDN")]
    LHDN = 3,
    [Description("SOCSO")]
    SOCSO = 4,
    [Description("AUTOPAY")]
    AUTOPAY = 5
}