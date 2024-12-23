import { Decorators } from "@serenity-is/corelib";

export enum MasterProgramRoutineType {
    No = 0,
    Daily = 1,
    Weekly = 2,
    Monthly = 3,
    Yearly = 4
}
Decorators.registerEnumType(MasterProgramRoutineType, 'HRMSoftware.TrainingManagement.MasterProgramRoutineType', 'HumanResource.TrainingManagement.MasterProgramRoutineType');