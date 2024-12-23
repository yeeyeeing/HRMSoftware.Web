import { LookupEditor, StringEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface AbsentRecordForm {
    EmployeeRowId: LookupEditor;
    EmployeeName: StringEditor;
    AbsentDate: DateEditor;
}

export class AbsentRecordForm extends PrefixedContext {
    static formKey = 'AbsentRecord.AbsentRecord';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!AbsentRecordForm.init)  {
            AbsentRecordForm.init = true;

            var w0 = LookupEditor;
            var w1 = StringEditor;
            var w2 = DateEditor;

            initFormType(AbsentRecordForm, [
                'EmployeeRowId', w0,
                'EmployeeName', w1,
                'AbsentDate', w2
            ]);
        }
    }
}