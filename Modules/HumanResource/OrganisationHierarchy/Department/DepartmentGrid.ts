import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { DepartmentColumns, DepartmentRow, DepartmentService } from '../../../ServerTypes/OrganisationHierarchy';
import { DepartmentDialog } from './DepartmentDialog';

@Decorators.registerClass('HRMSoftware.OrganisationHierarchy.DepartmentGrid')
export class DepartmentGrid extends EntityGrid<DepartmentRow, any> {
    protected getColumnsKey() { return DepartmentColumns.columnsKey; }
    protected getDialogType() { return DepartmentDialog; }
    protected getRowDefinition() { return DepartmentRow; }
    protected getService() { return DepartmentService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}