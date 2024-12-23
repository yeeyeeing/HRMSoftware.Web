import { fieldsProxy } from "@serenity-is/corelib/q";

export interface PayrollDeductionsRow {
    External?: boolean;
    GovernmentPayments?: number;
    Id?: number;
    PayslipId?: number;
    Amount?: number;
    Description?: string;
    DeductionCode?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PayrollDeductionsRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Description';
    static readonly localTextPrefix = 'PayrollSettings.PayrollDeductions';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<PayrollDeductionsRow>();
}