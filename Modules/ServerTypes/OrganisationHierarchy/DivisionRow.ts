import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface DivisionRow {
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

export abstract class DivisionRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'OrganisationHierarchy.Division';
    static readonly lookupKey = 'Division.Division';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<DivisionRow>('Division.Division') }
    static async getLookupAsync() { return getLookupAsync<DivisionRow>('Division.Division') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<DivisionRow>();
}