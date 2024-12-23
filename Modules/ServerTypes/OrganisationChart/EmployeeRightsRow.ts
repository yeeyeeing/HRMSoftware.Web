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
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<EmployeeRightsRow>();
}