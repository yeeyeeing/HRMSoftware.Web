import { fieldsProxy } from "@serenity-is/corelib/q";

export interface AnnouncementRow {
    Id?: number;
    Hide?: number;
    AnnouncerEmployeeRowId?: number;
    AnnouncerName?: string;
    AnnouncerID?: string;
    AnnouncementContent?: string;
    UploadDocument?: string;
    EmployeeRowId?: number;
    ViewTime?: string;
    Viewed?: number;
    AnnouncementDateTime?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class AnnouncementRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'Announcement.Announcement';
    static readonly deletePermission = 'Administration:Employee';
    static readonly insertPermission = 'Administration:Employee';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:Employee';

    static readonly Fields = fieldsProxy<AnnouncementRow>();
}