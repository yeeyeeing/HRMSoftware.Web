import { EmployeeType } from "../EmployeeProfile/EmployeeType";
import { SexType } from "../EmployeeProfile/SexType";
import { MaritalStatus } from "../EmployeeProfile/MaritalStatus";
import { fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeBasicDataRow {
    Id?: number;
    EmployeeName?: string;
    EmployeeId?: string;
    Nric?: string;
    Age?: number;
    Birthday?: string;
    Address?: string;
    TelNumber1?: string;
    TelNumber2?: string;
    RaceId?: number;
    EmployeeType?: EmployeeType;
    Sex?: SexType;
    CityId?: number;
    StateId?: number;
    EmployeeImg?: string;
    NationalityId?: number;
    MaritalStatus?: MaritalStatus;
    Race?: string;
    CityName?: string;
    StateName?: string;
    NationalityName?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class EmployeeBasicDataRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'EmployeeName';
    static readonly localTextPrefix = 'EmployeeBasicData.EmployeeBasicData';
    static readonly deletePermission = 'Administration:Employee';
    static readonly insertPermission = 'Administration:Employee';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:Employee';

    static readonly Fields = fieldsProxy<EmployeeBasicDataRow>();
}