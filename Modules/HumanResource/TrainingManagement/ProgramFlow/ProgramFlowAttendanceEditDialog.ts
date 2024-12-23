import {Decorators, EditorUtils} from '@serenity-is/corelib';
import {GridEditorDialog} from "@serenity-is/extensions";
import {alertDialog} from '@serenity-is/corelib/q';
import {
    ProgramFlowAttendanceForm,
    ProgramFlowResponseService,
    ProgramFlowRow,
    ProgramFlowService
} from '../../../ServerTypes/TrainingManagement';

@Decorators.registerClass('RMSoftware.TrainingManagement.ProgramFlowAttendanceEditDialog')
export class ProgramFlowAttendanceEditDialog extends GridEditorDialog<ProgramFlowRow> {
    protected getFormKey() {
        return ProgramFlowAttendanceForm.formKey;
    }

    protected getLocalTextPrefix() {
        return ProgramFlowRow.localTextPrefix;
    }

    protected getService() {
        return ProgramFlowService.baseUrl;
    }

    protected form: ProgramFlowAttendanceForm;

    constructor() {
        super();
        this.form = new ProgramFlowAttendanceForm(this.idPrefix);
    }

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);

        EditorUtils.setReadonly(this.form.FlowType.element, true);
        EditorUtils.setReadonly(this.form.Date.element, true);
        EditorUtils.setReadonly(this.form.Remark.element, true);
        $('#' + this.idPrefix + 'GradeType').parent().hide();
        
        this.saveAndCloseButton.hide();
        let participantIds = {};
        ProgramFlowResponseService.List({
            Criteria: [
                ["FlowId"], "=", this.entity.Id,
            ]
        }, response => {
            for (var key in response.Entities) {
                let participantId = response.Entities[key].EmployeeId.toString();
                participantIds[participantId] = [response.Entities[key].Id, response.Entities[key].Attendance];
            }
            
            var attendanceParticipantList = $('div.field.ParticipantList.AttendanceTable' +
                ' > label[title="Participant List"] + div.editor.s-ProgramAttendanceResponseEditor.s-DataGrid' +
                ' > div.grid-container.slick-container' +
                ' > div.slick-viewport' +
                ' > div.grid-canvas' +
                ' > div.ui-widget-content.slick-row' +
                ' > div.ProgramAttendanceResponseColumnPlaceHolder' +
                ' > div' +
                ' > form'
            );

            attendanceParticipantList.each((index, elem) => {
                console.log(elem)
                let participantId = elem.getAttribute('participantId');
                let entityId = participantIds[participantId] ? participantIds[participantId][0] : null;
                let oldValue = participantIds[participantId] ? participantIds[participantId][1] : null;
                elem.setAttribute('EntityId', entityId);
                elem.setAttribute('OldValue', oldValue);
                elem.children[0].checked = oldValue;
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
                var attendanceParticipantList = $('div.field.ParticipantList.AttendanceTable' +
                    ' > label[title="Participant List"] + div.editor.s-ProgramAttendanceResponseEditor.s-DataGrid' +
                    ' > div.grid-container.slick-container' +
                    ' > div.slick-viewport' +
                    ' > div.grid-canvas' +
                    ' > div.ui-widget-content.slick-row' +
                    ' > div.ProgramAttendanceResponseColumnPlaceHolder' +
                    ' > div' +
                    ' > form'
                );
                
                attendanceParticipantList.each((index, elem) => {
                    var participantId = elem.getAttribute('participantId');
                    var attendanceValue = elem.children[0].checked;
                    
                    if (elem.getAttribute('entityId') == 'null') {
                        if (attendanceValue) {
                            ProgramFlowResponseService.Create({
                                Entity:
                                    {
                                        "FlowId": this.entity.Id,
                                        "EmployeeId": parseInt(participantId),
                                        "Attendance": attendanceValue,
                                    }
                            })
                        }
                    } else {
                        if ((elem.getAttribute('OldValue') === 'true') != attendanceValue) {
                            ProgramFlowResponseService.Update({
                                EntityId: elem.getAttribute('EntityId'),
                                Entity:
                                    {
                                        "Attendance": attendanceValue,
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