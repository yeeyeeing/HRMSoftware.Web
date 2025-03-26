import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface LeaveApplicationRejectForm {
    RejectReason: StringEditor;
}

export class LeaveApplicationRejectForm extends PrefixedContext {
    static formKey = 'LeaveApplication.LeaveApplicationReject';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!LeaveApplicationRejectForm.init)  {
            LeaveApplicationRejectForm.init = true;

            var w0 = StringEditor;

            initFormType(LeaveApplicationRejectForm, [
                'RejectReason', w0
            ]);
        }
    }
}