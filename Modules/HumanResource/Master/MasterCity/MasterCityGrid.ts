import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { MasterCityColumns, MasterCityRow, MasterCityService } from '../../../ServerTypes/Master';
import { MasterCityDialog } from './MasterCityDialog';

@Decorators.registerClass('HRMSoftware.Master.MasterCityGrid')
export class MasterCityGrid extends EntityGrid<MasterCityRow, any> {
    protected getColumnsKey() { return MasterCityColumns.columnsKey; }
    protected getDialogType() { return MasterCityDialog; }
    protected getRowDefinition() { return MasterCityRow; }
    protected getService() { return MasterCityService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}