import { fieldsProxy } from "@serenity-is/corelib/q";

export interface PayrollEarningsRow {
    Id?: number;
    PayslipId?: number;
    SubjectionToEis?: boolean;
    SubjectionToEpf?: boolean;
    SubjectionToHrdf?: boolean;
    SubjectionToPcb?: boolean;
    SubjectionToSocso?: boolean;
    External?: boolean;
    Amount?: number;
    Description?: string;
    EarningCode?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PayrollEarningsRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Description';
    static readonly localTextPrefix = 'PayrollSettings.PayrollEarnings';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<PayrollEarningsRow>();
}