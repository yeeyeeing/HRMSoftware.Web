import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { JobGradeColumns, JobGradeRow, JobGradeService } from '../../../ServerTypes/OrganisationHierarchy';
import { JobGradeDialog } from './JobGradeDialog';

@Decorators.registerClass('HRMSoftware.OrganisationHierarchy.JobGradeGrid')
export class JobGradeGrid extends EntityGrid<JobGradeRow, any> {
    protected getColumnsKey() { return JobGradeColumns.columnsKey; }
    protected getDialogType() { return JobGradeDialog; }
    protected getRowDefinition() { return JobGradeRow; }
    protected getService() { return JobGradeService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}