import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { AnnouncementGeneratedEditor } from './AnnouncementGeneratedEditor';

export default function pageInit() {
    initFullHeightGridPage(new AnnouncementGeneratedEditor($('#GridDiv')).element);
}