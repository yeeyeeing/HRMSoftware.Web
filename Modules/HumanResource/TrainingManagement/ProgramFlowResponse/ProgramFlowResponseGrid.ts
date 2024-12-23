import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { ProgramFlowResponseColumns, ProgramFlowResponseRow, ProgramFlowResponseService } from '../../../ServerTypes/TrainingManagement';
import { ProgramFlowResponseDialog } from './ProgramFlowResponseDialog';

@Decorators.registerClass('HRMSoftware.TrainingManagement.ProgramFlowResponseGrid')
export class ProgramFlowResponseGrid extends EntityGrid<ProgramFlowResponseRow, any> {
    protected getColumnsKey() { return ProgramFlowResponseColumns.columnsKey; }
    protected getDialogType() { return ProgramFlowResponseDialog; }
    protected getRowDefinition() { return ProgramFlowResponseRow; }
    protected getService() { return ProgramFlowResponseService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}