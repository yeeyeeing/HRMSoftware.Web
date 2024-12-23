import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { ShiftHistoryColumns, ShiftHistoryRow, ShiftHistoryService } from '../../../ServerTypes/ShiftHistory';
import { ShiftHistoryDialog } from './ShiftHistoryDialog';

@Decorators.registerClass('HRMSoftware.ShiftHistory.ShiftHistoryGrid')
export class ShiftHistoryGrid extends EntityGrid<ShiftHistoryRow, any> {
    protected getColumnsKey() { return ShiftHistoryColumns.columnsKey; }
    protected getDialogType() { return ShiftHistoryDialog; }
    protected getRowDefinition() { return ShiftHistoryRow; }
    protected getService() { return ShiftHistoryService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}