import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { PayslipDeductedOneTimeDeductionsForm, PayslipDeductedOneTimeDeductionsRow, PayslipDeductedOneTimeDeductionsService } from '../../../ServerTypes/PayrollSettings';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayslipDeductedOneTimeDeductionsDialog')
export class PayslipDeductedOneTimeDeductionsDialog extends EntityDialog<PayslipDeductedOneTimeDeductionsRow, any> {
    protected getFormKey() { return PayslipDeductedOneTimeDeductionsForm.formKey; }
    protected getRowDefinition() { return PayslipDeductedOneTimeDeductionsRow; }
    protected getService() { return PayslipDeductedOneTimeDeductionsService.baseUrl; }

    protected form = new PayslipDeductedOneTimeDeductionsForm(this.idPrefix);
}