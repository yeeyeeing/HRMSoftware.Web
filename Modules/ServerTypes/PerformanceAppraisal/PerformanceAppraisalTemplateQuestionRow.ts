import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface PerformanceAppraisalTemplateQuestionRow {
    Id?: number;
    TemplateId?: number;
    QuestionId?: number;
    QuestionText?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PerformanceAppraisalTemplateQuestionRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'PerformanceAppraisal.PerformanceAppraisalTemplateQuestion';
    static readonly lookupKey = 'PerformanceAppraisal.PerformanceAppraisalTemplateQuestion';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<PerformanceAppraisalTemplateQuestionRow>('PerformanceAppraisal.PerformanceAppraisalTemplateQuestion') }
    static async getLookupAsync() { return getLookupAsync<PerformanceAppraisalTemplateQuestionRow>('PerformanceAppraisal.PerformanceAppraisalTemplateQuestion') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<PerformanceAppraisalTemplateQuestionRow>();
}