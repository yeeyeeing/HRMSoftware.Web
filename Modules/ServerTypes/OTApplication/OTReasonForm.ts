import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface OTReasonForm {
    OtReason: StringEditor;
    Description: StringEditor;
}

export class OTReasonForm extends PrefixedContext {
    static formKey = 'OTApplication.OTReason';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!OTReasonForm.init)  {
            OTReasonForm.init = true;

            var w0 = StringEditor;

            initFormType(OTReasonForm, [
                'OtReason', w0,
                'Description', w0
            ]);
        }
    }
}