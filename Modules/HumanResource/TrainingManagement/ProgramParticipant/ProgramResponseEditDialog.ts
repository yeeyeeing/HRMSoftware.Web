import { Decorators, EditorUtils, EntityDialog, Select2Editor } from '@serenity-is/corelib';
import { GridEditorDialog } from "@serenity-is/extensions";
import { ProgramParticipantForm, ProgramParticipantRow } from '../../../ServerTypes/TrainingManagement';
@Decorators.registerClass('HRMSoftware.TrainingManagement.ProgramResponseEditDialog')
export class ProgramResponseEditDialog extends GridEditorDialog<ProgramParticipantRow> {
    protected getFormKey() { return ProgramParticipantForm.formKey; }
    protected getLocalTextPrefix() { return ProgramParticipantRow.localTextPrefix; }

    protected form: ProgramParticipantForm;
    constructor() {
        super();
        if(this.dialogTitle){
            
        }
        
        this.form = new ProgramParticipantForm(this.idPrefix);
    }
}