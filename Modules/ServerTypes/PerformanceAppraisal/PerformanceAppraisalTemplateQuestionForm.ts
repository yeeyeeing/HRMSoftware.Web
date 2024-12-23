import { LookupEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface PerformanceAppraisalTemplateQuestionForm {
    QuestionId: LookupEditor;
}

export class PerformanceAppraisalTemplateQuestionForm extends PrefixedContext {
    static formKey = 'PerformanceAppraisal.PerformanceAppraisalTemplateQuestion';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PerformanceAppraisalTemplateQuestionForm.init)  {
            PerformanceAppraisalTemplateQuestionForm.init = true;

            var w0 = LookupEditor;

            initFormType(PerformanceAppraisalTemplateQuestionForm, [
                'QuestionId', w0
            ]);
        }
    }
}