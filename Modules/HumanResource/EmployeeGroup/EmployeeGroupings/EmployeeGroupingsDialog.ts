import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { EmployeeGroupingsForm, EmployeeGroupingsRow, EmployeeGroupingsService } from '../../../ServerTypes/EmployeeGroup';

@Decorators.registerClass('HRMSoftware.EmployeeGroup.EmployeeGroupingsDialog')
export class EmployeeGroupingsDialog extends EntityDialog<EmployeeGroupingsRow, any> {
    protected getFormKey() { return EmployeeGroupingsForm.formKey; }
    protected getRowDefinition() { return EmployeeGroupingsRow; }
    protected getService() { return EmployeeGroupingsService.baseUrl; }

    protected form = new EmployeeGroupingsForm(this.idPrefix);
}