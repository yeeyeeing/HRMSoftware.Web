import { fieldsProxy } from "@serenity-is/corelib/q";

export interface PerformanceAppraisalTemplateDepartmentRow {
    Id?: number;
    TemplateId?: number;
    DepartmentId?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PerformanceAppraisalTemplateDepartmentRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'PerformanceAppraisal.PerformanceAppraisalTemplateDepartment';
    static readonly deletePermission = 'Administration:General';
    static readonly insertPermission = 'Administration:General';
    static readonly readPermission = 'Administration:General';
    static readonly updatePermission = 'Administration:General';

    static readonly Fields = fieldsProxy<PerformanceAppraisalTemplateDepartmentRow>();
}