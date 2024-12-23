import { LeaveCarryForward } from "./LeaveCarryForward";
import { AnnualLeaveJobGradePolicyRow } from "../AnnualLeaveJobGradePolicy/AnnualLeaveJobGradePolicyRow";
import { AnnualLeavePolicyRow } from "../AnnualLeavePolicy/AnnualLeavePolicyRow";
import { SickLeavePolicyRow } from "../SickLeavePolicy/SickLeavePolicyRow";
import { fieldsProxy } from "@serenity-is/corelib/q";

export interface InitYearRow {
    YearString?: string;
    Id?: number;
    Year?: number;
    LeaveBringForwardMethod?: LeaveCarryForward;
    HospitalisationLeave?: number;
    PaternityLeave?: number;
    MaternityLeave?: number;
    CompassionateLeave?: number;
    MarriageLeave?: number;
    MonthOfServiceToEligibleForPaternityLeave?: number;
    MonthOfServiceToEligibleForMaternityLeave?: number;
    BringForwardPercentage?: number;
    BringForwardDays?: number;
    LeaveRoundUp?: boolean;
    AnnulLeaveBasedOnJobGrade?: AnnualLeaveJobGradePolicyRow[];
    PolicyList?: AnnualLeavePolicyRow[];
    SickLeavePolicyList?: SickLeavePolicyRow[];
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class InitYearRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Year';
    static readonly localTextPrefix = 'InitYear.InitYear';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<InitYearRow>();
}