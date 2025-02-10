import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface MasterStateForm {
    Name: StringEditor;
    StateCode: StringEditor;
}

export class MasterStateForm extends PrefixedContext {
    static formKey = 'Master.MasterState';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!MasterStateForm.init)  {
            MasterStateForm.init = true;

            var w0 = StringEditor;

            initFormType(MasterStateForm, [
                'Name', w0,
                'StateCode', w0
            ]);
        }
    }
}