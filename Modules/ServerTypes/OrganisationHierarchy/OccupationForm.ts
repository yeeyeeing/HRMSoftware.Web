import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface OccupationForm {
    Name: StringEditor;
    Description: StringEditor;
}

export class OccupationForm extends PrefixedContext {
    static formKey = 'OrganisationHierarchy.Occupation';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!OccupationForm.init)  {
            OccupationForm.init = true;

            var w0 = StringEditor;

            initFormType(OccupationForm, [
                'Name', w0,
                'Description', w0
            ]);
        }
    }
}