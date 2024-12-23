import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { AnnouncementJobGradeBindedColumns, AnnouncementJobGradeBindedRow, AnnouncementJobGradeBindedService } from '../../../ServerTypes/Announcement';
import { AnnouncementJobGradeBindedDialog } from './AnnouncementJobGradeBindedDialog';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementJobGradeBindedGrid')
export class AnnouncementJobGradeBindedGrid extends EntityGrid<AnnouncementJobGradeBindedRow, any> {
    protected getColumnsKey() { return AnnouncementJobGradeBindedColumns.columnsKey; }
    protected getDialogType() { return AnnouncementJobGradeBindedDialog; }
    protected getRowDefinition() { return AnnouncementJobGradeBindedRow; }
    protected getService() { return AnnouncementJobGradeBindedService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}