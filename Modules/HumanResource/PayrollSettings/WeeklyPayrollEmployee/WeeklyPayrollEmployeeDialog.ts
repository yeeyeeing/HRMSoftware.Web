import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { WeeklyPayrollEmployeeForm, WeeklyPayrollEmployeeRow, WeeklyPayrollEmployeeService } from '../../../ServerTypes/PayrollSettings';

@Decorators.registerClass('HRMSoftware.PayrollSettings.WeeklyPayrollEmployeeDialog')
export class WeeklyPayrollEmployeeDialog extends EntityDialog<WeeklyPayrollEmployeeRow, any> {
    protected getFormKey() { return WeeklyPayrollEmployeeForm.formKey; }
    protected getRowDefinition() { return WeeklyPayrollEmployeeRow; }
    protected getService() { return WeeklyPayrollEmployeeService.baseUrl; }

    protected form = new WeeklyPayrollEmployeeForm(this.idPrefix);
}