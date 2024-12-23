import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { OccupationColumns, OccupationRow, OccupationService } from '../../../ServerTypes/OrganisationHierarchy';
import { OccupationDialog } from './OccupationDialog';

@Decorators.registerClass('HRMSoftware.OrganisationHierarchy.OccupationGrid')
export class OccupationGrid extends EntityGrid<OccupationRow, any> {
    protected getColumnsKey() { return OccupationColumns.columnsKey; }
    protected getDialogType() { return OccupationDialog; }
    protected getRowDefinition() { return OccupationRow; }
    protected getService() { return OccupationService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}