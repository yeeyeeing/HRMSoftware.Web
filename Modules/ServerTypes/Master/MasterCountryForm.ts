import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface MasterCountryForm {
    Name: StringEditor;
}

export class MasterCountryForm extends PrefixedContext {
    static formKey = 'Master.MasterCountry';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!MasterCountryForm.init)  {
            MasterCountryForm.init = true;

            var w0 = StringEditor;

            initFormType(MasterCountryForm, [
                'Name', w0
            ]);
        }
    }
}