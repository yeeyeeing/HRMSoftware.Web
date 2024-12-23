import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { PayslipPaidOneTimeAllowanceColumns, PayslipPaidOneTimeAllowanceRow, PayslipPaidOneTimeAllowanceService } from '../../../ServerTypes/PayrollSettings';
import { PayslipPaidOneTimeAllowanceDialog } from './PayslipPaidOneTimeAllowanceDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayslipPaidOneTimeAllowanceGrid')
export class PayslipPaidOneTimeAllowanceGrid extends EntityGrid<PayslipPaidOneTimeAllowanceRow, any> {
    protected getColumnsKey() { return PayslipPaidOneTimeAllowanceColumns.columnsKey; }
    protected getDialogType() { return PayslipPaidOneTimeAllowanceDialog; }
    protected getRowDefinition() { return PayslipPaidOneTimeAllowanceRow; }
    protected getService() { return PayslipPaidOneTimeAllowanceService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}