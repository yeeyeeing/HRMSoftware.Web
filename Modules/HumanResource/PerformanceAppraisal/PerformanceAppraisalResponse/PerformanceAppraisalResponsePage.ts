import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PerformanceAppraisalResponseGrid } from './PerformanceAppraisalResponseGrid';

export default function pageInit() {
    initFullHeightGridPage(new PerformanceAppraisalResponseGrid($('#GridDiv')).element);
}