import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface PerformanceAppraisalTemplateRow {
    Id?: number;
    TemplateName?: string;
    Duration?: number;
    RatingScale?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PerformanceAppraisalTemplateRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'TemplateName';
    static readonly localTextPrefix = 'PerformanceAppraisal.PerformanceAppraisalTemplate';
    static readonly lookupKey = 'PerformanceAppraisal.PerformanceAppraisalTemplate';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<PerformanceAppraisalTemplateRow>('PerformanceAppraisal.PerformanceAppraisalTemplate') }
    static async getLookupAsync() { return getLookupAsync<PerformanceAppraisalTemplateRow>('PerformanceAppraisal.PerformanceAppraisalTemplate') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<PerformanceAppraisalTemplateRow>();
}