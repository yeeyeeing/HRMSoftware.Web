import {Decorators, EntityDialog} from '@serenity-is/corelib';
import {
    MasterProgramApplyForm,
    MasterProgramRoutineType,
    MasterProgramRow,
    MasterProgramService,
    MasterProgramStatusType
} from '../../../ServerTypes/TrainingManagement';

@Decorators.registerClass('HRMSoftware.TrainingManagement.MasterProgramApplyDialog')
export class MasterProgramApplyDialog extends EntityDialog<MasterProgramRow, any> {
    protected getFormKey() {
        return MasterProgramApplyForm.formKey;
    }

    protected getRowDefinition() {
        return MasterProgramRow;
    }

    protected getService() {
        return MasterProgramService.baseUrl;
    }

    protected form = new MasterProgramApplyForm(this.idPrefix);

    private departmentList = [];

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);

        $('div.field.FlowList' +
            ' > div' +
            ' > div.grid-container.slick-container.ltr.ui-widget.sleek-vars' +
            ' > div.slick-viewport'
        ).css({
            'height': 'auto',
            'min-height': '200px'
        });

        $('#' + this.idPrefix + 'DepartmentList').parent().hide();

        let routine = $('#' + this.idPrefix + 'Routine');
        let routineInterval = $('#' + this.idPrefix + 'RoutineInterval').parent();
        let routineStartDate = $('#' + this.idPrefix + 'RoutineStartDate').parent();
        let routineEndDate = $('#' + this.idPrefix + 'RoutineEndDate').parent();

        if (this.form.Routine.get_value() == MasterProgramRoutineType.No) {
            routineInterval.hide();
            routineStartDate.hide();
            routineEndDate.hide();
        }

        routine.on('change', (Event) => {
            if (this.form.Routine.get_value() == MasterProgramRoutineType.No) {
                routineInterval.hide();
                routineStartDate.hide();
                routineEndDate.hide();
            } else {
                routineInterval.show();
                routineStartDate.show();
                routineEndDate.show();
            }
        });

        let status = $('#' + this.idPrefix + 'Status');
        let Comment = $('#' + this.idPrefix + 'Comment').parent();

        status.parent().hide();
        if (this.form.Status.get_value() != MasterProgramStatusType.Rejected) {
            Comment.hide();
        }
    }

    protected updateTitle(): void {
        this.dialogTitle = 'Apply New Training Program';
    }
}