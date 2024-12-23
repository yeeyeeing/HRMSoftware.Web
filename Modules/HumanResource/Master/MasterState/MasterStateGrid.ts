import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { MasterStateColumns, MasterStateRow, MasterStateService } from '../../../ServerTypes/Master';
import { MasterStateDialog } from './MasterStateDialog';

@Decorators.registerClass('HRMSoftware.Master.MasterStateGrid')
export class MasterStateGrid extends EntityGrid<MasterStateRow, any> {
    protected getColumnsKey() { return MasterStateColumns.columnsKey; }
    protected getDialogType() { return MasterStateDialog; }
    protected getRowDefinition() { return MasterStateRow; }
    protected getService() { return MasterStateService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}