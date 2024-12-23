import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { EmployeePersonalProfileColumns, EmployeePersonalProfileRow, EmployeePersonalProfileService } from '../../../ServerTypes/EmployeeProfile';
import { EmployeePersonalProfileDialog } from './EmployeePersonalProfileDialog';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeePersonalProfileGrid')
export class EmployeePersonalProfileGrid extends EntityGrid<EmployeePersonalProfileRow, any> {
    protected getColumnsKey() { return EmployeePersonalProfileColumns.columnsKey; }
    protected getDialogType() { return EmployeePersonalProfileDialog; }
    protected getRowDefinition() { return EmployeePersonalProfileRow; }
    protected getService() { return EmployeePersonalProfileService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}