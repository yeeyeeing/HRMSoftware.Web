import { Decorators, EditorUtils, EntityDialog } from '@serenity-is/corelib';
import { FixedDeductionForm, FixedDeductionRow, FixedDeductionService, MasterDeductionService } from '../../../ServerTypes/EmployeeProfile';
import { GridEditorDialog } from "@serenity-is/extensions";
import { alertDialog, getHighlightTarget, RetrieveResponse, serviceCall } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.FixedDeductionEditDialog')
export class FixedDeductionEditDialog extends GridEditorDialog<FixedDeductionRow> {
    protected getFormKey() { return FixedDeductionForm.formKey; }
    protected getRowDefinition() { return FixedDeductionRow; }
    protected getService() { return FixedDeductionService.baseUrl; }
    protected getLocalTextPrefix() { return FixedDeductionRow.localTextPrefix; }
    protected getNameProperty() { return FixedDeductionRow.nameProperty; }

    protected form: FixedDeductionForm = new FixedDeductionForm(this.idPrefix);

    constructor() {
        super();
        this.form = new FixedDeductionForm(this.idPrefix);

    }

    public onDialogOpen() {
        super.onDialogOpen()
        var self = this
        this.
        $('.DeductionCode').hide()
        var MasterDeductionIdElement = document.getElementById(`${this.idPrefix}MasterDeductionId`)
        $(MasterDeductionIdElement).on('change', async function () {
            MasterDeductionService.Retrieve({
                EntityId: self.form.MasterDeductionId.value
            }, response => {
                self.form.Amount.value = response.Entity.Amount
                self.form.Description.value = response.Entity.Description
 
                self.form.OneTime.value = response.Entity.OneTime
                self.form.Recurring.value = response.Entity.Recurring

            })
        })


        EditorUtils.setReadonly(this.form.DeductedOneTime.element, true);
        if (this.form.OneTime.value == true && this.form.DeductedOneTime.value == true)
            EditorUtils.setReadonly(this.form.DeductedOneTime.element, false);
        


        var RecurringElement = document.getElementById(this.idPrefix + 'Recurring')
        $(RecurringElement).on('change', async function () {
            $('.DeductedOneTime').hide()

            if (self.form.OneTime.value == true)
                self.form.OneTime.value = false

            if (self.form.Recurring.value == true) {
                self.form.OneTime.value = false
            }
        })
        var OneTimeElement = document.getElementById(this.idPrefix + 'OneTime')
        $(OneTimeElement).on('change', async function () {
            $('.DeductedOneTime').hide()
            if (self.form.Recurring.value == true)
                self.form.Recurring.value = false
            if (self.form.OneTime.value == true) {
                $('.DeductedOneTime').show()
                self.form.Recurring.value = false
            }

        })
        if (self.form.OneTime.value == true) {
            $('.DeductedOneTime').show()
            self.form.Recurring.value = false
        }

    }

    protected save_submitHandler(response): void {
        if (this.form.Recurring.value == false && this.form.OneTime.value == false) {
            alertDialog('Please choose the frequency of this deduction')
            return
        }
        this.form.DeductionCode.value = this.form.MasterDeductionId.text

        super.save_submitHandler(response);

    }
}