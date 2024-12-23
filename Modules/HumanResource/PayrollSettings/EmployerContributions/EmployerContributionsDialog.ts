import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { EmployerContributionsForm, EmployerContributionsRow, EmployerContributionsService } from '../../../ServerTypes/PayrollSettings';

@Decorators.registerClass('HRMSoftware.PayrollSettings.EmployerContributionsDialog')
export class EmployerContributionsDialog extends EntityDialog<EmployerContributionsRow, any> {
    protected getFormKey() { return EmployerContributionsForm.formKey; }
    protected getRowDefinition() { return EmployerContributionsRow; }
    protected getService() { return EmployerContributionsService.baseUrl; }

    protected form = new EmployerContributionsForm(this.idPrefix);
}