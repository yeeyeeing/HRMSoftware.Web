import {Decorators} from '@serenity-is/corelib';
import {GridEditorBase} from "@serenity-is/extensions";
import {ProgramResponseEditDialog} from './ProgramResponseEditDialog';
import {
    ProgramGradeType,
    ProgramParticipantResponseColumns,
    ProgramParticipantRow
} from '../../../ServerTypes/TrainingManagement';
import {Column} from "@serenity-is/sleekgrid";

@Decorators.registerEditor('HRMSoftware.TrainingManagement.ProgramGradeResponseEditor')
export class ProgramGradeResponseEditor extends GridEditorBase<ProgramParticipantRow> {
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

        $('div.category > div.field.ParticipantList.GradeTable > label[title="Participant List"] + div.editor.s-ProgramGradeResponseEditor.s-DataGrid > div.grid-toolbar.s-Serenity-Toolbar.s-Toolbar.clearfix').hide();

        $('div.field.ParticipantList.GradeTable' +
            ' > div' +
            ' > div.grid-container.slick-container.ltr.ui-widget.sleek-vars'
        )
            .css({
                'height': '400px',
            });

        $('div.field.ParticipantList.GradeTable' +
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
            field: 'Grade',
            name: 'Grade',
            format: ctx => {
                if (ctx.item.ExtraField4 == ProgramGradeType.Score.toString()) {
                    return "<div><form><input class='inline-action scoreInput' type='number' name='score' min=0 max=100 style='height: 100%;' value=" + (ctx.item.ExtraField1 ?? 0) + "></form></div>";
                } else if (ctx.item.ExtraField4 == ProgramGradeType.Grade.toString()) {
                    return `<div><form><select class='inline-action scoreInput' name='grade' value=${(ctx.item.ExtraField1 ?? 0)}>
                                <option value="0" ${(ctx.item.ExtraField1 == "0" ? "selected" : "")}>Please Select</option>
                                <option value="1" ${(ctx.item.ExtraField1 == "1" ? "selected" : "")}>A</option>
                                <option value="2" ${(ctx.item.ExtraField1 == "2" ? "selected" : "")}>B</option>
                                <option value="3" ${(ctx.item.ExtraField1 == "3" ? "selected" : "")}>C</option>
                                <option value="4" ${(ctx.item.ExtraField1 == "4" ? "selected" : "")}>Fail</option>
                                <option value="-1" ${(ctx.item.ExtraField1 == "-1" ? "selected" : "")}>N/A</option>
                            </select></form></div>`;
                } else if (ctx.item.ExtraField4 == ProgramGradeType.PassFail.toString()) {
                    return `<select class='inline-action scoreInput' name="passfail">
                                <option value="0" ${(ctx.item.ExtraField1 == "0" ? "selected" : "")}>Please Select</option>
                                <option value="1" ${(ctx.item.ExtraField1 == "1" ? "selected" : "")}>Pass</option>
                                <option value="2" ${(ctx.item.ExtraField1 == "2" ? "selected" : "")}>Fail</option>
                                <option value="-1" ${(ctx.item.ExtraField1 == "-1" ? "selected" : "")}>N/A</option>
                            </select>`;
                } else {
                    return "";
                }
            },
            width: 150,
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

        if (target.hasClass('scoreInput')) {
            target.on("change", event => {
                item.ExtraField1 = target.val();
            })
        }
    }
}