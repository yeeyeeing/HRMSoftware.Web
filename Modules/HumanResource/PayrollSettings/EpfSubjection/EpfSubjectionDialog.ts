import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { EpfSubjectionForm, EpfSubjectionRow, EpfSubjectionService } from '../../../ServerTypes/PayrollSettings';
import { alertDialog, confirm, RetrieveResponse, serviceCall, Retrieve } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.PayrollSettings.EpfSubjectionDialog')
export class EpfSubjectionDialog extends EntityDialog<EpfSubjectionRow, any> {
    protected getFormKey() { return EpfSubjectionForm.formKey; }
    protected getRowDefinition() { return EpfSubjectionRow; }
    protected getService() { return EpfSubjectionService.baseUrl; }

    protected form = new EpfSubjectionForm(this.idPrefix);

    protected save_submitHandler(response): void {





        var res = response
        if (this.isNew() == false) {
            confirm("Edit changes to the EPF subjection settings?", () => {
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
        this.undeleteButton.remove()
        this.localizationButton.remove()
        this.cloneButton.remove()
    }
}