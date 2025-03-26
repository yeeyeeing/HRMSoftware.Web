import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { WeeklyPayrollEmployeeColumns, WeeklyPayrollEmployeeRow, WeeklyPayrollEmployeeService } from '../../../ServerTypes/PayrollSettings';
import { WeeklyPayrollEmployeeDialog } from './WeeklyPayrollEmployeeDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.WeeklyPayrollEmployeeGrid')
export class WeeklyPayrollEmployeeGrid extends EntityGrid<WeeklyPayrollEmployeeRow, any> {
    protected getColumnsKey() { return WeeklyPayrollEmployeeColumns.columnsKey; }
    protected getDialogType() { return WeeklyPayrollEmployeeDialog; }
    protected getRowDefinition() { return WeeklyPayrollEmployeeRow; }
    protected getService() { return WeeklyPayrollEmployeeService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}