import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { WeeklyPayrollColumns, WeeklyPayrollRow, WeeklyPayrollService } from '../../../ServerTypes/PayrollSettings';
import { WeeklyPayrollDialog } from './WeeklyPayrollDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.WeeklyPayrollGrid')
export class WeeklyPayrollGrid extends EntityGrid<WeeklyPayrollRow, any> {
    protected getColumnsKey() { return WeeklyPayrollColumns.columnsKey; }
    protected getDialogType() { return WeeklyPayrollDialog; }
    protected getRowDefinition() { return WeeklyPayrollRow; }
    protected getService() { return WeeklyPayrollService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}