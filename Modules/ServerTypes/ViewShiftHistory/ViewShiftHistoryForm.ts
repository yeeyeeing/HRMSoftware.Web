import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface ViewShiftHistoryForm {
    EmployeeId: StringEditor;
    EmployeeName: StringEditor;
}

export class ViewShiftHistoryForm extends PrefixedContext {
    static formKey = 'ViewShiftHistory.ViewShiftHistory';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ViewShiftHistoryForm.init)  {
            ViewShiftHistoryForm.init = true;

            var w0 = StringEditor;

            initFormType(ViewShiftHistoryForm, [
                'EmployeeId', w0,
                'EmployeeName', w0
            ]);
        }
    }
}