import { fieldsProxy } from "@serenity-is/corelib/q";

export interface PayrollGeneratingWizardRow {
    PayMonth?: number;
    PayYear?: number;
    Download?: boolean;
    EmployeeRowListBuffer?: number[];
    EmployeeRowList?: number[];
    OccupationList?: number[];
    DepartmentList?: number[];
    DivisionList?: number[];
    JobGradeList?: number[];
    SectionList?: number[];
    PayslipList?: string;
    Id?: number;
    EmployeeRowId?: number;
    EmployeeId?: string;
    PayDate?: string;
    Deduction?: number;
    Earnings?: number;
    Nett?: number;
    EmployeeName?: string;
    EmployeeSocso?: number;
    EmployeeEpf?: number;
    EmployeeEis?: number;
    PayrollTable?: string;
    Remarks?: string;
    EmployeePcb?: number;
    EmployerHrdf?: number;
    EmployerEpf?: number;
    EmployerEis?: number;
    EmployerSocso?: number;
    EmployerTable?: string;
    PayPeriodStart?: string;
    PayPeriodEnd?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PayrollGeneratingWizardRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'EmployeeId';
    static readonly localTextPrefix = 'PayrollSettings.PayrollGeneratingWizard';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<PayrollGeneratingWizardRow>();
}