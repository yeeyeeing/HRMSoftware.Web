using System.ComponentModel;

namespace HRMSoftware.Shift;
[Serenity.ComponentModel.EnumKey("HumanResource.Shift.ShiftDay")]
public enum Day
{
    [Description("Sunday")]
    Sunday = 0,
    [Description("Monday")]
    Monday = 1,
    [Description("Tuesday")]
    Tuesday = 2,
    [Description("Wednesday")]
    Wednesday = 3,
    [Description("Thursday")]
    Thursday = 4,
    [Description("Friday")]
    Friday = 5,
    [Description("Saturday")]
    Saturday = 6

}