import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PerformanceAppraisalEvaluationGrid } from './PerformanceAppraisalEvaluationGrid';

export default function pageInit() {
    initFullHeightGridPage(new PerformanceAppraisalEvaluationGrid($('#GridDiv')).element);
}