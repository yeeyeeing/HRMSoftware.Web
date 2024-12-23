import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PublicHolidayGrid } from './PublicHolidayGrid';

export default function pageInit() {
    initFullHeightGridPage(new PublicHolidayGrid($('#GridDiv')).element);
}