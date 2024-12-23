import { fieldsProxy } from "@serenity-is/corelib/q";

export interface AnnouncementGeneratedRow {
    Immediate?: boolean;
    Delayed?: boolean;
    Remarks?: string;
    AnnouncementDateTime?: string;
    AnnouncementTime?: string;
    EmployeeID?: string;
    UploadDocument?: string;
    Id?: number;
    AnnouncementContent?: string;
    GeneratedWizardId?: number;
    GeneratedRecurringId?: number;
    Viewed?: number;
    EmployeeRowId?: number;
    EmployeeName?: string;
    ViewTime?: string;
    BindToOccupation?: boolean;
    BindToDepartment?: boolean;
    BindToDivision?: boolean;
    BindToJobGrade?: boolean;
    BindToSection?: boolean;
    EmployeeOccupation?: number;
    EmployeeDepartment?: number;
    EmployeeDivision?: number;
    EmployeeJobGrade?: number;
    EmployeeSection?: number;
    DepartmentDept?: string;
    Division?: string;
    Section?: string;
    JobGrade?: string;
    Occupation?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class AnnouncementGeneratedRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'Announcement.AnnouncementGenerated';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<AnnouncementGeneratedRow>();
}