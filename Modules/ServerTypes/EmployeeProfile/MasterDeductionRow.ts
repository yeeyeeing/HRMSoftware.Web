import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface MasterDeductionRow {
    Id?: number;
    DeductionCode?: string;
    Amount?: number;
    Description?: string;
    Recurring?: boolean;
    OneTime?: boolean;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class MasterDeductionRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'DeductionCode';
    static readonly localTextPrefix = 'EmployeeProfile.MasterDeduction';
    static readonly lookupKey = 'MasterDeduction.MasterDeduction';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<MasterDeductionRow>('MasterDeduction.MasterDeduction') }
    static async getLookupAsync() { return getLookupAsync<MasterDeductionRow>('MasterDeduction.MasterDeduction') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<MasterDeductionRow>();
}