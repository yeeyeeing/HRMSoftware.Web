import { MasterCareerPathType } from "./MasterCareerPathType";
import { Category } from "./Category";
import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface MasterCareerPathRow {
    Id?: number;
    CareerPathType?: MasterCareerPathType;
    Description?: string;
    CareerPathCode?: string;
    CategoryId?: Category;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class MasterCareerPathRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'CareerPathCode';
    static readonly localTextPrefix = 'EmployeeProfile.MasterCareerPath';
    static readonly lookupKey = 'MasterCareerPath.MasterCareerPath';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<MasterCareerPathRow>('MasterCareerPath.MasterCareerPath') }
    static async getLookupAsync() { return getLookupAsync<MasterCareerPathRow>('MasterCareerPath.MasterCareerPath') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<MasterCareerPathRow>();
}