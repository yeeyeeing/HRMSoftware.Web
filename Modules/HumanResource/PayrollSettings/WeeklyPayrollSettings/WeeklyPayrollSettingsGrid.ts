import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { WeeklyPayrollSettingsColumns, WeeklyPayrollSettingsRow, WeeklyPayrollSettingsService } from '../../../ServerTypes/PayrollSettings';
import { WeeklyPayrollSettingsDialog } from './WeeklyPayrollSettingsDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.WeeklyPayrollSettingsGrid')
export class WeeklyPayrollSettingsGrid extends EntityGrid<WeeklyPayrollSettingsRow, any> {
    protected getColumnsKey() { return WeeklyPayrollSettingsColumns.columnsKey; }
    protected getDialogType() { return WeeklyPayrollSettingsDialog; }
    protected getRowDefinition() { return WeeklyPayrollSettingsRow; }
    protected getService() { return WeeklyPayrollSettingsService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}