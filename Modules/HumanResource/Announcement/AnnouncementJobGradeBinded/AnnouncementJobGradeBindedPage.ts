import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { AnnouncementJobGradeBindedGrid } from './AnnouncementJobGradeBindedGrid';

export default function pageInit() {
    initFullHeightGridPage(new AnnouncementJobGradeBindedGrid($('#GridDiv')).element);
}