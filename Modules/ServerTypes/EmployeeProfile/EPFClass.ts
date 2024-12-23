import { Decorators } from "@serenity-is/corelib";

export enum EPFClass {
    None = 0,
    Class_1 = 1,
    Class_3 = 2,
    Class_5 = 3,
    Class_4 = 4,
    Class_2 = 5
}
Decorators.registerEnumType(EPFClass, 'HRMSoftware.EmployeeProfile.EPFClass', 'HumanResource.EmployeeProfile.EPFClass');