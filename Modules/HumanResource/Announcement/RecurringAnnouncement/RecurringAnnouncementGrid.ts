import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { RecurringAnnouncementColumns, RecurringAnnouncementRow, RecurringAnnouncementService } from '../../../ServerTypes/Announcement';
import { RecurringAnnouncementDialog } from './RecurringAnnouncementDialog';

@Decorators.registerClass('HRMSoftware.Announcement.RecurringAnnouncementGrid')
export class RecurringAnnouncementGrid extends EntityGrid<RecurringAnnouncementRow, any> {
    protected getColumnsKey() { return RecurringAnnouncementColumns.columnsKey; }
    protected getDialogType() { return RecurringAnnouncementDialog; }
    protected getRowDefinition() { return RecurringAnnouncementRow; }
    protected getService() { return RecurringAnnouncementService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}