import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { ReportGrid } from './ReportGrid';

export default function pageInit() {
    initFullHeightGridPage(new ReportGrid($('#GridDiv')).element);
}