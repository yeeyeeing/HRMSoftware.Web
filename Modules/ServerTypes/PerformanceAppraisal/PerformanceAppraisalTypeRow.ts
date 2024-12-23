import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface PerformanceAppraisalTypeRow {
    Id?: number;
    Type?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PerformanceAppraisalTypeRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Type';
    static readonly localTextPrefix = 'PerformanceAppraisal.PerformanceAppraisalType';
    static readonly lookupKey = 'PerformanceAppraisal.PerformanceAppraisalType';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<PerformanceAppraisalTypeRow>('PerformanceAppraisal.PerformanceAppraisalType') }
    static async getLookupAsync() { return getLookupAsync<PerformanceAppraisalTypeRow>('PerformanceAppraisal.PerformanceAppraisalType') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<PerformanceAppraisalTypeRow>();
}