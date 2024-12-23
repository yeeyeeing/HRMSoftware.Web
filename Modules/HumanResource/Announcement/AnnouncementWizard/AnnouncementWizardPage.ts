import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { AnnouncementWizardGrid } from './AnnouncementWizardGrid';

export default function pageInit() {
    initFullHeightGridPage(new AnnouncementWizardGrid($('#GridDiv')).element);
}