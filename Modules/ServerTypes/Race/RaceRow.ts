import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface RaceRow {
    Id?: number;
    Race?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class RaceRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Race';
    static readonly localTextPrefix = 'Race.Race';
    static readonly lookupKey = 'Race.Race';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<RaceRow>('Race.Race') }
    static async getLookupAsync() { return getLookupAsync<RaceRow>('Race.Race') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<RaceRow>();
}