import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { PerformanceAppraisalFileAttachForm, PerformanceAppraisalFileAttachRow, PerformanceAppraisalFileAttachService } from '../../../ServerTypes/PerformanceAppraisal';

@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFileAttachDialog')
export class PerformanceAppraisalFileAttachDialog extends EntityDialog<PerformanceAppraisalFileAttachRow, any> {
    protected getFormKey() { return PerformanceAppraisalFileAttachForm.formKey; }
    protected getRowDefinition() { return PerformanceAppraisalFileAttachRow; }
    protected getService() { return PerformanceAppraisalFileAttachService.baseUrl; }

    protected form = new PerformanceAppraisalFileAttachForm(this.idPrefix);
}