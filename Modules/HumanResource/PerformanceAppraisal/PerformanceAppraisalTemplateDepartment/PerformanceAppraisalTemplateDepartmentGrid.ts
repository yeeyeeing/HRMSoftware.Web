import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { PerformanceAppraisalTemplateDepartmentColumns, PerformanceAppraisalTemplateDepartmentRow, PerformanceAppraisalTemplateDepartmentService } from '../../ServerTypes/PerformanceAppraisal';
import { PerformanceAppraisalTemplateDepartmentDialog } from './PerformanceAppraisalTemplateDepartmentDialog';

@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateDepartmentGrid')
export class PerformanceAppraisalTemplateDepartmentGrid extends EntityGrid<PerformanceAppraisalTemplateDepartmentRow, any> {
    protected getColumnsKey() { return PerformanceAppraisalTemplateDepartmentColumns.columnsKey; }
    protected getDialogType() { return PerformanceAppraisalTemplateDepartmentDialog; }
    protected getRowDefinition() { return PerformanceAppraisalTemplateDepartmentRow; }
    protected getService() { return PerformanceAppraisalTemplateDepartmentService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}