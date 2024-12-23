import {Decorators, SaveResponse} from '@serenity-is/corelib';
import {alertDialog} from '@serenity-is/corelib/q';
import {GridEditorDialog} from "@serenity-is/extensions";
import {
    ProgramFileResponseForm,
    ProgramFlowResponseRow,
    ProgramFlowResponseService
} from '../../../ServerTypes/TrainingManagement';

@Decorators.registerClass('RMSoftware.TrainingManagement.ProgramFileResponseDialog')
export class ProgramFileResponseDialog extends GridEditorDialog<ProgramFlowResponseRow> {
    protected getFormKey() {
        return ProgramFileResponseForm.formKey;
    }

    protected getLocalTextPrefix() {
        return ProgramFlowResponseRow.localTextPrefix;
    }

    public form: ProgramFileResponseForm;

    private oldFilename;

    public oldDialogClose;
    
    constructor() {
        super();
        this.form = new ProgramFileResponseForm(this.idPrefix);
        this.oldDialogClose = super.dialogClose;
        if (this.form.Id.value) {
            this.oldFilename = this.form.File.value.Filename;
        }
    }

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);
        if (this.form.Id.value) {
            this.oldFilename = this.form.File.value.Filename;
        }
    }

    protected save_submitHandler(callback: (response: SaveResponse) => void) {
        if (this.form.Id.value) {
            if (this.oldFilename == this.form.File.value.Filename) {
                alertDialog('File Save Success !');
                this.dialogClose();
            } else {
                ProgramFlowResponseService.Update({
                    "EntityId": this.form.Id.value,
                    "Entity": {
                        "File": this.form.File.value.Filename
                    }
                }, Response => {
                    alertDialog('File Save Success !');
                    this.dialogClose();
                });
            }
        } else {
            ProgramFlowResponseService.Create({
                "Entity": {
                    "FlowId": this.form.FlowId.value,
                    "EmployeeId": this.form.EmployeeId.value,
                    "File": this.form.File.value.Filename
                }
            }, Response => {
                this.form.Id.value = Response.EntityId;
                alertDialog('File Save Success !');
                this.dialogClose();
            });
        }
    }
}