import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { EmployeeCareerPathForm, EmployeeCareerPathRow, EmployeeCareerPathService } from '../../../ServerTypes/EmployeeProfile';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeeCareerPathDialog')
export class EmployeeCareerPathDialog extends EntityDialog<EmployeeCareerPathRow, any> {
    protected getFormKey() { return EmployeeCareerPathForm.formKey; }
    protected getRowDefinition() { return EmployeeCareerPathRow; }
    protected getService() { return EmployeeCareerPathService.baseUrl; }

    protected form = new EmployeeCareerPathForm(this.idPrefix);
}