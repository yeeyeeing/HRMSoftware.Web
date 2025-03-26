import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface MoneyClaimApplicationRejectForm {
    RejectReason: StringEditor;
}

export class MoneyClaimApplicationRejectForm extends PrefixedContext {
    static formKey = 'MoneyClaimApplication.MoneyClaimApplicationReject';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!MoneyClaimApplicationRejectForm.init)  {
            MoneyClaimApplicationRejectForm.init = true;

            var w0 = StringEditor;

            initFormType(MoneyClaimApplicationRejectForm, [
                'RejectReason', w0
            ]);
        }
    }
}