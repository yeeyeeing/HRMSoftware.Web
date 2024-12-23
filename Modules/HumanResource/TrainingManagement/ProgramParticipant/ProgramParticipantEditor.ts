import {Decorators} from '@serenity-is/corelib';
import {GridEditorBase} from "@serenity-is/extensions";
import {ProgramParticipantEditDialog} from './ProgramParticipantEditDialog';
import {ProgramParticipantColumns, ProgramParticipantRow} from '../../../ServerTypes/TrainingManagement';
import {Column} from "@serenity-is/sleekgrid";

@Decorators.registerEditor('HRMSoftware.TrainingManagement.ProgramParticipantEditor')
export class ProgramParticipantEditor extends GridEditorBase<ProgramParticipantRow> {
    protected getColumnsKey() {
        return ProgramParticipantColumns.columnsKey;
    }

    protected getDialogType() {
        return ProgramParticipantEditDialog;
    }

    protected getLocalTextPrefix() {
        return ProgramParticipantRow.localTextPrefix;
    }

    protected getAddButtonCaption() {
        return "Add";
    }

    protected getColumns(): Column<ProgramParticipantRow>[] {
        let columns = super.getColumns();
        columns.forEach((elem, idx, row) => {
            if (elem.name == "Trainee") {
                elem.format = ctx => {
                    return "<div><form><input class='inline-action traineeCheckbox' type='checkbox' " + (ctx.item.Trainee ? "Checked" : "") + "></form></div>";
                };
            } else if (elem.name == "Staff") {
                elem.format = ctx => {
                    return "<div><form><input class='inline-action staffCheckbox' type='checkbox' " + (ctx.item.Staff ? "Checked" : "") + "></form></div>";
                };
            }
        })
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

        if (target.hasClass('traineeCheckbox')) {
            item.Trainee = (!item.Trainee);
            item.Staff = false;
            target.parents("div.slick-row").find("input.staffCheckbox")[0].checked = false
        } else if (target.hasClass('staffCheckbox')) {
            item.Trainee = false;
            item.Staff = (!item.Staff);
            target.parents("div.slick-row").find("input.traineeCheckbox")[0].checked = false;
        }
    }
}