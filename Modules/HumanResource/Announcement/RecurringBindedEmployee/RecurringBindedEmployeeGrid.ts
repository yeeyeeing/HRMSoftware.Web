import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { RecurringBindedEmployeeColumns, RecurringBindedEmployeeRow, RecurringBindedEmployeeService } from '../../../ServerTypes/Announcement';
//import { RecurringBindedEmployeeDialog } from './RecurringBindedEmployeeDialog';

@Decorators.registerClass('HRMSoftware.Announcement.RecurringBindedEmployeeGrid')
export class RecurringBindedEmployeeGrid extends EntityGrid<RecurringBindedEmployeeRow, any> {
    protected getColumnsKey() { return RecurringBindedEmployeeColumns.columnsKey; }
   // protected getDialogType() { return RecurringBindedEmployeeDialog; }
    protected getRowDefinition() { return RecurringBindedEmployeeRow; }
    protected getService() { return RecurringBindedEmployeeService.baseUrl; }
    protected getAddButtonCaption() {
        return "Set Annnouncement";
    }
    constructor(container: JQuery) {
        super(container);
    }
}