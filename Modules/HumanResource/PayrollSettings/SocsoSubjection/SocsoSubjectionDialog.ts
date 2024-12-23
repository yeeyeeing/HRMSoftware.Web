import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { SocsoSubjectionForm, SocsoSubjectionRow, SocsoSubjectionService } from '../../../ServerTypes/PayrollSettings';
import { alertDialog, confirm, RetrieveResponse, serviceCall } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.PayrollSettings.SocsoSubjectionDialog')
export class SocsoSubjectionDialog extends EntityDialog<SocsoSubjectionRow, any> {
    protected getFormKey() { return SocsoSubjectionForm.formKey; }
    protected getRowDefinition() { return SocsoSubjectionRow; }
    protected getService() { return SocsoSubjectionService.baseUrl; }

    protected form = new SocsoSubjectionForm(this.idPrefix);



    protected save_submitHandler(response): void {





        var res = response
        if (this.isNew() == false) {
            confirm("Edit changes to the company settings? The changes will take effect next month", () => {
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
            SocsoSubjectionService.Retrieve({
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