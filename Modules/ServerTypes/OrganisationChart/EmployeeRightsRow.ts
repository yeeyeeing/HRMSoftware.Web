import { fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeRightsRow {
    Id?: number;
    EmployeeRowId?: number;
    Appraisal?: boolean;
    LeaveApproval?: boolean;
    OtApproval?: boolean;
    MoneyClaiming?: boolean;
    Training?: boolean;
    NodeId?: string;
}

export abstract class EmployeeRightsRow {
    static readonly idProperty = 'Id';
    static readonly localTextPrefix = 'OrganisationChart.EmployeeRights';
    static readonly deletePermission = 'Administration:Employee';
    static readonly insertPermission = 'Administration:Employee';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:Employee';

    static readonly Fields = fieldsProxy<EmployeeRightsRow>();
}