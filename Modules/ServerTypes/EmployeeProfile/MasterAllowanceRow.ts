import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface MasterAllowanceRow {
    Id?: number;
    AllowanceCode?: string;
    Amount?: number;
    SubjectionEis?: boolean;
    SubjectionEpf?: boolean;
    SubjectionSocso?: boolean;
    SubjectionPcb?: boolean;
    SubjectionHrdf?: boolean;
    SubjectionOt?: boolean;
    Description?: string;
    AllowanceSubjections?: boolean;
    FullAttendance?: boolean;
    Recurring?: boolean;
    OneTime?: boolean;
    NoLate?: boolean;
    NoAbsence?: boolean;
    NoEarlyLeaving?: boolean;
    ExemptUnpaidLeave?: boolean;
    ExemptHospitalisationLeave?: boolean;
    ExemptSickLeave?: boolean;
    ExemptAnnualLeave?: boolean;
    ExemptMaternityLeave?: boolean;
    ExemptPaternityLeave?: boolean;
    ExemptMarriageLeave?: boolean;
    ExemptCompassionateLeave?: boolean;
    ExemptEmergencyLeave?: boolean;
    ExemptGatepassLeave?: boolean;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class MasterAllowanceRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'AllowanceCode';
    static readonly localTextPrefix = 'EmployeeProfile.MasterAllowance';
    static readonly lookupKey = 'MasterAllowance.MasterAllowance';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<MasterAllowanceRow>('MasterAllowance.MasterAllowance') }
    static async getLookupAsync() { return getLookupAsync<MasterAllowanceRow>('MasterAllowance.MasterAllowance') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<MasterAllowanceRow>();
}