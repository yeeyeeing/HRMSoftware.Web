import { TextAreaEditor, StringEditor, DecimalEditor, DateEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface FixedDeductionForm {
    Description: TextAreaEditor;
    DeductionCode: StringEditor;
    Amount: DecimalEditor;
    EffectiveFrom: DateEditor;
    EffectiveUntil: DateEditor;
    Recurring: BooleanEditor;
    OneTime: BooleanEditor;
    DeductedOneTime: BooleanEditor;
}

export class FixedDeductionForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.FixedDeduction';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!FixedDeductionForm.init)  {
            FixedDeductionForm.init = true;

            var w0 = TextAreaEditor;
            var w1 = StringEditor;
            var w2 = DecimalEditor;
            var w3 = DateEditor;
            var w4 = BooleanEditor;

            initFormType(FixedDeductionForm, [
                'Description', w0,
                'DeductionCode', w1,
                'Amount', w2,
                'EffectiveFrom', w3,
                'EffectiveUntil', w3,
                'Recurring', w4,
                'OneTime', w4,
                'DeductedOneTime', w4
            ]);
        }
    }
}