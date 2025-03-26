import { IntegerEditor, DateEditor, DecimalEditor, StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface WeeklyPayrollForm {
    WeekIndex: IntegerEditor;
    EmployeeRowId: IntegerEditor;
    PayDate: DateEditor;
    Deduction: DecimalEditor;
    Earnings: DecimalEditor;
    Nett: DecimalEditor;
    EmployeeSocso: DecimalEditor;
    EmployeeEpf: DecimalEditor;
    EmployeeEis: DecimalEditor;
    PayrollTable: StringEditor;
    Remarks: StringEditor;
    PayPeriodStart: DateEditor;
    PayPeriodEnd: DateEditor;
    PayMonth: IntegerEditor;
    PayYear: IntegerEditor;
    InsertDate: DateEditor;
    InsertUserId: IntegerEditor;
    UpdateDate: DateEditor;
    UpdateUserId: IntegerEditor;
    DeleteDate: DateEditor;
    DeleteUserId: IntegerEditor;
    IsActive: IntegerEditor;
    DaysWorked: DecimalEditor;
    DailyRate: DecimalEditor;
    HourlyRate: DecimalEditor;
    FlatOt: DecimalEditor;
    OtOne: DecimalEditor;
    OtOnePointFive: DecimalEditor;
    OtTwo: DecimalEditor;
    OtOnePointFiveRate: DecimalEditor;
    OtTwoRate: DecimalEditor;
}

export class WeeklyPayrollForm extends PrefixedContext {
    static formKey = 'PayrollSettings.WeeklyPayroll';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!WeeklyPayrollForm.init)  {
            WeeklyPayrollForm.init = true;

            var w0 = IntegerEditor;
            var w1 = DateEditor;
            var w2 = DecimalEditor;
            var w3 = StringEditor;

            initFormType(WeeklyPayrollForm, [
                'WeekIndex', w0,
                'EmployeeRowId', w0,
                'PayDate', w1,
                'Deduction', w2,
                'Earnings', w2,
                'Nett', w2,
                'EmployeeSocso', w2,
                'EmployeeEpf', w2,
                'EmployeeEis', w2,
                'PayrollTable', w3,
                'Remarks', w3,
                'PayPeriodStart', w1,
                'PayPeriodEnd', w1,
                'PayMonth', w0,
                'PayYear', w0,
                'InsertDate', w1,
                'InsertUserId', w0,
                'UpdateDate', w1,
                'UpdateUserId', w0,
                'DeleteDate', w1,
                'DeleteUserId', w0,
                'IsActive', w0,
                'DaysWorked', w2,
                'DailyRate', w2,
                'HourlyRate', w2,
                'FlatOt', w2,
                'OtOne', w2,
                'OtOnePointFive', w2,
                'OtTwo', w2,
                'OtOnePointFiveRate', w2,
                'OtTwoRate', w2
            ]);
        }
    }
}