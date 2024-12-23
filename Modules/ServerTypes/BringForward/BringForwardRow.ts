import { fieldsProxy } from "@serenity-is/corelib/q";

export interface BringForwardRow {
    Id?: number;
    DeleteUserId?: number;
    UpdateUserId?: number;
    InsertUserId?: number;
    IsActive?: number;
    InsertDate?: string;
    UpdateDate?: string;
    DeleteDate?: string;
    EmployeeRowId?: number;
    BringForward?: number;
    BringForwardToYear?: number;
}

export abstract class BringForwardRow {
    static readonly idProperty = 'Id';
    static readonly localTextPrefix = 'BringForward.BringForward';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<BringForwardRow>();
}