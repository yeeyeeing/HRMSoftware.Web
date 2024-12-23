import { ImageUploadEditor, StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface PerformanceAppraisalFileAttachForm {
    Files: ImageUploadEditor;
    Remark: StringEditor;
}

export class PerformanceAppraisalFileAttachForm extends PrefixedContext {
    static formKey = 'PerformanceAppraisal.PerformanceAppraisalFileAttach';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PerformanceAppraisalFileAttachForm.init)  {
            PerformanceAppraisalFileAttachForm.init = true;

            var w0 = ImageUploadEditor;
            var w1 = StringEditor;

            initFormType(PerformanceAppraisalFileAttachForm, [
                'Files', w0,
                'Remark', w1
            ]);
        }
    }
}