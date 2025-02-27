import { Decorators } from "@serenity-is/corelib";

export enum Category {
    DIVISION = 0,
    DEPARTMENT = 1,
    SECTION = 2,
    OCCUPATION = 3,
    JOBGRADE = 4,
    COSTCENTRE = 5
}
Decorators.registerEnumType(Category, 'HRMSoftware.EmployeeProfile.Category', 'HumanResource.EmployeeProfile.Category');