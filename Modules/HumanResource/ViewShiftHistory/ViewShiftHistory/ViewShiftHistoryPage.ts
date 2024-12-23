import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { ViewShiftHistoryGrid } from './ViewShiftHistoryGrid';

export default function pageInit() {
    initFullHeightGridPage(new ViewShiftHistoryGrid($('#GridDiv')).element);
}