import { TextAreaEditor, DecimalEditor, ImageUploadEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface PerformanceAppraisalEvaluationForm {
    Evaluation: TextAreaEditor;
    Goals: TextAreaEditor;
    Summary: TextAreaEditor;
    BonusRate: DecimalEditor;
    OverallRate: DecimalEditor;
    EmployeeSignature: ImageUploadEditor;
    HodSignature: ImageUploadEditor;
    GeneralManagerSignature: ImageUploadEditor;
}

export class PerformanceAppraisalEvaluationForm extends PrefixedContext {
    static formKey = 'PerformanceAppraisal.PerformanceAppraisalEvaluation';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PerformanceAppraisalEvaluationForm.init)  {
            PerformanceAppraisalEvaluationForm.init = true;

            var w0 = TextAreaEditor;
            var w1 = DecimalEditor;
            var w2 = ImageUploadEditor;

            initFormType(PerformanceAppraisalEvaluationForm, [
                'Evaluation', w0,
                'Goals', w0,
                'Summary', w0,
                'BonusRate', w1,
                'OverallRate', w1,
                'EmployeeSignature', w2,
                'HodSignature', w2,
                'GeneralManagerSignature', w2
            ]);
        }
    }
}