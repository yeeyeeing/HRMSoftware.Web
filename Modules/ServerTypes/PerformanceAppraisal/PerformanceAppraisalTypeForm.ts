import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface PerformanceAppraisalTypeForm {
    Type: StringEditor;
}

export class PerformanceAppraisalTypeForm extends PrefixedContext {
    static formKey = 'PerformanceAppraisal.PerformanceAppraisalType';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PerformanceAppraisalTypeForm.init)  {
            PerformanceAppraisalTypeForm.init = true;

            var w0 = StringEditor;

            initFormType(PerformanceAppraisalTypeForm, [
                'Type', w0
            ]);
        }
    }
}