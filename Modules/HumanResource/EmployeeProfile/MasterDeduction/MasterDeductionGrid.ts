import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { MasterDeductionColumns, MasterDeductionRow, MasterDeductionService } from '../../../ServerTypes/EmployeeProfile';
import { MasterDeductionDialog } from './MasterDeductionDialog';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.MasterDeductionGrid')
export class MasterDeductionGrid extends EntityGrid<MasterDeductionRow, any> {
    protected getColumnsKey() { return MasterDeductionColumns.columnsKey; }
    protected getDialogType() { return MasterDeductionDialog; }
    protected getRowDefinition() { return MasterDeductionRow; }
    protected getService() { return MasterDeductionService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}