import { Decorators } from '@serenity-is/corelib';
import { EmployeeAllowanceColumns, EmployeeAllowanceRow } from '../../../ServerTypes/EmployeeProfile';
import { GridEditorBase } from "@serenity-is/extensions";
import { EmployeeAllowanceEditDialog } from './EmployeeAllowanceEditDialog';
@Decorators.registerEditor('HRMSoftware.EmployeeProfile.EmployeeAllowanceEditor')
export class EmployeeAllowanceEditor extends GridEditorBase<EmployeeAllowanceRow> {
    protected getColumnsKey() { return EmployeeAllowanceColumns.columnsKey; }
    protected getDialogType() { return EmployeeAllowanceEditDialog; }
    protected getLocalTextPrefix() { return EmployeeAllowanceRow.localTextPrefix; }
    protected getAddButtonCaption() {
        return "Add";
    }

    
}