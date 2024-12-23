import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface MasterCountryRow {
    Id?: number;
    Name?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class MasterCountryRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'Master.MasterCountry';
    static readonly lookupKey = 'MasterCountry.MasterCountry';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<MasterCountryRow>('MasterCountry.MasterCountry') }
    static async getLookupAsync() { return getLookupAsync<MasterCountryRow>('MasterCountry.MasterCountry') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<MasterCountryRow>();
}