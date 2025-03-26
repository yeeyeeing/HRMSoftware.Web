import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { WeeklyPayrollForm, WeeklyPayrollRow, WeeklyPayrollService } from '../../../ServerTypes/PayrollSettings';

@Decorators.registerClass('HRMSoftware.PayrollSettings.WeeklyPayrollDialog')
export class WeeklyPayrollDialog extends EntityDialog<WeeklyPayrollRow, any> {
    protected getFormKey() { return WeeklyPayrollForm.formKey; }
    protected getRowDefinition() { return WeeklyPayrollRow; }
    protected getService() { return WeeklyPayrollService.baseUrl; }

    protected form = new WeeklyPayrollForm(this.idPrefix);
}