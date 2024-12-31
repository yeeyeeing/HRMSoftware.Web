import { Decorators } from '@serenity-is/corelib';
import { EmployeeAllowanceColumns, EmployeeAllowanceRow, MasterAllowanceRow } from '../../../ServerTypes/EmployeeProfile';
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
    protected validateEntity(row: EmployeeAllowanceRow, id: number) {
        if (!super.validateEntity(row, id))
            return false;

        var itemId = id ?? row[this.getIdProperty()];
        MasterAllowanceRow.getLookupAsync().then(x => {
            var item = this.view?.getItemById(itemId);
            if (item) {
                console.log(x.itemById[row.MasterAllowanceId])
                item.AllowanceCode = x.itemById[row.MasterAllowanceId].AllowanceCode;
                this.view.updateItem(itemId, item);
            }
        });

        return true;
    }

    
}