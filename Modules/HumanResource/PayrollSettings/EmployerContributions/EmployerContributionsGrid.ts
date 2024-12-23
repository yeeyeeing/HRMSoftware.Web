import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { EmployerContributionsColumns, EmployerContributionsRow, EmployerContributionsService } from '../../../ServerTypes/PayrollSettings';
import { EmployerContributionsDialog } from './EmployerContributionsDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.EmployerContributionsGrid')
export class EmployerContributionsGrid extends EntityGrid<EmployerContributionsRow, any> {
    protected getColumnsKey() { return EmployerContributionsColumns.columnsKey; }
    protected getDialogType() { return EmployerContributionsDialog; }
    protected getRowDefinition() { return EmployerContributionsRow; }
    protected getService() { return EmployerContributionsService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}