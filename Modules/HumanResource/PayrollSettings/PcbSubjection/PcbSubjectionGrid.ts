import { Decorators, EntityGrid, ListResponse } from '@serenity-is/corelib';
import { PcbSubjectionColumns, PcbSubjectionRow, PcbSubjectionService } from '../../../ServerTypes/PayrollSettings';
import { PcbSubjectionDialog } from './PcbSubjectionDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PcbSubjectionGrid')
export class PcbSubjectionGrid extends EntityGrid<PcbSubjectionRow, any> {
    protected getColumnsKey() { return PcbSubjectionColumns.columnsKey; }
    protected getDialogType() { return PcbSubjectionDialog; }
    protected getRowDefinition() { return PcbSubjectionRow; }
    protected getService() { return PcbSubjectionService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }


    protected onViewProcessData(response: ListResponse<PcbSubjectionRow>) {
        response = super.onViewProcessData(response);
        if (response.Entities.length >= 1) {
            this.toolbar.findButton("add-button").toggle(false);
        }
        return response;

    }
}