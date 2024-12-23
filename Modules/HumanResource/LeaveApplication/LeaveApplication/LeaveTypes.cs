using System.ComponentModel;

namespace HRMSoftware.LeaveApplication;
[Serenity.ComponentModel.EnumKey("LeaveApplication.LeaveTypes")]
public enum LeaveTypes
{
    [Description("Full Day Leave")]
    Full = 0,
    [Description("Half Day Leave")]
    Half = 1
}