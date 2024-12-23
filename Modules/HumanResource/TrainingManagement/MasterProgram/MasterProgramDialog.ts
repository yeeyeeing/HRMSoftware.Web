import {Decorators, EditorUtils, EntityDialog} from '@serenity-is/corelib';
import {
    MasterProgramForm,
    MasterProgramRoutineType,
    MasterProgramRow,
    MasterProgramService,
    MasterProgramStatusType,
    ProgramFlowType,
    ProgramGradeType,
} from '../../../ServerTypes/TrainingManagement';

@Decorators.registerClass('HRMSoftware.TrainingManagement.MasterProgramDialog')
export class MasterProgramDialog extends EntityDialog<MasterProgramRow, any> {
    protected getFormKey() {
        return MasterProgramForm.formKey;
    }

    protected getRowDefinition() {
        return MasterProgramRow;
    }

    protected getService() {
        return MasterProgramService.baseUrl;
    }

    protected form = new MasterProgramForm(this.idPrefix);

    private departmentList = [];

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);

        if(this.isNew()){
            this.form.FlowList.value = [{
                FlowType: ProgramFlowType.Attendance,
                GradeType: ProgramGradeType.Na,
            }];
        }
        
        $('div.field.FlowList' +
            ' > div' +
            ' > div.grid-container.slick-container.ltr.ui-widget.sleek-vars' +
            ' > div.slick-viewport'
        ).css({
            'height': 'auto',
            'min-height': '200px'
        });

        let allDepartment = $('div.field.AllDepartment' +
            ' > label[title="All Department"]' +
            ' + input.editor.s-BooleanEditor[type="checkbox"]'
        );

        allDepartment.css({
            'flex': '0 0 auto'
        });

        EditorUtils.setReadonly(this.form.DepartmentList.element, this.form.AllDepartment.value == true);

        allDepartment.on('change', (Event) => {
            EditorUtils.setReadonly(this.form.DepartmentList.element, this.form.AllDepartment.value == true);
            if (this.form.AllDepartment.value == true) {
                this.departmentList = this.form.DepartmentList.values;
                this.form.DepartmentList.values = [];
            } else {
                this.form.DepartmentList.values = this.departmentList;
            }
        });

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

        if (this.form.Status.get_value() != MasterProgramStatusType.Rejected) {
            Comment.hide();
        }

        status.on('change', (Event) => {
            if (this.form.Status.get_value() != MasterProgramStatusType.Rejected) {
                Comment.hide();
            } else {
                Comment.show();
            }
        });
    }
}