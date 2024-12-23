using System.ComponentModel;

namespace HRMSoftware.InitYear;
[Serenity.ComponentModel.EnumKey("HumanResource.InitYear.LeaveCarryForward")]
public enum LeaveCarryForward
{
    [Description("All")]
    All = 1,
    [Description("One Year")]
    OneYear = 2,
    [Description("Manual")]
    MaximumDaysCarryForwardManual = 3,
    [Description("Allocation")]
    MaximumDaysCarryForwardAllocation = 4,
    [Description("None")]
    None = 5,
    [Description("Percentage")]
    MaximumDaysCarryForwardByPercentage = 6



}