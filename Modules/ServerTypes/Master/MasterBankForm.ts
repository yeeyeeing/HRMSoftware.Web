import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface MasterBankForm {
    Name: StringEditor;
    Description: StringEditor;
}

export class MasterBankForm extends PrefixedContext {
    static formKey = 'Master.MasterBank';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!MasterBankForm.init)  {
            MasterBankForm.init = true;

            var w0 = StringEditor;

            initFormType(MasterBankForm, [
                'Name', w0,
                'Description', w0
            ]);
        }
    }
}