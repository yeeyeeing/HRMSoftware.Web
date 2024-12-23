import { Decorators, EntityGrid, ListResponse } from '@serenity-is/corelib';
import { EisSubjectionColumns, EisSubjectionRow, EisSubjectionService } from '../../../ServerTypes/PayrollSettings';
import { EisSubjectionDialog } from './EisSubjectionDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.EisSubjectionGrid')
export class EisSubjectionGrid extends EntityGrid<EisSubjectionRow, any> {
    protected getColumnsKey() { return EisSubjectionColumns.columnsKey; }
    protected getDialogType() { return EisSubjectionDialog; }
    protected getRowDefinition() { return EisSubjectionRow; }
    protected getService() { return EisSubjectionService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }

    protected onViewProcessData(response: ListResponse<EisSubjectionRow>) {
        response = super.onViewProcessData(response);
        if (response.Entities.length >= 1) 
            this.toolbar.findButton("add-button").toggle(false);
        
        return response;

    }



}