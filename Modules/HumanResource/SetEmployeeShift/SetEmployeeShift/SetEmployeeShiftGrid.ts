import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { SetEmployeeShiftColumns, SetEmployeeShiftRow, SetEmployeeShiftService } from '../../../ServerTypes/SetEmployeeShift';
import { SetEmployeeShiftDialog } from './SetEmployeeShiftDialog';

@Decorators.registerClass('HRMSoftware.SetEmployeeShift.SetEmployeeShiftGrid')
export class SetEmployeeShiftGrid extends EntityGrid<SetEmployeeShiftRow, any> {
    protected getColumnsKey() { return SetEmployeeShiftColumns.columnsKey; }
    protected getDialogType() { return SetEmployeeShiftDialog; }
    protected getRowDefinition() { return SetEmployeeShiftRow; }
    protected getService() { return SetEmployeeShiftService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}