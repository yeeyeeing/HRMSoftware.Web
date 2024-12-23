import { Decorators } from "@serenity-is/corelib";

export enum MaritalStatus {
    Single = 0,
    Married = 1
}
Decorators.registerEnumType(MaritalStatus, 'HRMSoftware.EmployeeProfile.MaritalStatus', 'HumanResource.EmployeeProfile.MaritalStatus');