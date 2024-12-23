import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { FixedDeductionColumns, FixedDeductionRow, FixedDeductionService } from '../../../ServerTypes/EmployeeProfile';
import { FixedDeductionDialog } from './FixedDeductionDialog';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.FixedDeductionGrid')
export class FixedDeductionGrid extends EntityGrid<FixedDeductionRow, any> {
    protected getColumnsKey() { return FixedDeductionColumns.columnsKey; }
    protected getDialogType() { return FixedDeductionDialog; }
    protected getRowDefinition() { return FixedDeductionRow; }
    protected getService() { return FixedDeductionService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}