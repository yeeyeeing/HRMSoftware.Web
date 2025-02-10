import { fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeCp38Row {
    Id?: number;
    EmployeeRowId?: number;
    EmployeeName?: string;
    Cp38Amount?: number;
    EffectiveFrom?: string;
    EffectiveUntil?: string;
    EmployeeID?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class EmployeeCp38Row {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'EmployeeName';
    static readonly localTextPrefix = 'EmployeeProfile.EmployeeCp38';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<EmployeeCp38Row>();
}