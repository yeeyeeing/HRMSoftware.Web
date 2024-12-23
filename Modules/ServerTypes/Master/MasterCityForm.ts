import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface MasterCityForm {
    Name: StringEditor;
}

export class MasterCityForm extends PrefixedContext {
    static formKey = 'Master.MasterCity';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!MasterCityForm.init)  {
            MasterCityForm.init = true;

            var w0 = StringEditor;

            initFormType(MasterCityForm, [
                'Name', w0
            ]);
        }
    }
}