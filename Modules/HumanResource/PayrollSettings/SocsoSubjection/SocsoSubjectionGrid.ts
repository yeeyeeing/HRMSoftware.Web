import { Decorators, EntityGrid, ListResponse } from '@serenity-is/corelib';
import { SocsoSubjectionColumns, SocsoSubjectionRow, SocsoSubjectionService } from '../../../ServerTypes/PayrollSettings';
import { SocsoSubjectionDialog } from './SocsoSubjectionDialog';

@Decorators.registerClass('HRMSoftware.PayrollSettings.SocsoSubjectionGrid')
export class SocsoSubjectionGrid extends EntityGrid<SocsoSubjectionRow, any> {
    protected getColumnsKey() { return SocsoSubjectionColumns.columnsKey; }
    protected getDialogType() { return SocsoSubjectionDialog; }
    protected getRowDefinition() { return SocsoSubjectionRow; }
    protected getService() { return SocsoSubjectionService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }


    protected onViewProcessData(response: ListResponse<SocsoSubjectionRow>) {
        response = super.onViewProcessData(response);
        if (response.Entities.length >= 1) {
            this.toolbar.findButton("add-button").toggle(false);
        }
        return response;

    }
}