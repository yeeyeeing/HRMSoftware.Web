import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { HrdfSubjectionForm, HrdfSubjectionRow, HrdfSubjectionService } from '../../../ServerTypes/PayrollSettings';
import { alertDialog, confirm, RetrieveResponse, serviceCall } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.PayrollSettings.HrdfSubjectionDialog')
export class HrdfSubjectionDialog extends EntityDialog<HrdfSubjectionRow, any> {
    protected getFormKey() { return HrdfSubjectionForm.formKey; }
    protected getRowDefinition() { return HrdfSubjectionRow; }
    protected getService() { return HrdfSubjectionService.baseUrl; }

    protected form = new HrdfSubjectionForm(this.idPrefix);

    protected save_submitHandler(response): void {





        var res = response
        if (this.isNew() == false) {
            confirm("Edit changes to the HRDF subjection settings?", () => {
                super.save_submitHandler(res);
            });
        }

        else
            super.save_submitHandler(response)







    }


    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);

        this.applyChangesButton.hide()
        this.deleteButton.hide()
        var form = this
        this.undeleteButton.remove()
        this.localizationButton.remove()
        this.cloneButton.remove()
        /*
        if (this.isNew() == false) {
            console.log(this.form.idPrefix)
            var EntityId = this.entityId
            HrdfSubjectionService.Retrieve({
                EntityId: EntityId
            }, response => {

                console.log(response.Entity.EffectiveSince === undefined)

                console.log(response.Entity.EffectiveUntil === undefined)


                if (response.Entity.EffectiveSince !== undefined && response.Entity.EffectiveUntil !== undefined)
                    form.readOnly = true

            });




        }
        */
    }

}