import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { OTReasonColumns, OTReasonRow, OTReasonService } from '../../../ServerTypes/OTApplication';
import { OTReasonDialog } from './OTReasonDialog';

@Decorators.registerClass('HRMSoftware.OTApplication.OTReasonGrid')
export class OTReasonGrid extends EntityGrid<OTReasonRow, any> {
    protected getColumnsKey() { return OTReasonColumns.columnsKey; }
    protected getDialogType() { return OTReasonDialog; }
    protected getRowDefinition() { return OTReasonRow; }
    protected getService() { return OTReasonService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
}