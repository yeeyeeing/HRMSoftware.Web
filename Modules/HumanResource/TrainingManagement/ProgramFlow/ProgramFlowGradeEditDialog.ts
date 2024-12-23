import {Decorators, EditorUtils} from '@serenity-is/corelib';
import {GridEditorDialog} from "@serenity-is/extensions";
import {alertDialog} from '@serenity-is/corelib/q';
import {
    ProgramFlowGradeForm,
    ProgramFlowResponseService,
    ProgramFlowRow,
    ProgramFlowService,
    ProgramGradeType
} from '../../../ServerTypes/TrainingManagement';

@Decorators.registerClass('RMSoftware.TrainingManagement.ProgramFlowGradeEditDialog')
export class ProgramFlowGradeEditDialog extends GridEditorDialog<ProgramFlowRow> {
    protected getFormKey() {
        return ProgramFlowGradeForm.formKey;
    }

    protected getLocalTextPrefix() {
        return ProgramFlowRow.localTextPrefix;
    }

    protected getService() {
        return ProgramFlowService.baseUrl;
    }

    protected form: ProgramFlowGradeForm;

    constructor() {
        super();
        this.form = new ProgramFlowGradeForm(this.idPrefix);
    }

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);

        EditorUtils.setReadonly(this.form.FlowType.element, true);
        EditorUtils.setReadonly(this.form.GradeType.element, true);
        EditorUtils.setReadonly(this.form.Date.element, true);
        EditorUtils.setReadonly(this.form.Remark.element, true);

        this.saveAndCloseButton.hide();
        let participantIds = {};
        ProgramFlowResponseService.List({
            Criteria: [
                ["FlowId"], "=", this.entity.Id,
            ]
        }, response => {
            for (var key in response.Entities) {
                let participantId = response.Entities[key].EmployeeId.toString();
                participantIds[participantId] = [response.Entities[key].Id, response.Entities[key].GradeValue];
            }

            var gradeParticipantList = $('div.field.ParticipantList.GradeTable' +
                ' > label[title="Participant List"] + div.editor.s-ProgramGradeResponseEditor.s-DataGrid' +
                ' > div.grid-container.slick-container' +
                ' > div.slick-viewport' +
                ' > div.grid-canvas' +
                ' > div.ui-widget-content.slick-row' +
                ' > div.ProgramGradeResponseColumnPlaceHolder' +
                ' > div' +
                ' > form'
            );
            var gradeType = this.entity.GradeType;
            if (this.entity.GradeType == ProgramGradeType.Score) {
                gradeParticipantList.html('<input name="score" type="number" min=0 max=100 style="height: 100%;">');
            } else if (this.entity.GradeType == ProgramGradeType.Grade) {
                gradeParticipantList.html('<select name="grade">' +
                    '<option value="0">Please Select</option>' +
                    '<option value="1">A</option>' +
                    '<option value="2">B</option>' +
                    '<option value="3">C</option>' +
                    '<option value="4">D</option>' +
                    '<option value="-1">N/A</option>' +
                    '</select>');
            } else if (this.entity.GradeType == ProgramGradeType.PassFail) {
                gradeParticipantList.html('<select name="passfail">' +
                    '<option value="0">Please Select</option>' +
                    '<option value="1">Pass</option>' +
                    '<option value="2">Fail</option>' +
                    '<option value="-1">N/A</option>' +
                    '</select>');
            }

            gradeParticipantList.each((index, elem) => {
                let participantIndex = elem.getAttribute('participantId');
                let entityId = participantIds[participantIndex] ? participantIds[participantIndex][0] : null;
                let oldValue = participantIds[participantIndex] ? participantIds[participantIndex][1] : 0;
                gradeParticipantList[index].setAttribute('EntityId', entityId);
                gradeParticipantList[index].setAttribute('OldValue', oldValue);
                gradeParticipantList[index].children[0].value = oldValue;
            })
        })
    }

    protected getToolbarButtons() {
        var buttons = super.getToolbarButtons();

        buttons.push({
            title: "Save",
            cssClass: 'stampe',
            icon: 'fa-check-circle text-purple',
            onClick: () => {
                var gradeParticipantList = $('div.field.ParticipantList.GradeTable' +
                    ' > label[title="Participant List"] + div.editor.s-ProgramGradeResponseEditor.s-DataGrid' +
                    ' > div.grid-container.slick-container' +
                    ' > div.slick-viewport' +
                    ' > div.grid-canvas' +
                    ' > div.ui-widget-content.slick-row' +
                    ' > div.ProgramGradeResponseColumnPlaceHolder' +
                    ' > div' +
                    ' > form'
                );

                gradeParticipantList.each((index, elem) => {
                    var participantId = elem.getAttribute('participantId');
                    var gradeValue = Number.parseInt(elem.children[0].value) ?? 0;

                    if (elem.getAttribute('entityId') == 'null') {
                        if(gradeValue != 0){
                            ProgramFlowResponseService.Create({
                                Entity:
                                    {
                                        "FlowId": this.entity.Id,
                                        "EmployeeId": parseInt(participantId),
                                        "GradeValue": gradeValue,
                                    }
                            })
                        }
                    } else {
                        if (Number.parseInt(elem.getAttribute('OldValue')) != gradeValue) {
                            ProgramFlowResponseService.Update({
                                EntityId: elem.getAttribute('EntityId'),
                                Entity:
                                    {
                                        "GradeValue": gradeValue,
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