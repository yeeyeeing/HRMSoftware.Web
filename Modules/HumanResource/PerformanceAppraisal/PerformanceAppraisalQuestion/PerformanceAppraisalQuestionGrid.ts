import {Decorators, EntityGrid, ListResponse, ToolButton} from '@serenity-is/corelib';
import {
    PerformanceAppraisalFormService,
    PerformanceAppraisalQuestionColumns,
    PerformanceAppraisalQuestionRow,
    PerformanceAppraisalQuestionService
} from '../../../ServerTypes/PerformanceAppraisal';
import { PerformanceAppraisalQuestionDialog } from './PerformanceAppraisalQuestionDialog';
import { confirm } from '@serenity-is/corelib/q';
import {PerformanceAppraisalFormRow} from "@/ServerTypes/PerformanceAppraisal";

@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalQuestionGrid')
export class PerformanceAppraisalQuestionGrid extends EntityGrid<PerformanceAppraisalQuestionRow, any> {
    protected getColumnsKey() { return PerformanceAppraisalQuestionColumns.columnsKey; }
    protected getDialogType() { return PerformanceAppraisalQuestionDialog; }
    protected getRowDefinition() { return PerformanceAppraisalQuestionRow; }
    protected getService() { return PerformanceAppraisalQuestionService.baseUrl; }

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
            PerformanceAppraisalQuestionService.DeleteAll({
                RecordIds: visibleRecords
            }, response => {
                this.refresh();
                // console.log("All visible records have been deleted.");
            });
        });
    }
}