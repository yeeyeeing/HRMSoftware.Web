import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface ShiftHistoryForm {
    EmployeeId: StringEditor;
    Shift: StringEditor;
}

export class ShiftHistoryForm extends PrefixedContext {
    static formKey = 'ShiftHistory.ShiftHistory';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ShiftHistoryForm.init)  {
            ShiftHistoryForm.init = true;

            var w0 = StringEditor;

            initFormType(ShiftHistoryForm, [
                'EmployeeId', w0,
                'Shift', w0
            ]);
        }
    }
}