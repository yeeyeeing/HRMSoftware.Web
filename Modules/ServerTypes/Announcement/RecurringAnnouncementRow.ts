import { AnnouncementGeneratedRow } from "./AnnouncementGeneratedRow";
import { fieldsProxy } from "@serenity-is/corelib/q";

export interface RecurringAnnouncementRow {
    AnnouncementList?: AnnouncementGeneratedRow[];
    All?: boolean;
    Id?: number;
    StartingDateTime?: string;
    AnnouncementContent?: string;
    UploadDocument?: string;
    RecurringTime?: string;
    Remarks?: string;
    IntervalInDays?: number;
    Name?: string;
    DaysOfWeekRecurring?: boolean;
    DaysPerRecurring?: boolean;
    Sunday?: boolean;
    Monday?: boolean;
    Tuesday?: boolean;
    Wednesday?: boolean;
    Thursday?: boolean;
    Friday?: boolean;
    Saturday?: boolean;
    OccupationListActual?: number[];
    DepartmentListActual?: number[];
    DivisionListActual?: number[];
    JobGradeListActual?: number[];
    SectionListActual?: number[];
    EmployeeListActual?: number[];
    BindToOccupation?: boolean;
    BindToDepartment?: boolean;
    BindToDivision?: boolean;
    BindToJobGrade?: boolean;
    BindToSection?: boolean;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class RecurringAnnouncementRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'Announcement.RecurringAnnouncement';
    static readonly deletePermission = 'Administration:Employee';
    static readonly insertPermission = 'Administration:Employee';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:Employee';

    static readonly Fields = fieldsProxy<RecurringAnnouncementRow>();
}