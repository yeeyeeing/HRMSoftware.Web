import {Decorators, EditorUtils, EntityDialog} from '@serenity-is/corelib';
import {ProgramSessionApplyForm, ProgramSessionRow, ProgramSessionService, ProgramFlowType, ProgramGradeType} from '../../../ServerTypes/TrainingManagement';
import {MasterProgramStatusType} from "@/ServerTypes/TrainingManagement/MasterProgramStatusType";

@Decorators.registerClass('HRMSoftware.TrainingManagement.ProgramSessionApplyDialog')
export class ProgramSessionApplyDialog extends EntityDialog<ProgramSessionRow, any> {
    protected getFormKey() {
        return ProgramSessionApplyForm.formKey;
    }

    protected getRowDefinition() {
        return ProgramSessionRow;
    }

    protected getService() {
        return ProgramSessionService.baseUrl;
    }

    protected form = new ProgramSessionApplyForm(this.idPrefix);

    public ReadOnly: boolean;

    constructor(ReadOnly = true) {
        super();
        this.ReadOnly = ReadOnly;
    }

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);
        
        this.form.FlowList.value = [{
            'FlowType': ProgramFlowType.Attendance,
            'GradeType': ProgramGradeType.Na,
            'Remark': '',
        }];
        
        let DateTba = $('#' + this.idPrefix + 'DateTba');
        DateTba.on('change', (Event) => {
            if (this.form.DateTba.value) {
                EditorUtils.setReadonly(this.form.OneDay.element, true);
                EditorUtils.setReadonly(this.form.StartDate.element, true);
                EditorUtils.setReadonly(this.form.EndDate.element, true);
            } else {
                EditorUtils.setReadonly(this.form.OneDay.element, false);
                EditorUtils.setReadonly(this.form.StartDate.element, false);
                EditorUtils.setReadonly(this.form.EndDate.element, this.form.OneDay.value);
            }
        })

        let OneDay = $('#' + this.idPrefix + 'OneDay');
        let EndDate = $('#' + this.idPrefix + 'EndDate').parent();
        OneDay.on('change', (Event) => {
            EditorUtils.setReadonly(this.form.EndDate.element, this.form.OneDay.value);
            if (this.form.OneDay.value) {
                this.form.EndDate.value = this.form.StartDate.value;
                EndDate.hide();
            } else {
                EndDate.show();
            }
        });

        let StartDate = $('#' + this.idPrefix + 'StartDate');
        StartDate.on('change', (Event) => {
            if (this.form.OneDay.value) {
                this.form.EndDate.value = this.form.StartDate.value;
            }
        });

        $('div.field.FlowList' +
            ' > div' +
            ' > div.grid-container.slick-container.ltr.ui-widget.sleek-vars' +
            ' > div.slick-viewport'
        ).css({
            'height': 'auto',
            'min-height': '200px'
        });

        $('div.field.ParticipantList' +
            ' > div' +
            ' > div.grid-container.slick-container.ltr.ui-widget.sleek-vars' +
            ' > div.slick-viewport'
        ).css({
            'height': 'auto',
            'min-height': '200px'
        });

        $('div.field.DateTba' +
            ' > label[title="Date TBA"]' +
            ' + input.editor.s-BooleanEditor[type="checkbox"]'
        ).css({
            'flex': '0 0 auto'
        });

        $('div.field.OneDay' +
            ' > label[title="One Day"]' +
            ' + input.editor.s-BooleanEditor[type="checkbox"]'
        ).css({
            'flex': '0 0 auto'
        });

        $('#' + this.idPrefix + 'Status').parent().hide();
        $('#' + this.idPrefix + 'Comment').parent().hide();
    }

    protected updateTitle(): void {
        this.dialogTitle = 'Apply New One-Off Training Session';
    }
}