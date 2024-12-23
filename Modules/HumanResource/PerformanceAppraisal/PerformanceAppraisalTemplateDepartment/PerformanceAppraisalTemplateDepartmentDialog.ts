import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { PerformanceAppraisalTemplateDepartmentForm, PerformanceAppraisalTemplateDepartmentRow, PerformanceAppraisalTemplateDepartmentService } from '../../ServerTypes/PerformanceAppraisal';

@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateDepartmentDialog')
export class PerformanceAppraisalTemplateDepartmentDialog extends EntityDialog<PerformanceAppraisalTemplateDepartmentRow, any> {
    protected getFormKey() { return PerformanceAppraisalTemplateDepartmentForm.formKey; }
    protected getRowDefinition() { return PerformanceAppraisalTemplateDepartmentRow; }
    protected getService() { return PerformanceAppraisalTemplateDepartmentService.baseUrl; }

    protected form = new PerformanceAppraisalTemplateDepartmentForm(this.idPrefix);
}