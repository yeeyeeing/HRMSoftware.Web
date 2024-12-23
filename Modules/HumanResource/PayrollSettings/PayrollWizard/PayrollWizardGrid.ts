import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { PayrollWizardColumns, PayrollWizardRow, PayrollWizardService } from '../../../ServerTypes/PayrollSettings';
import { PayrollWizardDialog } from './PayrollWizardDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayrollWizardGrid')
export class PayrollWizardGrid extends EntityGrid<PayrollWizardRow, any> {
    protected getColumnsKey() { return PayrollWizardColumns.columnsKey; }
    protected getDialogType() { return PayrollWizardDialog; }
    protected getRowDefinition() { return PayrollWizardRow; }
    protected getService() { return PayrollWizardService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}