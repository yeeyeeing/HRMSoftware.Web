import { PerformanceAppraisalFormStatus } from "../Web/Modules.PerformanceAppraisal.PerformanceAppraisalForm.PerformanceAppraisalFormStatus";
import { fieldsProxy } from "@serenity-is/corelib/q";

export interface PerformanceAppraisalFormRow {
    Id?: number;
    TemplateId?: number;
    TemplateName?: string;
    HodId?: number;
    EmployeeRowId?: number;
    EmployeeName?: string;
    EmployeeId?: string;
    TypeId?: number;
    TypeName?: string;
    StartDate?: string;
    EndDate?: string;
    EvaluateStartDate?: string;
    EvaluateEndDate?: string;
    ApprovalStartDate?: string;
    ApprovalEndDate?: string;
    SubmissionStatus?: PerformanceAppraisalFormStatus;
    ReviewStatus?: PerformanceAppraisalFormStatus;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PerformanceAppraisalFormRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'PerformanceAppraisal.PerformanceAppraisalForm';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<PerformanceAppraisalFormRow>();
}