import { Decorators } from "@serenity-is/corelib";

export enum MasterProgramStatusType {
    WaitingApproval = 0,
    Approved = 1,
    Rejected = 2
}
Decorators.registerEnumType(MasterProgramStatusType, 'HRMSoftware.TrainingManagement.MasterProgramStatusType', 'HumanResource.TrainingManagement.MasterProgramStatusType');