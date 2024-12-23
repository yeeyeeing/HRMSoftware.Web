import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { AnnouncementDivisionBindedForm, AnnouncementDivisionBindedRow, AnnouncementDivisionBindedService } from '../../../ServerTypes/Announcement';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementDivisionBindedDialog')
export class AnnouncementDivisionBindedDialog extends EntityDialog<AnnouncementDivisionBindedRow, any> {
    protected getFormKey() { return AnnouncementDivisionBindedForm.formKey; }
    protected getRowDefinition() { return AnnouncementDivisionBindedRow; }
    protected getService() { return AnnouncementDivisionBindedService.baseUrl; }

    protected form = new AnnouncementDivisionBindedForm(this.idPrefix);
}