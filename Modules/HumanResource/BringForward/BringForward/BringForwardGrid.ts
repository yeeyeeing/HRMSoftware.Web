import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { BringForwardColumns, BringForwardRow, BringForwardService } from '../../../ServerTypes/BringForward';
import { BringForwardDialog } from './BringForwardDialog';

@Decorators.registerClass('HRMSoftware.BringForward.BringForwardGrid')
export class BringForwardGrid extends EntityGrid<BringForwardRow, any> {
    protected getColumnsKey() { return BringForwardColumns.columnsKey; }
    protected getDialogType() { return BringForwardDialog; }
    protected getRowDefinition() { return BringForwardRow; }
    protected getService() { return BringForwardService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}