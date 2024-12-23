import { fieldsProxy } from "@serenity-is/corelib/q";

export interface SickLeavePolicyRow {
    Id?: number;
    Year?: number;
    ServiceFromYear?: number;
    ServiceUntilYear?: number;
    EligibleDays?: number;
    PolicyRow?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class SickLeavePolicyRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'SickLeavePolicy.SickLeavePolicy';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<SickLeavePolicyRow>();
}