import { Decorators } from "@serenity-is/corelib";

export enum ProgramSessionStatusType {
    WaitingApprovalHR = 0,
    WaitingApprovalManagement = 1,
    Approved = 2,
    Rejected = 3
}
Decorators.registerEnumType(ProgramSessionStatusType, 'HRMSoftware.TrainingManagement.ProgramSessionStatusType', 'HumanResource.TrainingManagement.ProgramSessionStatusType');