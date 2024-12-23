import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { EmployeeGroupShiftForm, EmployeeGroupShiftRow, EmployeeGroupShiftService } from '../../../ServerTypes/EmployeeGroup';

@Decorators.registerClass('HRMSoftware.EmployeeGroup.EmployeeGroupShiftDialog')
export class EmployeeGroupShiftDialog extends EntityDialog<EmployeeGroupShiftRow, any> {
    protected getFormKey() { return EmployeeGroupShiftForm.formKey; }
    protected getRowDefinition() { return EmployeeGroupShiftRow; }
    protected getService() { return EmployeeGroupShiftService.baseUrl; }

    protected form = new EmployeeGroupShiftForm(this.idPrefix);
}