import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PerformanceAppraisalFormGrid } from './PerformanceAppraisalFormGrid';

export default function pageInit() {
    initFullHeightGridPage(new PerformanceAppraisalFormGrid($('#GridDiv')).element);
}

