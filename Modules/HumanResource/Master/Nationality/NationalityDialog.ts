import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { NationalityForm, NationalityRow, NationalityService } from '../../../ServerTypes/Master';

@Decorators.registerClass('HRMSoftware.Master.NationalityDialog')
export class NationalityDialog extends EntityDialog<NationalityRow, any> {
    protected getFormKey() { return NationalityForm.formKey; }
    protected getRowDefinition() { return NationalityRow; }
    protected getService() { return NationalityService.baseUrl; }

    protected form = new NationalityForm(this.idPrefix);
}