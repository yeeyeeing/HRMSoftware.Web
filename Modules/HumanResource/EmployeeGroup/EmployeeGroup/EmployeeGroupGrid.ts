import { Decorators, EntityGrid, ListResponse } from '@serenity-is/corelib';
import { EmployeeGroupColumns, EmployeeGroupRow, EmployeeGroupService } from '../../../ServerTypes/EmployeeGroup';
import { EmployeeGroupDialog } from './EmployeeGroupDialog';

@Decorators.registerClass('HRMSoftware.EmployeeGroup.EmployeeGroupGrid')
export class EmployeeGroupGrid extends EntityGrid<EmployeeGroupRow, any> {
    protected getColumnsKey() { return EmployeeGroupColumns.columnsKey; }
    protected getDialogType() { return EmployeeGroupDialog; }
    protected getRowDefinition() { return EmployeeGroupRow; }
    protected getService() { return EmployeeGroupService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
    protected onViewProcessData(response: ListResponse<EmployeeGroupRow>) {
        response = super.onViewProcessData(response);
        this.toolbar.findButton("column-picker-button").toggle(false);
        return response;

    }
}