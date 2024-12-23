import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { AnnouncementDepartmentBindedColumns, AnnouncementDepartmentBindedRow, AnnouncementDepartmentBindedService } from '../../../ServerTypes/Announcement';
import { AnnouncementDepartmentBindedDialog } from './AnnouncementDepartmentBindedDialog';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementDepartmentBindedGrid')
export class AnnouncementDepartmentBindedGrid extends EntityGrid<AnnouncementDepartmentBindedRow, any> {
    protected getColumnsKey() { return AnnouncementDepartmentBindedColumns.columnsKey; }
    protected getDialogType() { return AnnouncementDepartmentBindedDialog; }
    protected getRowDefinition() { return AnnouncementDepartmentBindedRow; }
    protected getService() { return AnnouncementDepartmentBindedService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}