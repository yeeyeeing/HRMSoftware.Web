import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { PayrollEarningsForm, PayrollEarningsRow, PayrollEarningsService } from '../../../ServerTypes/PayrollSettings';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayrollEarningsDialog')
export class PayrollEarningsDialog extends EntityDialog<PayrollEarningsRow, any> {
    protected getFormKey() { return PayrollEarningsForm.formKey; }
    protected getRowDefinition() { return PayrollEarningsRow; }
    protected getService() { return PayrollEarningsService.baseUrl; }

    protected form = new PayrollEarningsForm(this.idPrefix);
}