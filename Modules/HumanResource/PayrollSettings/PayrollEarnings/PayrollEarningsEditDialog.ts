import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { EmployeeAllowanceForm, EmployeeAllowanceRow, EmployeeAllowanceService } from '../../../ServerTypes/EmployeeProfile';
import { GridEditorDialog } from "@serenity-is/extensions";
import { PayrollEarningsForm, PayrollEarningsRow, PayrollEarningsService } from '../../../ServerTypes/PayrollSettings';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayrollEarningsEditDialog')
export class PayrollEarningsEditDialog extends GridEditorDialog<PayrollEarningsRow> {
    protected getFormKey() { return PayrollEarningsForm.formKey; }
    protected getRowDefinition() { return PayrollEarningsRow; }
    protected getService() { return PayrollEarningsService.baseUrl; }
    protected getLocalTextPrefix() { return PayrollEarningsRow.localTextPrefix; }
    protected getNameProperty() { return PayrollEarningsRow.nameProperty; }

    protected form: PayrollEarningsForm = new PayrollEarningsForm(this.idPrefix);

    constructor() {
        super();
        this.form = new PayrollEarningsForm(this.idPrefix);

    }
}