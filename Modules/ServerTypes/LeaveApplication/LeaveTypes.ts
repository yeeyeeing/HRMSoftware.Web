import { Decorators } from "@serenity-is/corelib";

export enum LeaveTypes {
    Full = 0,
    Half = 1
}
Decorators.registerEnumType(LeaveTypes, 'HRMSoftware.LeaveApplication.LeaveTypes', 'LeaveApplication.LeaveTypes');