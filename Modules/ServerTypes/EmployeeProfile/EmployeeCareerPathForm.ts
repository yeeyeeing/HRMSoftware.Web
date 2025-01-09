import { LookupEditor, DecimalEditor, DateEditor, TextAreaEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeCareerPathForm {
    CareerPathId: LookupEditor;
    EmployeeRowId: LookupEditor;
    NewValue: DecimalEditor;
    EffectiveDate: DateEditor;
    Description: TextAreaEditor;
}

export class EmployeeCareerPathForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.EmployeeCareerPath';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeCareerPathForm.init)  {
            EmployeeCareerPathForm.init = true;

            var w0 = LookupEditor;
            var w1 = DecimalEditor;
            var w2 = DateEditor;
            var w3 = TextAreaEditor;

            initFormType(EmployeeCareerPathForm, [
                'CareerPathId', w0,
                'EmployeeRowId', w0,
                'NewValue', w1,
                'EffectiveDate', w2,
                'Description', w3
            ]);
        }
    }
}