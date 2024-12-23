import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { ShiftHistoryGrid } from './ShiftHistoryGrid';

export default function pageInit() {
    initFullHeightGridPage(new ShiftHistoryGrid($('#GridDiv')).element);
}