import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { AnnouncementGeneratedColumns, AnnouncementGeneratedRow, AnnouncementGeneratedService } from '../../../ServerTypes/Announcement';
import { AnnouncementGeneratedDialog } from './AnnouncementGeneratedDialog';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementGeneratedGrid')
export class AnnouncementGeneratedGrid extends EntityGrid<AnnouncementGeneratedRow, any> {
    protected getColumnsKey() { return AnnouncementGeneratedColumns.columnsKey; }
    protected getDialogType() { return AnnouncementGeneratedDialog; }
    protected getRowDefinition() { return AnnouncementGeneratedRow; }
    protected getService() { return AnnouncementGeneratedService.baseUrl; }
    protected getAddButtonCaption() {
        return "Generate Annnouncements";
    }
    constructor(container: JQuery) {
        super(container);
    }
}