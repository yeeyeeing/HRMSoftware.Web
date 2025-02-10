import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { PayrollSettingsColumns, PayrollSettingsRow, PayrollSettingsService } from '../../../ServerTypes/PayrollSettings';
import { PayrollSettingsDialog } from './PayrollSettingsDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayrollSettingsGrid')
export class PayrollSettingsGrid extends EntityGrid<PayrollSettingsRow, any> {
    protected getColumnsKey() { return PayrollSettingsColumns.columnsKey; }
    protected getDialogType() { return PayrollSettingsDialog; }
    protected getRowDefinition() { return PayrollSettingsRow; }
    protected getService() { return PayrollSettingsService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}