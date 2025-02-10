import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { EmployeeCp38Form, EmployeeCp38Row, EmployeeCp38Service } from '../../../ServerTypes/EmployeeProfile';
import { serviceCall, RetrieveResponse, alertDialog, isEmptyOrNull, Authorization, getLookup, confirm } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeeCp38Dialog')
export class EmployeeCp38Dialog extends EntityDialog<EmployeeCp38Row, any> {
    protected getFormKey() { return EmployeeCp38Form.formKey; }
    protected getRowDefinition() { return EmployeeCp38Row; }
    protected getService() { return EmployeeCp38Service.baseUrl; }

    protected form = new EmployeeCp38Form(this.idPrefix);

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);
        var self = this
        const StartingFromElement = '#' + this.idPrefix + 'EffectiveFrom'
        const EndingElement = '#' + this.idPrefix + 'EffectiveUntil'
        $(StartingFromElement).on('change', function (e) {
            if (isEmptyOrNull(self.form.EffectiveFrom.value) || isEmptyOrNull(self.form.EffectiveUntil.value))
                return

            if (self.form.EffectiveFrom.valueAsDate > self.form.EffectiveUntil.valueAsDate) {
                alertDialog("the start date cannot be greater than end date")
                $(StartingFromElement).val(null)
                return
            }

        })
        $(EndingElement).on('change', function (e) {
            if (isEmptyOrNull(self.form.EffectiveFrom.value) || isEmptyOrNull(self.form.EffectiveUntil.value))
                return

            if (self.form.EffectiveFrom.valueAsDate > self.form.EffectiveUntil.valueAsDate) {
                alertDialog("the start date cannot be greater than end date")
                $(EndingElement).val(null)
                return
            }
        })

    }
}