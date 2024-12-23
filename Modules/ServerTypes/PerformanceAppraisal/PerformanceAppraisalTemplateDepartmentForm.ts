import { IntegerEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface PerformanceAppraisalTemplateDepartmentForm {
    TemplateId: IntegerEditor;
    DepartmentId: IntegerEditor;
}

export class PerformanceAppraisalTemplateDepartmentForm extends PrefixedContext {
    static formKey = 'PerformanceAppraisal.PerformanceAppraisalTemplateDepartment';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PerformanceAppraisalTemplateDepartmentForm.init)  {
            PerformanceAppraisalTemplateDepartmentForm.init = true;

            var w0 = IntegerEditor;

            initFormType(PerformanceAppraisalTemplateDepartmentForm, [
                'TemplateId', w0,
                'DepartmentId', w0
            ]);
        }
    }
}