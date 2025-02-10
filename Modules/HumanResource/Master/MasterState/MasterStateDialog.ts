import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { MasterStateForm, MasterStateRow, MasterStateService } from '../../../ServerTypes/Master';

@Decorators.registerClass('HRMSoftware.Master.MasterStateDialog')
export class MasterStateDialog extends EntityDialog<MasterStateRow, any> {
    protected getFormKey() { return MasterStateForm.formKey; }
    protected getRowDefinition() { return MasterStateRow; }
    protected getService() { return MasterStateService.baseUrl; }

    protected form = new MasterStateForm(this.idPrefix);

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);
        var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'StateCode')
        $(EmployeeRowIdElement).on('change', async function () {
            console.log('input')
        })
    }
}