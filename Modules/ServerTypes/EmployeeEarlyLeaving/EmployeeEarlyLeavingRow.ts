import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeEarlyLeavingRow {
    DepartmentID?: number;
    DepartmentName?: string;
    DivisionID?: number;
    DivisionName?: string;
    OccupationID?: number;
    OccupationName?: string;
    JobGradeID?: number;
    JobGradeName?: string;
    EmployeeId?: string;
    EmployeeName?: string;
    Deducted?: number;
    Deductions?: number;
    Id?: number;
    EmployeeRowId?: number;
    Date?: string;
    EarlyMins?: number;
    Processed?: number;
}

export abstract class EmployeeEarlyLeavingRow {
    static readonly idProperty = 'Id';
    static readonly nameProperty = 'EmployeeName';
    static readonly localTextPrefix = 'EmployeeEarlyLeaving.EmployeeEarlyLeaving';
    static readonly lookupKey = 'EmployeeEarlyLeaving.EmployeeEarlyLeaving';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<EmployeeEarlyLeavingRow>('EmployeeEarlyLeaving.EmployeeEarlyLeaving') }
    static async getLookupAsync() { return getLookupAsync<EmployeeEarlyLeavingRow>('EmployeeEarlyLeaving.EmployeeEarlyLeaving') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<EmployeeEarlyLeavingRow>();
}