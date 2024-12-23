import { LookupEditor, IntegerEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface OTJobGradeTimeForm {
    JobGradeId: LookupEditor;
    OTMaximumMinutes: IntegerEditor;
}

export class OTJobGradeTimeForm extends PrefixedContext {
    static formKey = 'OTJobGradeTime.OTJobGradeTime';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!OTJobGradeTimeForm.init)  {
            OTJobGradeTimeForm.init = true;

            var w0 = LookupEditor;
            var w1 = IntegerEditor;

            initFormType(OTJobGradeTimeForm, [
                'JobGradeId', w0,
                'OTMaximumMinutes', w1
            ]);
        }
    }
}