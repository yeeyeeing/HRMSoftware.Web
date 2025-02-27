import { Decorators } from "@serenity-is/corelib";

export enum ProbationClass {
    UnderProbation = 0,
    NoProbation = 1,
    PassedProbation = 2
}
Decorators.registerEnumType(ProbationClass, 'HRMSoftware.EmployeeProfile.ProbationClass', 'HumanResource.EmployeeProfile.ProbationClass');