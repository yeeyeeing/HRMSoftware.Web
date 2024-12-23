import {Decorators, EntityGrid, ListResponse} from '@serenity-is/corelib';
import { CompanyProfileColumns, CompanyProfileRow, CompanyProfileService } from '../../../ServerTypes/PerformanceAppraisal';
import { CompanyProfileDialog } from './CompanyProfileDialog';
import {MoneyClaimApplicationRow} from "@/ServerTypes/MoneyClaimApplication/MoneyClaimApplicationRow";

@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.CompanyProfileGrid')
export class CompanyProfileGrid extends EntityGrid<CompanyProfileRow, any> {
    protected getColumnsKey() { return CompanyProfileColumns.columnsKey; }
    protected getDialogType() { return CompanyProfileDialog; }
    protected getRowDefinition() { return CompanyProfileRow; }
    protected getService() { return CompanyProfileService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }

    protected onViewSubmit(): boolean {
        const result = super.onViewSubmit();

        if (result) {
            CompanyProfileService.List({}, response => {
                if (response.Entities.length > 0) {
                    this.toolbar.findButton('add-button').hide();
                }
            });
        }

        return result;
    }

    protected onViewProcessData(response: ListResponse<CompanyProfileRow>) {
        response = super.onViewProcessData(response);
        this.toolbar.findButton("column-picker-button").toggle(false);
        return response;
    }
}