import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { ViewShiftHistoryColumns, ViewShiftHistoryRow, ViewShiftHistoryService } from '../../../ServerTypes/ViewShiftHistory';
import { ViewShiftHistoryDialog } from './ViewShiftHistoryDialog';

@Decorators.registerClass('HRMSoftware.ViewShiftHistory.ViewShiftHistoryGrid')
export class ViewShiftHistoryGrid extends EntityGrid<ViewShiftHistoryRow, any> {
    protected getColumnsKey() { return ViewShiftHistoryColumns.columnsKey; }
    protected getDialogType() { return ViewShiftHistoryDialog; }
    protected getRowDefinition() { return ViewShiftHistoryRow; }
    protected getService() { return ViewShiftHistoryService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}