import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { RecurringAnnouncementGrid } from './RecurringAnnouncementGrid';

export default function pageInit() {
    initFullHeightGridPage(new RecurringAnnouncementGrid($('#GridDiv')).element);
}