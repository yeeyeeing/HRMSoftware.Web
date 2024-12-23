import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { PayrollGeneratingWizardColumns, PayrollGeneratingWizardRow, PayrollGeneratingWizardService } from '../../../ServerTypes/PayrollSettings';
import { PayrollGeneratingWizardDialog } from './PayrollGeneratingWizardDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayrollGeneratingWizardGrid')
export class PayrollGeneratingWizardGrid extends EntityGrid<PayrollGeneratingWizardRow, any> {
    protected getColumnsKey() { return PayrollGeneratingWizardColumns.columnsKey; }
    protected getDialogType() { return PayrollGeneratingWizardDialog; }
    protected getRowDefinition() { return PayrollGeneratingWizardRow; }
    protected getService() { return PayrollGeneratingWizardService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}