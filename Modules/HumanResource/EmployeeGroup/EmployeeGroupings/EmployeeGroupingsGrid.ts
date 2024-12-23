import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { EmployeeGroupingsColumns, EmployeeGroupingsRow, EmployeeGroupingsService } from '../../../ServerTypes/EmployeeGroup';
import { EmployeeGroupingsDialog } from './EmployeeGroupingsDialog';

@Decorators.registerClass('HRMSoftware.EmployeeGroup.EmployeeGroupingsGrid')
export class EmployeeGroupingsGrid extends EntityGrid<EmployeeGroupingsRow, any> {
    protected getColumnsKey() { return EmployeeGroupingsColumns.columnsKey; }
    protected getDialogType() { return EmployeeGroupingsDialog; }
    protected getRowDefinition() { return EmployeeGroupingsRow; }
    protected getService() { return EmployeeGroupingsService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}