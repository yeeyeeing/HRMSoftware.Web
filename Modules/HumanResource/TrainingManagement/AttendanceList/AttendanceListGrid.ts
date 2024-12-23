import {DataGrid, Decorators, EntityGrid, TabsExtensions} from '@serenity-is/corelib';
import { AttendanceListColumns, AttendanceListRow, AttendanceListService } from '../../../ServerTypes/TrainingManagement';
import { ProgramSessionDialog } from '../ProgramSession/ProgramSessionDialog';
import { ProgramFlowAttendanceEditDialog } from './../ProgramFlow/ProgramFlowAttendanceEditDialog';
import selectTab = TabsExtensions.selectTab;
import activeTabKey = TabsExtensions.activeTabKey;

@Decorators.registerClass('HRMSoftware.TrainingManagement.AttendanceListGrid')
export class AttendanceListGrid extends EntityGrid<AttendanceListRow, any> {
    protected getColumnsKey() { return AttendanceListColumns.columnsKey; }
    protected getDialogType() { return ProgramFlowAttendanceEditDialog; }
    protected getRowDefinition() { return AttendanceListRow; }
    protected getService() { return AttendanceListService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }

    protected onClick(e: JQueryEventObject, row: number, cell: number) {
        if (e.isDefaultPrevented())
            return;
        
        // get reference to current item
        var item = this.itemAt(row);
        // get reference to clicked element
        var target = $(e.target);

        if (target.parent().hasClass('inline-action'))
            target = target.parent();

        if (target.hasClass('view-program')) {
            var dlg = new ProgramSessionDialog(false);
            
            let FlowList = dlg.element.find('#' + dlg.idPrefix + 'FlowList');
            dlg.selectEditorTab(FlowList);
            
            dlg.loadByIdAndOpenDialog(item.ProgramId, false);
            
        } else {
            super.onClick(e, row, cell);
        }
    }

    protected getColumns() {
        DataGrid.defaultRowHeight = 60;
        let columns = super.getColumns();

        columns.splice(0, 0, {
            field: 'Action',
            name: 'Action',
            format: ctx => {
                return '<a class="inline-action view-program" title="View Program Session"><i class="fa fa-chalkboard-teacher"></i></a>';
            },
            width: 60,
            minWidth: 60,
            maxWidth: 60
        });

        return columns;
    }
}