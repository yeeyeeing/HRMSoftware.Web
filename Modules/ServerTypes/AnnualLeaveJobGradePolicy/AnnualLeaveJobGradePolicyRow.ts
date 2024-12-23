import { fieldsProxy } from "@serenity-is/corelib/q";

export interface AnnualLeaveJobGradePolicyRow {
    Id?: number;
    Year?: number;
    JobGradeLevel?: number;
    EligibleDays?: number;
    MaximumAccumulated?: number;
    CompanySettingID?: number;
    JobGradeName?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class AnnualLeaveJobGradePolicyRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'AnnualLeaveJobGradePolicy.AnnualLeaveJobGradePolicy';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<AnnualLeaveJobGradePolicyRow>();
}