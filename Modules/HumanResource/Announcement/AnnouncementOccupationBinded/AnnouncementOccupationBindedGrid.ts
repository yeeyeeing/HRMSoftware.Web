import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { AnnouncementOccupationBindedColumns, AnnouncementOccupationBindedRow, AnnouncementOccupationBindedService } from '../../../ServerTypes/Announcement';
import { AnnouncementOccupationBindedDialog } from './AnnouncementOccupationBindedDialog';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementOccupationBindedGrid')
export class AnnouncementOccupationBindedGrid extends EntityGrid<AnnouncementOccupationBindedRow, any> {
    protected getColumnsKey() { return AnnouncementOccupationBindedColumns.columnsKey; }
    protected getDialogType() { return AnnouncementOccupationBindedDialog; }
    protected getRowDefinition() { return AnnouncementOccupationBindedRow; }
    protected getService() { return AnnouncementOccupationBindedService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}