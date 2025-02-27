import { fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeCareerPathRow {
    ManDesc?: string;
    Id?: number;
    Executed?: number;
    CategoryId?: number;
    careerPaathType?: number;
    Description?: string;
    CareerPathCode?: string;
    ValueString?: string;
    EmployeeName?: string;
    CareerPathId?: number;
    EffectiveDate?: string;
    oldValue?: number;
    NewValue?: number;
    EmployeeRowId?: number;
    oldDivision?: number;
    oldDepartment?: number;
    oldSection?: number;
    oldOccupation?: number;
    oldJobGrade?: number;
    oldCostCentre?: number;
    newDivision?: number;
    newDepartment?: number;
    newSection?: number;
    newOccupation?: number;
    newJobGrade?: number;
    newCostCentre?: number;
    Division?: string;
    DepartmentDept?: string;
    Section?: string;
    Occupation?: string;
    JobGrade?: string;
    CostCentreName?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class EmployeeCareerPathRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'EmployeeName';
    static readonly localTextPrefix = 'EmployeeProfile.EmployeeCareerPath';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<EmployeeCareerPathRow>();
}