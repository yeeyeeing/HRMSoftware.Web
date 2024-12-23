import { IntegerEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface SickLeavePolicyForm {
    ServiceFromYear: IntegerEditor;
    ServiceUntilYear: IntegerEditor;
    EligibleDays: IntegerEditor;
}

export class SickLeavePolicyForm extends PrefixedContext {
    static formKey = 'SickLeavePolicy.SickLeavePolicy';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!SickLeavePolicyForm.init)  {
            SickLeavePolicyForm.init = true;

            var w0 = IntegerEditor;

            initFormType(SickLeavePolicyForm, [
                'ServiceFromYear', w0,
                'ServiceUntilYear', w0,
                'EligibleDays', w0
            ]);
        }
    }
}