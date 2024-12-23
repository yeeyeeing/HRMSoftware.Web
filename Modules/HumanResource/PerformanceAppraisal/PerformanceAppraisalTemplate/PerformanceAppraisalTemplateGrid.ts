import {DataGrid, Decorators, EntityGrid, ListResponse, ToolButton} from '@serenity-is/corelib';
import {
    PerformanceAppraisalTemplateColumns,
    PerformanceAppraisalTemplateRow,
    PerformanceAppraisalTemplateService
} from '../../../ServerTypes/PerformanceAppraisal';
import { PerformanceAppraisalTemplateDialog } from './PerformanceAppraisalTemplateDialog';
import { confirm, alertDialog } from '@serenity-is/corelib/q';
import {PerformanceAppraisalFormRow} from "@/ServerTypes/PerformanceAppraisal";

@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateGrid')
export class PerformanceAppraisalTemplateGrid extends EntityGrid<PerformanceAppraisalTemplateRow, any> {
    protected getColumnsKey() { return PerformanceAppraisalTemplateColumns.columnsKey; }
    protected getDialogType() { return PerformanceAppraisalTemplateDialog; }
    protected getRowDefinition() { return PerformanceAppraisalTemplateRow; }
    protected getService() { return PerformanceAppraisalTemplateService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }

    protected onViewProcessData(response: ListResponse<PerformanceAppraisalFormRow>) {
        response = super.onViewProcessData(response);
        //this.toolbar.findButton("add-button").toggle(false);
        this.toolbar.findButton("column-picker-button").toggle(false);
        return response;
    }

    protected getDefaultSortBy() {
        return [PerformanceAppraisalTemplateRow.Fields.InsertDate + " desc"];
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

    protected getColumns() {

        DataGrid.defaultRowHeight = 50;
        let columns = super.getColumns();

        columns.splice(0, 0, {
            id: 'Edit',
            field: 'Edit',
            name: '',
            cssClass: 'align-center',
            format: ctx => {
                let button = `<a class="inline-action edit-link" data-id="${ctx.item.Id}" title="Edit">
                      <i class="fa fa-pencil" style="color: orange;"></i>
                  </a>`;
                return button;
            },
            width: 22,
            minWidth: 22,
            maxWidth: 22
        });

        return columns;

    }

    protected onClick(e: JQueryEventObject, row: number, cell: number) {
        super.onClick(e, row, cell);

        if (e.isDefaultPrevented())
            return;

        var item = this.itemAt(row);
        var target = $(e.target);
        
        if (target.parent().hasClass('inline-action'))
            target = target.parent();
        
        if (target.hasClass('edit-link')) {
            var dlg = new PerformanceAppraisalTemplateDialog();
            this.initDialog(dlg);

            dlg.getID(item.Id);
            dlg.loadEntityAndOpenDialog(<PerformanceAppraisalTemplateRow>{
                TemplateID: item.Id
            });
        }
    }

    private deleteAllRecords(): void {
        const visibleRecords = this.view.getItems().map(item => item.Id); // Get all visible record IDs

        if (visibleRecords.length === 0) {
            // console.log("No records to delete.");
            return;
        }

        confirm("Are you sure you want to delete all visible records?", () => {
            PerformanceAppraisalTemplateService.DeleteAll({
                RecordIds: visibleRecords
            }, response => {
                this.refresh();
                // console.log("All visible records have been deleted.");
            });
        });
    }
}