import { fieldsProxy } from "@serenity-is/corelib/q";

export interface PerformanceAppraisalFileAttachRow {
    Id?: number;
    Files?: string;
    Remark?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PerformanceAppraisalFileAttachRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Files';
    static readonly localTextPrefix = 'PerformanceAppraisal.PerformanceAppraisalFileAttach';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<PerformanceAppraisalFileAttachRow>();
}