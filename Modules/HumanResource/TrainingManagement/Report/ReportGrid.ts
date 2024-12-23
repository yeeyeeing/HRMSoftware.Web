import {alertDialog, Decorators, EntityGrid, ToolButton} from '@serenity-is/corelib';
import { ReportColumns, ReportRow, ReportService } from '../../../ServerTypes/TrainingManagement';
import { ReportDialog } from './ReportDialog';

@Decorators.registerClass('HRMSoftware.TrainingManagement.ReportGrid')
export class ReportGrid extends EntityGrid<ReportRow, any> {
    protected getColumnsKey() { return ReportColumns.columnsKey; }
    protected getDialogType() { return ReportDialog; }
    protected getRowDefinition() { return ReportRow; }
    protected getService() { return ReportService.baseUrl; }

    constructor(container: JQuery) {
        super(container);

        this.openDialogsAsPanel = true;
    }
    
    protected getButtons(): ToolButton[] {
        return [];
    }

    protected getColumns() {
        let columns = super.getColumns();

        columns.splice(0, 0, {
            id: 'Print Pdf',
            field: 'PDF Form',
            name: '',
            cssClass: 'align-center',
            format: ctx => {
                let currItem  =<ReportRow>ctx.item;
                let button = '<a class="inline-action pdf-form" data-action="print-pdf" title="PDF">' +
                    '<i class="fa fa-file-pdf" style="color: red;"></i></a>';

                // if (currItem.SubmissionStatus == 2){
                    return button
                // }
            },

            width: 36,
            minWidth: 36,
            maxWidth: 36
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

        if (target.hasClass('pdf-form')){
            var data = {
                FormId: item.Id,
            }
            
            var now = new Date();
            var year = now.getFullYear();
            var month = ('0' + (now.getMonth() + 1)).slice(-2);
            var day = ('0' + now.getDate()).slice(-2);
            var hours = ('0' + now.getHours()).slice(-2);
            var minutes = ('0' + now.getMinutes()).slice(-2);
            var seconds = ('0' + now.getSeconds()).slice(-2);

            var queryString = Object.keys(data)
                .map(function (key){
                    return key + '=' + encodeURIComponent(data[key]);
                })
                .join('&');
            var url = window.location.origin + "/TrainingManagement/PdfSharpConvert?" + queryString;
            var xhr = new XMLHttpRequest();

            xhr.open('GET', url, true);
            xhr.responseType = 'blob';
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var blob = xhr.response;
                    const url = window.URL.createObjectURL(blob);

                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = `report_${day}${month}${year}_${hours}${minutes}${seconds}.pdf`;
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
    }
}