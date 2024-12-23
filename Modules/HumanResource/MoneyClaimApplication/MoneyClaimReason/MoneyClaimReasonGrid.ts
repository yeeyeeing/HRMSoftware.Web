import { Decorators, EntityGrid, ListResponse } from '@serenity-is/corelib';
import { MoneyClaimReasonColumns, MoneyClaimReasonRow, MoneyClaimReasonService } from '../../../ServerTypes/MoneyClaimApplication';
import { MoneyClaimReasonDialog } from './MoneyClaimReasonDialog';

@Decorators.registerClass('HRMSoftware.MoneyClaimApplication.MoneyClaimReasonGrid')
export class MoneyClaimReasonGrid extends EntityGrid<MoneyClaimReasonRow, any> {
    protected getColumnsKey() { return MoneyClaimReasonColumns.columnsKey; }
    protected getDialogType() { return MoneyClaimReasonDialog; }
    protected getRowDefinition() { return MoneyClaimReasonRow; }
    protected getService() { return MoneyClaimReasonService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
    protected onViewProcessData(response: ListResponse<MoneyClaimReasonRow>) {
        response = super.onViewProcessData(response);
        this.toolbar.findButton("column-picker-button").toggle(false);
        return response;

    }
}