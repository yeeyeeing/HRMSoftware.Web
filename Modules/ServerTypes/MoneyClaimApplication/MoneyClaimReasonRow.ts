import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface MoneyClaimReasonRow {
    Id?: number;
    ClaimReason?: string;
    Description?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class MoneyClaimReasonRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'ClaimReason';
    static readonly localTextPrefix = 'MoneyClaimApplication.MoneyClaimReason';
    static readonly lookupKey = 'MoneyClaimReason.MoneyClaimReason';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<MoneyClaimReasonRow>('MoneyClaimReason.MoneyClaimReason') }
    static async getLookupAsync() { return getLookupAsync<MoneyClaimReasonRow>('MoneyClaimReason.MoneyClaimReason') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<MoneyClaimReasonRow>();
}