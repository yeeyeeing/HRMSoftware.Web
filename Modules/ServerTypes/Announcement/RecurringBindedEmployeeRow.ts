import { fieldsProxy } from "@serenity-is/corelib/q";

export interface RecurringBindedEmployeeRow {
    Id?: number;
    EmployeeRowId?: number;
    RecurringId?: number;
}

export abstract class RecurringBindedEmployeeRow {
    static readonly idProperty = 'Id';
    static readonly localTextPrefix = 'Announcement.RecurringBindedEmployee';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<RecurringBindedEmployeeRow>();
}