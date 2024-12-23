import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { LeaveDescriptionColumns, LeaveDescriptionRow, LeaveDescriptionService } from '../../../ServerTypes/LeaveApplication';
import { LeaveDescriptionDialog } from './LeaveDescriptionDialog';

@Decorators.registerClass('HRMSoftware.LeaveApplication.LeaveDescriptionGrid')
export class LeaveDescriptionGrid extends EntityGrid<LeaveDescriptionRow, any> {
    protected getColumnsKey() { return LeaveDescriptionColumns.columnsKey; }
    protected getDialogType() { return LeaveDescriptionDialog; }
    protected getRowDefinition() { return LeaveDescriptionRow; }
    protected getService() { return LeaveDescriptionService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}