import { Decorators } from '@serenity-is/corelib';
import { GridEditorBase } from "@serenity-is/extensions";
import { MasterProgramFlowEditDialog } from './MasterProgramFlowEditDialog';
import { MasterProgramFlowColumns, ProgramFlowRow } from '../../../ServerTypes/TrainingManagement';
import { getLookupAsync } from '@serenity-is/corelib/q';

@Decorators.registerEditor('HRMSoftware.TrainingManagement.MasterProgramFlowEditor')
export class MasterProgramFlowEditor extends GridEditorBase<ProgramFlowRow> {
    protected getColumnsKey() { return MasterProgramFlowColumns.columnsKey; }
    protected getDialogType() { return MasterProgramFlowEditDialog; }
    protected getLocalTextPrefix() { return ProgramFlowRow.localTextPrefix; }

    protected getAddButtonCaption() {
        return "Add";
    }
}