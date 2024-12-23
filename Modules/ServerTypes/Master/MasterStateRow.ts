import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface MasterStateRow {
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

export abstract class MasterStateRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'Master.MasterState';
    static readonly lookupKey = 'MasterState.MasterState';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<MasterStateRow>('MasterState.MasterState') }
    static async getLookupAsync() { return getLookupAsync<MasterStateRow>('MasterState.MasterState') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<MasterStateRow>();
}