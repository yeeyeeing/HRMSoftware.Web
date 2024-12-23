import { StringEditor, EnumEditor, PrefixedContext } from "@serenity-is/corelib";
import { PerformanceAppraisalQuestionAnswerType } from "./PerformanceAppraisalQuestionAnswerType";
import { initFormType } from "@serenity-is/corelib/q";

export interface PerformanceAppraisalQuestionForm {
    Questions: StringEditor;
    AnswerType: EnumEditor;
}

export class PerformanceAppraisalQuestionForm extends PrefixedContext {
    static formKey = 'PerformanceAppraisal.PerformanceAppraisalQuestion';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PerformanceAppraisalQuestionForm.init)  {
            PerformanceAppraisalQuestionForm.init = true;

            var w0 = StringEditor;
            var w1 = EnumEditor;

            initFormType(PerformanceAppraisalQuestionForm, [
                'Questions', w0,
                'AnswerType', w1
            ]);
        }
    }
}

[PerformanceAppraisalQuestionAnswerType]; // referenced types