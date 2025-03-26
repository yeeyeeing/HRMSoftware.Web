import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface JobGradeRow {
    Id?: number;
    Name?: string;
    Description?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class JobGradeRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'OrganisationHierarchy.JobGrade';
    static readonly lookupKey = 'JobGrade.JobGrade';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<JobGradeRow>('JobGrade.JobGrade') }
    static async getLookupAsync() { return getLookupAsync<JobGradeRow>('JobGrade.JobGrade') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<JobGradeRow>();
}