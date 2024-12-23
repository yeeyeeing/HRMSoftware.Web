import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { FixedDeductionForm, FixedDeductionRow, FixedDeductionService } from '../../../ServerTypes/EmployeeProfile';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.FixedDeductionDialog')
export class FixedDeductionDialog extends EntityDialog<FixedDeductionRow, any> {
    protected getFormKey() { return FixedDeductionForm.formKey; }
    protected getRowDefinition() { return FixedDeductionRow; }
    protected getService() { return FixedDeductionService.baseUrl; }

    protected form = new FixedDeductionForm(this.idPrefix);
}