import { Decorators } from "@serenity-is/corelib";

export enum MoneyClaimingStatus {
    Rejected = -1,
    Pending = 0,
    Approved = 1,
    NotNeeded = 2
}
Decorators.registerEnumType(MoneyClaimingStatus, 'HRMSoftware.MoneyClaimApplication.MoneyClaimingStatus', 'LeaveApplication.MoneyClaimingStatus');