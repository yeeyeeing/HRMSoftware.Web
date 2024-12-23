import { LookupEditor, StringEditor, DateEditor, BooleanEditor, DecimalEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface NoPaidLeaveForm {
    EmployeeRowId: LookupEditor;
    EmployeeName: StringEditor;
    LeaveDate: DateEditor;
    HalfDay: BooleanEditor;
    Deductions: DecimalEditor;
}

export class NoPaidLeaveForm extends PrefixedContext {
    static formKey = 'PayrollSettings.NoPaidLeave';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!NoPaidLeaveForm.init)  {
            NoPaidLeaveForm.init = true;

            var w0 = LookupEditor;
            var w1 = StringEditor;
            var w2 = DateEditor;
            var w3 = BooleanEditor;
            var w4 = DecimalEditor;

            initFormType(NoPaidLeaveForm, [
                'EmployeeRowId', w0,
                'EmployeeName', w1,
                'LeaveDate', w2,
                'HalfDay', w3,
                'Deductions', w4
            ]);
        }
    }
}