import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface MasterCp8dRow {
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

export abstract class MasterCp8dRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'Master.MasterCp8d';
    static readonly lookupKey = 'MasterCp8d.MasterCp8d';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<MasterCp8dRow>('MasterCp8d.MasterCp8d') }
    static async getLookupAsync() { return getLookupAsync<MasterCp8dRow>('MasterCp8d.MasterCp8d') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<MasterCp8dRow>();
}