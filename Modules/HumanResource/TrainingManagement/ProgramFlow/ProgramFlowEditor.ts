import {Decorators, toId} from '@serenity-is/corelib';
import {Authorization} from '@serenity-is/corelib/q';
import {GridEditorBase} from "@serenity-is/extensions";
import {ProgramFlowDialog} from './ProgramFlowDialog';
import {ProgramFlowResponseAttendanceEditDialog} from './ProgramFlowResponseAttendanceEditDialog';
import {ProgramFlowResponseGradeEditDialog} from './ProgramFlowResponseGradeEditDialog';
import {ProgramFlowResponseFileEditDialog} from './ProgramFlowResponseFileEditDialog';
import {
    ProgramFlowColumns,
    ProgramFlowRow,
    ProgramFlowService,
    ProgramFlowType
} from '../../../ServerTypes/TrainingManagement';
import {PermissionKeys} from '../../../ServerTypes/Administration';

@Decorators.registerEditor('HRMSoftware.TrainingManagement.ProgramFlowEditor')
export class ProgramFlowEditor extends GridEditorBase<ProgramFlowRow> {
    protected getColumnsKey() {
        return ProgramFlowColumns.columnsKey;
    }

    protected getDialogType() {
        return ProgramFlowDialog;
    }

    protected getLocalTextPrefix() {
        return ProgramFlowRow.localTextPrefix;
    }

    protected getService() {
        return ProgramFlowService.baseUrl;
    }

    protected getColumns() {
        let columns = super.getColumns();

        if (Authorization.hasPermission(PermissionKeys.HumanResources)) {
            columns = columns.filter((row) => {
                return !(row.name == 'Result');
            });
        } else {
            for (let col of columns) {
                if (col.field == "FlowType" || col.field == "Remark") {
                    let defaultFormatter = col.format;
                    col.format = ctx => {
                        if (ctx.item.FlowType == ProgramFlowType.Attendance || ctx.item.FlowType == ProgramFlowType.Assessment) {
                            if (col.field == "FlowType") {
                                return ProgramFlowType[ctx.value];
                            } else {
                                return ctx.value;
                            }
                        } else {
                            return defaultFormatter(ctx);
                        }
                    }
                }
            }
        }

        return columns;
    }

    protected onClick(e: JQueryEventObject, row: number, cell: number) {
        if (e.isDefaultPrevented())
            return;

        var readonly = $('div.category > div.field.ProgramName > label[title="Program Name"] + input.editor.s-StringEditor[readonly="readonly"][name="ProgramName"]')
        var item = this.itemAt(row);
        if (readonly.length > 0) {
            if (Authorization.hasPermission(PermissionKeys.HumanResources)) {
                if (item.FlowType == ProgramFlowType.Attendance) {
                    var attendanceDialog = new ProgramFlowResponseAttendanceEditDialog();
                    attendanceDialog.loadByIdAndOpenDialog(item.Id);
                } else if (item.FlowType == ProgramFlowType.Assessment) {
                    var gradeDialog = new ProgramFlowResponseGradeEditDialog();
                    gradeDialog.loadByIdAndOpenDialog(item.Id);
                } else {
                    var fileDialog = new ProgramFlowResponseFileEditDialog();
                    fileDialog.loadByIdAndOpenDialog(item.Id);
                }
            } else {
                if (item.FlowType == ProgramFlowType.Document) {
                    var fileDialog = new ProgramFlowResponseFileEditDialog();
                    fileDialog.loadByIdAndOpenDialog(item.Id);
                }
            }
        } else {
            super.onClick(e, row, cell);
        }
    }
    
    protected validateEntity(row: ProgramFlowRow, id: number) {
        // row.GradeType = row.GradeType.valueOf();
        // row.FlowType = row.FlowType.valueOf();
        // var itemId = row[this.getIdProperty()];
        // var item = this.view?.getItemById(itemId);
        // this.view.updateItem(itemId, item);
        // console.log(item);
        // console.log(row );
        // console.log(id);
        // console.log(typeof id);
        // this.view.updateItem(id, item);
        return true;
    }
}