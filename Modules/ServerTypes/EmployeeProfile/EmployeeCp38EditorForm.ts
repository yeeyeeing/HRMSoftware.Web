import { DecimalEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeCp38EditorForm {
    Cp38Amount: DecimalEditor;
    EffectiveFrom: DateEditor;
    EffectiveUntil: DateEditor;
}

export class EmployeeCp38EditorForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.EmployeeCp38';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeCp38EditorForm.init)  {
            EmployeeCp38EditorForm.init = true;

            var w0 = DecimalEditor;
            var w1 = DateEditor;

            initFormType(EmployeeCp38EditorForm, [
                'Cp38Amount', w0,
                'EffectiveFrom', w1,
                'EffectiveUntil', w1
            ]);
        }
    }
}