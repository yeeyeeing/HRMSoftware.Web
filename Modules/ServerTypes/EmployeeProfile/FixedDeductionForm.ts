import { LookupEditor, DecimalEditor, DateEditor, TextAreaEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface FixedDeductionForm {
    MasterDeductionId: LookupEditor;
    Amount: DecimalEditor;
    EffectiveFrom: DateEditor;
    EffectiveUntil: DateEditor;
    Description: TextAreaEditor;
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

            var w0 = LookupEditor;
            var w1 = DecimalEditor;
            var w2 = DateEditor;
            var w3 = TextAreaEditor;
            var w4 = BooleanEditor;

            initFormType(FixedDeductionForm, [
                'MasterDeductionId', w0,
                'Amount', w1,
                'EffectiveFrom', w2,
                'EffectiveUntil', w2,
                'Description', w3,
                'Recurring', w4,
                'OneTime', w4,
                'DeductedOneTime', w4
            ]);
        }
    }
}