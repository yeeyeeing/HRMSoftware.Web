import { IntegerEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface RecurringBindedEmployeeForm {
    EmployeeRowId: IntegerEditor;
    RecurringId: IntegerEditor;
}

export class RecurringBindedEmployeeForm extends PrefixedContext {
    static formKey = 'Announcement.RecurringBindedEmployee';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!RecurringBindedEmployeeForm.init)  {
            RecurringBindedEmployeeForm.init = true;

            var w0 = IntegerEditor;

            initFormType(RecurringBindedEmployeeForm, [
                'EmployeeRowId', w0,
                'RecurringId', w0
            ]);
        }
    }
}