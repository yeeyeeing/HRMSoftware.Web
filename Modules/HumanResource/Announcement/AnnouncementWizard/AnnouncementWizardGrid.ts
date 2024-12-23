import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { AnnouncementWizardColumns, AnnouncementWizardRow, AnnouncementWizardService } from '../../../ServerTypes/Announcement';
import { AnnouncementWizardDialog } from './AnnouncementWizardDialog';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementWizardGrid')
export class AnnouncementWizardGrid extends EntityGrid<AnnouncementWizardRow, any> {
    protected getColumnsKey() { return AnnouncementWizardColumns.columnsKey; }
    protected getDialogType() { return AnnouncementWizardDialog; }
    protected getRowDefinition() { return AnnouncementWizardRow; }
    protected getService() { return AnnouncementWizardService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
       
    }
    protected getAddButtonCaption() {
        return "Run Annnouncement Wizard";
    }
}