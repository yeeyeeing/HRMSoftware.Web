import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { AnnouncementSectionBindedForm, AnnouncementSectionBindedRow, AnnouncementSectionBindedService } from '../../../ServerTypes/Announcement';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementSectionBindedDialog')
export class AnnouncementSectionBindedDialog extends EntityDialog<AnnouncementSectionBindedRow, any> {
    protected getFormKey() { return AnnouncementSectionBindedForm.formKey; }
    protected getRowDefinition() { return AnnouncementSectionBindedRow; }
    protected getService() { return AnnouncementSectionBindedService.baseUrl; }

    protected form = new AnnouncementSectionBindedForm(this.idPrefix);
}