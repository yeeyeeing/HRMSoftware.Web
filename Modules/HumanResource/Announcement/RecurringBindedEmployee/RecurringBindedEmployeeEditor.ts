import { Decorators } from '@serenity-is/corelib';
import { GridEditorBase } from "@serenity-is/extensions";
import {   RecurringBindedEmployeeColumns, RecurringBindedEmployeeRow, RecurringBindedEmployeeService } from '../../../ServerTypes/Announcement';

@Decorators.registerEditor('HRMSoftware.Announcement.RecurringBindedEmployeeEditor')
export class RecurringBindedEmployeeEditor extends GridEditorBase<RecurringBindedEmployeeRow, any> {
    protected getColumnsKey() { return RecurringBindedEmployeeColumns.columnsKey; }
    protected getRowDefinition() { return RecurringBindedEmployeeRow; }
    protected getService() { return RecurringBindedEmployeeService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
        this.toolbar.findButton("add-button").toggle(false);
        this.toolbar.findButton("column-picker-button").toggle(false);
        $(".s-ToggleButton").hide();
       
    }

    protected getAddButtonCaption() {

        return "Add";
    }

    validateEntity(row: RecurringBindedEmployeeRow, id: number) {
        if (!super.validateEntity(row, id))
            return false;
        var itemId = id ?? row[this.getIdProperty()];
        /*
        getLookupAsync("EmployeeProfile.EmployeeProfile").then(x => {
            var item = this.view?.getItemById(itemId);
            if (item) {
                item.EmployeeID = x.itemById[row.EmployeeRowId].EmployeeID;
                this.view.updateItem(itemId, item);
            }
        });
        */
        return true;
    }
    
}