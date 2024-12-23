import {Decorators} from '@serenity-is/corelib';
import {GridEditorBase} from "@serenity-is/extensions";
import {ProgramResponseEditDialog} from './ProgramResponseEditDialog';
import {ProgramParticipantResponseColumns, ProgramParticipantRow} from '../../../ServerTypes/TrainingManagement';
import {Column} from "@serenity-is/sleekgrid";

@Decorators.registerEditor('HRMSoftware.TrainingManagement.ProgramAttendanceResponseEditor')
export class ProgramAttendanceResponseEditor extends GridEditorBase<ProgramParticipantRow> {
    protected getColumnsKey() {
        return ProgramParticipantResponseColumns.columnsKey;
    }

    protected getDialogType() {
        return ProgramResponseEditDialog;
    }

    protected getLocalTextPrefix() {
        return ProgramParticipantRow.localTextPrefix;
    }

    protected getAddButtonCaption() {
        return "Add";
    }

    constructor(container: JQuery) {
        super(container);

        $('div.category > div.field.ParticipantList.AttendanceTable > label[title="Participant List"] + div.editor.s-ProgramAttendanceResponseEditor.s-DataGrid > div.grid-toolbar.s-Serenity-Toolbar.s-Toolbar.clearfix').hide();

        $('div.field.ParticipantList.AttendanceTable' +
            ' > div' +
            ' > div.grid-container.slick-container.ltr.ui-widget.sleek-vars'
        )
            .css({
                'height': '400px'
            });

        $('div.field.ParticipantList.AttendanceTable' +
            ' > div' +
            ' > div.grid-container.slick-container.ltr.ui-widget.sleek-vars' +
            ' > div.slick-viewport'
        )
            .css({
                'height': 'auto',
                'min-height': '200px'
            });
    }

    protected getColumns(): Column<ProgramParticipantRow>[] {
        let columns = super.getColumns();
        columns.push({
            field: 'Attendance',
            name: 'Attendance',
            format: ctx => {
                return "<div><form id=" + ctx.item.EmployeeRowId + "><input class='inline-action attendanceCheckbox' type='checkbox' " + (ctx.item.ExtraField1 == "true" ? "checked" : "") + "></form></div>";
            },
            width: 100,
            minWidth: 50,
            maxWidth: 200
        });
        return columns;
    }

    protected onClick(e: JQueryEventObject, row: number, cell: number) {
        super.onClick(e, row, cell);
        if (e.isDefaultPrevented())
            return;

        // get reference to current item
        var item = this.itemAt(row);
        // get reference to clicked element
        var target = $(e.target);
        if (target.parent().hasClass('inline-action'))
            target = target.parent();

        if (target.hasClass('attendanceCheckbox')) {
            item.ExtraField1 = (item.ExtraField1 == "true" ? "false" : "true");
        }
    }
}