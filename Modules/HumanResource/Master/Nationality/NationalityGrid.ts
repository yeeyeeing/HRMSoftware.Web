import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { NationalityColumns, NationalityRow, NationalityService } from '../../../ServerTypes/Master';
import { NationalityDialog } from './NationalityDialog';

@Decorators.registerClass('HRMSoftware.Master.NationalityGrid')
export class NationalityGrid extends EntityGrid<NationalityRow, any> {
    protected getColumnsKey() { return NationalityColumns.columnsKey; }
    protected getDialogType() { return NationalityDialog; }
    protected getRowDefinition() { return NationalityRow; }
    protected getService() { return NationalityService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}