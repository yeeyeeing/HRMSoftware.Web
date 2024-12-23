import { IntegerEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeResignForm {
    NoticePeriod: IntegerEditor;
    ResignationDate: DateEditor;
    ResignLeaveDate: DateEditor;
}

export class EmployeeResignForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.EmployeeResign';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeResignForm.init)  {
            EmployeeResignForm.init = true;

            var w0 = IntegerEditor;
            var w1 = DateEditor;

            initFormType(EmployeeResignForm, [
                'NoticePeriod', w0,
                'ResignationDate', w1,
                'ResignLeaveDate', w1
            ]);
        }
    }
}