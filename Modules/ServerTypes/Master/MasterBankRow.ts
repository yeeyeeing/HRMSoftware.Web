import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface MasterBankRow {
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

export abstract class MasterBankRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'Master.MasterBank';
    static readonly lookupKey = 'MasterBank.MasterBank';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<MasterBankRow>('MasterBank.MasterBank') }
    static async getLookupAsync() { return getLookupAsync<MasterBankRow>('MasterBank.MasterBank') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<MasterBankRow>();
}