import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { MasterCp8dColumns, MasterCp8dRow, MasterCp8dService } from '../../../ServerTypes/Master';
import { MasterCp8dDialog } from './MasterCp8dDialog';

@Decorators.registerClass('HRMSoftware.Master.MasterCp8dGrid')
export class MasterCp8dGrid extends EntityGrid<MasterCp8dRow, any> {
    protected getColumnsKey() { return MasterCp8dColumns.columnsKey; }
    protected getDialogType() { return MasterCp8dDialog; }
    protected getRowDefinition() { return MasterCp8dRow; }
    protected getService() { return MasterCp8dService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}