﻿import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface SectionRow {
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

export abstract class SectionRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'OrganisationHierarchy.Section';
    static readonly lookupKey = 'Section.Section';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<SectionRow>('Section.Section') }
    static async getLookupAsync() { return getLookupAsync<SectionRow>('Section.Section') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<SectionRow>();
}