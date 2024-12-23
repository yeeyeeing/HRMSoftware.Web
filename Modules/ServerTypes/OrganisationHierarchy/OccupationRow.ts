import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface OccupationRow {
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

export abstract class OccupationRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'OrganisationHierarchy.Occupation';
    static readonly lookupKey = 'Occupation.Occupation';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<OccupationRow>('Occupation.Occupation') }
    static async getLookupAsync() { return getLookupAsync<OccupationRow>('Occupation.Occupation') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<OccupationRow>();
}