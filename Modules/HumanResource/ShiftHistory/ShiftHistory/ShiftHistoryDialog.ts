import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { ShiftHistoryForm, ShiftHistoryRow, ShiftHistoryService } from '../../../ServerTypes/ShiftHistory';

@Decorators.registerClass('HRMSoftware.ShiftHistory.ShiftHistoryDialog')
export class ShiftHistoryDialog extends EntityDialog<ShiftHistoryRow, any> {
    protected getFormKey() { return ShiftHistoryForm.formKey; }
    protected getRowDefinition() { return ShiftHistoryRow; }
    protected getService() { return ShiftHistoryService.baseUrl; }

    protected form = new ShiftHistoryForm(this.idPrefix);
}