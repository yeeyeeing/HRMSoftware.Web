import { Decorators } from "@serenity-is/corelib";

export enum OTApplicationStatus {
    Rejected = -1,
    Pending = 0,
    Approved = 1,
    NotNeeded = 2
}
Decorators.registerEnumType(OTApplicationStatus, 'HRMSoftware.OTApplication.OTApplicationStatus', 'HumanResource.LeaveApplication.OTApplicationStatus');