import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { ProgramParticipantColumns, ProgramParticipantRow, ProgramParticipantService } from '../../../ServerTypes/TrainingManagement';
import {Column} from "@serenity-is/sleekgrid";
import { ProgramParticipantEditDialog } from './ProgramParticipantEditDialog';

@Decorators.registerClass('HRMSoftware.TrainingManagement.ProgramParticipantGrid')
export class ProgramParticipantGrid extends EntityGrid<ProgramParticipantRow, any> {
    protected getColumnsKey() { return ProgramParticipantColumns.columnsKey; }
    protected getDialogType() { return ProgramParticipantEditDialog; }
    protected getRowDefinition() { return ProgramParticipantRow; }
    protected getService() { return ProgramParticipantService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}