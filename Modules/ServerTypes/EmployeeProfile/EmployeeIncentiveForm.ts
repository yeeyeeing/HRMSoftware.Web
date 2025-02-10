import { LookupEditor, DecimalEditor, TextAreaEditor, IntegerEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeIncentiveForm {
    EmployeeRowId: LookupEditor;
    IncentiveAmount: DecimalEditor;
    IncentiveDescription: TextAreaEditor;
    PayMonth: IntegerEditor;
    PayYear: IntegerEditor;
}

export class EmployeeIncentiveForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.EmployeeIncentive';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeIncentiveForm.init)  {
            EmployeeIncentiveForm.init = true;

            var w0 = LookupEditor;
            var w1 = DecimalEditor;
            var w2 = TextAreaEditor;
            var w3 = IntegerEditor;

            initFormType(EmployeeIncentiveForm, [
                'EmployeeRowId', w0,
                'IncentiveAmount', w1,
                'IncentiveDescription', w2,
                'PayMonth', w3,
                'PayYear', w3
            ]);
        }
    }
}