import { Decorators } from "@serenity-is/corelib";

export enum TextClass {
    EPF = 1,
    EIS = 2,
    LHDN = 3,
    SOCSO = 4,
    AUTOPAY = 5
}
Decorators.registerEnumType(TextClass, 'HRMSoftware.PayrollSettings.TextClass', 'HumanResource.PayrollSettings.TextClass');