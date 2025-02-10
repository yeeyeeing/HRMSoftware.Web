import { BooleanEditor, DecimalEditor, LookupEditor, StringEditor, IntegerEditor, DateEditor, TextAreaEditor, EnumEditor, PrefixedContext } from "@serenity-is/corelib";
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
    IncentiveSubjectEpf: BooleanEditor;
    IncentiveSubjectEis: BooleanEditor;
    IncentiveSubjectPcb: BooleanEditor;
    IncentiveSubjectSocso: BooleanEditor;
    IncentiveSubjectHrdf: BooleanEditor;
    BonusSubjectEpf: BooleanEditor;
    BonusSubjectEis: BooleanEditor;
    BonusSubjectPcb: BooleanEditor;
    BonusSubjectSocso: BooleanEditor;
    BonusSubjectHrdf: BooleanEditor;
    AnnualizedIncentive: BooleanEditor;
    SeperateIncentive: BooleanEditor;
    AnnualizedBonus: BooleanEditor;
    SeperateBonus: BooleanEditor;
    EmployeeCp38: DecimalEditor;
    EmployeeRowId: LookupEditor;
    EmployeeName: StringEditor;
    PayMonth: IntegerEditor;
    PayYear: IntegerEditor;
    PayDate: DateEditor;
    PayPeriodStart: DateEditor;
    PayPeriodEnd: DateEditor;
    Remarks: TextAreaEditor;
    HrdfWages: DecimalEditor;
    PcbWages: DecimalEditor;
    EisWages: DecimalEditor;
    SocsoWages: DecimalEditor;
    EpfWages: DecimalEditor;
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
    Bonus: DecimalEditor;
    Incentive: DecimalEditor;
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

            var w0 = BooleanEditor;
            var w1 = DecimalEditor;
            var w2 = LookupEditor;
            var w3 = StringEditor;
            var w4 = IntegerEditor;
            var w5 = DateEditor;
            var w6 = TextAreaEditor;
            var w7 = EnumEditor;
            var w8 = MoneyClaimApplicationEditor;
            var w9 = PayslipPaidOneTimeAllowance;
            var w10 = PayslipDeductedOneTimeDeductions;
            var w11 = PayrollEarningsEditor;
            var w12 = PayrollDeductionsEditor;

            initFormType(PayrollForm, [
                'IncentiveSubjectEpf', w0,
                'IncentiveSubjectEis', w0,
                'IncentiveSubjectPcb', w0,
                'IncentiveSubjectSocso', w0,
                'IncentiveSubjectHrdf', w0,
                'BonusSubjectEpf', w0,
                'BonusSubjectEis', w0,
                'BonusSubjectPcb', w0,
                'BonusSubjectSocso', w0,
                'BonusSubjectHrdf', w0,
                'AnnualizedIncentive', w0,
                'SeperateIncentive', w0,
                'AnnualizedBonus', w0,
                'SeperateBonus', w0,
                'EmployeeCp38', w1,
                'EmployeeRowId', w2,
                'EmployeeName', w3,
                'PayMonth', w4,
                'PayYear', w4,
                'PayDate', w5,
                'PayPeriodStart', w5,
                'PayPeriodEnd', w5,
                'Remarks', w6,
                'HrdfWages', w1,
                'PcbWages', w1,
                'EisWages', w1,
                'SocsoWages', w1,
                'EpfWages', w1,
                'DaysWorked', w1,
                'BasicPay', w1,
                'DailyRate', w1,
                'HourlyRate', w1,
                'Age', w1,
                'BirthDay', w5,
                'EisClass', w7,
                'SocsoClass', w7,
                'EpfClass', w7,
                'HrdfClass', w7,
                'TaxClass', w4,
                'MaritalStatus', w7,
                'WorkingSpouse', w0,
                'ChildrenUnderEighteen', w1,
                'ChildrenInUniversity', w1,
                'DisabledChild', w1,
                'DisabledChildInUniversity', w1,
                'Bonus', w1,
                'Incentive', w1,
                'EarlyLeavingRate', w1,
                'LateArrivalRate', w1,
                'EarlyLeaving', w1,
                'LateArrival', w1,
                'FlatOt', w1,
                'OtOnePointFiveRate', w1,
                'OtTwoRate', w1,
                'OtOne', w1,
                'OtOnePointFive', w1,
                'OtTwo', w1,
                'NPLHourlyRate', w1,
                'NPLDailyRate', w1,
                'NPLHourly', w1,
                'NPLDaily', w1,
                'AbsentDailyRate', w1,
                'AbsentDaily', w1,
                'OtSubjectEpf', w0,
                'OtSubjectEis', w0,
                'OtSubjectPcb', w0,
                'OtSubjectSocso', w0,
                'OtSubjectHrdf', w0,
                'PaidMoneyClaimingList', w8,
                'AllowanceList', w9,
                'DeductionList', w10,
                'PayrollEarnings', w11,
                'PayrollDeductions', w12,
                'Deduction', w1,
                'Earnings', w1,
                'Nett', w1,
                'EmployeeEIS', w1,
                'EmployeePCB', w1,
                'EmployeeSOCSO', w1,
                'EmployeeEPF', w1,
                'EmployerHRDF', w1,
                'EmployerEPF', w1,
                'EmployerEIS', w1,
                'EmployerSOCSO', w1
            ]);
        }
    }
}

[EISClass, SOCSOClass, EPFClass, HRDFClass, MaritalStatus]; // referenced types