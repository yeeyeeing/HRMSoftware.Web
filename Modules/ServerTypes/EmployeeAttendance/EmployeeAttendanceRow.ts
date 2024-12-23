import { fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeAttendanceRow {
    DepartmentID?: number;
    DepartmentName?: string;
    DivisionID?: number;
    DivisionName?: string;
    OccupationID?: number;
    OccupationName?: string;
    JobGradeID?: number;
    JobGradeName?: string;
    Id?: number;
    AuthenticationTime?: string;
    AuthenticationDateTime?: string;
    AuthenticationDate?: string;
    DeviceName?: string;
    DeviceSerial?: string;
    CardNo?: string;
    Direction?: string;
    LateIn?: number;
    Ot?: number;
    Processed?: number;
    EmployeeId?: string;
    EmployeeName?: string;
    EmployeeRowID?: number;
    PersonName?: string;
    EarlyLeave?: number;
    AuthenticationSecond?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class EmployeeAttendanceRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'AuthenticationDateTime';
    static readonly localTextPrefix = 'EmployeeAttendance.EmployeeAttendance';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<EmployeeAttendanceRow>();
}