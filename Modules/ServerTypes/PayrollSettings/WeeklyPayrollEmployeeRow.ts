import { fieldsProxy } from "@serenity-is/corelib/q";

export interface WeeklyPayrollEmployeeRow {
    Id?: number;
    WeeklyPayrollSettingId?: number;
    EmployeeRowId?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class WeeklyPayrollEmployeeRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'PayrollSettings.WeeklyPayrollEmployee';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<WeeklyPayrollEmployeeRow>();
}