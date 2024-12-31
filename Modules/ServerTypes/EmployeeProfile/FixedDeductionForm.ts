import { StringEditor, LookupEditor, DecimalEditor, DateEditor, TextAreaEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface FixedDeductionForm {
    DeductionCode: StringEditor;
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

            var w0 = StringEditor;
            var w1 = LookupEditor;
            var w2 = DecimalEditor;
            var w3 = DateEditor;
            var w4 = TextAreaEditor;
            var w5 = BooleanEditor;

            initFormType(FixedDeductionForm, [
                'DeductionCode', w0,
                'MasterDeductionId', w1,
                'Amount', w2,
                'EffectiveFrom', w3,
                'EffectiveUntil', w3,
                'Description', w4,
                'Recurring', w5,
                'OneTime', w5,
                'DeductedOneTime', w5
            ]);
        }
    }
}