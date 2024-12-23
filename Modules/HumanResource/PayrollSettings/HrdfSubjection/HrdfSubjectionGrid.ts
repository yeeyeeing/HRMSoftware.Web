import { Decorators, EntityGrid, ListResponse } from '@serenity-is/corelib';
import { HrdfSubjectionColumns, HrdfSubjectionRow, HrdfSubjectionService } from '../../../ServerTypes/PayrollSettings';
import { HrdfSubjectionDialog } from './HrdfSubjectionDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.HrdfSubjectionGrid')
export class HrdfSubjectionGrid extends EntityGrid<HrdfSubjectionRow, any> {
    protected getColumnsKey() { return HrdfSubjectionColumns.columnsKey; }
    protected getDialogType() { return HrdfSubjectionDialog; }
    protected getRowDefinition() { return HrdfSubjectionRow; }
    protected getService() { return HrdfSubjectionService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }

    protected onViewProcessData(response: ListResponse<HrdfSubjectionRow>) {
        response = super.onViewProcessData(response);
        if (response.Entities.length >= 1) {
            this.toolbar.findButton("add-button").toggle(false);
        }
        return response;

    }
}