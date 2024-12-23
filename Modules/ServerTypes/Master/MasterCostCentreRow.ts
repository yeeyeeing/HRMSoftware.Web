import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface MasterCostCentreRow {
    Id?: number;
    Name?: string;
    Description?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class MasterCostCentreRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'Master.MasterCostCentre';
    static readonly lookupKey = 'MasterCostCentre.MasterCostCentre';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<MasterCostCentreRow>('MasterCostCentre.MasterCostCentre') }
    static async getLookupAsync() { return getLookupAsync<MasterCostCentreRow>('MasterCostCentre.MasterCostCentre') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<MasterCostCentreRow>();
}