import { LookupEditor, StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface MasterPostcodeForm {
    MasterCity: LookupEditor;
    MasterState: LookupEditor;
    PostCode: StringEditor;
}

export class MasterPostcodeForm extends PrefixedContext {
    static formKey = 'Master.MasterPostcode';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!MasterPostcodeForm.init)  {
            MasterPostcodeForm.init = true;

            var w0 = LookupEditor;
            var w1 = StringEditor;

            initFormType(MasterPostcodeForm, [
                'MasterCity', w0,
                'MasterState', w0,
                'PostCode', w1
            ]);
        }
    }
}