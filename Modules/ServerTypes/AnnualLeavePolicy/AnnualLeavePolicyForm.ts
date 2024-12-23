import { IntegerEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface AnnualLeavePolicyForm {
    ServiceFromYear: IntegerEditor;
    ServiceUntilYear: IntegerEditor;
    EligibleDays: IntegerEditor;
    MaximumAccumulated: IntegerEditor;
}

export class AnnualLeavePolicyForm extends PrefixedContext {
    static formKey = 'AnnualLeavePolicy.AnnualLeavePolicy';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!AnnualLeavePolicyForm.init)  {
            AnnualLeavePolicyForm.init = true;

            var w0 = IntegerEditor;

            initFormType(AnnualLeavePolicyForm, [
                'ServiceFromYear', w0,
                'ServiceUntilYear', w0,
                'EligibleDays', w0,
                'MaximumAccumulated', w0
            ]);
        }
    }
}