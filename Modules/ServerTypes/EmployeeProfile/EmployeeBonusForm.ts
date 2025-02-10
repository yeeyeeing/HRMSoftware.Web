import { LookupEditor, DecimalEditor, TextAreaEditor, IntegerEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeBonusForm {
    EmployeeRowId: LookupEditor;
    BonusAmount: DecimalEditor;
    BonusDescription: TextAreaEditor;
    PayMonth: IntegerEditor;
    PayYear: IntegerEditor;
}

export class EmployeeBonusForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.EmployeeBonus';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeBonusForm.init)  {
            EmployeeBonusForm.init = true;

            var w0 = LookupEditor;
            var w1 = DecimalEditor;
            var w2 = TextAreaEditor;
            var w3 = IntegerEditor;

            initFormType(EmployeeBonusForm, [
                'EmployeeRowId', w0,
                'BonusAmount', w1,
                'BonusDescription', w2,
                'PayMonth', w3,
                'PayYear', w3
            ]);
        }
    }
}