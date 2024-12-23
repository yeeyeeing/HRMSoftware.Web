import { Decorators, EntityGrid, ListResponse } from '@serenity-is/corelib';
import { EpfSubjectionColumns, EpfSubjectionRow, EpfSubjectionService } from '../../../ServerTypes/PayrollSettings';
import { EpfSubjectionDialog } from './EpfSubjectionDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.EpfSubjectionGrid')
export class EpfSubjectionGrid extends EntityGrid<EpfSubjectionRow, any> {
    protected getColumnsKey() { return EpfSubjectionColumns.columnsKey; }
    protected getDialogType() { return EpfSubjectionDialog; }
    protected getRowDefinition() { return EpfSubjectionRow; }
    protected getService() { return EpfSubjectionService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
    protected onViewProcessData(response: ListResponse<EpfSubjectionRow>) {
        response = super.onViewProcessData(response);
        if (response.Entities.length >= 1) {
            this.toolbar.findButton("add-button").toggle(false);
        }
        return response;

    }




}