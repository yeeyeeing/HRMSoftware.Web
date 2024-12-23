import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { EmployeePersonalProfileForm, EmployeePersonalProfileRow, EmployeePersonalProfileService } from '../../ServerTypes/EmployeeProfile';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeePersonalProfileDialog')
export class EmployeePersonalProfileDialog extends EntityDialog<EmployeePersonalProfileRow, any> {
    protected getFormKey() { return EmployeePersonalProfileForm.formKey; }
    protected getRowDefinition() { return EmployeePersonalProfileRow; }
    protected getService() { return EmployeePersonalProfileService.baseUrl; }

    protected form = new EmployeePersonalProfileForm(this.idPrefix);
}