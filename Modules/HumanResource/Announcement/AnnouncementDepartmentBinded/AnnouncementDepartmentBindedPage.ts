import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { AnnouncementDepartmentBindedEditor } from './AnnouncementDepartmentBindedEditor';
import { AnnouncementDepartmentBindedGrid } from './AnnouncementDepartmentBindedGrid';

export default function pageInit() {
    initFullHeightGridPage(new AnnouncementDepartmentBindedGrid($('#GridDiv')).element);
}