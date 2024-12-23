import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { AnnouncementGeneratedEditorForm  } from '../../../ServerTypes/Announcement';
import { GridEditorDialog } from "@serenity-is/extensions";
import { AnnouncementGeneratedRow, AnnouncementGeneratedService } from '../../../ServerTypes/Announcement';
import { getLookupAsync } from '@serenity-is/corelib/q';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementGeneratedEditDialog')
export class AnnouncementGeneratedEditDialog extends GridEditorDialog<AnnouncementGeneratedRow> {
    protected getFormKey() { return AnnouncementGeneratedEditorForm.formKey; }
    protected getRowDefinition() { return AnnouncementGeneratedRow; }
    protected getService() { return AnnouncementGeneratedService.baseUrl; }

    protected form: AnnouncementGeneratedEditorForm ;
    constructor() {
        super();
        this.form = new AnnouncementGeneratedEditorForm(this.idPrefix);

    }

    protected onDialogOpen() {
        super.onDialogOpen()
        var self = this
        this.saveAndCloseButton.remove()
        this.deleteButton.remove()

        this.readOnly = true

        EmployeeProfileService.Retrieve({
            EntityId: self.form.EmployeeRowId.value
        }, response => {
            self.form.EmployeeName.value = response.Entity.EmployeeName

        })

   

    }


}