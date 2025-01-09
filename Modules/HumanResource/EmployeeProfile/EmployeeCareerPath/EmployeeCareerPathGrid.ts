import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { EmployeeCareerPathColumns, EmployeeCareerPathRow, EmployeeCareerPathService } from '../../../ServerTypes/EmployeeProfile';
import { EmployeeCareerPathDialog } from './EmployeeCareerPathDialog';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeeCareerPathGrid')
export class EmployeeCareerPathGrid extends EntityGrid<EmployeeCareerPathRow, any> {
    protected getColumnsKey() { return EmployeeCareerPathColumns.columnsKey; }
    protected getDialogType() { return EmployeeCareerPathDialog; }
    protected getRowDefinition() { return EmployeeCareerPathRow; }
    protected getService() { return EmployeeCareerPathService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}