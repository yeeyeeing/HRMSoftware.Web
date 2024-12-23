import { fieldsProxy } from "@serenity-is/corelib/q";

export interface AbsentRecordRow {
    DepartmentID?: number;
    DepartmentName?: string;
    DivisionID?: number;
    DivisionName?: string;
    OccupationID?: number;
    OccupationName?: string;
    JobGradeID?: number;
    JobGradeName?: string;
    Id?: number;
    EmployeeRowId?: number;
    AbsentDate?: string;
    EmployeeId?: string;
    Processed?: number;
    EmployeeName?: string;
    HalfDay?: number;
}

export abstract class AbsentRecordRow {
    static readonly idProperty = 'Id';
    static readonly nameProperty = 'EmployeeName';
    static readonly localTextPrefix = 'AbsentRecord.AbsentRecord';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<AbsentRecordRow>();
}