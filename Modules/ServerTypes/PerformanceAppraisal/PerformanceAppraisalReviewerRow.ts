﻿import { fieldsProxy } from "@serenity-is/corelib/q";

export interface PerformanceAppraisalReviewerRow {
    Id?: number;
    FormId?: number;
    EmployeeRowId?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PerformanceAppraisalReviewerRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'PerformanceAppraisal.PerformanceAppraisalReviewer';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<PerformanceAppraisalReviewerRow>();
}