import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { PayrollEarningsColumns, PayrollEarningsRow, PayrollEarningsService } from '../../ServerTypes/PayrollSettings';
import { PayrollEarningsDialog } from './PayrollEarningsDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayrollEarningsGrid')
export class PayrollEarningsGrid extends EntityGrid<PayrollEarningsRow, any> {
    protected getColumnsKey() { return PayrollEarningsColumns.columnsKey; }
    protected getDialogType() { return PayrollEarningsDialog; }
    protected getRowDefinition() { return PayrollEarningsRow; }
    protected getService() { return PayrollEarningsService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}