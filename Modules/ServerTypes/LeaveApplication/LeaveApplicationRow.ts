import { LeaveStatus } from "./LeaveStatus";
import { LeaveTypes } from "./LeaveTypes";
import { fieldsProxy } from "@serenity-is/corelib/q";

export interface LeaveApplicationRow {
    SuperiorRejectReason?: string;
    HrRejectReason?: string;
    EmployeeUpdatedName?: string;
    HrUpdatedName?: string;
    EmployeeUpdated?: number;
    HrUpdated?: number;
    EmployeeStatus?: LeaveStatus;
    HrStatus?: LeaveStatus;
    WeekdaysList?: string;
    LeaveToTake?: number;
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
    StartDate?: string;
    EndDate?: string;
    ApprovedBy?: number;
    MorningSession?: boolean;
    AfternoonSession?: boolean;
    RejectedBy?: number;
    RejectedEmployeeName?: string;
    Id?: number;
    LeaveDescriptionID?: number;
    LeaveDescriptions?: string;
    ApproveEmployeeName?: string;
    LeaveDesc?: string;
    EmployeeRowId?: number;
    EmployeeName?: string;
    LeaveReasonId?: number;
    HalfDay?: LeaveTypes;
    Status?: LeaveStatus;
    LeaveReason?: string;
    SupportingDocument?: string;
    BalanceLeave?: number;
    EligibleDay?: number;
    LeaveTaken?: number;
    EmployeeID?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class LeaveApplicationRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'StartDate';
    static readonly localTextPrefix = 'LeaveApplication.LeaveApplication';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<LeaveApplicationRow>();
}