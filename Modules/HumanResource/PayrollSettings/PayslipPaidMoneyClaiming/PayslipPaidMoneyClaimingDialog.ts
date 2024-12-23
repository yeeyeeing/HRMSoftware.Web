import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { PayslipPaidMoneyClaimingForm, PayslipPaidMoneyClaimingRow, PayslipPaidMoneyClaimingService } from '../../../ServerTypes/PayrollSettings';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayslipPaidMoneyClaimingDialog')
export class PayslipPaidMoneyClaimingDialog extends EntityDialog<PayslipPaidMoneyClaimingRow, any> {
    protected getFormKey() { return PayslipPaidMoneyClaimingForm.formKey; }
    protected getRowDefinition() { return PayslipPaidMoneyClaimingRow; }
    protected getService() { return PayslipPaidMoneyClaimingService.baseUrl; }

    protected form = new PayslipPaidMoneyClaimingForm(this.idPrefix);
}