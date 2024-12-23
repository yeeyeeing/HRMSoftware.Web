import { LookupEditor, IntegerEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface AnnualLeaveJobGradePolicyForm {
    JobGradeLevel: LookupEditor;
    EligibleDays: IntegerEditor;
    MaximumAccumulated: IntegerEditor;
}

export class AnnualLeaveJobGradePolicyForm extends PrefixedContext {
    static formKey = 'AnnualLeaveJobGradePolicy.AnnualLeaveJobGradePolicy';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!AnnualLeaveJobGradePolicyForm.init)  {
            AnnualLeaveJobGradePolicyForm.init = true;

            var w0 = LookupEditor;
            var w1 = IntegerEditor;

            initFormType(AnnualLeaveJobGradePolicyForm, [
                'JobGradeLevel', w0,
                'EligibleDays', w1,
                'MaximumAccumulated', w1
            ]);
        }
    }
}