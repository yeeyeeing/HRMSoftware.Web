import { fieldsProxy } from "@serenity-is/corelib/q";

export interface SplitOrganisationChartRow {
    Id?: number;
    ParentId?: string;
    NodeId?: string;
    Name?: string;
    Title?: string;
    ClassName?: string;
    HierarchyLevel?: number;
    EmployeeRowId?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class SplitOrganisationChartRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'ParentId';
    static readonly localTextPrefix = 'OrganisationChart.SplitOrganisationChart';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<SplitOrganisationChartRow>();
}