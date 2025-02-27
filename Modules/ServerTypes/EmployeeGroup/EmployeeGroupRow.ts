import { EmployeeGroupShiftRow } from "./EmployeeGroupShiftRow";
import { EmployeeGroupShiftPatternRow } from "./EmployeeGroupShiftPatternRow";
import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeGroupRow {
    ShiftColor?: string;
    Id?: number;
    EmployeeList?: number[];
    NewAddedEmployee?: number[];
    Shifts?: EmployeeGroupShiftRow[];
    ActualShifts?: EmployeeGroupShiftPatternRow[];
    Name?: string;
    Description?: string;
    StartDate?: string;
    EndDate?: string;
    OccupationList?: number[];
    DepartmentList?: number[];
    DivisionList?: number[];
    JobGradeList?: number[];
    SectionList?: number[];
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class EmployeeGroupRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'EmployeeGroup.EmployeeGroup';
    static readonly lookupKey = 'EmployeeGroup.EmployeeGroup';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<EmployeeGroupRow>('EmployeeGroup.EmployeeGroup') }
    static async getLookupAsync() { return getLookupAsync<EmployeeGroupRow>('EmployeeGroup.EmployeeGroup') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<EmployeeGroupRow>();
}