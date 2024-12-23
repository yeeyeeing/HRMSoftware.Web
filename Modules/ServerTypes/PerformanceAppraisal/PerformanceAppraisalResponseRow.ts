import { fieldsProxy } from "@serenity-is/corelib/q";

export interface PerformanceAppraisalResponseRow {
    Id?: number;
    QuestionId?: number;
    FormId?: number;
    Question?: string;
    AnswerType?: string;
    Answer?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PerformanceAppraisalResponseRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'PerformanceAppraisal.PerformanceAppraisalResponse';
    static readonly deletePermission = 'Administration:Employee';
    static readonly insertPermission = 'Administration:Employee';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:Employee';

    static readonly Fields = fieldsProxy<PerformanceAppraisalResponseRow>();
}