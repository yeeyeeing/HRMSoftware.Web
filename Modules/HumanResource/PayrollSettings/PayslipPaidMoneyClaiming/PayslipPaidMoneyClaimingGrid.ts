import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { PayslipPaidMoneyClaimingColumns, PayslipPaidMoneyClaimingRow, PayslipPaidMoneyClaimingService } from '../../../ServerTypes/PayrollSettings';
import { PayslipPaidMoneyClaimingDialog } from './PayslipPaidMoneyClaimingDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayslipPaidMoneyClaimingGrid')
export class PayslipPaidMoneyClaimingGrid extends EntityGrid<PayslipPaidMoneyClaimingRow, any> {
    protected getColumnsKey() { return PayslipPaidMoneyClaimingColumns.columnsKey; }
    protected getDialogType() { return PayslipPaidMoneyClaimingDialog; }
    protected getRowDefinition() { return PayslipPaidMoneyClaimingRow; }
    protected getService() { return PayslipPaidMoneyClaimingService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}