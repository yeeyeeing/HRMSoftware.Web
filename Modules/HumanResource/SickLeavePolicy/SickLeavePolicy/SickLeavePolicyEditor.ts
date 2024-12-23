import { Decorators } from '@serenity-is/corelib';
import { SickLeavePolicyColumns, SickLeavePolicyRow } from '../../../ServerTypes/SickLeavePolicy';
import { GridEditorBase } from "@serenity-is/extensions";
import { SickLeavePolicyEditDialog } from './SickLeavePolicyEditDialog';

@Decorators.registerEditor('HRMSoftware.SickLeavePolicy.SickLeavePolicyEditor')
export class SickLeavePolicyEditor extends GridEditorBase<SickLeavePolicyRow> {
    protected getColumnsKey() { return SickLeavePolicyColumns.columnsKey; }
    protected getDialogType() { return SickLeavePolicyEditDialog; }
    protected getLocalTextPrefix() { return SickLeavePolicyRow.localTextPrefix; }

    protected getAddButtonCaption()
    {
        return "Add";
    }

    validateEntity(row, id) {




        return true;
    }

}