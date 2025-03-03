import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface NationalityRow {
    Id?: number;
    Name?: string;
    CountryId?: number;
    CountryName?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class NationalityRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'Master.Nationality';
    static readonly lookupKey = 'MasterNationality.MasterNationality';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<NationalityRow>('MasterNationality.MasterNationality') }
    static async getLookupAsync() { return getLookupAsync<NationalityRow>('MasterNationality.MasterNationality') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<NationalityRow>();
}