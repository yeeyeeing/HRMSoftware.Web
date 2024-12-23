import {Decorators, EditorUtils} from '@serenity-is/corelib';
import {GridEditorDialog} from "@serenity-is/extensions";
import {alertDialog} from '@serenity-is/corelib/q';
import {
    ProgramFlowResponseGradeForm,
    ProgramFlowResponseService,
    ProgramFlowRow,
    ProgramFlowService,
    ProgramGradeType
} from '../../../ServerTypes/TrainingManagement';

@Decorators.registerClass('RMSoftware.TrainingManagement.ProgramFlowResponseGradeEditDialog')
export class ProgramFlowResponseGradeEditDialog extends GridEditorDialog<ProgramFlowRow> {
    protected getFormKey() {
        return ProgramFlowResponseGradeForm.formKey;
    }

    protected getLocalTextPrefix() {
        return ProgramFlowRow.localTextPrefix;
    }

    protected getService() {
        return ProgramFlowService.baseUrl;
    }

    protected form: ProgramFlowResponseGradeForm;

    constructor() {
        super();
        this.form = new ProgramFlowResponseGradeForm(this.idPrefix);
    }

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);

        EditorUtils.setReadonly(this.form.FlowType.element, true);
        EditorUtils.setReadonly(this.form.GradeType.element, true);
        EditorUtils.setReadonly(this.form.Date.element, true);
        EditorUtils.setReadonly(this.form.Remark.element, true);
        this.saveAndCloseButton.hide();
        
        var list = this.form.ParticipantList.value.filter((elem, idx)=>{
            return elem.Trainee;
        });
        ProgramFlowResponseService.List({
            Criteria: [
                ["FlowId"], "=", this.entity.Id,
            ]
        }, response => {
            let participantIds = {};
            for (var key in response.Entities) {
                let participantId = response.Entities[key].EmployeeId.toString();
                participantIds[participantId] = [response.Entities[key].Id, response.Entities[key].Attendance];
            }

            list.forEach((elem, idx) => {
                if (participantIds[elem.EmployeeRowId]) {
                    elem.ExtraField1 = participantIds[elem.EmployeeRowId][1] ? participantIds[elem.EmployeeRowId][1].toString() : "0";
                    elem.ExtraField2 = participantIds[elem.EmployeeRowId][1] ? "true" : "0";
                    elem.ExtraField3 = participantIds[elem.EmployeeRowId][0];
                } else {
                    elem.ExtraField1 = "0";
                    elem.ExtraField2 = "0";
                    elem.ExtraField3 = "-1";
                }
                elem.ExtraField4 = this.entity.GradeType.toString();
            });
            this.form.ParticipantList.value = list;
        })
    }

    protected getToolbarButtons() {
        var buttons = super.getToolbarButtons();

        buttons.push({
            title: "Save",
            icon: 'fa-check-circle text-purple',
            onClick: () => {
                this.form.ParticipantList.value.forEach((elem, idx) => {
                    if (elem.ExtraField1 != elem.ExtraField2) {
                        if (parseInt(elem.ExtraField3) < 0) {
                            ProgramFlowResponseService.Create({
                                Entity:
                                    {
                                        "FlowId": this.entity.Id,
                                        "EmployeeId": elem.EmployeeRowId,
                                        "GradeValue": parseInt(elem.ExtraField1),
                                    }
                            })
                        } else {
                            ProgramFlowResponseService.Update({
                                EntityId: parseInt(elem.ExtraField3),
                                Entity:
                                    {
                                        "GradeValue": parseInt(elem.ExtraField1),
                                    }
                            })
                        }
                    }
                });
                alertDialog("Attendance Save Success !");
                this.dialogClose();
            },
        });

        return buttons;
    }
}