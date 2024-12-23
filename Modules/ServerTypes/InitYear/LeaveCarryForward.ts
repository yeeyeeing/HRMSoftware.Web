import { Decorators } from "@serenity-is/corelib";

export enum LeaveCarryForward {
    All = 1,
    OneYear = 2,
    MaximumDaysCarryForwardManual = 3,
    MaximumDaysCarryForwardAllocation = 4,
    None = 5,
    MaximumDaysCarryForwardByPercentage = 6
}
Decorators.registerEnumType(LeaveCarryForward, 'HRMSoftware.InitYear.LeaveCarryForward', 'HumanResource.InitYear.LeaveCarryForward');