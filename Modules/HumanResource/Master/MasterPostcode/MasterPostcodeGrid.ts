import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { MasterPostcodeColumns, MasterPostcodeRow, MasterPostcodeService } from '../../../ServerTypes/Master';
import { MasterPostcodeDialog } from './MasterPostcodeDialog';

@Decorators.registerClass('HRMSoftware.Master.MasterPostcodeGrid')
export class MasterPostcodeGrid extends EntityGrid<MasterPostcodeRow, any> {
    protected getColumnsKey() { return MasterPostcodeColumns.columnsKey; }
    protected getDialogType() { return MasterPostcodeDialog; }
    protected getRowDefinition() { return MasterPostcodeRow; }
    protected getService() { return MasterPostcodeService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}