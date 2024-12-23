import { Decorators } from "@serenity-is/corelib";

export enum ProgramParticipantRoleType {
    Trainee = 0,
    Trainer = 1,
    Staff = 2
}
Decorators.registerEnumType(ProgramParticipantRoleType, 'HRMSoftware.TrainingManagement.ProgramParticipantRoleType', 'HumanResource.TrainingManagement.ProgramParticipantRoleType');