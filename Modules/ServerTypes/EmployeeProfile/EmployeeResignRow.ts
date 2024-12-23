import { fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeResignRow {
    Id?: number;
    ResignationDate?: string;
    ResignLeaveDate?: string;
    NoticePeriod?: number;
}

export abstract class EmployeeResignRow {
    static readonly idProperty = 'Id';
    static readonly localTextPrefix = 'EmployeeProfile.EmployeeResign';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<EmployeeResignRow>();
}