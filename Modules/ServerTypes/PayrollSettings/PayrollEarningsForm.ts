import { DecimalEditor, StringEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface PayrollEarningsForm {
    Amount: DecimalEditor;
    EarningCode: StringEditor;
    Description: StringEditor;
    SubjectionToEis: BooleanEditor;
    SubjectionToEpf: BooleanEditor;
    SubjectionToHrdf: BooleanEditor;
    SubjectionToPcb: BooleanEditor;
    SubjectionToSocso: BooleanEditor;
}

export class PayrollEarningsForm extends PrefixedContext {
    static formKey = 'PayrollSettings.PayrollEarnings';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PayrollEarningsForm.init)  {
            PayrollEarningsForm.init = true;

            var w0 = DecimalEditor;
            var w1 = StringEditor;
            var w2 = BooleanEditor;

            initFormType(PayrollEarningsForm, [
                'Amount', w0,
                'EarningCode', w1,
                'Description', w1,
                'SubjectionToEis', w2,
                'SubjectionToEpf', w2,
                'SubjectionToHrdf', w2,
                'SubjectionToPcb', w2,
                'SubjectionToSocso', w2
            ]);
        }
    }
}