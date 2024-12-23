import { fieldsProxy } from "@serenity-is/corelib/q";

export interface TerminateEmployeeRow {
    Id?: number;
    TerminateDate?: string;
    TerminateLeaveDate?: string;
    NoticePeriod?: number;
}

export abstract class TerminateEmployeeRow {
    static readonly idProperty = 'Id';
    static readonly localTextPrefix = 'EmployeeProfile.TerminateEmployee';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<TerminateEmployeeRow>();
}