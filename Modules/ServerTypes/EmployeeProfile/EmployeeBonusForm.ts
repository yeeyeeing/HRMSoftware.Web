import { LookupEditor, IntegerEditor, DecimalEditor, TextAreaEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeBonusForm {
    EmployeeRowId: LookupEditor;
    PayMonth: IntegerEditor;
    PayYear: IntegerEditor;
    BonusAmount: DecimalEditor;
    BonusDescription: TextAreaEditor;
}

export class EmployeeBonusForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.EmployeeBonus';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeBonusForm.init)  {
            EmployeeBonusForm.init = true;

            var w0 = LookupEditor;
            var w1 = IntegerEditor;
            var w2 = DecimalEditor;
            var w3 = TextAreaEditor;

            initFormType(EmployeeBonusForm, [
                'EmployeeRowId', w0,
                'PayMonth', w1,
                'PayYear', w1,
                'BonusAmount', w2,
                'BonusDescription', w3
            ]);
        }
    }
}