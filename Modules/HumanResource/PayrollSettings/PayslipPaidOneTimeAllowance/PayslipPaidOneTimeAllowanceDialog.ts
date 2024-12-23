import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { PayslipPaidOneTimeAllowanceForm, PayslipPaidOneTimeAllowanceRow, PayslipPaidOneTimeAllowanceService } from '../../../ServerTypes/PayrollSettings';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayslipPaidOneTimeAllowanceDialog')
export class PayslipPaidOneTimeAllowanceDialog extends EntityDialog<PayslipPaidOneTimeAllowanceRow, any> {
    protected getFormKey() { return PayslipPaidOneTimeAllowanceForm.formKey; }
    protected getRowDefinition() { return PayslipPaidOneTimeAllowanceRow; }
    protected getService() { return PayslipPaidOneTimeAllowanceService.baseUrl; }

    protected form = new PayslipPaidOneTimeAllowanceForm(this.idPrefix);
}