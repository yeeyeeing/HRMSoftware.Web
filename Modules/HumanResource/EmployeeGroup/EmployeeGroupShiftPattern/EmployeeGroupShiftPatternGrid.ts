import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { EmployeeGroupShiftPatternColumns, EmployeeGroupShiftPatternRow, EmployeeGroupShiftPatternService } from '../../../ServerTypes/EmployeeGroup';
import { EmployeeGroupShiftPatternDialog } from './EmployeeGroupShiftPatternDialog';

@Decorators.registerClass('HRMSoftware.EmployeeGroup.EmployeeGroupShiftPatternGrid')
export class EmployeeGroupShiftPatternGrid extends EntityGrid<EmployeeGroupShiftPatternRow, any> {
    protected getColumnsKey() { return EmployeeGroupShiftPatternColumns.columnsKey; }
    protected getDialogType() { return EmployeeGroupShiftPatternDialog; }
    protected getRowDefinition() { return EmployeeGroupShiftPatternRow; }
    protected getService() { return EmployeeGroupShiftPatternService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}