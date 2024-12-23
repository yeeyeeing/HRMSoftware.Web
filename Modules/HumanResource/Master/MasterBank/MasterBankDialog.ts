import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { MasterBankForm, MasterBankRow, MasterBankService } from '../../../ServerTypes/Master';

@Decorators.registerClass('HRMSoftware.Master.MasterBankDialog')
export class MasterBankDialog extends EntityDialog<MasterBankRow, any> {
    protected getFormKey() { return MasterBankForm.formKey; }
    protected getRowDefinition() { return MasterBankRow; }
    protected getService() { return MasterBankService.baseUrl; }

    protected form = new MasterBankForm(this.idPrefix);
}