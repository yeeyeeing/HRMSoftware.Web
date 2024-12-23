import { fieldsProxy } from "@serenity-is/corelib/q";

export interface PerformanceAppraisalEvaluationRow {
    Id?: number;
    FormId?: number;
    Evaluation?: string;
    Goals?: string;
    Summary?: string;
    BonusRate?: number;
    OverallRate?: number;
    EmployeeSignature?: string;
    HodSignature?: string;
    GeneralManagerSignature?: string;
    EmployeeSignDate?: string;
    HodSignDate?: string;
    GeneralManagerSignDate?: string;
    EmployeeSignID?: number;
    HodSignID?: number;
    GeneralManagerSignID?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PerformanceAppraisalEvaluationRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Evaluation';
    static readonly localTextPrefix = 'PerformanceAppraisal.PerformanceAppraisalEvaluation';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<PerformanceAppraisalEvaluationRow>();
}