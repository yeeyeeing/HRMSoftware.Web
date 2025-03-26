import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface DepartmentRow {
    Id?: number;
    Name?: string;
    Description?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class DepartmentRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'OrganisationHierarchy.Department';
    static readonly lookupKey = 'Department.Department';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<DepartmentRow>('Department.Department') }
    static async getLookupAsync() { return getLookupAsync<DepartmentRow>('Department.Department') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<DepartmentRow>();
}