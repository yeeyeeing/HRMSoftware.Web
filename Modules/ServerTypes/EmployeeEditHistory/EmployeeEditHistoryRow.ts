import { fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeEditHistoryRow {
    Id?: number;
    EmployeeRowId?: number;
    OldValue?: string;
    NewValue?: string;
    FieldName?: string;
    Description?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class EmployeeEditHistoryRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'OldValue';
    static readonly localTextPrefix = 'EmployeeEditHistory.EmployeeEditHistory';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<EmployeeEditHistoryRow>();
}