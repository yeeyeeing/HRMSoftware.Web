import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface LeaveReasonRow {
    Id?: number;
    LeaveReason?: string;
    Description?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class LeaveReasonRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'LeaveReason';
    static readonly localTextPrefix = 'LeaveApplication.LeaveReason';
    static readonly lookupKey = 'LeaveReason.LeaveReason';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<LeaveReasonRow>('LeaveReason.LeaveReason') }
    static async getLookupAsync() { return getLookupAsync<LeaveReasonRow>('LeaveReason.LeaveReason') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<LeaveReasonRow>();
}