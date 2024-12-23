import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface RaceForm {
    Race: StringEditor;
}

export class RaceForm extends PrefixedContext {
    static formKey = 'Race.Race';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!RaceForm.init)  {
            RaceForm.init = true;

            var w0 = StringEditor;

            initFormType(RaceForm, [
                'Race', w0
            ]);
        }
    }
}