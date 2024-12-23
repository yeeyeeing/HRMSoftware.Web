import { Decorators, EntityGrid, ListRequest, ListResponse } from '@serenity-is/corelib';
import { ShiftColumns, ShiftRow, ShiftService } from '../../../ServerTypes/Shift';
import { ShiftDialog } from './ShiftDialog';

@Decorators.registerClass('HRMSoftware.Shift.ShiftGrid')
export class ShiftGrid extends EntityGrid<ShiftRow, any> {
    protected getColumnsKey() { return ShiftColumns.columnsKey; }
    protected getDialogType() { return ShiftDialog; }
    protected getRowDefinition() { return ShiftRow; }
    protected getService() { return ShiftService.baseUrl; }
    protected getAddButtonCaption() {
        return "Create Shift Pattern";
    }
    constructor(container: JQuery) {
        super(container);
    }

    protected onViewProcessData(response: ListResponse<ShiftRow>) {
        response = super.onViewProcessData(response);
        this.toolbar.findButton("column-picker-button").toggle(false);
        return response;

    }
    /*
    validateEntity(row: ShiftRow, id: number) {
     
        var itemId = id ?? row[this.getIdProperty()];

        var OccupationTable = getLookupAsync("Occupation.Occupation").then(x => {
            var item = this.view?.getItemById(itemId);
            if (item) {
                item.Occupation = x.itemById[row.PositionId].Name;
                this.view.updateItem(itemId, item);
            }
        });

        return true;
    }
    */



}