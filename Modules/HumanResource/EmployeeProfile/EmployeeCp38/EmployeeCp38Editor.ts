import { Decorators } from '@serenity-is/corelib';
import { EmployeeAllowanceColumns, EmployeeAllowanceRow, EmployeeCp38Columns, EmployeeCp38Row, MasterAllowanceRow } from '../../../ServerTypes/EmployeeProfile';
import { GridEditorBase } from "@serenity-is/extensions";
import {  EmployeeCp38EditDialog } from './EmployeeCp38EditDialog';
@Decorators.registerEditor('HRMSoftware.EmployeeProfile.EmployeeCp38Editor')
export class EmployeeCp38Editor extends GridEditorBase<EmployeeCp38Row> {
    protected getColumnsKey() { return EmployeeCp38Columns.columnsKey; }
    protected getDialogType() { return EmployeeCp38EditDialog; }
    protected getLocalTextPrefix() { return EmployeeCp38Row.localTextPrefix; }
    protected getAddButtonCaption() {
        return "Add";
    }
    /*
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
*/
    
}