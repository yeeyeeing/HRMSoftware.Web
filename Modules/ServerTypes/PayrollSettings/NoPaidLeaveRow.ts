import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface NoPaidLeaveRow {
    DepartmentID?: number;
    DepartmentName?: string;
    DivisionID?: number;
    DivisionName?: string;
    OccupationID?: number;
    OccupationName?: string;
    JobGradeID?: number;
    JobGradeName?: string;
    MorningSession?: boolean;
    AfternoonSession?: boolean;
    Id?: number;
    Deducted?: number;
    LeaveDate?: string;
    HalfDay?: boolean;
    Deductions?: number;
    EmployeeId?: string;
    EmployeeRowId?: number;
    EmployeeName?: string;
}

export abstract class NoPaidLeaveRow {
    static readonly idProperty = 'Id';
    static readonly nameProperty = 'EmployeeName';
    static readonly localTextPrefix = 'PayrollSettings.NoPaidLeave';
    static readonly lookupKey = 'NoPaidLeave.NoPaidLeave';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<NoPaidLeaveRow>('NoPaidLeave.NoPaidLeave') }
    static async getLookupAsync() { return getLookupAsync<NoPaidLeaveRow>('NoPaidLeave.NoPaidLeave') }

    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<NoPaidLeaveRow>();
}