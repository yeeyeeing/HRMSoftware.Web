import { Decorators } from "@serenity-is/corelib";

export enum TextFormatEpf {
    CIMB = 1,
    KWSP = 2
}
Decorators.registerEnumType(TextFormatEpf, 'HRMSoftware.PayrollSettings.TextFormatEpf', 'HumanResource.PayrollSettings.TextFormatEpf');