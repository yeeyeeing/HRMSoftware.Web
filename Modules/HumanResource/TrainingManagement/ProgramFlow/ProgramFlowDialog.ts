import {Decorators} from '@serenity-is/corelib';
import {GridEditorDialog} from "@serenity-is/extensions";
import {
    ProgramFlowForm,
    ProgramFlowRow,
    ProgramFlowService,
    ProgramFlowType,
    ProgramGradeType,
} from '../../../ServerTypes/TrainingManagement';

@Decorators.registerClass('RMSoftware.TrainingManagement.ProgramFlowDialog')
export class ProgramFlowDialog extends GridEditorDialog<ProgramFlowRow> {
    protected getFormKey() {
        return ProgramFlowForm.formKey;
    }

    protected getLocalTextPrefix() {
        return ProgramFlowRow.localTextPrefix;
    }

    protected getService() {
        return ProgramFlowService.baseUrl;
    }

    protected form: ProgramFlowForm;

    constructor() {
        super();
        this.form = new ProgramFlowForm(this.idPrefix);
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