import { fieldsProxy } from "@serenity-is/corelib/q";

export interface AnnualLeavePolicyRow {
    Id?: number;
    Year?: number;
    ServiceFromYear?: number;
    ServiceUntilYear?: number;
    EligibleDays?: number;
    MaximumAccumulated?: number;
    PolicyRow?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class AnnualLeavePolicyRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Year';
    static readonly localTextPrefix = 'AnnualLeavePolicy.AnnualLeavePolicy';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<AnnualLeavePolicyRow>();
}