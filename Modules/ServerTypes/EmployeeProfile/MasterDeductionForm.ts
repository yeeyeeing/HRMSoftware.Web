import { StringEditor, DecimalEditor, TextAreaEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface MasterDeductionForm {
    DeductionCode: StringEditor;
    Amount: DecimalEditor;
    Description: TextAreaEditor;
    Recurring: BooleanEditor;
    OneTime: BooleanEditor;
}

export class MasterDeductionForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.MasterDeduction';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!MasterDeductionForm.init)  {
            MasterDeductionForm.init = true;

            var w0 = StringEditor;
            var w1 = DecimalEditor;
            var w2 = TextAreaEditor;
            var w3 = BooleanEditor;

            initFormType(MasterDeductionForm, [
                'DeductionCode', w0,
                'Amount', w1,
                'Description', w2,
                'Recurring', w3,
                'OneTime', w3
            ]);
        }
    }
}