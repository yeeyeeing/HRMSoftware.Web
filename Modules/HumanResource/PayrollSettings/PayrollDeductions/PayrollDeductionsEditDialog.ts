import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { GridEditorDialog } from "@serenity-is/extensions";
import { PayrollDeductionsForm, PayrollDeductionsRow, PayrollDeductionsService } from '../../../ServerTypes/PayrollSettings';
@Decorators.registerClass('HRMSoftware.PayrollSettings.PayrollDeductionsEditDialog')
export class PayrollDeductionsEditDialog extends GridEditorDialog<PayrollDeductionsRow> {
    protected getFormKey() { return PayrollDeductionsForm.formKey; }
    protected getRowDefinition() { return PayrollDeductionsRow; }
    protected getService() { return PayrollDeductionsService.baseUrl; }
    protected getLocalTextPrefix() { return PayrollDeductionsRow.localTextPrefix; }
    protected getNameProperty() { return PayrollDeductionsRow.nameProperty; }
    protected form: PayrollDeductionsForm = new PayrollDeductionsForm(this.idPrefix);
    constructor() {
        super();
        this.form = new PayrollDeductionsForm(this.idPrefix);

    }
}