import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { AnnouncementForm, AnnouncementRow, AnnouncementService } from '../../../ServerTypes/Announcement';
import {  isEmptyOrNull } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementDialog')
export class AnnouncementDialog extends EntityDialog<AnnouncementRow, any> {
    protected getFormKey() { return AnnouncementForm.formKey; }
    protected getRowDefinition() { return AnnouncementRow; }
    protected getService() { return AnnouncementService.baseUrl; }

    protected form = new AnnouncementForm(this.idPrefix);
    constructor() {
        super();
        
    }

    public onDialogOpen(): void {
        super.onDialogOpen();
        var self = this
        this.saveAndCloseButton.remove()
        this.editButton.remove()
        this.deleteButton.remove()
        this.applyChangesButton.remove()
        this.dialogTitle = 'Announcement'

        AnnouncementService.Update({
            EntityId: self.entityId,
            Entity:
            {
                "Viewed": 1
            }
        });
        this.readOnly=true        
        if (isEmptyOrNull(this.form.UploadDocument.value))
            $('.UploadDocument').hide()
        
    }

}