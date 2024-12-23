import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { AnnouncementJobGradeBindedForm, AnnouncementJobGradeBindedRow, AnnouncementJobGradeBindedService } from '../../../ServerTypes/Announcement';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementJobGradeBindedDialog')
export class AnnouncementJobGradeBindedDialog extends EntityDialog<AnnouncementJobGradeBindedRow, any> {
    protected getFormKey() { return AnnouncementJobGradeBindedForm.formKey; }
    protected getRowDefinition() { return AnnouncementJobGradeBindedRow; }
    protected getService() { return AnnouncementJobGradeBindedService.baseUrl; }

    protected form = new AnnouncementJobGradeBindedForm(this.idPrefix);
}