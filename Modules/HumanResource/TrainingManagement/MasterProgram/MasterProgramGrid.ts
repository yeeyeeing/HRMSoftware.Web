import {DataGrid, Decorators, EntityGrid, SubDialogHelper, ToolButton} from '@serenity-is/corelib';
import {
    MasterProgramColumns,
    MasterProgramRow,
    MasterProgramService,
    MasterProgramStatusType,
    ProgramSessionRow
} from '../../../ServerTypes/TrainingManagement';
import { DepartmentService } from '../../../ServerTypes/OrganisationHierarchy/DepartmentService';

import {MasterProgramDialog} from './MasterProgramDialog';
import bindToDataChange = SubDialogHelper.bindToDataChange;
import { ProgramSessionDialog } from '../ProgramSession/ProgramSessionDialog';
import { MasterProgramApplyDialog } from './MasterProgramApplyDialog';

@Decorators.registerClass('HRMSoftware.TrainingManagement.MasterProgramGrid')
export class MasterProgramGrid extends EntityGrid<MasterProgramRow, any> {
    protected getColumnsKey() {
        return MasterProgramColumns.columnsKey;
    }

    protected getDialogType() {
        return MasterProgramDialog;
    }

    protected getRowDefinition() {
        return MasterProgramRow;
    }

    protected getService() {
        return MasterProgramService.baseUrl;
    }

    constructor(container: JQuery) {
        super(container);

        this.openDialogsAsPanel = true;
    }

    protected getColumns() {
        DataGrid.defaultRowHeight = 60;
        let columns = super.getColumns();

        columns.splice(0, 0, {
            field: 'Action',
            name: 'Action',
            format: ctx => {
                if (ctx.item.Status == MasterProgramStatusType.Approved) {
                    return '<a class="inline-action New-Session button" title="New Session"><button type="button" class="btn btn-labeled btn-warning" style="padding: 0 1px;"><span class="btn-label"><i class="fa fa-plus-circle"></i></span>New Session</button></a>';
                } else {
                    return;
                }
            },
            width: 100,
            minWidth: 30,
            maxWidth: 120
        });

        return columns;
    }

    protected onClick(e: JQueryEventObject, row: number, cell: number) {
        super.onClick(e, row, cell);
        if (e.isDefaultPrevented())
            return;

        // get reference to current item
        let item = this.itemAt(row);
        // get reference to clicked element
        let target = $(e.target);
        if (target.parent().hasClass('inline-action'))
            target = target.parent();

        if (target.hasClass('New-Session')) {
            MasterProgramService.Retrieve({
                EntityId: item.Id
            }, response => {
                let dlg = new ProgramSessionDialog(false);
                let FlowList = [];
                for (let key in response.Entity.FlowList) {
                    FlowList.push({
                        'FlowType': response.Entity.FlowList[key].FlowType,
                        'GradeType': response.Entity.FlowList[key].GradeType,
                        'Remark': response.Entity.FlowList[key].Remark,
                    });
                }

                if (item.AllDepartment) {
                    DepartmentService.List({}, response => {
                        let departmentList = [];
                        for (let key in response.Entities) {
                            departmentList.push(response.Entities[key].Id);
                        }
                        dlg.loadEntityAndOpenDialog(<ProgramSessionRow>{
                            ProgramName: item.ProgramName,
                            DepartmentList: departmentList,
                            Detail: item.Detail,
                            ExtraDocument: item.ExtraDocument,
                            FlowList: FlowList,
                        }, true);
                    });
                } else {
                    dlg.loadEntityAndOpenDialog(<ProgramSessionRow>{
                        ProgramName: item.ProgramName,
                        DepartmentList: item.DepartmentList,
                        Detail: item.Detail,
                        ExtraDocument: item.ExtraDocument,
                        FlowList: FlowList,
                    }, true);
                }
            });

        }
    }

    protected getButtons(): ToolButton[] {
        let buttons = super.getButtons();

        buttons.push({
            title: 'Apply New Program',
            cssClass: 'apply-changes-button',
            onClick: e => {
                let dlg = new MasterProgramApplyDialog();
                bindToDataChange(dlg, this, (e, dci) => {
                    this.refresh();
                }, true);
                dlg.loadEntityAndOpenDialog(<MasterProgramRow>{
                    DepartmentList: [2],
                    Status: MasterProgramStatusType.WaitingApproval,
                }, true);
            },
            separator: true
        });

        return buttons;
    }
}