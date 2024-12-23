import { PerformanceAppraisalQuestionAnswerType } from "./PerformanceAppraisalQuestionAnswerType";
import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface PerformanceAppraisalQuestionRow {
    Id?: number;
    Questions?: string;
    AnswerType?: PerformanceAppraisalQuestionAnswerType;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PerformanceAppraisalQuestionRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Questions';
    static readonly localTextPrefix = 'PerformanceAppraisal.PerformanceAppraisalQuestion';
    static readonly lookupKey = 'PerformanceAppraisal.PerformanceAppraisalQuestion';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<PerformanceAppraisalQuestionRow>('PerformanceAppraisal.PerformanceAppraisalQuestion') }
    static async getLookupAsync() { return getLookupAsync<PerformanceAppraisalQuestionRow>('PerformanceAppraisal.PerformanceAppraisalQuestion') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<PerformanceAppraisalQuestionRow>();
}