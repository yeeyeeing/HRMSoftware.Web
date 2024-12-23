import { fieldsProxy } from "@serenity-is/corelib/q";

export interface ProgramDepartmentRow {
    Id?: number;
    MasterProgramId?: number;
    ProgramId?: number;
    DepartmentId?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class ProgramDepartmentRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'TrainingManagement.ProgramDepartment';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<ProgramDepartmentRow>();
}