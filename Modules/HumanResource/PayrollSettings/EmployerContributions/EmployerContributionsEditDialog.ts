import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { GridEditorDialog } from "@serenity-is/extensions";
import { EmployerContributionsForm, EmployerContributionsRow, EmployerContributionsService } from '../../../ServerTypes/PayrollSettings';
@Decorators.registerClass('HRMSoftware.PayrollSettings.EmployerContributionsEditDialog')
export class EmployerContributionsEditDialog extends GridEditorDialog<EmployerContributionsRow> {
    protected getFormKey() { return EmployerContributionsForm.formKey; }
    protected getRowDefinition() { return EmployerContributionsRow; }
    protected getService() { return EmployerContributionsService.baseUrl; }
    protected getLocalTextPrefix() { return EmployerContributionsRow.localTextPrefix; }
    protected getNameProperty() { return EmployerContributionsRow.nameProperty; }
    protected form: EmployerContributionsForm = new EmployerContributionsForm(this.idPrefix);
    constructor() {
        super();
        this.form = new EmployerContributionsForm(this.idPrefix);

    }
}