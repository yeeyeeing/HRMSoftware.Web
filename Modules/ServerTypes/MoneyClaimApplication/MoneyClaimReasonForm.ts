import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface MoneyClaimReasonForm {
    ClaimReason: StringEditor;
    Description: StringEditor;
}

export class MoneyClaimReasonForm extends PrefixedContext {
    static formKey = 'MoneyClaimApplication.MoneyClaimReason';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!MoneyClaimReasonForm.init)  {
            MoneyClaimReasonForm.init = true;

            var w0 = StringEditor;

            initFormType(MoneyClaimReasonForm, [
                'ClaimReason', w0,
                'Description', w0
            ]);
        }
    }
}