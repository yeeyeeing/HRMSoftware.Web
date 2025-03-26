import { fieldsProxy } from "@serenity-is/corelib/q";

export interface MoneyClaimApplicationRejectRow {
    RejectReason?: string;
    Id?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class MoneyClaimApplicationRejectRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'MoneyClaimApplicationReject.MoneyClaimApplicationReject';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<MoneyClaimApplicationRejectRow>();
}