import { fieldsProxy } from "@serenity-is/corelib/q";

export interface AnnouncementDepartmentBindedRow {
    Id?: number;
    AnnouncementWizardId?: number;
    DepartmentId?: number;
    AnnouncementRecurringId?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class AnnouncementDepartmentBindedRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'Announcement.AnnouncementDepartmentBinded';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<AnnouncementDepartmentBindedRow>();
}