import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { OTReasonForm, OTReasonRow, OTReasonService } from '../../../ServerTypes/OTApplication';

@Decorators.registerClass('HRMSoftware.OTApplication.OTReasonDialog')
export class OTReasonDialog extends EntityDialog<OTReasonRow, any> {
    protected getFormKey() { return OTReasonForm.formKey; }
    protected getRowDefinition() { return OTReasonRow; }
    protected getService() { return OTReasonService.baseUrl; }

    protected form = new OTReasonForm(this.idPrefix);
}