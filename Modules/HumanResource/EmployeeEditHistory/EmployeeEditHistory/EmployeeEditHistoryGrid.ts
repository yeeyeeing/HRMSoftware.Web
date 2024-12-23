import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { EmployeeEditHistoryColumns, EmployeeEditHistoryRow, EmployeeEditHistoryService } from '../../../ServerTypes/EmployeeEditHistory';
import { EmployeeEditHistoryDialog } from './EmployeeEditHistoryDialog';

@Decorators.registerClass('HRMSoftware.EmployeeEditHistory.EmployeeEditHistoryGrid')
export class EmployeeEditHistoryGrid extends EntityGrid<EmployeeEditHistoryRow, any> {
    protected getColumnsKey() { return EmployeeEditHistoryColumns.columnsKey; }
    protected getDialogType() { return EmployeeEditHistoryDialog; }
    protected getRowDefinition() { return EmployeeEditHistoryRow; }
    protected getService() { return EmployeeEditHistoryService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}