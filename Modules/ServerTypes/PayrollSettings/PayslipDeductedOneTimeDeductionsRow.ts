import { fieldsProxy } from "@serenity-is/corelib/q";

export interface PayslipDeductedOneTimeDeductionsRow {
    DeductionAmount?: number;
    Description?: string;
    code?: string;
    Id?: number;
    DeductionId?: number;
    PayslipId?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PayslipDeductedOneTimeDeductionsRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'PayrollSettings.PayslipDeductedOneTimeDeductions';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<PayslipDeductedOneTimeDeductionsRow>();
}