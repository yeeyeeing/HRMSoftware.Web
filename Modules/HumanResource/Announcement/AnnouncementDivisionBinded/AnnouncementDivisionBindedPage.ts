import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { AnnouncementDivisionBindedGrid } from './AnnouncementDivisionBindedGrid';

export default function pageInit() {
    initFullHeightGridPage(new AnnouncementDivisionBindedGrid($('#GridDiv')).element);
}