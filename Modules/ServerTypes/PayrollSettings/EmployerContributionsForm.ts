import { StringEditor, DecimalEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployerContributionsForm {
    Description: StringEditor;
    Amount: DecimalEditor;
}

export class EmployerContributionsForm extends PrefixedContext {
    static formKey = 'PayrollSettings.EmployerContributions';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployerContributionsForm.init)  {
            EmployerContributionsForm.init = true;

            var w0 = StringEditor;
            var w1 = DecimalEditor;

            initFormType(EmployerContributionsForm, [
                'Description', w0,
                'Amount', w1
            ]);
        }
    }
}