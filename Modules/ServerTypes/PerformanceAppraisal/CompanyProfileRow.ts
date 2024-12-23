import { fieldsProxy } from "@serenity-is/corelib/q";

export interface CompanyProfileRow {
    Id?: number;
    Title?: string;
    Address?: string;
    Tel?: string;
    Website?: string;
    Picture?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class CompanyProfileRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Title';
    static readonly localTextPrefix = 'PerformanceAppraisal.CompanyProfile';
    static readonly deletePermission = 'Administration:General';
    static readonly insertPermission = 'Administration:General';
    static readonly readPermission = 'Administration:General';
    static readonly updatePermission = 'Administration:General';

    static readonly Fields = fieldsProxy<CompanyProfileRow>();
}