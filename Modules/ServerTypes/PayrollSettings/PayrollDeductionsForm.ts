import { DecimalEditor, StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface PayrollDeductionsForm {
    Amount: DecimalEditor;
    DeductionCode: StringEditor;
    Description: StringEditor;
}

export class PayrollDeductionsForm extends PrefixedContext {
    static formKey = 'PayrollSettings.PayrollDeductions';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PayrollDeductionsForm.init)  {
            PayrollDeductionsForm.init = true;

            var w0 = DecimalEditor;
            var w1 = StringEditor;

            initFormType(PayrollDeductionsForm, [
                'Amount', w0,
                'DeductionCode', w1,
                'Description', w1
            ]);
        }
    }
}