import { Decorators } from '@serenity-is/corelib';
import { AnnualLeavePolicyColumns, AnnualLeavePolicyRow } from '../../../ServerTypes/AnnualLeavePolicy';
import { GridEditorBase } from "@serenity-is/extensions";
import { AnnualLeavePolicyEditDialog } from './AnnualLeavePolicyEditDialog';
@Decorators.registerEditor('HRMSoftware.AnnualLeavePolicy.AnnualLeavePolicyEditor')
export class AnnualLeavePolicyEditor extends GridEditorBase<AnnualLeavePolicyRow> {
    protected getColumnsKey() { return AnnualLeavePolicyColumns.columnsKey; }
    protected getDialogType() { return AnnualLeavePolicyEditDialog; }
    protected getLocalTextPrefix() { return AnnualLeavePolicyRow.localTextPrefix; }
    protected getAddButtonCaption() {
        return "Add";
    }
    validateEntity(row, id) {
        return true;
    }
}