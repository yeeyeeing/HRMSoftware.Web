import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { MasterBankColumns, MasterBankRow, MasterBankService } from '../../../ServerTypes/Master';
import { MasterBankDialog } from './MasterBankDialog';

@Decorators.registerClass('HRMSoftware.Master.MasterBankGrid')
export class MasterBankGrid extends EntityGrid<MasterBankRow, any> {
    protected getColumnsKey() { return MasterBankColumns.columnsKey; }
    protected getDialogType() { return MasterBankDialog; }
    protected getRowDefinition() { return MasterBankRow; }
    protected getService() { return MasterBankService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}