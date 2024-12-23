import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { UserCreationColumns, UserCreationRow, UserCreationService } from '../../../ServerTypes/EmployeeProfile';
import { UserCreationDialog } from './UserCreationDialog';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.UserCreationGrid')
export class UserCreationGrid extends EntityGrid<UserCreationRow, any> {
    protected getColumnsKey() { return UserCreationColumns.columnsKey; }
    protected getDialogType() { return UserCreationDialog; }
    protected getRowDefinition() { return UserCreationRow; }
    protected getService() { return UserCreationService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}