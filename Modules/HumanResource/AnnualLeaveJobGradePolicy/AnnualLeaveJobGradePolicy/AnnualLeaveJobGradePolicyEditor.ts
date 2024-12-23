import { Decorators } from '@serenity-is/corelib';
import { AnnualLeaveJobGradePolicyRow,  AnnualLeaveJobGradePolicyColumns } from '../../../ServerTypes/AnnualLeaveJobGradePolicy';

import { GridEditorBase } from "@serenity-is/extensions";
import { getLookupAsync } from '@serenity-is/corelib/q';
import { AnnualLeaveJobGradePolicyEditDialog } from './AnnualLeaveJobGradePolicyEditDialog';

@Decorators.registerEditor('HRMSoftware.AnnualLeaveJobGradePolicy.AnnualLeaveJobGradePolicyEditor')
export class AnnualLeaveJobGradePolicyEditor extends GridEditorBase<AnnualLeaveJobGradePolicyRow> {
    protected getColumnsKey() { return AnnualLeaveJobGradePolicyColumns.columnsKey; }
    protected getDialogType() { return AnnualLeaveJobGradePolicyEditDialog; }
    protected getLocalTextPrefix() { return AnnualLeaveJobGradePolicyRow.localTextPrefix; }



    protected getAddButtonCaption() {
        return "Add";
    }



    validateEntity(row: AnnualLeaveJobGradePolicyRow, id: number) {
        if (!super.validateEntity(row, id))
            return false;

        var itemId = id ?? row[this.getIdProperty()];

       getLookupAsync("JobGrade.JobGrade").then(x => {
            var item = this.view?.getItemById(itemId);
            if (item) {
                item.JobGradeName = x.itemById[row.JobGradeLevel].Name;
                this.view.updateItem(itemId, item);
            }
        });
        
        return true;
    }
}