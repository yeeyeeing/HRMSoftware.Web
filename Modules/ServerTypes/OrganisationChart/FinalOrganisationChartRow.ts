import { fieldsProxy } from "@serenity-is/corelib/q";

export interface FinalOrganisationChartRow {
    Id?: number;
    FinalOrgChart?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class FinalOrganisationChartRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'FinalOrgChart';
    static readonly localTextPrefix = 'OrganisationChart.FinalOrganisationChart';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<FinalOrganisationChartRow>();
}