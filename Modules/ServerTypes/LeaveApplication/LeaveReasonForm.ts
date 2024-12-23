import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface LeaveReasonForm {
    LeaveReason: StringEditor;
    Description: StringEditor;
}

export class LeaveReasonForm extends PrefixedContext {
    static formKey = 'LeaveApplication.LeaveReason';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!LeaveReasonForm.init)  {
            LeaveReasonForm.init = true;

            var w0 = StringEditor;

            initFormType(LeaveReasonForm, [
                'LeaveReason', w0,
                'Description', w0
            ]);
        }
    }
}