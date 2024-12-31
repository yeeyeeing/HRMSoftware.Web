import { LookupEditor, StringEditor, IntegerEditor, DateEditor, TextAreaEditor, DecimalEditor, EnumEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { EISClass } from "../EmployeeProfile/EISClass";
import { SOCSOClass } from "../EmployeeProfile/SOCSOClass";
import { EPFClass } from "../EmployeeProfile/EPFClass";
import { HRDFClass } from "../EmployeeProfile/HRDFClass";
import { MaritalStatus } from "../EmployeeProfile/MaritalStatus";
import { MoneyClaimApplicationEditor } from "@/HumanResource/MoneyClaimApplication/MoneyClaimApplication/MoneyClaimApplicationEditor";
import { PayslipPaidOneTimeAllowance } from "@/HumanResource/PayrollSettings/PayslipPaidOneTimeAllowance/PayslipPaidOneTimeAllowanceEditor";
import { PayslipDeductedOneTimeDeductions } from "@/HumanResource/PayrollSettings/PayslipDeductedOneTimeDeductions/PayslipDeductedOneTimeDeductionsEditor";
import { PayrollEarningsEditor } from "@/HumanResource/PayrollSettings/PayrollEarnings/PayrollEarningsEditor";
import { PayrollDeductionsEditor } from "@/HumanResource/PayrollSettings/PayrollDeductions/PayrollDeductionsEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface PayrollForm {
    EmployeeRowId: LookupEditor;
    EmployeeName: StringEditor;
    PayMonth: IntegerEditor;
    PayYear: IntegerEditor;
    PayDate: DateEditor;
    PayPeriodStart: DateEditor;
    PayPeriodEnd: DateEditor;
    Remarks: TextAreaEditor;
    DaysWorked: DecimalEditor;
    BasicPay: DecimalEditor;
    DailyRate: DecimalEditor;
    HourlyRate: DecimalEditor;
    Age: DecimalEditor;
    BirthDay: DateEditor;
    EisClass: EnumEditor;
    SocsoClass: EnumEditor;
    EpfClass: EnumEditor;
    HrdfClass: EnumEditor;
    TaxClass: IntegerEditor;
    MaritalStatus: EnumEditor;
    WorkingSpouse: BooleanEditor;
    ChildrenUnderEighteen: DecimalEditor;
    ChildrenInUniversity: DecimalEditor;
    DisabledChild: DecimalEditor;
    DisabledChildInUniversity: DecimalEditor;
    EarlyLeavingRate: DecimalEditor;
    LateArrivalRate: DecimalEditor;
    EarlyLeaving: DecimalEditor;
    LateArrival: DecimalEditor;
    FlatOt: DecimalEditor;
    OtOnePointFiveRate: DecimalEditor;
    OtTwoRate: DecimalEditor;
    OtOne: DecimalEditor;
    OtOnePointFive: DecimalEditor;
    OtTwo: DecimalEditor;
    NPLHourlyRate: DecimalEditor;
    NPLDailyRate: DecimalEditor;
    NPLHourly: DecimalEditor;
    NPLDaily: DecimalEditor;
    AbsentDailyRate: DecimalEditor;
    AbsentDaily: DecimalEditor;
    OtSubjectEpf: BooleanEditor;
    OtSubjectEis: BooleanEditor;
    OtSubjectPcb: BooleanEditor;
    OtSubjectSocso: BooleanEditor;
    OtSubjectHrdf: BooleanEditor;
    PaidMoneyClaimingList: MoneyClaimApplicationEditor;
    AllowanceList: PayslipPaidOneTimeAllowance;
    DeductionList: PayslipDeductedOneTimeDeductions;
    PayrollEarnings: PayrollEarningsEditor;
    PayrollDeductions: PayrollDeductionsEditor;
    Deduction: DecimalEditor;
    Earnings: DecimalEditor;
    Nett: DecimalEditor;
    EmployeeEIS: DecimalEditor;
    EmployeePCB: DecimalEditor;
    EmployeeSOCSO: DecimalEditor;
    EmployeeEPF: DecimalEditor;
    EmployerHRDF: DecimalEditor;
    EmployerEPF: DecimalEditor;
    EmployerEIS: DecimalEditor;
    EmployerSOCSO: DecimalEditor;
}

export class PayrollForm extends PrefixedContext {
    static formKey = 'PayrollSettings.Payroll';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PayrollForm.init)  {
            PayrollForm.init = true;

            var w0 = LookupEditor;
            var w1 = StringEditor;
            var w2 = IntegerEditor;
            var w3 = DateEditor;
            var w4 = TextAreaEditor;
            var w5 = DecimalEditor;
            var w6 = EnumEditor;
            var w7 = BooleanEditor;
            var w8 = MoneyClaimApplicationEditor;
            var w9 = PayslipPaidOneTimeAllowance;
            var w10 = PayslipDeductedOneTimeDeductions;
            var w11 = PayrollEarningsEditor;
            var w12 = PayrollDeductionsEditor;

            initFormType(PayrollForm, [
                'EmployeeRowId', w0,
                'EmployeeName', w1,
                'PayMonth', w2,
                'PayYear', w2,
                'PayDate', w3,
                'PayPeriodStart', w3,
                'PayPeriodEnd', w3,
                'Remarks', w4,
                'DaysWorked', w5,
                'BasicPay', w5,
                'DailyRate', w5,
                'HourlyRate', w5,
                'Age', w5,
                'BirthDay', w3,
                'EisClass', w6,
                'SocsoClass', w6,
                'EpfClass', w6,
                'HrdfClass', w6,
                'TaxClass', w2,
                'MaritalStatus', w6,
                'WorkingSpouse', w7,
                'ChildrenUnderEighteen', w5,
                'ChildrenInUniversity', w5,
                'DisabledChild', w5,
                'DisabledChildInUniversity', w5,
                'EarlyLeavingRate', w5,
                'LateArrivalRate', w5,
                'EarlyLeaving', w5,
                'LateArrival', w5,
                'FlatOt', w5,
                'OtOnePointFiveRate', w5,
                'OtTwoRate', w5,
                'OtOne', w5,
                'OtOnePointFive', w5,
                'OtTwo', w5,
                'NPLHourlyRate', w5,
                'NPLDailyRate', w5,
                'NPLHourly', w5,
                'NPLDaily', w5,
                'AbsentDailyRate', w5,
                'AbsentDaily', w5,
                'OtSubjectEpf', w7,
                'OtSubjectEis', w7,
                'OtSubjectPcb', w7,
                'OtSubjectSocso', w7,
                'OtSubjectHrdf', w7,
                'PaidMoneyClaimingList', w8,
                'AllowanceList', w9,
                'DeductionList', w10,
                'PayrollEarnings', w11,
                'PayrollDeductions', w12,
                'Deduction', w5,
                'Earnings', w5,
                'Nett', w5,
                'EmployeeEIS', w5,
                'EmployeePCB', w5,
                'EmployeeSOCSO', w5,
                'EmployeeEPF', w5,
                'EmployerHRDF', w5,
                'EmployerEPF', w5,
                'EmployerEIS', w5,
                'EmployerSOCSO', w5
            ]);
        }
    }
}

[EISClass, SOCSOClass, EPFClass, HRDFClass, MaritalStatus]; // referenced types