import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface DepartmentForm {
    Name: StringEditor;
    Description: StringEditor;
}

export class DepartmentForm extends PrefixedContext {
    static formKey = 'OrganisationHierarchy.Department';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!DepartmentForm.init)  {
            DepartmentForm.init = true;

            var w0 = StringEditor;

            initFormType(DepartmentForm, [
                'Name', w0,
                'Description', w0
            ]);
        }
    }
}