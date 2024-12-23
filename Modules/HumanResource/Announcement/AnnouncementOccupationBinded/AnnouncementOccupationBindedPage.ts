import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { AnnouncementOccupationBindedGrid } from './AnnouncementOccupationBindedGrid';

export default function pageInit() {
    initFullHeightGridPage(new AnnouncementOccupationBindedGrid($('#GridDiv')).element);
}