import {Decorators} from '@serenity-is/corelib';
import {GridEditorBase} from "@serenity-is/extensions";
import { ProgramFileResponseDialog } from './ProgramFileResponseDialog';
import {
    ProgramFlowResponseService,
    ProgramParticipantResponseColumns,
    ProgramParticipantRow,
    ProgramFlowResponseRow
} from '../../../ServerTypes/TrainingManagement';
import {Column} from "@serenity-is/sleekgrid";

@Decorators.registerEditor('HRMSoftware.TrainingManagement.ProgramFileResponseEditor')
export class ProgramFileResponseEditor extends GridEditorBase<ProgramParticipantRow> {
    protected getColumnsKey() {
        return ProgramParticipantResponseColumns.columnsKey;
    }

    protected getDialogType() {
        return ProgramFileResponseDialog;
    }

    protected getLocalTextPrefix() {
        return ProgramParticipantRow.localTextPrefix;
    }

    protected getAddButtonCaption() {
        return "Add";
    }

    constructor(container: JQuery) {
        super(container);

        $('div.category > div.field.ParticipantList.FileTable > label[title="Participant List"] + div.editor.s-ProgramFileResponseEditor.s-DataGrid > div.grid-toolbar.s-Serenity-Toolbar.s-Toolbar.clearfix').hide();

        $('div.field.ParticipantList.FileTable' +
            ' > div' +
            ' > div.grid-container.slick-container.ltr.ui-widget.sleek-vars'
        )
            .css({
                'height': '400px',
            });

        $('div.field.ParticipantList.FileTable' +
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
            field: 'Action',
            name: 'Action',
            format: ctx => {
                return '<a class="inline-action uploader" data-action="uploader" title="upload File" ><i class="fa fa-upload" style="color: deepskyblue;"></i></a>';
            },
            width: 50,
            minWidth: 50,
            maxWidth: 50
        });
        columns.push({
            field: 'File',
            name: 'File',
            format: ctx => {
                if(ctx.item.ExtraField4){
                    return '<p class="downloadLink"><a href = "/upload/' + ctx.item.ExtraField4 + '" target="_blank">Download</a></p>';
                } else {
                    return '<p class="downloadLink">No File Found</p>';
                }
            },
            width: 100,
            minWidth: 100,
            maxWidth: 100
        });
        columns.push({
            field: 'Approval',
            name: 'Approval',
            format: ctx => {
                return `<select class='inline-action fileInput' name="passfail">
                            <option value="0" ${(ctx.item.ExtraField1 == "0" ? "selected" : "")}>Please Select</option>
                            <option value="1" ${(ctx.item.ExtraField1 == "1" ? "selected" : "")}>Pass</option>
                            <option value="2" ${(ctx.item.ExtraField1 == "2" ? "selected" : "")}>Fail</option>
                            <option value="-1" ${(ctx.item.ExtraField1 == "-1" ? "selected" : "")}>N/A</option>
                        </select>`;
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

        if (target.hasClass('fileInput')) {
            target.on("change", event => {
                item.ExtraField1 = target.val();
            })
        } else if (target.hasClass('uploader')){
            let currentFlow = $('div.category.first-category > div.field.Id.FileFormId > label[title="Id"] + input.editor.s-IntegerEditor[readonly="readonly"]');
            let FlowId = currentFlow[0].value;
            let dlg = new ProgramFileResponseDialog();
            
            ProgramFlowResponseService.List({
                Criteria:[
                    ["Id"], "=", parseInt(item.ExtraField3)
                ]
            }, Response => {
                if(Response.TotalCount > 0){
                    dlg.loadEntityAndOpenDialog(<ProgramFlowResponseRow>
                        Response.Entities[0]
                    );
                } else {
                    dlg.loadEntityAndOpenDialog(<ProgramFlowResponseRow>{
                        "FlowId": FlowId,
                        "EmployeeId": item.EmployeeRowId,
                        "GradeValue": 0
                    });
                }
                dlg.dialogClose = ()=>{
                    dlg.oldDialogClose();
                    ProgramFlowResponseService.Retrieve({
                        "EntityId": dlg.form.Id.value
                    }, Response => {
                        item.ExtraField4 = Response.Entity.File;
                        item.ExtraField3 = Response.Entity.Id.toString();
                        let downloadLinkTarget = target.parent().parent().find("p.downloadLink");
                        downloadLinkTarget.empty();
                        $("<a target='_blank' href='/upload/"+Response.Entity.File+"'>Download</a>").appendTo(downloadLinkTarget);
                    });
                }
            });
        }
    }
}