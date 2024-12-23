import { MasterProgramRoutineType } from "./MasterProgramRoutineType";
import { MasterProgramStatusType } from "./MasterProgramStatusType";
import { ProgramFlowRow } from "./ProgramFlowRow";
import { fieldsProxy } from "@serenity-is/corelib/q";

export interface MasterProgramRow {
    Id?: number;
    ProgramName?: string;
    Routine?: MasterProgramRoutineType;
    RoutineInterval?: number;
    RoutineStartDate?: string;
    RoutineEndDate?: string;
    AllDepartment?: boolean;
    DepartmentList?: number[];
    Status?: MasterProgramStatusType;
    Comment?: string;
    Detail?: string;
    ExtraDocument?: string;
    FlowList?: ProgramFlowRow[];
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class MasterProgramRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'ProgramName';
    static readonly localTextPrefix = 'TrainingManagement.MasterProgram';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<MasterProgramRow>();
}