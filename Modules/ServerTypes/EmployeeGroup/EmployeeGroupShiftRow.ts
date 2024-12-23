import { fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeGroupShiftRow {
    Id?: number;
    EmployeeGroupId?: number;
    ShiftStartDate?: string;
    ShiftEndDate?: string;
    ShiftId?: number;
    Shift?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class EmployeeGroupShiftRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'EmployeeGroup.EmployeeGroupShift';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<EmployeeGroupShiftRow>();
}