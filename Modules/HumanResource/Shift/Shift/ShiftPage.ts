import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { ShiftGrid } from './ShiftGrid';

export default function pageInit() {
    initFullHeightGridPage(new ShiftGrid($('#GridDiv')).element);
}