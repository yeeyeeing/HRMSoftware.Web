import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { ProgramFlowResponseForm, ProgramFlowResponseRow, ProgramFlowResponseService } from '../../../ServerTypes/TrainingManagement';

@Decorators.registerClass('HRMSoftware.TrainingManagement.ProgramFlowResponseDialog')
export class ProgramFlowResponseDialog extends EntityDialog<ProgramFlowResponseRow, any> {
    protected getFormKey() { return ProgramFlowResponseForm.formKey; }
    protected getRowDefinition() { return ProgramFlowResponseRow; }
    protected getService() { return ProgramFlowResponseService.baseUrl; }

    protected form = new ProgramFlowResponseForm(this.idPrefix);
}