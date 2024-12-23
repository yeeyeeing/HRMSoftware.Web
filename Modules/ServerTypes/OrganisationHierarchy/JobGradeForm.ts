import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface JobGradeForm {
    Name: StringEditor;
    Description: StringEditor;
}

export class JobGradeForm extends PrefixedContext {
    static formKey = 'OrganisationHierarchy.JobGrade';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!JobGradeForm.init)  {
            JobGradeForm.init = true;

            var w0 = StringEditor;

            initFormType(JobGradeForm, [
                'Name', w0,
                'Description', w0
            ]);
        }
    }
}