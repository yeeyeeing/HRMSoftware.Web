import { Decorators } from "@serenity-is/corelib";

export enum SOCSOClass {
    None = 0,
    Class_1 = 1,
    Class_2 = 2
}
Decorators.registerEnumType(SOCSOClass, 'HRMSoftware.EmployeeProfile.SOCSOClass', 'HumanResource.EmployeeProfile.SOCSOClass');