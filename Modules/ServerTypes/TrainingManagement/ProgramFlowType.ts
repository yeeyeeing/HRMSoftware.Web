import { Decorators } from "@serenity-is/corelib";

export enum ProgramFlowType {
    None = 0,
    Attendance = 1,
    Document = 2,
    Assessment = 3
}
Decorators.registerEnumType(ProgramFlowType, 'HRMSoftware.TrainingManagement.ProgramFlowType', 'HumanResource.TrainingManagement.TrainingProgramFlowType');