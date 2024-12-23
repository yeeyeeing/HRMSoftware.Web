import { Decorators } from '@serenity-is/corelib';
import { GridEditorBase } from "@serenity-is/extensions";
import { getLookupAsync } from '@serenity-is/corelib/q';
import { AnnouncementGeneratedEditorColumns, AnnouncementGeneratedRow, AnnouncementGeneratedService } from '../../../ServerTypes/Announcement';
import { AnnouncementGeneratedEditDialog } from './AnnouncementGeneratedEditDialog';

@Decorators.registerEditor('HRMSoftware.Announcement.AnnouncementGeneratedEditorGrid')
export class AnnouncementGeneratedEditor extends GridEditorBase<AnnouncementGeneratedRow, any> {
    protected getColumnsKey() { return AnnouncementGeneratedEditorColumns.columnsKey; }
    protected getDialogType() { return AnnouncementGeneratedEditDialog; }
    protected getRowDefinition() { return AnnouncementGeneratedRow; }
    protected getService() { return AnnouncementGeneratedService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
        this.toolbar.findButton("add-button").toggle(false);
        this.toolbar.findButton("column-picker-button").toggle(false);
        $(".s-ToggleButton").hide();
       
    }

    protected getAddButtonCaption() {

        return "Add";
    }

    validateEntity(row: AnnouncementGeneratedRow, id: number) {
        if (!super.validateEntity(row, id))
            return false;
        var itemId = id ?? row[this.getIdProperty()];
        getLookupAsync("EmployeeProfile.EmployeeProfile").then(x => {
            var item = this.view?.getItemById(itemId);
            if (item) {
                item.EmployeeID = x.itemById[row.EmployeeRowId].EmployeeID;
                this.view.updateItem(itemId, item);
            }
        });
        return true;
    }
}