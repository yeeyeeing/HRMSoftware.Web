import { fieldsProxy } from "@serenity-is/corelib/q";

export interface WeeklyPayrollSettingsRow {
    Name?: string;
    Description?: string;
    EmployeeList?: number[];
    NewAddedEmployee?: number[];
    OccupationList?: number[];
    DepartmentList?: number[];
    DivisionList?: number[];
    JobGradeList?: number[];
    SectionList?: number[];
    CostCentreList?: number[];
    Id?: number;
    GenerateFirst?: boolean;
    GenerateSecond?: boolean;
    GenerateThird?: boolean;
    GenerateFourth?: boolean;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class WeeklyPayrollSettingsRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'PayrollSettings.WeeklyPayrollSettings';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<WeeklyPayrollSettingsRow>();
}