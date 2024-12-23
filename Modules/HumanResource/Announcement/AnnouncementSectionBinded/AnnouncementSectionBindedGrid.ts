import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { AnnouncementSectionBindedColumns, AnnouncementSectionBindedRow, AnnouncementSectionBindedService } from '../../../ServerTypes/Announcement';
import { AnnouncementSectionBindedDialog } from './AnnouncementSectionBindedDialog';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementSectionBindedGrid')
export class AnnouncementSectionBindedGrid extends EntityGrid<AnnouncementSectionBindedRow, any> {
    protected getColumnsKey() { return AnnouncementSectionBindedColumns.columnsKey; }
    protected getDialogType() { return AnnouncementSectionBindedDialog; }
    protected getRowDefinition() { return AnnouncementSectionBindedRow; }
    protected getService() { return AnnouncementSectionBindedService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}