import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PerformanceAppraisalQuestionGrid } from './PerformanceAppraisalQuestionGrid';

export default function pageInit() {
    initFullHeightGridPage(new PerformanceAppraisalQuestionGrid($('#GridDiv')).element);
}