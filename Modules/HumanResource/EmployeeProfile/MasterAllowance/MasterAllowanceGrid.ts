import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { MasterAllowanceColumns, MasterAllowanceRow, MasterAllowanceService } from '../../../ServerTypes/EmployeeProfile';
import { MasterAllowanceDialog } from './MasterAllowanceDialog';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.MasterAllowanceGrid')
export class MasterAllowanceGrid extends EntityGrid<MasterAllowanceRow, any> {
    protected getColumnsKey() { return MasterAllowanceColumns.columnsKey; }
    protected getDialogType() { return MasterAllowanceDialog; }
    protected getRowDefinition() { return MasterAllowanceRow; }
    protected getService() { return MasterAllowanceService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}