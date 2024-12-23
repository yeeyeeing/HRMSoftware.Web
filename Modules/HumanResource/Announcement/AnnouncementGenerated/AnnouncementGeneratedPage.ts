import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { AnnouncementGeneratedGrid } from './AnnouncementGeneratedGrid';

export default function pageInit() {
    initFullHeightGridPage(new AnnouncementGeneratedGrid($('#GridDiv')).element);
}