import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { MasterCostCentreForm, MasterCostCentreRow, MasterCostCentreService } from '../../../ServerTypes/Master';

@Decorators.registerClass('HRMSoftware.Master.MasterCostCentreDialog')
export class MasterCostCentreDialog extends EntityDialog<MasterCostCentreRow, any> {
    protected getFormKey() { return MasterCostCentreForm.formKey; }
    protected getRowDefinition() { return MasterCostCentreRow; }
    protected getService() { return MasterCostCentreService.baseUrl; }

    protected form = new MasterCostCentreForm(this.idPrefix);
}