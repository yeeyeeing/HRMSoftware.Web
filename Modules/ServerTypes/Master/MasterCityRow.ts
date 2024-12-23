import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface MasterCityRow {
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

export abstract class MasterCityRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'Master.MasterCity';
    static readonly lookupKey = 'MasterCity.MasterCity';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<MasterCityRow>('MasterCity.MasterCity') }
    static async getLookupAsync() { return getLookupAsync<MasterCityRow>('MasterCity.MasterCity') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<MasterCityRow>();
}