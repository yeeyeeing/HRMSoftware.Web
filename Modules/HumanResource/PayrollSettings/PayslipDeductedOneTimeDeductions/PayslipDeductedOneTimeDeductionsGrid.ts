import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { PayslipDeductedOneTimeDeductionsColumns, PayslipDeductedOneTimeDeductionsRow, PayslipDeductedOneTimeDeductionsService } from '../../../ServerTypes/PayrollSettings';
import { PayslipDeductedOneTimeDeductionsDialog } from './PayslipDeductedOneTimeDeductionsDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayslipDeductedOneTimeDeductionsGrid')
export class PayslipDeductedOneTimeDeductionsGrid extends EntityGrid<PayslipDeductedOneTimeDeductionsRow, any> {
    protected getColumnsKey() { return PayslipDeductedOneTimeDeductionsColumns.columnsKey; }
    protected getDialogType() { return PayslipDeductedOneTimeDeductionsDialog; }
    protected getRowDefinition() { return PayslipDeductedOneTimeDeductionsRow; }
    protected getService() { return PayslipDeductedOneTimeDeductionsService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}