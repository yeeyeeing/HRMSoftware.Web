import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { LeaveDescriptionForm, LeaveDescriptionRow, LeaveDescriptionService } from '../../../ServerTypes/LeaveApplication';

@Decorators.registerClass('HRMSoftware.LeaveApplication.LeaveDescriptionDialog')
export class LeaveDescriptionDialog extends EntityDialog<LeaveDescriptionRow, any> {
    protected getFormKey() { return LeaveDescriptionForm.formKey; }
    protected getRowDefinition() { return LeaveDescriptionRow; }
    protected getService() { return LeaveDescriptionService.baseUrl; }

    protected form = new LeaveDescriptionForm(this.idPrefix);
}