import {Decorators, EditorUtils} from '@serenity-is/corelib';
import {alertDialog} from '@serenity-is/corelib/q';
import {GridEditorDialog} from "@serenity-is/extensions";
import {
    ProgramFlowResponseAttendanceForm,
    ProgramFlowResponseService,
    ProgramFlowRow,
    ProgramFlowService
} from '../../../ServerTypes/TrainingManagement';

@Decorators.registerClass('RMSoftware.TrainingManagement.ProgramFlowResponseAttendanceEditDialog')
export class ProgramFlowResponseAttendanceEditDialog extends GridEditorDialog<ProgramFlowRow> {
    protected getFormKey() {
        return ProgramFlowResponseAttendanceForm.formKey;
    }

    protected getLocalTextPrefix() {
        return ProgramFlowRow.localTextPrefix;
    }

    protected getService() {
        return ProgramFlowService.baseUrl;
    }

    protected form: ProgramFlowResponseAttendanceForm;

    constructor() {
        super();
        this.form = new ProgramFlowResponseAttendanceForm(this.idPrefix);
    }

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);

        EditorUtils.setReadonly(this.form.FlowType.element, true);
        EditorUtils.setReadonly(this.form.Date.element, true);
        EditorUtils.setReadonly(this.form.Remark.element, true);
        $('#' + this.idPrefix + 'GradeType').parent().hide();
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
                    elem.ExtraField1 = participantIds[elem.EmployeeRowId][1] ? "true" : "false";
                    elem.ExtraField2 = participantIds[elem.EmployeeRowId][1] ? "true" : "false";
                    elem.ExtraField3 = participantIds[elem.EmployeeRowId][0];
                } else {
                    elem.ExtraField1 = "false";
                    elem.ExtraField2 = "false";
                    elem.ExtraField3 = "-1";
                }
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
                                        "Attendance": elem.ExtraField1 == "true",
                                    }
                            })
                        } else {
                            ProgramFlowResponseService.Update({
                                EntityId: parseInt(elem.ExtraField3),
                                Entity:
                                    {
                                        "Attendance": elem.ExtraField1 == "true",
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