import { Decorators } from '@serenity-is/corelib';
import { GridEditorBase } from "@serenity-is/extensions";
import { PayrollDeductionsColumns, PayrollDeductionsRow } from '../../../ServerTypes/PayrollSettings';
import { PayrollDeductionsEditDialog } from './PayrollDeductionsEditDialog';
@Decorators.registerEditor('HRMSoftware.PayrollSettings.PayrollDeductionsEditor')
export class PayrollDeductionsEditor extends GridEditorBase<PayrollDeductionsRow> {
    protected getColumnsKey() { return PayrollDeductionsColumns.columnsKey; }
    protected getDialogType() { return PayrollDeductionsEditDialog; }
    protected getLocalTextPrefix() { return PayrollDeductionsRow.localTextPrefix; }
    protected getAddButtonCaption() {
        
        return "Add";
    }
    validateEntity(row, id) {
        return true;
    }
}