import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { EmployeeGroupShiftColumns, EmployeeGroupShiftRow, EmployeeGroupShiftService } from '../../../ServerTypes/EmployeeGroup';
import { EmployeeGroupShiftDialog } from './EmployeeGroupShiftDialog';

@Decorators.registerClass('HRMSoftware.EmployeeGroup.EmployeeGroupShiftGrid')
export class EmployeeGroupShiftGrid extends EntityGrid<EmployeeGroupShiftRow, any> {
    protected getColumnsKey() { return EmployeeGroupShiftColumns.columnsKey; }
    protected getDialogType() { return EmployeeGroupShiftDialog; }
    protected getRowDefinition() { return EmployeeGroupShiftRow; }
    protected getService() { return EmployeeGroupShiftService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}