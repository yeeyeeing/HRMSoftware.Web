import {Decorators, EditorUtils} from '@serenity-is/corelib';
import {GridEditorDialog} from "@serenity-is/extensions";
import {ProgramParticipantForm, ProgramParticipantRow} from '../../../ServerTypes/TrainingManagement';
import {EmployeeProfileService} from '../../../ServerTypes/EmployeeProfile';

@Decorators.registerClass('RMSoftware.TrainingManagement.ProgramParticipantEditDialog')
export class ProgramParticipantEditDialog extends GridEditorDialog<ProgramParticipantRow> {
    protected getFormKey() {
        return ProgramParticipantForm.formKey;
    }

    protected getLocalTextPrefix() {
        return ProgramParticipantRow.localTextPrefix;
    }

    protected form: ProgramParticipantForm;

    constructor() {
        super();
        this.form = new ProgramParticipantForm(this.idPrefix);

        if (this.isNew()) {
            EditorUtils.setReadonly(this.form.EmployeeName.element, true);
            var self = this;
            var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'EmployeeRowId')
            $(EmployeeRowIdElement).on('change', async function () {
                self.form.EmployeeName.value = '';
                self.form.EmployeeId.value = '';
                if(self.form.EmployeeRowId.value){
                    EmployeeProfileService.Retrieve({
                        EntityId: self.form.EmployeeRowId.value
                    }, response => {
                        self.form.EmployeeName.value = response.Entity.EmployeeName
                        self.form.EmployeeId.value = response.Entity.EmployeeID
                    });
                }
            });
        } else {
            EditorUtils.setReadonly(this.form.EmployeeRowId.element, true);
            EditorUtils.setReadonly(this.form.EmployeeName.element, true);
        }
    }
}