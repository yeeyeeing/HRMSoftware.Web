import { LookupEditor, StringEditor, DateEditor, IntegerEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeLateForm {
    EmployeeRowId: LookupEditor;
    EmployeeName: StringEditor;
    Date: DateEditor;
    LateMins: IntegerEditor;
}

export class EmployeeLateForm extends PrefixedContext {
    static formKey = 'EmployeeLate.EmployeeLate';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeLateForm.init)  {
            EmployeeLateForm.init = true;

            var w0 = LookupEditor;
            var w1 = StringEditor;
            var w2 = DateEditor;
            var w3 = IntegerEditor;

            initFormType(EmployeeLateForm, [
                'EmployeeRowId', w0,
                'EmployeeName', w1,
                'Date', w2,
                'LateMins', w3
            ]);
        }
    }
}