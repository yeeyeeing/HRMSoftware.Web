import {DataGrid, Decorators, EntityGrid, ListResponse, ToolButton} from '@serenity-is/corelib';
import {
    PerformanceAppraisalFileAttachColumns,
    PerformanceAppraisalFileAttachRow,
    PerformanceAppraisalFileAttachService, PerformanceAppraisalFormRow,
    PerformanceAppraisalResponseRow
} from '../../../ServerTypes/PerformanceAppraisal';
import JSZip from 'jszip';  
import { saveAs } from 'file-saver';
import { PerformanceAppraisalFileAttachDialog } from './PerformanceAppraisalFileAttachDialog';
import { confirm, alertDialog } from '@serenity-is/corelib/q';
import {CompanyProfileRow, PerformanceAppraisalFormService} from "@/ServerTypes/PerformanceAppraisal";

@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFileAttachGrid')
export class PerformanceAppraisalFileAttachGrid extends EntityGrid<PerformanceAppraisalFileAttachRow, any> {
    protected getColumnsKey() { return PerformanceAppraisalFileAttachColumns.columnsKey; }
    protected getDialogType() { return PerformanceAppraisalFileAttachDialog; }
    protected getRowDefinition() { return PerformanceAppraisalFileAttachRow; }
    protected getService() { return PerformanceAppraisalFileAttachService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }

    protected onViewProcessData(response: ListResponse<CompanyProfileRow>) {
        response = super.onViewProcessData(response);
        this.toolbar.findButton("column-picker-button").toggle(false);
        return response;
    }

    protected getButtons(): ToolButton[] {
        var buttons = super.getButtons();

        buttons.push({
            title: 'Download Files',
            cssClass: '',
            icon: 'fa fa-file-download',
            onClick: () => {
                this.downloadAllFiles();
            }
        });

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
            PerformanceAppraisalFileAttachService.DeleteAll({
                RecordIds: visibleRecords
            }, response => {
                this.refresh();
                // console.log("All visible records have been deleted.");
            });
        });
    }

    public async downloadAllFiles(): Promise<void> {
        var items = this.view.getItems();

        if (items.length === 0) {
            alertDialog("There are no files available to download.");
            return;
        }
        
        var zip = new JSZip();

        var now = new Date();
        var year = now.getFullYear();
        var month = ('0' + (now.getMonth() + 1)).slice(-2);
        var day = ('0' + now.getDate()).slice(-2);
        var hours = ('0' + now.getHours()).slice(-2);
        var minutes = ('0' + now.getMinutes()).slice(-2);
        var seconds = ('0' + now.getSeconds()).slice(-2);

        var fileName = `Files_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.zip`;

        var fetchPromises = items.map(async item => {
            var currItem = <PerformanceAppraisalFileAttachRow>item;
            
            if (currItem.Files != null) {
                var host = window.location.protocol + "//" + window.location.host;
                var address = host + "/upload/" + currItem.Files;

                const response = await fetch(address);
                if (response.ok) {
                    const blob = await response.blob();
                    zip.file(currItem.Files, blob);
                }
            }
        });

        await Promise.all(fetchPromises);

        zip.generateAsync({ type: 'blob' })
            .then(function(content) {
                saveAs(content, fileName);
            });
    }

    protected getColumns() {
        DataGrid.defaultRowHeight = 50;
        let columns = super.getColumns();

        columns.splice(0, 0, {
            field: 'File',
            name: '',
            format: ctx => {
                var currItem = <PerformanceAppraisalFileAttachRow>ctx.item;
                var klass = "";
                var href = ""
                if (currItem.Files == null) {
                    klass = "disabled";
                }
                else {

                    var host = window.location.protocol + "//" + window.location.host;
                    var address = host + "/upload/" + currItem.Files;
                    href = address;
                }
                return '<a class="inline-action download-file-button ' + klass + '" title="Download File" target = "_blank" href=' + href + '>' +
                    '<i class="fa fa-file-alt" style="color: blue;"></i></a>'
            },
            width: 24,
            minWidth: 24,
            maxWidth: 24
        });
        return columns;
    }
}