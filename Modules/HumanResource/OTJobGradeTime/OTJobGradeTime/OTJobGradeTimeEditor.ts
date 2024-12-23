import { Decorators } from '@serenity-is/corelib';
import { GridEditorBase } from "@serenity-is/extensions";
import { getLookupAsync } from '@serenity-is/corelib/q';
import {  OTJobGradeTimeEditDialog } from './OTJobGradeTimeEditDialog';
import { OTJobGradeTimeColumns, OTJobGradeTimeRow } from '../../../ServerTypes/OTJobGradeTime';

@Decorators.registerEditor('HRMSoftware.OTJobGradeTime.OTJobGradeTimeEditor')
export class OTJobGradeTimeEditor extends GridEditorBase<OTJobGradeTimeRow> {
    protected getColumnsKey() { return OTJobGradeTimeColumns.columnsKey; }
    protected getDialogType() { return OTJobGradeTimeEditDialog; }
    protected getLocalTextPrefix() { return OTJobGradeTimeRow.localTextPrefix; }



    protected getAddButtonCaption() {
        return "Add";
    }



    validateEntity(row: OTJobGradeTimeRow, id: number) {
        if (!super.validateEntity(row, id))
            return false;

        var itemId = id ?? row[this.getIdProperty()];

        var JobGradeTable = getLookupAsync("JobGrade.JobGrade").then(x => {
            var item = this.view?.getItemById(itemId);
            if (item) {
                item.JobGradeName = x.itemById[row.JobGradeId].Name;
                this.view.updateItem(itemId, item);
            }
        });
        return true;
    }
}