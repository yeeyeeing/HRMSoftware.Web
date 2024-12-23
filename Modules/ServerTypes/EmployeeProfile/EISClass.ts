import { Decorators } from "@serenity-is/corelib";

export enum EISClass {
    None = 0,
    Class_1 = 1
}
Decorators.registerEnumType(EISClass, 'HRMSoftware.EmployeeProfile.EISClass', 'HumanResource.EmployeeProfile.EISClass');