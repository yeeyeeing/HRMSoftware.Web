import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeAllowanceRow {
    ExemptUnpaidLeave?: boolean;
    ExemptHospitalisationLeave?: boolean;
    ExemptSickLeave?: boolean;
    ExemptAnnualLeave?: boolean;
    ExemptMaternityLeave?: boolean;
    ExemptPaternityLeave?: boolean;
    ExemptMarriageLeave?: boolean;
    ExemptEmergencyLeave?: boolean;
    ExemptCompassionateLeave?: boolean;
    ExemptGatepassLeave?: boolean;
    Recurring?: boolean;
    PaidOneTime?: boolean;
    OneTime?: boolean;
    NoLate?: boolean;
    NoAbsence?: boolean;
    NoEarlyLeaving?: boolean;
    Id?: number;
    EmployeeRowId?: number;
    Description?: string;
    AllowanceCode?: string;
    Amount?: number;
    SubjectionEis?: boolean;
    SubjectionEpf?: boolean;
    SubjectionHrdf?: boolean;
    SubjectionPcb?: boolean;
    SubjectionSocso?: boolean;
    SubjectionOt?: boolean;
    EffectiveFrom?: string;
    EffectiveUntil?: string;
    AllowanceSubjections?: boolean;
    FullAttendance?: boolean;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class EmployeeAllowanceRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Description';
    static readonly localTextPrefix = 'EmployeeProfile.EmployeeAllowance';
    static readonly lookupKey = 'EmployeeAllowance.EmployeeAllowance';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<EmployeeAllowanceRow>('EmployeeAllowance.EmployeeAllowance') }
    static async getLookupAsync() { return getLookupAsync<EmployeeAllowanceRow>('EmployeeAllowance.EmployeeAllowance') }

    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<EmployeeAllowanceRow>();
}