import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { MasterCostCentreColumns, MasterCostCentreRow, MasterCostCentreService } from '../../../ServerTypes/Master';
import { MasterCostCentreDialog } from './MasterCostCentreDialog';

@Decorators.registerClass('HRMSoftware.Master.MasterCostCentreGrid')
export class MasterCostCentreGrid extends EntityGrid<MasterCostCentreRow, any> {
    protected getColumnsKey() { return MasterCostCentreColumns.columnsKey; }
    protected getDialogType() { return MasterCostCentreDialog; }
    protected getRowDefinition() { return MasterCostCentreRow; }
    protected getService() { return MasterCostCentreService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}