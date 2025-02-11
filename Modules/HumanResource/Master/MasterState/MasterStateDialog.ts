import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { MasterStateForm, MasterStateRow, MasterStateService } from '../../../ServerTypes/Master';
import { alertDialog } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.Master.MasterStateDialog')
export class MasterStateDialog extends EntityDialog<MasterStateRow, any> {
    protected getFormKey() { return MasterStateForm.formKey; }
    protected getRowDefinition() { return MasterStateRow; }
    protected getService() { return MasterStateService.baseUrl; }

    protected form = new MasterStateForm(this.idPrefix);

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);
        var StateCodeElement = document.getElementById(this.idPrefix + 'StateCode')
        $(StateCodeElement).on('input', async function () {
            let value = this.value;

            // Remove non-numeric characters
            value = value.replace(/\D/g, '');

            // Limit to 3 characters
            if (value.length > 3) {
                value = value.slice(0, 3);
            }

            // Update input value
            this.value = value;
        })
    }

    protected save_submitHandler(response): void {
       
        super.save_submitHandler(response)
    }
}