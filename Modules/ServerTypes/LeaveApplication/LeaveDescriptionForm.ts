import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface LeaveDescriptionForm {
    Name: StringEditor;
}

export class LeaveDescriptionForm extends PrefixedContext {
    static formKey = 'LeaveApplication.LeaveDescription';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!LeaveDescriptionForm.init)  {
            LeaveDescriptionForm.init = true;

            var w0 = StringEditor;

            initFormType(LeaveDescriptionForm, [
                'Name', w0
            ]);
        }
    }
}