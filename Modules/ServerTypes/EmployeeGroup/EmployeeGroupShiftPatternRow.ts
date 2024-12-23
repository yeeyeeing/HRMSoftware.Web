import { fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeGroupShiftPatternRow {
    Id?: number;
    EmployeeRowId?: number;
    ShiftStartDate?: string;
    ShiftEndDate?: string;
    ShiftId?: number;
    EmployeeGroupId?: number;
    ShiftName?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class EmployeeGroupShiftPatternRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'EmployeeGroup.EmployeeGroupShiftPattern';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<EmployeeGroupShiftPatternRow>();
}