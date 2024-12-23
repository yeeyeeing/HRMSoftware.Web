import { fieldsProxy } from "@serenity-is/corelib/q";

export interface OrganisationChartRow {
    Id?: number;
    OrgChart?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class OrganisationChartRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'OrgChart';
    static readonly localTextPrefix = 'OrganisationChart.OrganisationChart';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<OrganisationChartRow>();
}