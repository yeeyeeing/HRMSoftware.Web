import { Criteria, Decorators, EntityGrid, IntegerEditor, ListResponse, LookupEditor, StringEditor, GridRowSelectionMixin } from '@serenity-is/corelib';
import { EisSubjectionService, EpfSubjectionService, HrdfSubjectionService, PayrollColumns, PayrollRow, PayrollService, PcbSubjectionService, SocsoSubjectionService } from '../../../ServerTypes/PayrollSettings';
import { PayrollDialog } from './PayrollDialog';
import { confirmDialog, confirm, serviceCall, notifySuccess, notifyError, notifyInfo } from '@serenity-is/corelib/q';
import { EpfSubjectionDialog } from '../EpfSubjection/EpfSubjectionDialog';
import { EisSubjectionDialog } from '../EisSubjection/EisSubjectionDialog';
import { HrdfSubjectionDialog } from '../HrdfSubjection/HrdfSubjectionDialog';
import { PcbSubjectionDialog } from '../PcbSubjection/PcbSubjectionDialog';
import { SocsoSubjectionDialog } from '../SocsoSubjection/SocsoSubjectionDialog';
import { PayrollWizardDialog } from '../PayrollWizard/PayrollWizardDialog';
import { PayrollGeneratingWizardDialog } from '../PayrollGeneratingWizard/PayrollGeneratingWizardDialog';
import { TextEditor } from '@serenity-is/sleekgrid';
import { OccupationService, DepartmentService, JobGradeService, DivisionService } from '../../../ServerTypes/OrganisationHierarchy';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { Authorization, isEmptyOrNull } from '@serenity-is/corelib/q';
import { Select2Editor, QuickFilter, Widget } from '@serenity-is/corelib';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { MasterCostCentreService } from '../../../ServerTypes/Master';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayrollGrid')
export class PayrollGrid extends EntityGrid<PayrollRow, any> {
    protected getColumnsKey() { return PayrollColumns.columnsKey; }
    protected getDialogType() { return PayrollDialog; }
    protected getRowDefinition() { return PayrollRow; }
    protected getService() { return PayrollService.baseUrl; }
    private rowSelection: GridRowSelectionMixin;
    protected getAddButtonCaption() {
        return "Create Employee Payroll";
    }
    constructor(container: JQuery) {
        super(container);
    }
    protected getQuickFilters(): QuickFilter<Widget<any>, any>[] {
        //Gets the Filters defined in the Columns or in parent grids.
        let filters = super.getQuickFilters();
       
        // console.log(filters[3].type = Select2Editor)
        if (Authorization.hasPermission(PermissionKeys.HumanResources)) {
            filters.push({
                cssClass: "hidden-xs",
                field: PayrollRow.Fields.CostCentreName,
                type: Select2Editor,

                title: "Cost Centre",
            });
            filters.push({
                cssClass: "hidden-xs",
                field: PayrollRow.Fields.OccupationName,
                type: Select2Editor,
                title: "Occupation",

            });
            filters.push({
                cssClass: "hidden-xs",
                field: PayrollRow.Fields.JobGradeName,
                type: Select2Editor,
                title: "Job Grade",

            });
            filters.push({
                cssClass: "hidden-xs",
                field: PayrollRow.Fields.DivisionName,
                type: Select2Editor,
                title: "Division",

            });

            filters.push({
                cssClass: "hidden-xs",
                field: PayrollRow.Fields.DepartmentName,
                type: Select2Editor,
                title: "Department",

            });
            filters.push({
                cssClass: "hidden-xs",
                field: PayrollRow.Fields.EmployeeName,
                type: Select2Editor,
                title: "Name",
            });
            filters.push({
                cssClass: "hidden-xs",
                field: PayrollRow.Fields.EmployeeId,
                type: Select2Editor,
                title: "Employee ID",
            });
            filters.reverse()

       }
        filters.push({
            cssClass: "hidden-xs",
            field: PayrollRow.Fields.PayMonth,
            type: Select2Editor,
            title: "Pay Month",
        });


        filters.push({
            cssClass: "hidden-xs",
            field: PayrollRow.Fields.PayYear,
            type: Select2Editor,
            title: "Pay Year",
        });
        return filters;
    }
    protected createQuickFilters(): void {
        // let base class to create quick filters first
        const months: string[] = [
            'January',   // 0
            'February',  // 1
            'March',     // 2
            'April',     // 3
            'May',       // 4
            'June',      // 5
            'July',      // 6
            'August',    // 7
            'September', // 8
            'October',   // 9
            'November',  // 10
            'December'   // 11
        ];

            super.createQuickFilters();

        if (Authorization.hasPermission(PermissionKeys.HumanResources)) {
          
            OccupationService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, PayrollRow.Fields.OccupationName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            JobGradeService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, PayrollRow.Fields.JobGradeName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            DepartmentService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, PayrollRow.Fields.DepartmentName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            DivisionService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, PayrollRow.Fields.DivisionName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

            })
            EmployeeProfileService.List({
            }, response => {
                for (var index in response.Entities) {
                    this.findQuickFilter(Select2Editor, PayrollRow.Fields.EmployeeName).items.push({ id: (response.Entities[index].EmployeeName).toString(), text: (response.Entities[index].EmployeeName).toString(), })
                    this.findQuickFilter(Select2Editor, PayrollRow.Fields.EmployeeId).items.push({ id: (response.Entities[index].EmployeeID).toString(), text: (response.Entities[index].EmployeeID).toString(), })

                }
            })
            MasterCostCentreService.List({
            }, response => {
                for (var index in response.Entities) {
                    this.findQuickFilter(Select2Editor, PayrollRow.Fields.CostCentreName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

                }
            })

        }
        else
            this.toolbar.findButton("add-button").toggle(false);

        for (var index in months)
            this.findQuickFilter(Select2Editor, PayrollRow.Fields.PayMonth).items.push({ id: (index).toString(), text: (months[index]).toString(), })
        PayrollService.List({
        }, response => {
            let YearList = [];
            for (var index in response.Entities)
                if (YearList.indexOf(response.Entities[index].PayYear) == -1)
                    YearList.push(response.Entities[index].PayYear)
            for (var index in YearList)
                this.findQuickFilter(Select2Editor, PayrollRow.Fields.PayYear).items.push({ id: (YearList[index]).toString(), text: (YearList[index]).toString(), })
        })
    }
  

    protected onViewProcessData(response: ListResponse<PayrollRow>) {
        console.log(this.rowSelection.getSelectedKeys());

        //console.log('haha')
        response = super.onViewProcessData(response);
        //console.log(this.toolbar.findButton("add-button").toggle(false))
       // console.log($(this.toolbar.findButton("add-button")).attr("style"))

        if (Authorization.hasPermission(PermissionKeys.HumanResources)) {
            var cur = response
            if (!isEmptyOrNull($(this.toolbar.findButton("add-button")).attr("style"))) {
                var terminateButtons = document.querySelectorAll('.text-bg-warning')
                terminateButtons.forEach(function (element) {
                    $(element).hide()
                });
                var resignButtons = document.querySelectorAll('.text-bg-success')
                resignButtons.forEach(function (element) {
                    $(element).hide()
                });

            }


            for (var index in response.Entities)
            {
                if (isEmptyOrNull(response.Entities[index].PayslipPath))
                {
                    var queryString = "PayrollRowId=" + encodeURIComponent(response.Entities[index].Id)
                    var url = window.location.origin + '/PayrollSettings/Payroll/PdfSharpConvert?' + queryString
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.send() 

                    PayrollService.Update({
                        EntityId: response.Entities[index].Id,
                        Entity:
                        {
                            "PayslipPath": 'Payroll\\Payslip\\' + response.Entities[index].Id + '.pdf'
                        },
                    });
                    
                }
            }

            serviceCall<ListResponse<any>>({
                service: PayrollService.baseUrl + '/AskGenerationOfPayslip',
                method: "GET",
                data: {
                },
                async: false,
                onSuccess: (response) => {
                    if (response[0] == 1) {
                        const months: string[] = [
                            'January',   // 0
                            'February',  // 1
                            'March',     // 2
                            'April',     // 3
                            'May',       // 4
                            'June',      // 5
                            'July',      // 6
                            'August',    // 7
                            'September', // 8
                            'October',   // 9
                            'November',  // 10
                            'December'   // 11
                        ];
                        var month = response[1]
                        var year = response[2]

                        confirm(
                            // here we demonstrate how you can detect which button user has clicked
                            // second parameter is Yes handler and it is called only when user clicks Yes.
                            // third parameter has some additional options, that you should only use when needed            
                            "Do you want to generate payslip for " + response[2] + ' ' + months[response[1]],
                            () => {

                                serviceCall<any>({
                                    service: PayrollService.baseUrl + '/LogGeneration',
                                    method: "GET",
                                    data: {
                                        "Month": month,
                                        "Year": year
                                    },
                                    async: false,
                                    onSuccess: (response) => {
                                        var GeneratingWizard = new PayrollGeneratingWizardDialog()
                                        GeneratingWizard.dialogOpen()
                                        GeneratingWizard.element.on("dialogclose", function () {
                                            location.reload()
                                        })
                                    },
                                    onError: (error) => {
                                        console.log(error.Error);
                                    }
                                })
                            }, {
                            onNo: () => {

                                serviceCall<any>({
                                    service: PayrollService.baseUrl + '/LogGeneration',
                                    method: "GET",
                                    data: {
                                        "Month": month,
                                        "Year": year
                                    },
                                    async: false,
                                    onSuccess: (response) => {
                                    },
                                    onError: (error) => {
                                        console.log(error.Error);
                                    }
                                })

                                notifyInfo("You can run the payslip generation wizard anytime")
                            }
                            ,
                        });
                    }
                },
                onError: (error) => {
                    console.log(error.Error);
                }

            })
            this.toolbar.findButton("column-picker-button").toggle(false);
        }
        return cur;

    }
    protected getButtons() {
        var buttons = super.getButtons();
        var self = this
        if (Authorization.hasPermission(PermissionKeys.HumanResources)) {
            EpfSubjectionService.List({
            }, response => {
                if (response.Entities.length > 0) {
                    EisSubjectionService.List({
                    }, response => {
                        if (response.Entities.length > 0) {
                            HrdfSubjectionService.List({
                            }, response => {
                                if (response.Entities.length > 0) {
                                    EisSubjectionService.List({
                                    }, response => {
                                        if (response.Entities.length > 0) {
                                            PcbSubjectionService.List({
                                            }, response => {
                                                if (response.Entities.length <= 0) {
                                                    this.toolbar.findButton("add-button").toggle(false);
                                                    notifyError("Please complete PCB subjection form before using payslip function")
                                                }
                                            });
                                        }
                                        else {
                                            this.toolbar.findButton("add-button").toggle(false);
                                            notifyError("Please complete EIS subjection form before using payslip function")

                                        }
                                    });
                                }
                                else {
                                    notifyError("Please complete HRDF subjection form before using payslip function")
                                    this.toolbar.findButton("add-button").toggle(false);
                                }
                            });
                        }
                        else {
                            notifyError("Please complete EIS subjection form before using payslip function")
                            this.toolbar.findButton("add-button").toggle(false);
                        }
                    });
                }
                else {
                    notifyError("Please complete EPF subjection form before using payslip function")
                    this.toolbar.findButton("add-button").toggle(false);

                }
            });
            buttons.push({
                title: 'Payroll Generator',
                cssClass: 'fas fa-hat-wizard text-bg-success',
                onClick: e => {
                    confirm(
                        "Do you want to run payslip generating wizard",
                        () => {
                            var GeneratingWizard = new PayrollGeneratingWizardDialog()
                            GeneratingWizard.dialogOpen()
                            GeneratingWizard.element.on("dialogclose", function () {
                                //self.refresh()
                                location.reload()

                            })
                        }
                    )
                },
                separator: false
            });
            buttons.push({
                title: 'Payroll Download',
                cssClass: 'fas fa-hat-wizard text-bg-warning',
                onClick: e => {
                    confirm(
                        "Do you want to run payslip download wizard",
                        () => {
                            var DownloadWizard = new PayrollWizardDialog(null, null, null)
                            DownloadWizard.dialogOpen()
                           
                        }

                    )

                },
                separator: true
            });
            buttons.push({
                title: 'Payroll Batch Delete',
                cssClass: 'fas fa-hat-wizard text-bg-danger',
                onClick: e => {
                    confirm(
                            "Do you want to delete all selected payslips?",
                        () => {

                            // Create an array of promises for each delete operation
                            let deletePromises = [];

                            $('.select-row-checkbox:checked').each(function () {
                                let dataId = $(this).data('id');

                                // Add each delete operation promise to the array
                                let deletePromise = PayrollService.Delete({
                                    EntityId: dataId,
                                }).then(() => {
                                    console.log('Deleted Data ID:', dataId);
                                }).catch(error => {
                                    console.error('Error deleting Data ID:', dataId, error);
                                });

                                // Push the promise to the array
                                deletePromises.push(deletePromise);
                            });

                            // Wait for all delete operations to complete before reloading the page
                            Promise.all(deletePromises)
                                .then(() => {
                                    // All delete operations are completed, now reload the page
                                    location.reload();
                                })
                                .catch(error => {
                                    // Handle any error that occurred during delete operations
                                    console.error('Error in delete operations:', error);
                                });
                            
                        }
                    )
                },
                separator: true
            });
            
            buttons.push({
                title: 'Download Txt',
                cssClass: 'fas fa-hat-wizard text-bg-danger',
                onClick: e => {
                    confirm(
                            "Do you want to download txt?",
                        () => {
                            
                         


                        }
                    )
                },
                separator: true
            });

            
            
            buttons.push({
                title: 'EPF Subjection',
                cssClass: 'apply-changes-button',
                onClick: e => {
                    confirm(
                        "Do you want to set EPF Subjection",
                        () => {
                            var EpfDlg = new EpfSubjectionDialog()
                            EpfSubjectionService.List({
                            }, response => {
                                if (response.Entities.length > 0)
                                    EpfDlg.loadByIdAndOpenDialog(response.Entities[0].Id)

                                else
                                    EpfDlg.dialogOpen()
                            });

                            EpfDlg.element.on("dialogclose", function () {

                     

                            })
                        }

                    )

                },
                separator: true
            });
            buttons.push({
                title: 'EIS Subjection',
                cssClass: 'apply-changes-button',
                onClick: e => {
                    confirm(
                        "Do you want to set EPF Subjection",
                        () => {
                            var EisDlg = new EisSubjectionDialog()

                            EisSubjectionService.List({
                            }, response => {
                                if (response.Entities.length > 0)
                                    EisDlg.loadByIdAndOpenDialog(response.Entities[0].Id)

                                else
                                    EisDlg.dialogOpen()
                            });

                            EisDlg.element.on("dialogclose", function () {
                            })

                        }

                    )

                },
                separator: true
            });
            buttons.push({
                title: 'HRDF Subjection',
                cssClass: 'apply-changes-button',
                onClick: e => {
                    confirm(
                        "Do you want to set HRDF Subjection",
                        () => {
                            var HrdfDlg = new HrdfSubjectionDialog()

                            HrdfSubjectionService.List({
                            }, response => {
                                if (response.Entities.length > 0)
                                    HrdfDlg.loadByIdAndOpenDialog(response.Entities[0].Id)

                                else
                                    HrdfDlg.dialogOpen()
                            });


                            HrdfDlg.element.on("dialogclose", function () {
                            })
                        }

                    )

                },
                separator: true
            });
            buttons.push({
                title: 'PCB Subjection',
                cssClass: 'apply-changes-button',
                onClick: e => {
                    confirm(
                        "Do you want to set PCB Subjection",
                        () => {
                            var PcbDlg = new PcbSubjectionDialog()

                            PcbSubjectionService.List({
                            }, response => {
                                if (response.Entities.length > 0)
                                    PcbDlg.loadByIdAndOpenDialog(response.Entities[0].Id)

                                else
                                    PcbDlg.dialogOpen()
                            });

                            PcbDlg.element.on("dialogclose", function () {
                            })

                        }

                    )

                },
                separator: true
            });
            buttons.push({
                title: 'Socso Subjection',
                cssClass: 'apply-changes-button',
                onClick: e => {
                    confirm(
                        "Do you want to set Socso Subjection",
                        () => {
                            var SocsoDlg = new SocsoSubjectionDialog()

                            SocsoSubjectionService.List({
                            }, response => {
                                if (response.Entities.length > 0)
                                    SocsoDlg.loadByIdAndOpenDialog(response.Entities[0].Id)

                                else
                                    SocsoDlg.dialogOpen()
                            });
                            SocsoDlg.element.on("dialogclose", function () {
                            })


                        }

                    )

                },
                separator: true
            });
        }
        return buttons;
    }



    protected onClick(e: JQueryEventObject, row: number, cell: number) {
        super.onClick(e, row, cell);
        if (e.isDefaultPrevented())
            return;

        // get reference to current item
        var item = this.itemAt(row);
        // get reference to clicked element
        var target = $(e.target);
        if (target.parent().hasClass('inline-action'))
            target = target.parent();



        if (target.hasClass('download-payroll')) {
            confirm("Do you want to download Payroll?", () => {

                var PayrollId = item.Id;
                var DateBuffer = item.PayDate;
                var date = new Date(DateBuffer);

                var MonthString = date.toLocaleString('en-US', { month: 'long' });
                var YearString = date.getFullYear().toString();

                var EmployeeRowId = item.EmployeeRowId
                EmployeeProfileService.Retrieve({
                    EntityId: EmployeeRowId
                }, response => {
                    var Name = response.Entity.EmployeeName.replace(/\s/g, '');

                    var queryString = "PayrollRowId=" + encodeURIComponent(PayrollId)
                    var url = window.location.origin + '/PayrollSettings/Payroll/PdfSharpConvert?' + queryString
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.responseType = 'blob';
                    xhr.onload = function () {
                        if (xhr.status === 200)
                        {
                            var blob = xhr.response;

                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.style.display = 'none';
                            a.href = url;
                            a.download = Name + "Payslip" + MonthString+ YearString+ '.pdf';
                            a.click();
                          

                            notifySuccess("Payslip downloaded")
                        } else {
                            notifyError('Error encounter when downloading Payslip Pdf');
                        }
                    };
                    xhr.send() 



                });
                

            });
        }




    }

    protected createToolbarExtensions() { //creates the selector
        super.createToolbarExtensions();
        this.rowSelection = new GridRowSelectionMixin(this, {
            selectable: (item: PayrollRow) => {
                console.log(item)
                return true;
            }
        });


    }
    
    protected getColumns() {

        var columns = super.getColumns();
        columns.splice(2, 0, {
            field: 'Download Payroll',
            name: '',
            format: ctx => {

                var DownloadPayroll = '<a class="inline-action download-payroll" title="Download Payroll pdf">' +
                    '<i class="fa fa-download text-yellow"></i></a>';
                return DownloadPayroll


            },
            width: 12,
            minWidth: 12,
            maxWidth: 12
        });
        columns.splice(0, 0, {
            name: '',
            field: '',

            cssClass : 'select-row-checkbox',
            format: (ctx) => {
                return `<input type="checkbox" class="select-row-checkbox" data-id="${ctx.item.Id}" />`;
            },
            width: 40
        });
        //console.log(this.rowSelection.getSelectedKeys());

        // Add a checkbox column for multi-selection
        return columns;
    }

}