import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { EmployeeBasicDataColumns, EmployeeBasicDataRow, EmployeeBasicDataService } from '../../../ServerTypes/EmployeeBasicData';
import { EmployeeBasicDataDialog } from './EmployeeBasicDataDialog';

@Decorators.registerClass('HRMSoftware.EmployeeBasicData.EmployeeBasicDataGrid')
export class EmployeeBasicDataGrid extends EntityGrid<EmployeeBasicDataRow, any> {
    protected getColumnsKey() { return EmployeeBasicDataColumns.columnsKey; }
    protected getDialogType() { return EmployeeBasicDataDialog; }
    protected getRowDefinition() { return EmployeeBasicDataRow; }
    protected getService() { return EmployeeBasicDataService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}