import { fieldsProxy } from "@serenity-is/corelib/q";

export interface WeeklyPayrollRow {
    Id?: number;
    WeekIndex?: number;
    EmployeeRowId?: number;
    PayDate?: string;
    Deduction?: number;
    Earnings?: number;
    Nett?: number;
    EmployeeSocso?: number;
    EmployeeEpf?: number;
    EmployeeEis?: number;
    PayrollTable?: string;
    Remarks?: string;
    PayPeriodStart?: string;
    PayPeriodEnd?: string;
    PayMonth?: number;
    PayYear?: number;
    DaysWorked?: number;
    DailyRate?: number;
    HourlyRate?: number;
    FlatOt?: number;
    OtOne?: number;
    OtOnePointFive?: number;
    OtTwo?: number;
    OtOnePointFiveRate?: number;
    OtTwoRate?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class WeeklyPayrollRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'PayrollTable';
    static readonly localTextPrefix = 'PayrollSettings.WeeklyPayroll';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:Employee';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<WeeklyPayrollRow>();
}