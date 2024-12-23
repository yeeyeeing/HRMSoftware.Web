import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface OTReasonRow {
    Id?: number;
    OtReason?: string;
    Description?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class OTReasonRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'OtReason';
    static readonly localTextPrefix = 'OTApplication.OTReason';
    static readonly lookupKey = 'OTReason.OTReason';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<OTReasonRow>('OTReason.OTReason') }
    static async getLookupAsync() { return getLookupAsync<OTReasonRow>('OTReason.OTReason') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<OTReasonRow>();
}