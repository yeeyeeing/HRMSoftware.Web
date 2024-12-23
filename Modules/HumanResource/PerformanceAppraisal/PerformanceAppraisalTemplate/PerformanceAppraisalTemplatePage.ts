import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PerformanceAppraisalTemplateGrid } from './PerformanceAppraisalTemplateGrid';

export default function pageInit() {
    initFullHeightGridPage(new PerformanceAppraisalTemplateGrid($('#GridDiv')).element);
}