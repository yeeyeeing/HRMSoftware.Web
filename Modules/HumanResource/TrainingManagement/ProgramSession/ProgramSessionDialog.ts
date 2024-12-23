import {ColumnSelection, Criteria, Decorators, EditorUtils, EntityDialog} from '@serenity-is/corelib';
import {Authorization} from '@serenity-is/corelib/q';
import {
    ProgramParticipantRoleType,
    ProgramSessionForm,
    ProgramSessionRow,
    ProgramSessionService,
    ProgramSessionStatusType,
} from '../../../ServerTypes/TrainingManagement';
import {EmployeeProfileService,} from '../../../ServerTypes/EmployeeProfile';
import {PermissionKeys} from '../../../ServerTypes/Administration';

@Decorators.registerClass('HRMSoftware.TrainingManagement.ProgramSessionDialog')
export class ProgramSessionDialog extends EntityDialog<ProgramSessionRow, any> {
    protected getFormKey() {
        return ProgramSessionForm.formKey;
    }

    protected getRowDefinition() {
        return ProgramSessionRow;
    }

    protected getService() {
        return ProgramSessionService.baseUrl;
    }

    protected form = new ProgramSessionForm(this.idPrefix);

    public ReadOnly: boolean;

    constructor(ReadOnly = true) {
        super();
        this.ReadOnly = ReadOnly;
    }

    private participantRole = [];

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);

        this.ReadOnly = !(this.isNew() == true || !this.ReadOnly);

        if (this.ReadOnly) {
            this.saveAndCloseButton.hide();
            this.applyChangesButton.hide();
            this.cloneButton.hide();
            this.deleteButton.hide();

            EditorUtils.setReadonly(this.form.ProgramName.element, this.ReadOnly);
            EditorUtils.setReadonly(this.form.StartDate.element, this.ReadOnly);
            EditorUtils.setReadonly(this.form.EndDate.element, this.ReadOnly);
            EditorUtils.setReadonly(this.form.Detail.element, this.ReadOnly);
            EditorUtils.setReadonly(this.form.ExtraDocument.element, this.ReadOnly);
            EditorUtils.setReadonly(this.form.DepartmentList.element, this.ReadOnly);
            EditorUtils.setReadonly(this.form.Status.element, this.ReadOnly);
            EditorUtils.setReadonly(this.form.Comment.element, this.ReadOnly);
            EditorUtils.setReadonly(this.form.DateTba.element, this.ReadOnly);
            EditorUtils.setReadonly(this.form.OneDay.element, this.ReadOnly);
            EditorUtils.setReadonly(this.form.ParticipantList.element, this.ReadOnly);

            $('div.category > div.field.FlowList > label[title="Flow List"] + div.editor.s-ProgramFlowEditor.s-DataGrid > div.grid-toolbar.s-Serenity-Toolbar.s-Toolbar.clearfix').hide();
            $('div.category > div.field.ParticipantList > label[title="Participant List"] + div.editor.s-ProgramParticipantEditor.s-DataGrid > div.grid-toolbar.s-Serenity-Toolbar.s-Toolbar.clearfix').hide();

            if (!Authorization.hasPermission(PermissionKeys.HumanResources)) {
                $('li.nav-item > a.nav-link:contains("Participant List")').parent().hide();
                $('div.field.Status > label[title="Status"]').parent().hide();
                $('div.field.DepartmentList > label[title="Department"]').parent().hide();
            }
            
            this.form.ParticipantList.value = this.form.ParticipantList.value.filter((elem, idx)=>{
                return elem.Trainee || elem.Staff;
            });
        } else {
            let DateTba = $('#' + this.idPrefix + 'DateTba');

            EditorUtils.setReadonly(this.form.OneDay.element, this.form.DateTba.value);
            EditorUtils.setReadonly(this.form.StartDate.element, this.form.DateTba.value);
            EditorUtils.setReadonly(this.form.EndDate.element, this.form.DateTba.value);

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
            EditorUtils.setReadonly(this.form.EndDate.element, this.form.OneDay.value);

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

            $('#' + this.idPrefix + 'ParticipantList').find('.button-inner:contains("Add")').text('Add by Employee ID');
            
            this.form.DepartmentList.element.on("change", event => {
                this.updateParticipantList();
            });
        }

        $('div.field.FlowList' +
            ' > div' +
            ' > div.grid-container.slick-container.ltr.ui-widget.sleek-vars' +
            ' > div.slick-viewport'
        )
            .css({
                'height': 'auto',
                'min-height': '200px'
            });

        $('div.field.ParticipantList' +
            ' > div' +
            ' > div.grid-container.slick-container.ltr.ui-widget.sleek-vars' +
            ' > div.slick-viewport'
        )
            .css({
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

        let status = $('#' + this.idPrefix + 'Status');
        let Comment = $('#' + this.idPrefix + 'Comment').parent();

        if (this.form.Status.get_value() != ProgramSessionStatusType.Rejected) {
            Comment.hide();
        }

        status.on('change', (Event) => {
            if (this.form.Status.get_value() != ProgramSessionStatusType.Rejected) {
                Comment.hide();
            } else {
                Comment.show();
            }
        });
    }

    protected updateTitle(): void {
        this.ReadOnly = !(this.isNew() == true || !this.ReadOnly);
        if (this.ReadOnly) {
            this.dialogTitle = 'View Program (' + this.getEntityNameFieldValue() + ')';
        } else {
            super.updateTitle();
        }
    }

    public updateParticipantList() {
        let existingParticipantList = {};
        
        this.form.ParticipantList.value = this.form.ParticipantList.value.filter((elem)=>{
            if (elem.Trainee || elem.Staff) {
                existingParticipantList[elem.EmployeeRowId.toString()] = 1;
                return true;
            } else {
                return false;
            }
        });

        if (this.form.DepartmentList.values.length > 0) {
            EmployeeProfileService.List({
                Criteria: Criteria('DepartmentID').in(this.form.DepartmentList.values),
                ColumnSelection: ColumnSelection.KeyOnly,
                IncludeColumns: ['Id', 'EmployeeID', 'EmployeeName'],
            }, response => {
                for (const employee of response.Entities) {
                    if (existingParticipantList[employee.Id.toString()] != 1) {
                        let list = this.form.ParticipantList.value;
                        list.push({
                            "EmployeeId": employee.EmployeeID,
                            "EmployeeName": employee.EmployeeName,
                            "EmployeeRowId": employee.Id,
                            "ProgramId": this.entity.Id,
                        });
                        this.form.ParticipantList.value = list;
                    }
                }
            });
        }
    }
}