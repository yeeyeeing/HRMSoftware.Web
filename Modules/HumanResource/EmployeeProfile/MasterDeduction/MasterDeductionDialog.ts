import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { FixedDeductionRow, FixedDeductionService, MasterDeductionForm, MasterDeductionRow, MasterDeductionService } from '../../../ServerTypes/EmployeeProfile';
import { alertDialog, confirmDialog, getHighlightTarget, RetrieveResponse, serviceCall } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.MasterDeductionDialog')
export class MasterDeductionDialog extends EntityDialog<MasterDeductionRow, any> {
    protected getFormKey() { return MasterDeductionForm.formKey; }
    protected getRowDefinition() { return MasterDeductionRow; }
    protected getService() { return MasterDeductionService.baseUrl; }

    protected form = new MasterDeductionForm(this.idPrefix);


    protected save_submitHandler(response): void {
        var res = response
        var self = this
        if (this.form.Recurring.value == false && this.form.OneTime.value == false) {
            alertDialog('Please choose the frequency of this allowance')
            return
        }


        if (!this.isNew()) {

            confirmDialog(
                // here we demonstrate how you can detect which button user has clicked
                // second parameter is Yes handler and it is called only when user clicks Yes.
                // third parameter has some additional options, that you should only use when needed
                "Do you want to update all employee with the Deduction?",
                () => {
                    FixedDeductionService.List({
                        Criteria: [[FixedDeductionRow.Fields.MasterDeductionId], '=', self.entityId]
                    }, response => {
                        for (var index in response.Entities) {
                            FixedDeductionService.Update({
                                EntityId: response.Entities[index].Id,
                                Entity:
                                {
                                    "DeductionCode": self.form.DeductionCode.value,
                                    "Amount": self.form.Amount.value,
                                    "Description": self.form.Description.value,
                                    "OneTime": self.form.OneTime.value,
                                    "Recurring": self.form.Recurring.value,
                                }
                            });
                        }
                        super.save_submitHandler(res);
                    })
                }, {
                onNo: () => { super.save_submitHandler(res) }
            });



        }
        else
            super.save_submitHandler(response);

    }




}