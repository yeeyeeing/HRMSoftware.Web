import { Decorators } from '@serenity-is/corelib';
import { GridEditorBase } from "@serenity-is/extensions";
import { PayrollEarningsColumns, PayrollEarningsRow } from '../../../ServerTypes/PayrollSettings';
import { PayrollEarningsEditDialog } from './PayrollEarningsEditDialog';
@Decorators.registerEditor('HRMSoftware.PayrollSettings.PayrollEarningsEditor')
export class PayrollEarningsEditor extends GridEditorBase<PayrollEarningsRow> {
    protected getColumnsKey() { return PayrollEarningsColumns.columnsKey; }
    protected getDialogType() { return PayrollEarningsEditDialog; }
    protected getLocalTextPrefix() { return PayrollEarningsRow.localTextPrefix; }
    protected getAddButtonCaption() {
        
        return "Add";
    }
    validateEntity(row, id) {
        return true;
    }
}