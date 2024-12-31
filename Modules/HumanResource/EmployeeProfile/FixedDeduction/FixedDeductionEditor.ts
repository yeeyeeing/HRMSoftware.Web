import { Decorators } from '@serenity-is/corelib';
import {FixedDeductionColumns, FixedDeductionRow, MasterDeductionRow } from '../../../ServerTypes/EmployeeProfile';

import { GridEditorBase } from "@serenity-is/extensions";
import { FixedDeductionEditDialog } from './FixedDeductionEditDialog';
@Decorators.registerEditor('HRMSoftware.EmployeeProfile.FixedDeductionEditor')
export class FixedDeductionEditor extends GridEditorBase<FixedDeductionRow> {
    protected getColumnsKey() { return FixedDeductionColumns.columnsKey; }
    protected getDialogType() { return FixedDeductionEditDialog; }
    protected getLocalTextPrefix() { return FixedDeductionRow.localTextPrefix; }
    protected getAddButtonCaption() {
        return "Add";
    }
    protected validateEntity(row: FixedDeductionRow, id: number) {
        if (!super.validateEntity(row, id))
            return false;

        var itemId = id ?? row[this.getIdProperty()];
        MasterDeductionRow.getLookupAsync().then(x => {
            var item = this.view?.getItemById(itemId);
            if (item) {
                item.DeductionCode = x.itemById[row.MasterDeductionId].DeductionCode;
                this.view.updateItem(itemId, item);
            }
        });

        return true;
    }


}