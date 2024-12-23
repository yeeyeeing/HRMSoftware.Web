import { Decorators, EntityGrid, ListResponse } from '@serenity-is/corelib';
import { InitYearColumns, InitYearRow, InitYearService } from '../../../ServerTypes/InitYear';
import { InitYearDialog } from './InitYearDialog';

@Decorators.registerClass('HRMSoftware.InitYear.InitYearGrid')
export class InitYearGrid extends EntityGrid<InitYearRow, any> {
    protected getColumnsKey() { return InitYearColumns.columnsKey; }
    protected getDialogType() { return InitYearDialog; }
    protected getRowDefinition() { return InitYearRow; }
    protected getService() { return InitYearService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
    protected onViewProcessData(response: ListResponse<InitYearRow>) {
        response = super.onViewProcessData(response);
        this.toolbar.findButton("column-picker-button").toggle(false);
        return response;

    }
}