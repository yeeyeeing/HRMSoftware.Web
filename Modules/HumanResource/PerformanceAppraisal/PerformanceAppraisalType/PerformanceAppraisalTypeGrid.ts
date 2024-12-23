import {Decorators, EntityGrid, ListResponse, ToolButton} from '@serenity-is/corelib';
import { PerformanceAppraisalTypeColumns, PerformanceAppraisalTypeRow, PerformanceAppraisalTypeService } from '../../../ServerTypes/PerformanceAppraisal';
import { PerformanceAppraisalTypeDialog } from './PerformanceAppraisalTypeDialog';
import { confirm, alertDialog } from '@serenity-is/corelib/q';
import {PerformanceAppraisalFormRow, PerformanceAppraisalFormService} from "@/ServerTypes/PerformanceAppraisal";
import {hasPermission} from "@/Administration/User/Authentication/Authorization";
import {PermissionKeys} from "@/ServerTypes/Administration/PermissionKeys";

@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTypeGrid')
export class PerformanceAppraisalTypeGrid extends EntityGrid<PerformanceAppraisalTypeRow, any> {
    protected getColumnsKey() { return PerformanceAppraisalTypeColumns.columnsKey; }
    protected getDialogType() { return PerformanceAppraisalTypeDialog; }
    protected getRowDefinition() { return PerformanceAppraisalTypeRow; }
    protected getService() { return PerformanceAppraisalTypeService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }

    protected onViewProcessData(response: ListResponse<PerformanceAppraisalFormRow>) {
        response = super.onViewProcessData(response);
        //this.toolbar.findButton("add-button").toggle(false);
        this.toolbar.findButton("column-picker-button").toggle(false);
        return response;
    }

    protected getButtons(): ToolButton[] {
        let buttons = super.getButtons();
        
        buttons.push({
            title: 'Delete All Records',
            cssClass: 'delete-button',
            onClick: () => this.deleteAllRecords()
        });

        return buttons;
    }

    private deleteAllRecords(): void {
        const visibleRecords = this.view.getItems().map(item => item.Id); // Get all visible record IDs

        if (visibleRecords.length === 0) {
            // console.log("No records to delete.");
            return;
        }

        confirm("Are you sure you want to delete all visible records?", () => {
            PerformanceAppraisalTypeService.DeleteAll({
                RecordIds: visibleRecords
            }, response => {
                this.refresh();
                // console.log("All visible records have been deleted.");
            });
        });
    }
}