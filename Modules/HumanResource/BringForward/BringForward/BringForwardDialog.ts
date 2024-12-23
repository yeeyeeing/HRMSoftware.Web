import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { BringForwardForm, BringForwardRow, BringForwardService } from '../../../ServerTypes/BringForward';

@Decorators.registerClass('HRMSoftware.BringForward.BringForwardDialog')
export class BringForwardDialog extends EntityDialog<BringForwardRow, any> {
    protected getFormKey() { return BringForwardForm.formKey; }
    protected getRowDefinition() { return BringForwardRow; }
    protected getService() { return BringForwardService.baseUrl; }

    protected form = new BringForwardForm(this.idPrefix);
}