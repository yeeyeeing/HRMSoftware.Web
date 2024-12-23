import { ImageUploadEditor, StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface CompanyProfileForm {
    Picture: ImageUploadEditor;
    Title: StringEditor;
    Address: StringEditor;
    Tel: StringEditor;
    Website: StringEditor;
}

export class CompanyProfileForm extends PrefixedContext {
    static formKey = 'PerformanceAppraisal.CompanyProfile';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!CompanyProfileForm.init)  {
            CompanyProfileForm.init = true;

            var w0 = ImageUploadEditor;
            var w1 = StringEditor;

            initFormType(CompanyProfileForm, [
                'Picture', w0,
                'Title', w1,
                'Address', w1,
                'Tel', w1,
                'Website', w1
            ]);
        }
    }
}