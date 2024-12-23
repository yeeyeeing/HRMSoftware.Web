import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { AnnouncementDepartmentBindedForm, AnnouncementDepartmentBindedRow, AnnouncementDepartmentBindedService } from '../../../ServerTypes/Announcement';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementDepartmentBindedDialog')
export class AnnouncementDepartmentBindedDialog extends EntityDialog<AnnouncementDepartmentBindedRow, any> {
    protected getFormKey() { return AnnouncementDepartmentBindedForm.formKey; }
    protected getRowDefinition() { return AnnouncementDepartmentBindedRow; }
    protected getService() { return AnnouncementDepartmentBindedService.baseUrl; }

    protected form = new AnnouncementDepartmentBindedForm(this.idPrefix);
}