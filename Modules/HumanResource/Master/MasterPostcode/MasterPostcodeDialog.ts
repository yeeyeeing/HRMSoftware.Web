import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { MasterPostcodeForm, MasterPostcodeRow, MasterPostcodeService } from '../../../ServerTypes/Master';

@Decorators.registerClass('HRMSoftware.Master.MasterPostcodeDialog')
export class MasterPostcodeDialog extends EntityDialog<MasterPostcodeRow, any> {
    protected getFormKey() { return MasterPostcodeForm.formKey; }
    protected getRowDefinition() { return MasterPostcodeRow; }
    protected getService() { return MasterPostcodeService.baseUrl; }

    protected form = new MasterPostcodeForm(this.idPrefix);
}