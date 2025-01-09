import { fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeCareerPathRow {
    Id?: number;
    Description?: string;
    CareerPathCode?: string;
    ValueString?: string;
    EmployeeName?: string;
    CareerPathId?: number;
    EffectiveDate?: string;
    NewValue?: number;
    EmployeeRowId?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class EmployeeCareerPathRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'EmployeeName';
    static readonly localTextPrefix = 'EmployeeProfile.EmployeeCareerPath';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<EmployeeCareerPathRow>();
}