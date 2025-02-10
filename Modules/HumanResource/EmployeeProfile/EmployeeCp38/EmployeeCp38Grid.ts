import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { EmployeeCp38Columns, EmployeeCp38Row, EmployeeCp38Service } from '../../../ServerTypes/EmployeeProfile';
import { EmployeeCp38Dialog } from './EmployeeCp38Dialog';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeeCp38Grid')
export class EmployeeCp38Grid extends EntityGrid<EmployeeCp38Row, any> {
    protected getColumnsKey() { return EmployeeCp38Columns.columnsKey; }
    protected getDialogType() { return EmployeeCp38Dialog; }
    protected getRowDefinition() { return EmployeeCp38Row; }
    protected getService() { return EmployeeCp38Service.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}