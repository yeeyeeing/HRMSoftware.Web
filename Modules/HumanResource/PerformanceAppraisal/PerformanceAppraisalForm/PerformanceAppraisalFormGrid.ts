import {
    DataGrid,
    Decorators,
    EntityGrid,
    GridRowSelectionMixin,
    ListResponse,
    ToolButton
} from '@serenity-is/corelib';
import { hasPermission } from "@/Administration/User/Authentication/Authorization";
import {PermissionKeys} from "@/ServerTypes/Administration/PermissionKeys";
import { PdfExportHelper, ExcelExportHelper } from "@serenity-is/extensions";
import { confirm, alertDialog } from '@serenity-is/corelib/q';
import {
    PerformanceAppraisalFormColumns,
    PerformanceAppraisalFormRow,
    PerformanceAppraisalFormService,
    PerformanceAppraisalResponseRow
} from '../../../ServerTypes/PerformanceAppraisal';
import { PerformanceAppraisalFormDialog } from './PerformanceAppraisalFormDialog';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {
    PerformanceAppraisalFormStatus
} from "@/ServerTypes/Web/Modules.PerformanceAppraisal.PerformanceAppraisalForm.PerformanceAppraisalFormStatus";
import {CompanyProfileRow} from "@/ServerTypes/PerformanceAppraisal";
import { PerformanceAppraisalResponseDialog } from '../PerformanceAppraisalResponse/PerformanceAppraisalResponseDialog';


@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFormGrid')
export class PerformanceAppraisalFormGrid extends EntityGrid<PerformanceAppraisalFormRow, any> {
    private rowSelection: GridRowSelectionMixin;

    protected getColumnsKey() {
        return PerformanceAppraisalFormColumns.columnsKey;
    }

    protected getDialogType() {
        return PerformanceAppraisalFormDialog;
    }

    protected getRowDefinition() {
        return PerformanceAppraisalFormRow;
    }

    protected getService() {
        return PerformanceAppraisalFormService.baseUrl;
    }

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

        buttons.push(ExcelExportHelper.createToolButton({
            grid: this,
            service: PerformanceAppraisalFormService.baseUrl + '/ListExcel',
            onViewSubmit: () => this.onViewSubmit(),
            separator: true
        }));

        buttons.push(PdfExportHelper.createToolButton({
            grid: this,
            onViewSubmit: () => this.onViewSubmit()
        }));

        if (! hasPermission(PermissionKeys.HumanResources)) {
            buttons = buttons.filter(button => button.cssClass !== 'add-button');
        }

        buttons.push({
            title: 'Download PDFs',
            cssClass: 'export-pdf-button',
            onClick: () => {
                this.downloadAllPdfs();
            }
        });

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
            field: 'Appraisal Form',
            name: '',
            format: ctx => {
                let button = '<a class="inline-action appraisal-form" title="Appraisal Form"> <i class="fa fa-book"></i></a>';
                return button
            },
            width: 12,
            minWidth: 12,
            maxWidth: 12
        });
        
        columns.splice(1, 0, {
            id: 'Print Pdf',
            field: 'PDF Form',
            name: '',
            cssClass: 'align-center',
            format: ctx => {
                let currItem  =<PerformanceAppraisalFormRow>ctx.item;
                let button = '<a class="inline-action pdf-form" data-action="print-pdf" title="PDF">' +
                    '<i class="fa fa-file-pdf" style="color: red;"></i></a>';
                
                if (currItem.ReviewStatus == 7){
                    return button
                }
            },
            
            width: 36,
            minWidth: 36,
            maxWidth: 36
        });

        if (hasPermission(PermissionKeys.HumanResources)) {
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
        }
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

        if (target.hasClass('appraisal-form')) {
            
            confirm("Do you want to fill the performance appraisal form?", () =>
            {
                var dlg = new PerformanceAppraisalResponseDialog();
                this.initDialog(dlg);
                
                dlg.getResponseRowID(item.Id);
                dlg.getTemplateID(item.TemplateId);
                dlg.getTargetID(item.EmployeeRowId);
                dlg.loadEntityAndOpenDialog(<PerformanceAppraisalResponseRow>{
                    ResponseFormID: item.Id,
                    ResponseTemplateID: item.TemplateId,
                    ResponseTargetID: item.EmployeeRowId
                });
            });
        }
        
        if (target.hasClass('pdf-form')) {

            var data = {
                FormId: item.Id,
                EmployeeId: item.EmployeeId,
                EmployeeRowId: item.EmployeeRowId
            }

            var now = new Date();
            var year = now.getFullYear();
            var month = ('0' + (now.getMonth() + 1)).slice(-2);
            var day = ('0' + now.getDate()).slice(-2);
            var hours = ('0' + now.getHours()).slice(-2);
            var minutes = ('0' + now.getMinutes()).slice(-2);
            var seconds = ('0' + now.getSeconds()).slice(-2);
            
            // console.log("Data : ", data);
            var queryString = Object.keys(data)
                .map(function (key){
                    return key + '=' + encodeURIComponent(data[key]);
                })
                .join('&');
            var url = window.location.origin + '/PerformanceAppraisalForm/PdfSharpConvert?' + queryString
            var xhr = new XMLHttpRequest();
            // console.log("xhr : ", xhr);
            xhr.open('GET', url, true);
            xhr.responseType = 'blob';
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var blob = xhr.response;
                    const url = window.URL.createObjectURL(blob);

                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = `AppraisalForm_${item.EmployeeId}_${day}${month}${year}_${hours}${minutes}${seconds}.pdf`;
                    document.body.appendChild(a);
                    a.click();

                }else if (xhr.status !== 200) {
                    alertDialog('An error occurred while generating the PDF.');
                }else {

                }
            };
            xhr.onerror = function () {
                alertDialog('An error occurred while making the request. Please check your network connection.');
            };
            
            xhr.send()
        }
        
        if (target.hasClass('edit-link')) {
            var dlg = new PerformanceAppraisalFormDialog();
            this.initDialog(dlg);

            dlg.getID(item.Id);
            dlg.loadEntityAndOpenDialog(<PerformanceAppraisalFormRow>{
                FormID: item.Id
            });
        }
    }

    public async downloadAllPdfs(): Promise<void> {
        var items = this.view.getItems();

        if (items.length === 0) {
            alertDialog("There are no files available to download.");
            return;
        } else if (items[0].SubmissionStatus !== PerformanceAppraisalFormStatus.Completed) {
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

        var fileName = `AppraisalForms_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.zip`;

        var fileNames = new Set<string>();
        var fetchPromises = items.map(async (item, index) => {
            var currItem = <PerformanceAppraisalFormRow>item;

            if (currItem.SubmissionStatus == 2) {
                var data = {
                    FormId: currItem.Id,
                    EmployeeId: currItem.EmployeeId,
                    EmployeeRowId: currItem.EmployeeRowId
                };

                var queryString = Object.keys(data)
                    .map(key => key + '=' + encodeURIComponent(data[key]))
                    .join('&');

                var url = window.location.origin + '/PerformanceAppraisalForm/PdfSharpConvert?' + queryString;

                const response = await fetch(url);
                if (response.ok) {
                    const blob = await response.blob();

                    var pdfFileName = `AppraisalForm-${currItem.EmployeeId}-${currItem.EmployeeRowId}.pdf`;

                    if (fileNames.has(pdfFileName)) {
                        pdfFileName = `AppraisalForm-${currItem.EmployeeId}-${currItem.EmployeeRowId}-${index}.pdf`;
                    }

                    fileNames.add(pdfFileName);

                    zip.file(pdfFileName, blob);
                } else {
                    console.error('Failed to fetch PDF for item', currItem);
                }
            }
        });

        await Promise.all(fetchPromises);

        zip.generateAsync({ type: 'blob' })
            .then(function(content) {
                saveAs(content, fileName);
            })
            .catch(function(error) {
                console.error('Failed to generate ZIP:', error);
            })
    }

    private deleteAllRecords(): void {
        const visibleRecords = this.view.getItems().map(item => item.Id); // Get all visible record IDs

        if (visibleRecords.length === 0) {
            // console.log("No records to delete.");
            return;
        }
        
        confirm("Are you sure you want to delete all visible records?", () => {
            PerformanceAppraisalFormService.DeleteAll({
                RecordIds: visibleRecords 
            }, response => {
                this.refresh();
                // console.log("All visible records have been deleted.");
            });
        });
    }
}