﻿import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface PublicHolidayRow {
    Id?: number;
    IsActive?: number;
    Name?: string;
    Date?: string;
    CountryCode?: string;
}

export abstract class PublicHolidayRow {
    static readonly idProperty = 'Id';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'PublicHoliday.PublicHoliday';
    static readonly lookupKey = 'PublicHoliday.PublicHoliday';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<PublicHolidayRow>('PublicHoliday.PublicHoliday') }
    static async getLookupAsync() { return getLookupAsync<PublicHolidayRow>('PublicHoliday.PublicHoliday') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<PublicHolidayRow>();
}