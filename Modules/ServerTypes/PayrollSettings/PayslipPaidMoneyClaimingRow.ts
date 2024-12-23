import { fieldsProxy } from "@serenity-is/corelib/q";

export interface PayslipPaidMoneyClaimingRow {
    ClaimingCategory?: string;
    ClaimAmount?: number;
    Description?: string;
    SubjectionEis?: boolean;
    SubjectionEpf?: boolean;
    SubjectionHrdf?: boolean;
    SubjectionSocso?: boolean;
    SubjectionPcb?: boolean;
    PayslipId?: number;
    Id?: number;
    MoneyClaimingId?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PayslipPaidMoneyClaimingRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'PayrollSettings.PayslipPaidMoneyClaiming';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<PayslipPaidMoneyClaimingRow>();
}