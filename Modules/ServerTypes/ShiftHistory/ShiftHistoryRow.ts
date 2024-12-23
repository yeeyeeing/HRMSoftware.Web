import { fieldsProxy } from "@serenity-is/corelib/q";

export interface ShiftHistoryRow {
    Id?: number;
    ShiftStartDate?: string;
    ShiftEndDate?: string;
    EmployeeId?: string;
    Shift?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class ShiftHistoryRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'EmployeeId';
    static readonly localTextPrefix = 'ShiftHistory.ShiftHistory';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<ShiftHistoryRow>();
}