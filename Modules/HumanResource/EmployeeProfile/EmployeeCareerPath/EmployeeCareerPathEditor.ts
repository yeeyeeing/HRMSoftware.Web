import { Decorators } from '@serenity-is/corelib';
import {  EmployeeCareerPathColumns, MasterCareerPathRow } from '../../../ServerTypes/EmployeeProfile';
import { GridEditorBase } from "@serenity-is/extensions";
import {  EmployeeCareerPathRow } from '../../../ServerTypes/EmployeeProfile';
import { EmployeeCareerPathEditDialog } from './EmployeeCareerPathEditDialog';

@Decorators.registerEditor('HRMSoftware.EmployeeProfile.EmployeeCareerPathEditor')
export class EmployeeCareerPathEditor extends GridEditorBase<EmployeeCareerPathRow> {
    protected getColumnsKey() { return EmployeeCareerPathColumns.columnsKey; }
    protected getDialogType() { return EmployeeCareerPathEditDialog; }
    protected getLocalTextPrefix() { return EmployeeCareerPathRow.localTextPrefix; }
    protected getAddButtonCaption() {
        return "Add";
    }
    protected validateEntity(row: EmployeeCareerPathRow, id: number) {
        console.log('haha')
        if (!super.validateEntity(row, id))
            return false;

        var itemId = id ?? row[this.getIdProperty()];
        MasterCareerPathRow.getLookupAsync().then(x => {
            var item = this.view?.getItemById(itemId);
            if (item) {
                console.log(x.itemById[row.CareerPathId])
                item.CareerPathCode = x.itemById[row.CareerPathId].CareerPathCode;
                this.view.updateItem(itemId, item);
            }
        });

        return true;
    }
    protected getItems() {
        let items = super.getItems();
        return items.sort((a, b) => a.Id - b.Id); // Sort by ID
    }
    
}