import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { EmployeeResignColumns, EmployeeResignRow, EmployeeResignService } from '../../../ServerTypes/EmployeeProfile';
import { EmployeeResignDialog } from './EmployeeResignDialog';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeeResignGrid')
export class EmployeeResignGrid extends EntityGrid<EmployeeResignRow, any> {
    protected getColumnsKey() { return EmployeeResignColumns.columnsKey; }
    protected getDialogType() { return EmployeeResignDialog; }
    protected getRowDefinition() { return EmployeeResignRow; }
    protected getService() { return EmployeeResignService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}