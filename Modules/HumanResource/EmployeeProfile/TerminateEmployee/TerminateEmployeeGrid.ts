import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { TerminateEmployeeColumns, TerminateEmployeeRow, TerminateEmployeeService } from '../../../ServerTypes/EmployeeProfile';
import { TerminateEmployeeDialog } from './TerminateEmployeeDialog';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.TerminateEmployeeGrid')
export class TerminateEmployeeGrid extends EntityGrid<TerminateEmployeeRow, any> {
    protected getColumnsKey() { return TerminateEmployeeColumns.columnsKey; }
    protected getDialogType() { return TerminateEmployeeDialog; }
    protected getRowDefinition() { return TerminateEmployeeRow; }
    protected getService() { return TerminateEmployeeService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}