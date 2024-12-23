import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { PcbSubjectionForm, PcbSubjectionRow, PcbSubjectionService } from '../../../ServerTypes/PayrollSettings';
import { alertDialog, confirm, RetrieveResponse, serviceCall } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PcbSubjectionDialog')
export class PcbSubjectionDialog extends EntityDialog<PcbSubjectionRow, any> {
    protected getFormKey() { return PcbSubjectionForm.formKey; }
    protected getRowDefinition() { return PcbSubjectionRow; }
    protected getService() { return PcbSubjectionService.baseUrl; }

    protected form = new PcbSubjectionForm(this.idPrefix); 

    protected save_submitHandler(response): void {

       



        var res = response
        if (this.isNew() == false) {
            confirm("Edit changes to the PCB subjection settings?", () => {
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

    }
}