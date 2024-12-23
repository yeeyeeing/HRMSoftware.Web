import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { MasterCityForm, MasterCityRow, MasterCityService } from '../../../ServerTypes/Master';

@Decorators.registerClass('HRMSoftware.Master.MasterCityDialog')
export class MasterCityDialog extends EntityDialog<MasterCityRow, any> {
    protected getFormKey() { return MasterCityForm.formKey; }
    protected getRowDefinition() { return MasterCityRow; }
    protected getService() { return MasterCityService.baseUrl; }

    protected form = new MasterCityForm(this.idPrefix);
}