import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeLateRow {
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
    LateMins?: number;
    Processed?: number;
}

export abstract class EmployeeLateRow {
    static readonly idProperty = 'Id';
    static readonly nameProperty = 'EmployeeName';
    static readonly localTextPrefix = 'EmployeeLate.EmployeeLate';
    static readonly lookupKey = 'EmployeeLate.EmployeeLate';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<EmployeeLateRow>('EmployeeLate.EmployeeLate') }
    static async getLookupAsync() { return getLookupAsync<EmployeeLateRow>('EmployeeLate.EmployeeLate') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<EmployeeLateRow>();
}