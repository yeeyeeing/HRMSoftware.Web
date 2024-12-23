import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface LeaveDescriptionRow {
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

export abstract class LeaveDescriptionRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'LeaveApplication.LeaveDescription';
    static readonly lookupKey = 'LeaveDescription.LeaveDescription';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<LeaveDescriptionRow>('LeaveDescription.LeaveDescription') }
    static async getLookupAsync() { return getLookupAsync<LeaveDescriptionRow>('LeaveDescription.LeaveDescription') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<LeaveDescriptionRow>();
}