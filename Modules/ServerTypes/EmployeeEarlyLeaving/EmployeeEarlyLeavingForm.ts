import { LookupEditor, StringEditor, DateEditor, IntegerEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeEarlyLeavingForm {
    EmployeeRowId: LookupEditor;
    EmployeeName: StringEditor;
    Date: DateEditor;
    EarlyMins: IntegerEditor;
}

export class EmployeeEarlyLeavingForm extends PrefixedContext {
    static formKey = 'EmployeeEarlyLeaving.EmployeeEarlyLeaving';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeEarlyLeavingForm.init)  {
            EmployeeEarlyLeavingForm.init = true;

            var w0 = LookupEditor;
            var w1 = StringEditor;
            var w2 = DateEditor;
            var w3 = IntegerEditor;

            initFormType(EmployeeEarlyLeavingForm, [
                'EmployeeRowId', w0,
                'EmployeeName', w1,
                'Date', w2,
                'EarlyMins', w3
            ]);
        }
    }
}