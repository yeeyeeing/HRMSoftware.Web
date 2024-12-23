import { OTApplicationStatus } from "./OTApplicationStatus";
import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface OTApplicationRow {
    WeekendOt?: boolean;
    PublicHolidayOt?: boolean;
    WeekdayOt?: boolean;
    OtRateWeekday?: number;
    OtRateWeekend?: number;
    EmployeeUpdatedName?: string;
    HrUpdatedName?: string;
    EmployeeUpdated?: number;
    HrUpdated?: number;
    EmployeeStatus?: OTApplicationStatus;
    HrStatus?: OTApplicationStatus;
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
    Paid?: number;
    OtMinute?: number;
    Id?: number;
    EmployeeRowId?: number;
    EmployeeName?: string;
    ApprovedBy?: number;
    ApproveEmployeeName?: string;
    RejectedBy?: number;
    RejectedEmployeeName?: string;
    StartingAt?: string;
    EndingAt?: string;
    OtReasonId?: number;
    OtDate?: string;
    StartingHour?: number;
    StartingMinute?: number;
    EndingHour?: number;
    EndingMinute?: number;
    StartingTime?: string;
    EndingTime?: string;
    Status?: OTApplicationStatus;
    OtRate?: number;
    TotalOtPay?: number;
    EmployeeID?: string;
    OtReason?: string;
    OTDescription?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class OTApplicationRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'EmployeeName';
    static readonly localTextPrefix = 'OTApplication.OTApplication';
    static readonly lookupKey = 'OtApplication.OtApplication';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<OTApplicationRow>('OtApplication.OtApplication') }
    static async getLookupAsync() { return getLookupAsync<OTApplicationRow>('OtApplication.OtApplication') }

    static readonly deletePermission = '';
    static readonly insertPermission = '';
    static readonly readPermission = '';
    static readonly updatePermission = '';

    static readonly Fields = fieldsProxy<OTApplicationRow>();
}