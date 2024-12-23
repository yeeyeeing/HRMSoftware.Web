import {Decorators, EditorUtils} from '@serenity-is/corelib';
import {GridEditorDialog} from "@serenity-is/extensions";
import {alertDialog} from '@serenity-is/corelib/q';
import {
    ProgramFlowFileForm,
    ProgramFlowResponseService,
    ProgramFlowRow,
    ProgramFlowService
} from '../../../ServerTypes/TrainingManagement';

@Decorators.registerClass('RMSoftware.TrainingManagement.ProgramFlowFileEditDialog')
export class ProgramFlowFileEditDialog extends GridEditorDialog<ProgramFlowRow> {
    protected getFormKey() {
        return ProgramFlowFileForm.formKey;
    }

    protected getLocalTextPrefix() {
        return ProgramFlowRow.localTextPrefix;
    }

    protected getService() {
        return ProgramFlowService.baseUrl;
    }

    protected form: ProgramFlowFileForm;

    constructor() {
        super();
        this.form = new ProgramFlowFileForm(this.idPrefix);
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
                participantIds[participantId] = [response.Entities[key].Id, response.Entities[key].GradeValue, response.Entities[key].File];
            }
            
            var fileParticipantList = $('div.field.ParticipantList.FileTable' +
                ' > label[title="Participant List"] + div.editor.s-ProgramFileResponseEditor.s-DataGrid' +
                ' > div.grid-container.slick-container' +
                ' > div.slick-viewport' +
                ' > div.grid-canvas' +
                ' > div.ui-widget-content.slick-row'
            );

            var fileParticipantGradeList = fileParticipantList.find(' > div.ProgramGradeResponseColumnPlaceHolder' +
                ' > div > form')
            fileParticipantGradeList.html('<select name="passfail">' +
                '<option value="0">Please Select</option>' +
                '<option value="1">Pass</option>' +
                '<option value="2">Fail</option>' +
                '<option value="-1">N/A</option>' +
                '</select>');

            fileParticipantList.each((index, elem) => {
                let targetFileCell = $(fileParticipantList[index]).find('div.ProgramFileResponseColumnPlaceHolder > div > form')[0];
                let targetGradeCell = $(fileParticipantList[index]).find('div.ProgramGradeResponseColumnPlaceHolder > div > form > select')[0];
                let participantId = targetFileCell.getAttribute('participantId');

                let entityId = participantIds[participantId] ? participantIds[participantId][0] : null;
                let oldValue = participantIds[participantId] ? participantIds[participantId][1] : 0;
                
                if(participantIds[participantId] && participantIds[participantId][2]){
                    targetFileCell.innerHTML = "<p><a href = 'http://localhost:7385/upload/" + participantIds[participantId][2] + "' target='_blank'>Download</a></p>";
                }else {
                    targetFileCell.innerHTML = "No File Found";
                }
                targetGradeCell.setAttribute('EntityId', entityId);
                targetGradeCell.setAttribute('OldValue', oldValue);
                targetGradeCell.value = oldValue;
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
                var gradeList = $('div.field.ParticipantList.FileTable' +
                    ' > label[title="Participant List"] + div.editor.s-ProgramFileResponseEditor.s-DataGrid' +
                    ' > div.grid-container.slick-container' +
                    ' > div.slick-viewport' +
                    ' > div.grid-canvas' +
                    ' > div.ui-widget-content.slick-row' +
                    ' > div.ProgramGradeResponseColumnPlaceHolder' +
                    ' > div' +
                    ' > form' +
                    ' > select'
                );

                gradeList.each((index, elem) => {
                    
                    var participantId = elem.parentElement.getAttribute('participantId');
                    var gradeValue = Number.parseInt(elem.value) ?? 0;
                    console.log(participantId);
                    console.log(gradeValue);
                    console.log(elem.getAttribute('EntityId'));
                    
                    if (elem.getAttribute('entityId') == 'null') {
                        if (gradeValue != 0) {
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
                alertDialog("File Save Success !");
                this.dialogClose();
            },
        });

        return buttons;
    }
}