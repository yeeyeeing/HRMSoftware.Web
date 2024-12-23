import { Decorators } from "@serenity-is/corelib";

export enum LeaveStatus {
    Rejected = -1,
    Pending = 0,
    Approved = 1,
    NotNeeded = 2
}
Decorators.registerEnumType(LeaveStatus, 'HRMSoftware.LeaveApplication.LeaveStatus', 'LeaveApplication.LeaveStatus');