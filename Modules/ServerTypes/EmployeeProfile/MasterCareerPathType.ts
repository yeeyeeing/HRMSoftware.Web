import { Decorators } from "@serenity-is/corelib";

export enum MasterCareerPathType {
    increment = 0,
    decrement = 1,
    promotion = 2,
    demotion = 3
}
Decorators.registerEnumType(MasterCareerPathType, 'HRMSoftware.EmployeeProfile.MasterCareerPathType', 'HumanResource.EmployeeProfile.MasterCareerPathType');