import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface FixedDeductionRow {
    Id?: number;
    EmployeeRowId?: number;
    Description?: string;
    DeductionCode?: string;
    Amount?: number;
    EffectiveFrom?: string;
    EffectiveUntil?: string;
    Recurring?: boolean;
    DeductedOneTime?: boolean;
    OneTime?: boolean;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class FixedDeductionRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Description';
    static readonly localTextPrefix = 'EmployeeProfile.FixedDeduction';
    static readonly lookupKey = 'EmployeeDeductions.EmployeeDeductions';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<FixedDeductionRow>('EmployeeDeductions.EmployeeDeductions') }
    static async getLookupAsync() { return getLookupAsync<FixedDeductionRow>('EmployeeDeductions.EmployeeDeductions') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<FixedDeductionRow>();
}