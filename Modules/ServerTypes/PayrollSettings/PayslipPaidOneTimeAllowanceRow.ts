import { fieldsProxy } from "@serenity-is/corelib/q";

export interface PayslipPaidOneTimeAllowanceRow {
    code?: string;
    AllowanceAmount?: number;
    Description?: string;
    SubjectionEis?: boolean;
    SubjectionEpf?: boolean;
    SubjectionHrdf?: boolean;
    SubjectionSocso?: boolean;
    SubjectionPcb?: boolean;
    Id?: number;
    AllowanceId?: number;
    PayslipId?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PayslipPaidOneTimeAllowanceRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'PayrollSettings.PayslipPaidOneTimeAllowance';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<PayslipPaidOneTimeAllowanceRow>();
}