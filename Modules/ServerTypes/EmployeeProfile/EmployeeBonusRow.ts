import { fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeBonusRow {
    CostCentreID?: number;
    CostCentreName?: string;
    DepartmentID?: number;
    DepartmentName?: string;
    DivisionID?: number;
    DivisionName?: string;
    OccupationID?: number;
    OccupationName?: string;
    JobGradeID?: number;
    JobGradeName?: string;
    SectionID?: number;
    SectionName?: string;
    Id?: number;
    EmployeeRowId?: number;
    BonusAmount?: number;
    BonusDescription?: string;
    PayMonth?: number;
    PayYear?: number;
    EmployeeName?: string;
    EmployeeID?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class EmployeeBonusRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'EmployeeName';
    static readonly localTextPrefix = 'EmployeeProfile.EmployeeBonus';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<EmployeeBonusRow>();
}