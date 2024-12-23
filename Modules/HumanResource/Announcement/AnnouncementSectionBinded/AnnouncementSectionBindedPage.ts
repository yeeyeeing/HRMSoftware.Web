import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { AnnouncementSectionBindedGrid } from './AnnouncementSectionBindedGrid';

export default function pageInit() {
    initFullHeightGridPage(new AnnouncementSectionBindedGrid($('#GridDiv')).element);
}