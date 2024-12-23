import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { EisSubjectionForm, EisSubjectionRow, EisSubjectionService } from '../../../ServerTypes/PayrollSettings';
import { alertDialog, confirm, RetrieveResponse, serviceCall } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.PayrollSettings.EisSubjectionDialog')
export class EisSubjectionDialog extends EntityDialog<EisSubjectionRow, any> {
    protected getFormKey() { return EisSubjectionForm.formKey; }
    protected getRowDefinition() { return EisSubjectionRow; }
    protected getService() { return EisSubjectionService.baseUrl; }

    protected form = new EisSubjectionForm(this.idPrefix);


    protected save_submitHandler(response): void {

     



        var res = response
        if (this.isNew() == false) {
            confirm("Edit changes to the EIS subjection settings?", () => {
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
            var EntityId = this.entityId
            EisSubjectionService.Retrieve({
                EntityId: EntityId
            }, response => {
                if (response.Entity.EffectiveSince !== undefined && response.Entity.EffectiveUntil !== undefined)
                    form.readOnly = true

            });




        }
        */
    }


}