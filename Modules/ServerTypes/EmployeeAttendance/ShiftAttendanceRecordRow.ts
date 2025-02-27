import { fieldsProxy } from "@serenity-is/corelib/q";

export interface ShiftAttendanceRecordRow {
    Id?: number;
    EmployeeRowId?: number;
    TimeIn?: string;
    TimeOut?: string;
    startDate?: string;
    endDate?: string;
    TimeInHour?: string;
    TimeOutHour?: string;
    ShiftId?: number;
    ShiftName?: string;
    EmpRemark?: string;
    SupRemark?: string;
    LvPhRemark?: string;
    LateIn?: number;
    Ot?: number;
    EarlyLeave?: number;
    TimeInRowId?: number;
    TimeOutRowId?: number;
    ShiftDate?: string;
    ShiftStartTime?: string;
    ShiftEndTime?: string;
    ShiftStartTimeHour?: string;
    ShiftEndTimeHour?: string;
    EmployeeID?: string;
    EmployeeName?: string;
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
    EmployeeRowListBuffer?: number[];
    EmployeeRowList?: number[];
    OccupationList?: number[];
    DepartmentList?: number[];
    DivisionList?: number[];
    JobGradeList?: number[];
    SectionList?: number[];
}

export abstract class ShiftAttendanceRecordRow {
    static readonly idProperty = 'Id';
    static readonly nameProperty = 'EmployeeRowId';
    static readonly localTextPrefix = 'EmployeeAttendance.ShiftAttendanceRecord';
    static readonly deletePermission = 'Administration:Employee';
    static readonly insertPermission = 'Administration:Employee';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:Employee';

    static readonly Fields = fieldsProxy<ShiftAttendanceRecordRow>();
}