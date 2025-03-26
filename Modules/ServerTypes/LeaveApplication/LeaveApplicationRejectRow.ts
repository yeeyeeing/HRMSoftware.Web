import { fieldsProxy } from "@serenity-is/corelib/q";

export interface LeaveApplicationRejectRow {
    RejectReason?: string;
    StartDate?: string;
    Id?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class LeaveApplicationRejectRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'StartDate';
    static readonly localTextPrefix = 'LeaveApplicationReject.LeaveApplicationReject';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<LeaveApplicationRejectRow>();
}