import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface MasterPostcodeRow {
    Id?: number;
    MasterCity?: number;
    MasterState?: number;
    PostCode?: string;
    StateName?: string;
    CityName?: string;
    MasterCountry?: number;
    CountryName?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class MasterPostcodeRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'PostCode';
    static readonly localTextPrefix = 'Master.MasterPostcode';
    static readonly lookupKey = 'MasterPostcode.MasterPostcode';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<MasterPostcodeRow>('MasterPostcode.MasterPostcode') }
    static async getLookupAsync() { return getLookupAsync<MasterPostcodeRow>('MasterPostcode.MasterPostcode') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<MasterPostcodeRow>();
}