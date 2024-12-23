import { Decorators, EntityGrid, ListRequest } from '@serenity-is/corelib';
import { LeaveReasonColumns, LeaveReasonRow, LeaveReasonService } from '../../../ServerTypes/LeaveApplication';
import { LeaveReasonDialog } from './LeaveReasonDialog';

@Decorators.registerClass('HRMSoftware.LeaveApplication.LeaveReasonGrid')
export class LeaveReasonGrid extends EntityGrid<LeaveReasonRow, any> {
    protected getColumnsKey() { return LeaveReasonColumns.columnsKey; }
    protected getDialogType() { return LeaveReasonDialog; }
    protected getRowDefinition() { return LeaveReasonRow; }
    protected getService() { return LeaveReasonService.baseUrl; }



    constructor(container: JQuery) {
        super(container);
    }
    protected onViewProcessData(response: ListRequest<LeaveReasonRow>) {
        response = super.onViewProcessData(response);
        this.toolbar.findButton("column-picker-button").toggle(false);
        return response;

    }

}