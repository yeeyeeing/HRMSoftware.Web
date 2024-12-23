import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface DivisionForm {
    Name: StringEditor;
    Description: StringEditor;
}

export class DivisionForm extends PrefixedContext {
    static formKey = 'OrganisationHierarchy.Division';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!DivisionForm.init)  {
            DivisionForm.init = true;

            var w0 = StringEditor;

            initFormType(DivisionForm, [
                'Name', w0,
                'Description', w0
            ]);
        }
    }
}