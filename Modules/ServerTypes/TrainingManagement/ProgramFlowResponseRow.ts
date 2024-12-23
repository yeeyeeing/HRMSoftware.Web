import { fieldsProxy } from "@serenity-is/corelib/q";

export interface ProgramFlowResponseRow {
    Id?: number;
    FlowId?: number;
    EmployeeId?: number;
    ProgramName?: string;
    Attendance?: boolean;
    GradeValue?: number;
    File?: string;
    Remark?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class ProgramFlowResponseRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'TrainingManagement.ProgramFlowResponse';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<ProgramFlowResponseRow>();
}