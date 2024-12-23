import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { LeaveReasonForm, LeaveReasonRow, LeaveReasonService } from '../../../ServerTypes/LeaveApplication';

@Decorators.registerClass('HRMSoftware.LeaveApplication.LeaveReasonDialog')
export class LeaveReasonDialog extends EntityDialog<LeaveReasonRow, any> {
    protected getFormKey() { return LeaveReasonForm.formKey; }
    protected getRowDefinition() { return LeaveReasonRow; }
    protected getService() { return LeaveReasonService.baseUrl; }

    protected form = new LeaveReasonForm(this.idPrefix);
}