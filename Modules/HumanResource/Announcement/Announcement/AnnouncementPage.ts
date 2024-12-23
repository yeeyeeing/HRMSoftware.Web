import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { AnnouncementGrid } from './AnnouncementGrid';

export default function pageInit() {
    initFullHeightGridPage(new AnnouncementGrid($('#GridDiv')).element);
}