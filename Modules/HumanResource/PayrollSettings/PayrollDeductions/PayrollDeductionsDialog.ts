import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { PayrollDeductionsForm, PayrollDeductionsRow, PayrollDeductionsService } from '../../../ServerTypes/PayrollSettings';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayrollDeductionsDialog')
export class PayrollDeductionsDialog extends EntityDialog<PayrollDeductionsRow, any> {
    protected getFormKey() { return PayrollDeductionsForm.formKey; }
    protected getRowDefinition() { return PayrollDeductionsRow; }
    protected getService() { return PayrollDeductionsService.baseUrl; }

    protected form = new PayrollDeductionsForm(this.idPrefix);
}