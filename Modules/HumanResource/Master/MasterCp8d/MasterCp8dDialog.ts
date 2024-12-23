import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { MasterCp8dForm, MasterCp8dRow, MasterCp8dService } from '../../../ServerTypes/Master';

@Decorators.registerClass('HRMSoftware.Master.MasterCp8dDialog')
export class MasterCp8dDialog extends EntityDialog<MasterCp8dRow, any> {
    protected getFormKey() { return MasterCp8dForm.formKey; }
    protected getRowDefinition() { return MasterCp8dRow; }
    protected getService() { return MasterCp8dService.baseUrl; }

    protected form = new MasterCp8dForm(this.idPrefix);
}