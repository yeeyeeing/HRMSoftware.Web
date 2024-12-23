import { Decorators } from "@serenity-is/corelib";

export enum EmployeeType {
    Local = 1,
    Foreigner = 2
}
Decorators.registerEnumType(EmployeeType, 'HRMSoftware.EmployeeProfile.EmployeeType', 'HumanResource.EmployeeProfile.EmployeeType');