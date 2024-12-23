import { IntegerEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface TerminateEmployeeForm {
    NoticePeriod: IntegerEditor;
    TerminateDate: DateEditor;
    TerminateLeaveDate: DateEditor;
}

export class TerminateEmployeeForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.TerminateEmployee';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!TerminateEmployeeForm.init)  {
            TerminateEmployeeForm.init = true;

            var w0 = IntegerEditor;
            var w1 = DateEditor;

            initFormType(TerminateEmployeeForm, [
                'NoticePeriod', w0,
                'TerminateDate', w1,
                'TerminateLeaveDate', w1
            ]);
        }
    }
}