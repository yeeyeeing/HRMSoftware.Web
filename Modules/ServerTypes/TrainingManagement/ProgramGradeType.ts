import { Decorators } from "@serenity-is/corelib";

export enum ProgramGradeType {
    Na = 0,
    PassFail = 1,
    Grade = 2,
    Score = 3
}
Decorators.registerEnumType(ProgramGradeType, 'HRMSoftware.TrainingManagement.ProgramGradeType', 'HumanResource.TrainingManagement.ProgramGradeType');