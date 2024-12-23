import { Decorators } from "@serenity-is/corelib";

export enum ProbationClass {
    UnderProbation = 0,
    PassedProbation = 1
}
Decorators.registerEnumType(ProbationClass, 'HRMSoftware.EmployeeProfile.ProbationClass', 'HumanResource.EmployeeProfile.ProbationClass');