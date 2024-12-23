import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PerformanceAppraisalTypeGrid } from './PerformanceAppraisalTypeGrid';

export default function pageInit() {
    initFullHeightGridPage(new PerformanceAppraisalTypeGrid($('#GridDiv')).element);
}