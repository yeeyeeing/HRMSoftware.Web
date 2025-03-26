import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface OTApplicationRejectForm {
    RejectReason: StringEditor;
}

export class OTApplicationRejectForm extends PrefixedContext {
    static formKey = 'OTApplication.OTApplicationReject';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!OTApplicationRejectForm.init)  {
            OTApplicationRejectForm.init = true;

            var w0 = StringEditor;

            initFormType(OTApplicationRejectForm, [
                'RejectReason', w0
            ]);
        }
    }
}