﻿import { MaritalStatus } from "../EmployeeProfile/MaritalStatus";
import { EPFClass } from "../EmployeeProfile/EPFClass";
import { SOCSOClass } from "../EmployeeProfile/SOCSOClass";
import { EISClass } from "../EmployeeProfile/EISClass";
import { PayrollEarningsRow } from "./PayrollEarningsRow";
import { PayrollDeductionsRow } from "./PayrollDeductionsRow";
import { PayslipDeductedOneTimeDeductionsRow } from "./PayslipDeductedOneTimeDeductionsRow";
import { PayslipPaidOneTimeAllowanceRow } from "./PayslipPaidOneTimeAllowanceRow";
import { PayslipPaidMoneyClaimingRow } from "./PayslipPaidMoneyClaimingRow";
import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface PayrollRow {
    NPLHourlyRate?: number;
    NPLDailyRate?: number;
    NPLHourly?: number;
    NPLDaily?: number;
    AbsentDaily?: number;
    AbsentDailyRate?: number;
    EarlyLeavingRate?: number;
    LateArrivalRate?: number;
    EarlyLeaving?: number;
    LateArrival?: number;
    FlatOt?: number;
    OtOne?: number;
    OtOnePointFive?: number;
    OtTwo?: number;
    ChildrenUnderEighteen?: number;
    ChildrenInUniversity?: number;
    DisabledChildInUniversity?: number;
    DisabledChild?: number;
    WorkingSpouse?: boolean;
    MaritalStatus?: MaritalStatus;
    OtSubjectEpf?: boolean;
    OtSubjectEis?: boolean;
    OtSubjectPcb?: boolean;
    OtSubjectSocso?: boolean;
    OtSubjectHrdf?: boolean;
    EpfClass?: EPFClass;
    SocsoClass?: SOCSOClass;
    EisClass?: EISClass;
    TaxClass?: number;
    DaysWorked?: number;
    DailyRate?: number;
    HourlyRate?: number;
    PayrollEarnings?: PayrollEarningsRow[];
    PayrollDeductions?: PayrollDeductionsRow[];
    DeductionList?: PayslipDeductedOneTimeDeductionsRow[];
    AllowanceList?: PayslipPaidOneTimeAllowanceRow[];
    PaidMoneyClaimingList?: PayslipPaidMoneyClaimingRow[];
    BasicPay?: number;
    SocsoAllowance?: number;
    EisAllowance?: number;
    EpfAllowance?: number;
    HrdfAllowance?: number;
    PcbAllowance?: number;
    Id?: number;
    PayMonth?: number;
    PayYear?: number;
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
    PayslipPath?: string;
    EmployeeRowId?: number;
    EmployeeName?: string;
    EmployeeId?: string;
    PayrollTable?: string;
    BirthDay?: string;
    Age?: number;
    PayDate?: string;
    PayPeriodStart?: string;
    PayPeriodEnd?: string;
    Deduction?: number;
    Earnings?: number;
    Nett?: number;
    EmployeeEPF?: number;
    EmployeeEIS?: number;
    EmployeeSOCSO?: number;
    EmployeePCB?: number;
    EmployerHRDF?: number;
    EmployerEPF?: number;
    EmployerEIS?: number;
    EmployerSOCSO?: number;
    NumberOfWorkingDays?: number;
    OtOnePointFiveRate?: number;
    OtTwoRate?: number;
    Remarks?: string;
    EmployerTable?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PayrollRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'PayMonth';
    static readonly localTextPrefix = 'PayrollSettings.Payroll';
    static readonly lookupKey = 'Payroll.Payroll';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<PayrollRow>('Payroll.Payroll') }
    static async getLookupAsync() { return getLookupAsync<PayrollRow>('Payroll.Payroll') }

    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<PayrollRow>();
}