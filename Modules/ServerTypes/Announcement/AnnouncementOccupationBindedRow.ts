import { fieldsProxy } from "@serenity-is/corelib/q";

export interface AnnouncementOccupationBindedRow {
    Id?: number;
    AnnouncementWizardId?: number;
    OccupationId?: number;
    AnnouncementRecurringId?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class AnnouncementOccupationBindedRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'Announcement.AnnouncementOccupationBinded';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<AnnouncementOccupationBindedRow>();
}