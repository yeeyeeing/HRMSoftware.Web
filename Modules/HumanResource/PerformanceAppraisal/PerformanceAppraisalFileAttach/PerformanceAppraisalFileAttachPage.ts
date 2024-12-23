import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PerformanceAppraisalFileAttachGrid } from './PerformanceAppraisalFileAttachGrid';

export default function pageInit() {
    initFullHeightGridPage(new PerformanceAppraisalFileAttachGrid($('#GridDiv')).element);
}