import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { AnnouncementColumns, AnnouncementRow, AnnouncementService } from '../../../ServerTypes/Announcement';
import { AnnouncementDialog } from './AnnouncementDialog';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementGrid')
export class AnnouncementGrid extends EntityGrid<AnnouncementRow, any> {
    protected getColumnsKey() { return AnnouncementColumns.columnsKey; }
    protected getDialogType() { return AnnouncementDialog; }
    protected getRowDefinition() { return AnnouncementRow; }
    protected getService() { return AnnouncementService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
    protected createQuickFilters(): void {
        // let base class to create quick filters first

        super.createQuickFilters();
      
      this.toolbar.findButton("add-button").toggle(false);

    }

}