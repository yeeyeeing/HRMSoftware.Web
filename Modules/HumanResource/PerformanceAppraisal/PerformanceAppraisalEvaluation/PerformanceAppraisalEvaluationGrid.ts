import {Decorators, EntityGrid, ListResponse} from '@serenity-is/corelib';
import { PerformanceAppraisalEvaluationColumns, PerformanceAppraisalEvaluationRow, PerformanceAppraisalEvaluationService } from '../../../ServerTypes/PerformanceAppraisal';
import { PerformanceAppraisalEvaluationDialog } from './PerformanceAppraisalEvaluationDialog';
import {PerformanceAppraisalFormRow} from "@/ServerTypes/PerformanceAppraisal";

@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalEvaluationGrid')
export class PerformanceAppraisalEvaluationGrid extends EntityGrid<PerformanceAppraisalEvaluationRow, any> {
    protected getColumnsKey() { return PerformanceAppraisalEvaluationColumns.columnsKey; }
    protected getDialogType() { return PerformanceAppraisalEvaluationDialog; }
    protected getRowDefinition() { return PerformanceAppraisalEvaluationRow; }
    protected getService() { return PerformanceAppraisalEvaluationService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
    

}