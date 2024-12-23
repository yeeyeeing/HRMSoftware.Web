import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface SectionForm {
    Name: StringEditor;
    Description: StringEditor;
}

export class SectionForm extends PrefixedContext {
    static formKey = 'OrganisationHierarchy.Section';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!SectionForm.init)  {
            SectionForm.init = true;

            var w0 = StringEditor;

            initFormType(SectionForm, [
                'Name', w0,
                'Description', w0
            ]);
        }
    }
}