import {Decorators, EntityGrid, SubDialogHelper, ToolButton} from '@serenity-is/corelib';
import {Authorization} from '@serenity-is/corelib/q';
import {
    ProgramSessionColumns,
    ProgramSessionRow,
    ProgramSessionService,
    ProgramSessionStatusType
} from '../../../ServerTypes/TrainingManagement';
import {PermissionKeys} from '../../../ServerTypes/Administration';
import {ProgramSessionDialog} from './ProgramSessionDialog';
import bindToDataChange = SubDialogHelper.bindToDataChange;
import { ProgramSessionApplyDialog } from './ProgramSessionApplyDialog';

@Decorators.registerClass('HRMSoftware.TrainingManagement.ProgramSessionGrid')
export class ProgramSessionGrid extends EntityGrid<ProgramSessionRow, any> {
    protected getColumnsKey() {
        return ProgramSessionColumns.columnsKey;
    }

    protected getDialogType() {
        return ProgramSessionDialog;
    }

    protected getRowDefinition() {
        return ProgramSessionRow;
    }

    protected getService() {
        return ProgramSessionService.baseUrl;
    }

    constructor(container: JQuery) {
        super(container);

        this.openDialogsAsPanel = true;
    }

    protected getColumns() {
        var columns = super.getColumns();
        
        if (Authorization.hasPermission(PermissionKeys.HumanResources)) {
            columns.push({
                field: 'Edit',
                name: 'Edit',
                format: ctx => {
                    return '<a class="inline-action Edit" title="Edit"><i class="fa fa-pen"></i></a>';
                },
                width: 30,
                minWidth: 12,
                maxWidth: 60
            });
        } else {
            columns = columns.filter((row)=>{
                return !(row.name == 'Status' || row.name == 'Department');
            });
        }
        
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

        if (target.hasClass('Edit')) {
            var dlg = new ProgramSessionDialog(false);
            dlg.loadByIdAndOpenDialog(item.Id, true);
        }
    }

    protected getButtons(): ToolButton[] {
        let buttons = super.getButtons();
        
        if (Authorization.hasPermission(PermissionKeys.HumanResources) || Authorization.hasPermission(PermissionKeys.Training)) {
            buttons.push({
                title: 'Apply New Session',
                cssClass: 'apply-changes-button',
                onClick: e => {
                    let dlg = new ProgramSessionApplyDialog();
                    bindToDataChange(dlg, this, (e, dci) => {
                        this.refresh();
                    }, true);
                    dlg.loadEntityAndOpenDialog(<ProgramSessionRow>{
                        DepartmentList: [2],
                        Status: ProgramSessionStatusType.WaitingApprovalHR,
                    }, true);
                },
                separator: true
            });
            return buttons;
        } else {
            return [];
        }
    }
}