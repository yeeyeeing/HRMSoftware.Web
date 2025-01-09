import { MasterCareerPathType } from "./MasterCareerPathType";
import { EnumEditor, StringEditor, TextAreaEditor, PrefixedContext } from "@serenity-is/corelib";
import { Category } from "./Category";
import { initFormType } from "@serenity-is/corelib/q";

export interface MasterCareerPathForm {
    CareerPathType: EnumEditor;
    CareerPathCode: StringEditor;
    CategoryId: EnumEditor;
    Description: TextAreaEditor;
}

export class MasterCareerPathForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.MasterCareerPath';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!MasterCareerPathForm.init)  {
            MasterCareerPathForm.init = true;

            var w0 = EnumEditor;
            var w1 = StringEditor;
            var w2 = TextAreaEditor;

            initFormType(MasterCareerPathForm, [
                'CareerPathType', w0,
                'CareerPathCode', w1,
                'CategoryId', w0,
                'Description', w2
            ]);
        }
    }
}

[MasterCareerPathType, Category]; // referenced types