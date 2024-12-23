import { Decorators } from "@serenity-is/corelib";

export enum SexType {
    Male = 1,
    Female = 2
}
Decorators.registerEnumType(SexType, 'HRMSoftware.EmployeeProfile.SexType', 'HumanResource.EmployeeProfile.SexType');