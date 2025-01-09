import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { MasterCareerPathColumns, MasterCareerPathRow, MasterCareerPathService } from '../../../ServerTypes/EmployeeProfile';
import { MasterCareerPathDialog } from './MasterCareerPathDialog';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.MasterCareerPathGrid')
export class MasterCareerPathGrid extends EntityGrid<MasterCareerPathRow, any> {
    protected getColumnsKey() { return MasterCareerPathColumns.columnsKey; }
    protected getDialogType() { return MasterCareerPathDialog; }
    protected getRowDefinition() { return MasterCareerPathRow; }
    protected getService() { return MasterCareerPathService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}