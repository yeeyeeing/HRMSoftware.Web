import { AnnouncementGeneratedRow } from "./AnnouncementGeneratedRow";
import { fieldsProxy } from "@serenity-is/corelib/q";

export interface AnnouncementWizardRow {
    Immediate?: boolean;
    Delayed?: boolean;
    Remarks?: string;
    Today?: string;
    AnnouncementDateTime?: string;
    AnnouncementTime?: string;
    All?: boolean;
    EmployeeRowList?: number[];
    AnnouncementList?: AnnouncementGeneratedRow[];
    Id?: number;
    AnnouncementContent?: string;
    UploadDocument?: string;
    IssuedBy?: number;
    OccupationListActual?: number[];
    DepartmentListActual?: number[];
    DivisionListActual?: number[];
    JobGradeListActual?: number[];
    SectionListActual?: number[];
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

export abstract class AnnouncementWizardRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'AnnouncementContent';
    static readonly localTextPrefix = 'Announcement.AnnouncementWizard';
    static readonly deletePermission = 'Administration:Employee';
    static readonly insertPermission = 'Administration:Employee';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:Employee';

    static readonly Fields = fieldsProxy<AnnouncementWizardRow>();
}