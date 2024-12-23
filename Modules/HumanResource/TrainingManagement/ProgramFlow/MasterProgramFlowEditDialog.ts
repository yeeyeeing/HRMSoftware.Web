import { Decorators, EditorUtils, EntityDialog, Select2Editor } from '@serenity-is/corelib';
import { GridEditorDialog } from "@serenity-is/extensions";
import { MasterProgramFlowForm, ProgramFlowRow, ProgramFlowType, ProgramGradeType } from '../../../ServerTypes/TrainingManagement';
@Decorators.registerClass('RMSoftware.TrainingManagement.MasterProgramFlowEditDialog')
export class MasterProgramFlowEditDialog extends GridEditorDialog<ProgramFlowRow> {
    protected getFormKey() { return MasterProgramFlowForm.formKey; }
    protected getLocalTextPrefix() { return ProgramFlowRow.localTextPrefix; }

    protected form: MasterProgramFlowForm;
    constructor() {
        super();
        this.form = new MasterProgramFlowForm(this.idPrefix);
    }

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);
        let FlowType = $('#' + this.idPrefix + 'FlowType');
        let GradeType = $('#' + this.idPrefix + 'GradeType').parent();
        if (this.form.FlowType.value != ProgramFlowType.Assessment) {
            GradeType.hide();
        }

        FlowType.on('change', (Event) => {
            if(this.form.FlowType.value == ProgramFlowType.None){
                GradeType.hide();
                this.form.GradeType.value = ProgramGradeType.Na;
            } else if(this.form.FlowType.value == ProgramFlowType.Document){
                GradeType.hide();
                this.form.GradeType.value = ProgramGradeType.PassFail;
            } else if(this.form.FlowType.value == ProgramFlowType.Assessment){
                GradeType.show();
                this.form.GradeType.value = ProgramGradeType.Score;
            } else {
                GradeType.hide();
                this.form.GradeType.value = ProgramGradeType.Na;
            }
        });
    }
}