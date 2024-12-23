import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { SectionColumns, SectionRow, SectionService } from '../../../ServerTypes/OrganisationHierarchy';
import { SectionDialog } from './SectionDialog';

@Decorators.registerClass('HRMSoftware.OrganisationHierarchy.SectionGrid')
export class SectionGrid extends EntityGrid<SectionRow, any> {
    protected getColumnsKey() { return SectionColumns.columnsKey; }
    protected getDialogType() { return SectionDialog; }
    protected getRowDefinition() { return SectionRow; }
    protected getService() { return SectionService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}