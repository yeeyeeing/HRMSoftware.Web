import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { AnnouncementOccupationBindedForm, AnnouncementOccupationBindedRow, AnnouncementOccupationBindedService } from '../../../ServerTypes/Announcement';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementOccupationBindedDialog')
export class AnnouncementOccupationBindedDialog extends EntityDialog<AnnouncementOccupationBindedRow, any> {
    protected getFormKey() { return AnnouncementOccupationBindedForm.formKey; }
    protected getRowDefinition() { return AnnouncementOccupationBindedRow; }
    protected getService() { return AnnouncementOccupationBindedService.baseUrl; }

    protected form = new AnnouncementOccupationBindedForm(this.idPrefix);
}