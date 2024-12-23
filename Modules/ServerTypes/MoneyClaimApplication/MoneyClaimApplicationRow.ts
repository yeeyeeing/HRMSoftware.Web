import { MoneyClaimingStatus } from "./MoneyClaimingStatus";
import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface MoneyClaimApplicationRow {
    SubjectionEis?: boolean;
    SubjectionEpf?: boolean;
    SubjectionHrdf?: boolean;
    SubjectionSocso?: boolean;
    SubjectionPcb?: boolean;
    EmployeeUpdated?: number;
    HrUpdated?: number;
    EmployeeUpdatedName?: string;
    HrUpdatedName?: string;
    EmployeeStatus?: MoneyClaimingStatus;
    HrStatus?: MoneyClaimingStatus;
    CostCentreID?: number;
    CostCentreName?: string;
    DepartmentID?: number;
    DepartmentName?: string;
    DivisionID?: number;
    DivisionName?: string;
    OccupationID?: number;
    OccupationName?: string;
    JobGradeID?: number;
    JobGradeName?: string;
    Id?: number;
    Paid?: number;
    PayrollID?: number;
    Status?: MoneyClaimingStatus;
    RejectedBy?: number;
    RejectedEmployeeName?: string;
    ClaimAmount?: number;
    EmployeeRowId?: number;
    EmployeeName?: string;
    ClaimReasonId?: number;
    Description?: string;
    ClaimingCategory?: string;
    ApproveEmployeeName?: string;
    ApprovedBy?: number;
    ClaimReason?: string;
    SupportingDocument?: string;
    ClaimingDate?: string;
    EmployeeID?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class MoneyClaimApplicationRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'EmployeeRowId';
    static readonly localTextPrefix = 'MoneyClaimApplication.MoneyClaimApplication';
    static readonly lookupKey = 'MoneyClaimApplication.MoneyClaimApplication';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<MoneyClaimApplicationRow>('MoneyClaimApplication.MoneyClaimApplication') }
    static async getLookupAsync() { return getLookupAsync<MoneyClaimApplicationRow>('MoneyClaimApplication.MoneyClaimApplication') }

    static readonly deletePermission = 'Administration:Employee';
    static readonly insertPermission = 'Administration:Employee';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:Employee';

    static readonly Fields = fieldsProxy<MoneyClaimApplicationRow>();
}