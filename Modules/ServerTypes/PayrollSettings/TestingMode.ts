import { Decorators } from "@serenity-is/corelib";

export enum TestingMode {
    No = 0,
    Yes = 1
}
Decorators.registerEnumType(TestingMode, 'HRMSoftware.PayrollSettings.TestingMode', 'HumanResource.PayrollSettings.TestingMode');