import { Decorators, EntityGrid, ListResponse } from '@serenity-is/corelib';
import {  RaceColumns, RaceRow, RaceService } from '../../../ServerTypes/Race';
import { RaceDialog } from './RaceDialog';

@Decorators.registerClass('HRMSoftware.Race.RaceGrid')
export class RaceGrid extends EntityGrid<RaceRow, any> {
    protected getColumnsKey() { return RaceColumns.columnsKey; }
    protected getDialogType() { return RaceDialog; }
    protected getRowDefinition() { return RaceRow; }
    protected getService() { return RaceService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
    protected onViewProcessData(response: ListResponse<RaceRow>) {
        response = super.onViewProcessData(response);
        this.toolbar.findButton("column-picker-button").toggle(false);
        return response;

    }
}