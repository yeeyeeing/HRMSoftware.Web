import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { MoneyClaimReasonForm, MoneyClaimReasonRow, MoneyClaimReasonService } from '../../../ServerTypes/MoneyClaimApplication';

@Decorators.registerClass('HRMSoftware.MoneyClaimApplication.MoneyClaimReasonDialog')
export class MoneyClaimReasonDialog extends EntityDialog<MoneyClaimReasonRow, any> {
    protected getFormKey() { return MoneyClaimReasonForm.formKey; }
    protected getRowDefinition() { return MoneyClaimReasonRow; }
    protected getService() { return MoneyClaimReasonService.baseUrl; }

    protected form = new MoneyClaimReasonForm(this.idPrefix);
}