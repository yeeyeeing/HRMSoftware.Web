import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { PerformanceAppraisalResponseColumns, PerformanceAppraisalResponseRow, PerformanceAppraisalResponseService } from '../../../ServerTypes/PerformanceAppraisal';
import { PerformanceAppraisalResponseDialog } from './PerformanceAppraisalResponseDialog';

@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalResponseGrid')
export class PerformanceAppraisalResponseGrid extends EntityGrid<PerformanceAppraisalResponseRow, any> {
    protected getColumnsKey() { return PerformanceAppraisalResponseColumns.columnsKey; }
    protected getDialogType() { return PerformanceAppraisalResponseDialog; }
    protected getRowDefinition() { return PerformanceAppraisalResponseRow; }
    protected getService() { return PerformanceAppraisalResponseService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
        
    }
}