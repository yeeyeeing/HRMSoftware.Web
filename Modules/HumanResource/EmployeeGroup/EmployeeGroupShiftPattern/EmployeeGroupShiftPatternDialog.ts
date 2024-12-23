import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { EmployeeGroupShiftPatternForm, EmployeeGroupShiftPatternRow, EmployeeGroupShiftPatternService } from '../../../ServerTypes/EmployeeGroup';

@Decorators.registerClass('HRMSoftware.EmployeeGroup.EmployeeGroupShiftPatternDialog')
export class EmployeeGroupShiftPatternDialog extends EntityDialog<EmployeeGroupShiftPatternRow, any> {
    protected getFormKey() { return EmployeeGroupShiftPatternForm.formKey; }
    protected getRowDefinition() { return EmployeeGroupShiftPatternRow; }
    protected getService() { return EmployeeGroupShiftPatternService.baseUrl; }

    protected form = new EmployeeGroupShiftPatternForm(this.idPrefix);
}