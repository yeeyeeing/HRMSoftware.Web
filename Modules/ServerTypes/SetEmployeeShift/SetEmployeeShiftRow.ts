import { fieldsProxy } from "@serenity-is/corelib/q";

export interface SetEmployeeShiftRow {
    Id?: number;
    ShiftStartDate?: string;
    ShiftEndDate?: string;
    ShiftId?: number;
    EmployeeRowId?: number;
    EmployeeName?: string;
    ShiftName?: string;
    EmployeeGroupId?: number;
    EmployeeGroupName?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class SetEmployeeShiftRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'EmployeeName';
    static readonly localTextPrefix = 'SetEmployeeShift.SetEmployeeShift';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<SetEmployeeShiftRow>();
}