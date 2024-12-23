import { Decorators } from '@serenity-is/corelib';
import { GridEditorDialog } from "@serenity-is/extensions";
import { PerformanceAppraisalTemplateQuestionForm,
    PerformanceAppraisalTemplateQuestionRow } from '../../ServerTypes/PerformanceAppraisal';

@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateQuestionEditDialog')
export class PerformanceAppraisalTemplateQuestionEditDialog extends GridEditorDialog<PerformanceAppraisalTemplateQuestionRow> {
    protected getFormKey() { return PerformanceAppraisalTemplateQuestionForm.formKey; }
    protected getNameProperty() { // @ts-ignore
        return PerformanceAppraisalTemplateQuestionRow.nameProperty; }
    protected getLocalTextPrefix() { return PerformanceAppraisalTemplateQuestionRow.localTextPrefix; }

    protected form = new PerformanceAppraisalTemplateQuestionForm(this.idPrefix);
    
}
