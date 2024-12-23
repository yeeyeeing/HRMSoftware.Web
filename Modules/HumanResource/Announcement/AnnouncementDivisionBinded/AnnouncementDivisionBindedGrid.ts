import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { AnnouncementDivisionBindedColumns, AnnouncementDivisionBindedRow, AnnouncementDivisionBindedService } from '../../../ServerTypes/Announcement';
import { AnnouncementDivisionBindedDialog } from './AnnouncementDivisionBindedDialog';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementDivisionBindedGrid')
export class AnnouncementDivisionBindedGrid extends EntityGrid<AnnouncementDivisionBindedRow, any> {
    protected getColumnsKey() { return AnnouncementDivisionBindedColumns.columnsKey; }
    protected getDialogType() { return AnnouncementDivisionBindedDialog; }
    protected getRowDefinition() { return AnnouncementDivisionBindedRow; }
    protected getService() { return AnnouncementDivisionBindedService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}