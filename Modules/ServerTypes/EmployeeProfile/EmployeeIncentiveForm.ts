import { LookupEditor, IntegerEditor, DecimalEditor, TextAreaEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeIncentiveForm {
    EmployeeRowId: LookupEditor;
    PayMonth: IntegerEditor;
    PayYear: IntegerEditor;
    IncentiveAmount: DecimalEditor;
    IncentiveDescription: TextAreaEditor;
}

export class EmployeeIncentiveForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.EmployeeIncentive';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeIncentiveForm.init)  {
            EmployeeIncentiveForm.init = true;

            var w0 = LookupEditor;
            var w1 = IntegerEditor;
            var w2 = DecimalEditor;
            var w3 = TextAreaEditor;

            initFormType(EmployeeIncentiveForm, [
                'EmployeeRowId', w0,
                'PayMonth', w1,
                'PayYear', w1,
                'IncentiveAmount', w2,
                'IncentiveDescription', w3
            ]);
        }
    }
}