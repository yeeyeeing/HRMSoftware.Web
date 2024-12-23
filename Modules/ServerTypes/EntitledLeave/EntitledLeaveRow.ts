import { fieldsProxy } from "@serenity-is/corelib/q";

export interface EntitledLeaveRow {
    DepartmentID?: number;
    DepartmentName?: string;
    DivisionID?: number;
    DivisionName?: string;
    OccupationID?: number;
    OccupationName?: string;
    JobGradeID?: number;
    JobGradeName?: string;
    Id?: number;
    BringForward?: number;
    EmployeeRowId?: number;
    EmployeeName?: string;
    EmployeeID?: string;
    CurrentPolicyEndDate?: string;
    EntitledHospitalisationLeave?: number;
    EntitledMarriageLeave?: number;
    EntitledMaternityLeave?: number;
    EntitledPaternityLeave?: number;
    EntitledSickLeave?: number;
    EntitledAnnualLeave?: number;
    NextEntitlementDate?: string;
    EntitledCompassionateLeave?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class EntitledLeaveRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'EntitledAnnualLeave';
    static readonly localTextPrefix = 'EntitledLeave.EntitledLeave';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<EntitledLeaveRow>();
}