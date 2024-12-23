import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { MasterCountryColumns, MasterCountryRow, MasterCountryService } from '../../../ServerTypes/Master';
import { MasterCountryDialog } from './MasterCountryDialog';

@Decorators.registerClass('HRMSoftware.Master.MasterCountryGrid')
export class MasterCountryGrid extends EntityGrid<MasterCountryRow, any> {
    protected getColumnsKey() { return MasterCountryColumns.columnsKey; }
    protected getDialogType() { return MasterCountryDialog; }
    protected getRowDefinition() { return MasterCountryRow; }
    protected getService() { return MasterCountryService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}