import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { PayrollDeductionsColumns, PayrollDeductionsRow, PayrollDeductionsService } from '../../../ServerTypes/PayrollSettings';
import { PayrollDeductionsDialog } from './PayrollDeductionsDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayrollDeductionsGrid')
export class PayrollDeductionsGrid extends EntityGrid<PayrollDeductionsRow, any> {
    protected getColumnsKey() { return PayrollDeductionsColumns.columnsKey; }
    protected getDialogType() { return PayrollDeductionsDialog; }
    protected getRowDefinition() { return PayrollDeductionsRow; }
    protected getService() { return PayrollDeductionsService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}