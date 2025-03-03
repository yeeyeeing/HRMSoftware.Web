import { StringEditor, LookupEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface NationalityForm {
    Name: StringEditor;
    CountryId: LookupEditor;
}

export class NationalityForm extends PrefixedContext {
    static formKey = 'Master.Nationality';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!NationalityForm.init)  {
            NationalityForm.init = true;

            var w0 = StringEditor;
            var w1 = LookupEditor;

            initFormType(NationalityForm, [
                'Name', w0,
                'CountryId', w1
            ]);
        }
    }
}