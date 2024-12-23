import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { MasterCountryForm, MasterCountryRow, MasterCountryService } from '../../../ServerTypes/Master';

@Decorators.registerClass('HRMSoftware.Master.MasterCountryDialog')
export class MasterCountryDialog extends EntityDialog<MasterCountryRow, any> {
    protected getFormKey() { return MasterCountryForm.formKey; }
    protected getRowDefinition() { return MasterCountryRow; }
    protected getService() { return MasterCountryService.baseUrl; }

    protected form = new MasterCountryForm(this.idPrefix);
}