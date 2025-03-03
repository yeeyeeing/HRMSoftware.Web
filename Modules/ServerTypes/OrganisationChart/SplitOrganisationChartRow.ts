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
    childrenIndex?: number;
    ElementRowId?: number;
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
    static readonly deletePermission = 'Administration:Employee';
    static readonly insertPermission = 'Administration:Employee';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:Employee';

    static readonly Fields = fieldsProxy<SplitOrganisationChartRow>();
}