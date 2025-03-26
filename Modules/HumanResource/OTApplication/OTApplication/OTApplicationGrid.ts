import { Criteria, Decorators, EntityGrid, IntegerEditor, ListResponse, LookupEditor, QuickFilter, Select2Editor, StringEditor, Widget, RetrieveResponse, GridRowSelectionMixin } from '@serenity-is/corelib';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { OTApplicationColumns, OTApplicationRow, OTApplicationService, OTApplicationStatus } from '../../../ServerTypes/OTApplication';
import { OTApplicationDialog } from './OTApplicationDialog';
import { OccupationService } from '../../../ServerTypes/OrganisationHierarchy';
import { JobGradeService } from '../../../ServerTypes/OrganisationHierarchy';
import { DepartmentService } from '../../../ServerTypes/OrganisationHierarchy/DepartmentService';
import { DivisionService } from '../../../ServerTypes/OrganisationHierarchy/DivisionService';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { MasterCostCentreService } from '../../../ServerTypes/Master';
import { serviceCall, Authorization, isEmptyOrNull, getLookup, confirm, alertDialog, notifyInfo } from '@serenity-is/corelib/q';
import { OrganisationChartService } from '../../../ServerTypes/OrganisationChart';
import { OTApplicationRejectDialog } from './OTApplicationRejectDialog';

@Decorators.registerClass('HRMSoftware.OTApplication.OTApplicationGrid')
export class OTApplicationGrid extends EntityGrid<OTApplicationRow, any> {
    protected getColumnsKey() { return OTApplicationColumns.columnsKey; }
    protected getDialogType() { return OTApplicationDialog; }
    protected getRowDefinition() { return OTApplicationRow; }
    protected getService() { return OTApplicationService.baseUrl; }

    protected createEntityDialog(itemType: string, callback: (dlg: OTApplicationDialog) => void): OTApplicationDialog {
        let dialog = super.createEntityDialog(itemType, callback) as OTApplicationDialog;
        var self = this
        // Attach 'dialogclose' event listener to refresh the grid when the dialog closes
        dialog.element.on('dialogclose', () => {
            self.internalRefresh();  // Refresh grid after closing the dialog
            console.log('hahaa')
        });

        return dialog;  // Ensure correct return type
    }

    
    protected getQuickFilters(): QuickFilter<Widget<any>, any>[] {
        //Gets the Filters defined in the Columns or in parent grids.
        let filters = super.getQuickFilters();

        // console.log(filters[3].type = Select2Editor)

            filters.push({
                cssClass: "hidden-xs",
                field: OTApplicationRow.Fields.OccupationName,
                type: Select2Editor,
                title: "Occupation",

            });
            filters.push({
                cssClass: "hidden-xs",
                field: OTApplicationRow.Fields.JobGradeName,
                type: Select2Editor,
                title: "Job Grade",
               
            });
            filters.push({
                cssClass: "hidden-xs",
                field: OTApplicationRow.Fields.DivisionName,
                type: Select2Editor,
                title: "Division",

            });

            filters.push({
                cssClass: "hidden-xs",
                field: OTApplicationRow.Fields.DepartmentName,
                type: Select2Editor,
                title: "Department",

            });

            filters.push({
                cssClass: "hidden-xs",
                field: OTApplicationRow.Fields.EmployeeName,
                type: Select2Editor,
                title: "Name",
            });
            filters.push({
                cssClass: "hidden-xs",
                field: OTApplicationRow.Fields.EmployeeID,
                type: Select2Editor,
                title: "Employee ID",
            });
            filters.push({
                cssClass: "hidden-xs",
                field: OTApplicationRow.Fields.CostCentreName,
                type: Select2Editor,
                title: "Cost Centre",
            });
            filters.reverse()
        
        return filters;
    }
    protected createQuickFilters(): void {
        // let base class to create quick filters first
        super.createQuickFilters();

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

            OccupationService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, OTApplicationRow.Fields.OccupationName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            JobGradeService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, OTApplicationRow.Fields.JobGradeName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            DepartmentService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, OTApplicationRow.Fields.DepartmentName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            DivisionService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, OTApplicationRow.Fields.DivisionName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

            })
            EmployeeProfileService.List({
            }, response => {
                for (var index in response.Entities) {
                    this.findQuickFilter(Select2Editor, OTApplicationRow.Fields.EmployeeName).items.push({ id: (response.Entities[index].EmployeeName).toString(), text: (response.Entities[index].EmployeeName).toString(), })
                    this.findQuickFilter(Select2Editor, OTApplicationRow.Fields.EmployeeID).items.push({ id: (response.Entities[index].EmployeeID).toString(), text: (response.Entities[index].EmployeeID).toString(), })

                }
            })
            MasterCostCentreService.List({
            }, response => {
                for (var index in response.Entities) {
                    this.findQuickFilter(Select2Editor, OTApplicationRow.Fields.CostCentreName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

                }
            })

        

    }

    constructor(container: JQuery) {
        super(container);
 
    }
    protected getAddButtonCaption() {
        return "Apply Over Time Claiming";
    }
    protected getButtons() {
        var buttons = super.getButtons();
        var self = this

        buttons.push({
            title: 'OT Application Claim Batch Approve',
            cssClass: 'fas fa-hat-wizard text-bg-success approveButton hidden',
            onClick: e => {
                if (self.rowSelection.getSelectedAsInt64().length == 0) {
                    alertDialog('Please select at least one application to approve')
                    return
                }

                confirm(
                    "Do you want to approve all selected applications?",
                    async () => {
                        let selectedIds = self.rowSelection.getSelectedAsInt64();

                        for (const dataId of selectedIds) {
                            try {
                                let response = await OTApplicationService.Retrieve({ EntityId: dataId });
                                let EmployeeApproval = response.Entity.EmployeeStatus;
                                let HrApproval = response.Entity.HrStatus;
                                let entityId = response.Entity.Id;
                                let EmployeeRowId = response.Entity.EmployeeRowId;
                                let updateData: OTApplicationRow = {};
                                /*
                                let SuperiorPermission = await new Promise((resolve, reject) => {
                                    serviceCall<RetrieveResponse<any>>({
                                        service: OrganisationChartService.baseUrl + '/PermissionToAcknowledge',
                                        data: {
                                            'UserEmployeeRowID': Authorization.userDefinition.EmployeeRowID,
                                            'ApplicantEmployeeRowID': EmployeeRowId
                                        },
                                        method: "GET",
                                        onSuccess: resolve,
                                        onError: reject
                                    });
                                });
                                */
                                let SuperiorPermission = self.SuperiorOfEmployeeRowIdList.includes(EmployeeRowId)
                                
                                if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]) { // HR
                                    if (SuperiorPermission == true) {
                                        if (EmployeeApproval === OTApplicationStatus.NotNeeded || HrApproval === OTApplicationStatus.NotNeeded) {
                                            if (EmployeeApproval === OTApplicationStatus.NotNeeded) {
                                                updateData = {
                                                    HrStatus: OTApplicationStatus.Approved,
                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                };
                                            } else if (HrApproval === OTApplicationStatus.NotNeeded) {
                                                updateData = {
                                                    EmployeeStatus: OTApplicationStatus.Approved,
                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                };
                                            }
                                        } else {
                                            if (HrApproval === OTApplicationStatus.Approved) {
                                                updateData = {
                                                    EmployeeStatus: OTApplicationStatus.Approved,
                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                };
                                            } else if (EmployeeApproval === OTApplicationStatus.Approved) {
                                                updateData = {
                                                    HrStatus: OTApplicationStatus.Approved,
                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                };
                                            } else {
                                                updateData = {
                                                    EmployeeStatus: OTApplicationStatus.Approved,
                                                    HrStatus: OTApplicationStatus.Approved,
                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID
                                                };
                                            }
                                        }
                                    } else {
                                        updateData = {
                                            HrStatus: OTApplicationStatus.Approved,
                                            HrUpdated: Authorization.userDefinition.EmployeeRowID
                                        };
                                    }
                                }
                                else {
                                    updateData = {
                                        EmployeeStatus: OTApplicationStatus.Approved,
                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID
                                    };
                                }

                                await OTApplicationService.Update({ EntityId: entityId, Entity: updateData });

                            } catch (error) {
                                console.error(`Error updating application ${dataId}:`, error);
                            }

                        }

                        Q.notifyInfo(`${selectedIds.length} records have been approved.`)
                        self.internalRefresh(); // Refresh after all updates complete
                    }
                );
            },
            separator: true
        });
        buttons.push({
            title: 'OT Application Batch Reject',
            cssClass: 'fas fa-hat-wizard text-bg-danger rejectButton hidden',
            onClick: e => {
                if (self.rowSelection.getSelectedAsInt64().length == 0) {
                    alertDialog('Please select at least one application to reject')
                    return
                }
                confirm(
                    "Do you want to reject all selected applications?",
                    async () => {

                        var rejectDlg = new OTApplicationRejectDialog()
                        rejectDlg.dialogOpen()
                        rejectDlg.element.on('dialogclose', async () => {
                            let selectedIds = self.rowSelection.getSelectedAsInt64();
                            var rejectReason = window["rejectReason"]

                            for (const dataId of selectedIds) {
                                try {
                                    let response = await OTApplicationService.Retrieve({ EntityId: dataId });
                                    let EmployeeApproval = response.Entity.EmployeeStatus;
                                    let HrApproval = response.Entity.HrStatus;
                                    let entityId = response.Entity.Id;
                                    let EmployeeRowId = response.Entity.EmployeeRowId;
                                    let updateData: OTApplicationRow = {};

                                    let SuperiorPermission = await new Promise((resolve, reject) => {
                                        serviceCall<RetrieveResponse<any>>({
                                            service: OrganisationChartService.baseUrl + '/PermissionToAcknowledge',
                                            data: {
                                                'UserEmployeeRowID': Authorization.userDefinition.EmployeeRowID,
                                                'ApplicantEmployeeRowID': EmployeeRowId
                                            },
                                            method: "GET",
                                            onSuccess: resolve,
                                            onError: reject
                                        });
                                    });

                                    if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]) { // is HR
                                        if (SuperiorPermission == true) {
                                            if (EmployeeApproval == OTApplicationStatus.NotNeeded || HrApproval == OTApplicationStatus.NotNeeded) {
                                                if (EmployeeApproval == OTApplicationStatus.NotNeeded) {
                                                    updateData = {
                                                        HrStatus: OTApplicationStatus.Rejected,
                                                        HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        HrRejectReason: rejectReason
                                                    };
                                                }
                                                else if (HrApproval == OTApplicationStatus.NotNeeded) {
                                                    updateData = {
                                                        EmployeeStatus: OTApplicationStatus.Rejected,
                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        SuperiorRejectReason: rejectReason
                                                    };
                                                }
                                            }
                                            else {
                                                if (HrApproval == OTApplicationStatus.Pending) {
                                                    updateData = {
                                                        HrStatus: OTApplicationStatus.Rejected,
                                                        HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        HrRejectReason: rejectReason

                                                    };
                                                }
                                                else if (EmployeeApproval == OTApplicationStatus.Pending) {
                                                    updateData = {
                                                        EmployeeStatus: OTApplicationStatus.Rejected,
                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        SuperiorRejectReason: rejectReason

                                                    };
                                                }
                                                else {
                                                    updateData = {
                                                        EmployeeStatus: OTApplicationStatus.Rejected,
                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        HrStatus: OTApplicationStatus.Rejected,
                                                        HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        SuperiorRejectReason: rejectReason,
                                                        HrRejectReason: rejectReason

                                                    };
                                                }
                                            }
                                        }
                                        else {
                                            updateData = {
                                                HrStatus: OTApplicationStatus.Rejected,
                                                HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                HrRejectReason: rejectReason
                                            };
                                        }

                                    }
                                    else {
                                        updateData = {
                                            EmployeeStatus: OTApplicationStatus.Rejected,
                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                            SuperiorRejectReason: rejectReason
                                        };
                                    }

                                    await OTApplicationService.Update({ EntityId: entityId, Entity: updateData });
                                }
                                catch (error) {
                                    console.error(`Error updating application ${dataId}:`, error);
                                }
                            }
                            notifyInfo(`${selectedIds.length} records have been rejected.`)
                            self.internalRefresh(); // Refresh after all updates complete
                        })

                    })
            }
        })
        /*
        buttons.push({
            title: 'OT Application Claim Batch Approve',
            cssClass: 'fas fa-hat-wizard text-bg-success approveButton',
            onClick: e => {
                if (self.rowSelection.getSelectedAsInt64().length == 0) {
                    alertDialog('Please select at least one application to approve')
                    return
                }
                confirm(
                    "Do you want to approve all selected applications?",
                    () => {
                        let selectedIds = self.rowSelection.getSelectedAsInt64();
                        let approvePromises = self.rowSelection.getSelectedAsInt64().map(dataId => {
                            return OTApplicationService.Retrieve({ EntityId: dataId })
                                .then(response => {
                                    let EmployeeApproval = response.Entity.EmployeeStatus;
                                    let HrApproval = response.Entity.HrStatus;
                                    let entityId = response.Entity.Id;
                                    let EmployeeRowId = response.Entity.EmployeeRowId;
                                    let updateData: OTApplicationRow = {};

                                    // Wrap `serviceCall` in a Promise
                                    return new Promise((resolve, reject) => {
                                        serviceCall<RetrieveResponse<any>>({
                                            service: OrganisationChartService.baseUrl + '/PermissionToAcknowledge',
                                            data: {
                                                'UserEmployeeRowID': Authorization.userDefinition.EmployeeRowID,
                                                'ApplicantEmployeeRowID': EmployeeRowId
                                            },
                                            method: "GET",
                                            onSuccess: (SuperiorPermission) => {
                                                if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]) { // HR
                                                    if (SuperiorPermission == true) {
                                                        if (EmployeeApproval === OTApplicationStatus.NotNeeded || HrApproval === OTApplicationStatus.NotNeeded) {
                                                            if (EmployeeApproval === OTApplicationStatus.NotNeeded) {
                                                                updateData = {
                                                                    HrStatus: OTApplicationStatus.Approved,
                                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                };
                                                            } else if (HrApproval === OTApplicationStatus.NotNeeded) {
                                                                updateData = {
                                                                    EmployeeStatus: OTApplicationStatus.Approved,
                                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                };
                                                            }
                                                        } else {
                                                            if (HrApproval === OTApplicationStatus.Approved) {
                                                                updateData = {
                                                                    EmployeeStatus: OTApplicationStatus.Approved,
                                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                };
                                                            } else if (EmployeeApproval === OTApplicationStatus.Approved) {
                                                                updateData = {
                                                                    HrStatus: OTApplicationStatus.Approved,
                                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                };
                                                            } else {
                                                                updateData = {
                                                                    EmployeeStatus: OTApplicationStatus.Approved,
                                                                    HrStatus: OTApplicationStatus.Approved,
                                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID
                                                                };
                                                            }
                                                        }
                                                    } else {
                                                        updateData = {
                                                            HrStatus: OTApplicationStatus.Approved,
                                                            HrUpdated: Authorization.userDefinition.EmployeeRowID
                                                        };
                                                    }
                                                }
                                                else {
                                                    updateData = {
                                                        EmployeeStatus: OTApplicationStatus.Approved,
                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID
                                                    };
                                                }

                                                // Call `Update` and resolve the promise
                                                OTApplicationService.Update({
                                                    EntityId: entityId,
                                                    Entity: updateData
                                                }).then(resolve).catch(reject);
                                            },
                                            onError: reject
                                        });
                                    });
                                });
                        });

                        // Wait for all operations to complete before refreshing
                        Promise.all(approvePromises)
                            .then(() => {
                                notifyInfo(`${selectedIds.length} records have been approved.`)

                                self.internalRefresh();
                            })
                            .catch(error => {
                                console.error('Error in update operations:', error);
                            });
                    }
                )
            },
            separator: true
        });

        buttons.push({
            title: 'OT Application Batch Reject',
            cssClass: 'fas fa-hat-wizard text-bg-danger rejectButton',
            onClick: e => {
                if (self.rowSelection.getSelectedAsInt64().length == 0) {
                    alertDialog('Please select at least one application to reject')
                    return
                }
                confirm(
                    "Do you want to reject all selected applications?",
                    () => {
                        var rejectDlg = new OTApplicationRejectDialog()
                        rejectDlg.dialogOpen()
                        rejectDlg.element.on('dialogclose', () => {
                            let selectedIds = self.rowSelection.getSelectedAsInt64();
                            var rejectReason = window["rejectReason"]
                            // Create an array of promises for each delete operation
                            let rejectPromises = self.rowSelection.getSelectedAsInt64().map(dataId => {

                                return OTApplicationService.Retrieve({
                                    EntityId: dataId
                                }).then(response => {
                                    let EmployeeApproval = response.Entity.EmployeeStatus;
                                    let HrApproval = response.Entity.HrStatus;
                                    let entityId = response.Entity.Id;
                                    let updateData: OTApplicationRow = {};
                                    let EmployeeRowId = response.Entity.EmployeeRowId
                                    return new Promise((resolve, reject) => {
                                        serviceCall<RetrieveResponse<any>>({
                                            service: OrganisationChartService.baseUrl + '/PermissionToAcknowledge',
                                            data: {
                                                'UserEmployeeRowID': Authorization.userDefinition.EmployeeRowID,
                                                'ApplicantEmployeeRowID': EmployeeRowId
                                            },
                                            method: "GET",
                                            async: false,
                                            onSuccess: (response) => {
                                                console.log(response)
                                                var SuperiorPermission = response
                                                if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]) { // is HR
                                                    if (SuperiorPermission == true) {
                                                        if (EmployeeApproval == OTApplicationStatus.NotNeeded || HrApproval == OTApplicationStatus.NotNeeded) {
                                                            if (EmployeeApproval == OTApplicationStatus.NotNeeded) {
                                                                updateData = {
                                                                    HrStatus: OTApplicationStatus.Rejected,
                                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    HrRejectReason: rejectReason
                                                                };
                                                            }
                                                            else if (HrApproval == OTApplicationStatus.NotNeeded) {
                                                                updateData = {
                                                                    EmployeeStatus: OTApplicationStatus.Rejected,
                                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    SuperiorRejectReason: rejectReason
                                                                };
                                                            }
                                                        }
                                                        else {
                                                            if (HrApproval == OTApplicationStatus.Pending) {
                                                                updateData = {
                                                                    HrStatus: OTApplicationStatus.Rejected,
                                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    HrRejectReason: rejectReason

                                                                };
                                                            }
                                                            else if (EmployeeApproval == OTApplicationStatus.Pending) {
                                                                updateData = {
                                                                    EmployeeStatus: OTApplicationStatus.Rejected,
                                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    SuperiorRejectReason: rejectReason

                                                                };
                                                            }
                                                            else {
                                                                updateData = {
                                                                    EmployeeStatus: OTApplicationStatus.Rejected,
                                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    HrStatus: OTApplicationStatus.Rejected,
                                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    SuperiorRejectReason: rejectReason,
                                                                    HrRejectReason: rejectReason

                                                                };
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        updateData = {
                                                            HrStatus: OTApplicationStatus.Rejected,
                                                            HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                            HrRejectReason: rejectReason
                                                        };
                                                    }

                                                }
                                                else {
                                                    updateData = {
                                                        EmployeeStatus: OTApplicationStatus.Rejected,
                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        SuperiorRejectReason: rejectReason
                                                    };
                                                }

                                                OTApplicationService.Update({
                                                    EntityId: entityId,
                                                    Entity: updateData
                                                }).then(resolve).catch(reject);

                                            }
                                        })
                                    });
                                });
                            }); // Convert jQuery object to array

                            // Wait for all operations to complete before refreshing
                            Promise.all(rejectPromises)
                                .then(() => {
                                    notifyInfo(`${selectedIds.length} records have been rejected.`)
                                    self.internalRefresh();
                                })
                                .catch(error => {
                                    console.error('Error in update operations:', error);
                                });
                        })



                    }
                )
            },
            separator: true
        });
        */
        return buttons;
    }
    public rowSelection: GridRowSelectionMixin;
    protected onViewSubmit(): boolean {
        this.slickGrid.onHeaderCellRendered.subscribe((e, args) => {
            if (args.column.id === "SelectAll") {
                $(args.node).empty().append(`<input type='checkbox' id='selectAll'/>`);
            }
        });
     
        /*
        this.slickGrid.onSelectedRowsChanged.subscribe((haha) => {
            let selectedRows = self.rowSelection.getSelectedAsInt64();
            console.log(self.slickGrid.getSelectedRows())
            console.log(haha)
            // Highlight selected rows
            self.slickGrid.getCanvasNode().querySelectorAll('.slick-row').forEach(row => {
                row.classList.remove('selected-row');
            });

            selectedRows.forEach(row => {
                console.log(row)
                // let rowIndex = this.view.getItemIndex(row);
                //  let rowNode = this.slickGrid.getCellNode(rowIndex, 0);
                // if (rowNode) rowNode.closest('.slick-row')?.classList.add('selected-row');
            });

        });
        */
        // Ensure checkbox selects/deselects all rows
        $(document).on('change', '#selectAll', function () {
            let checked = $(this).prop('checked');
            $('.row-checkbox').prop('checked', checked);
        });

        return super.onViewSubmit();
    }
    public SuperiorOfEmployeeRowIdList: number[] = [];
    protected createToolbarExtensions() {
        super.createToolbarExtensions();
        var self = this
        /*
        this.rowSelection = new GridRowSelectionMixin(this, {
            // demo code
            selectable: (item: OTApplicationRow) => {
                if (item.EmployeeRowId == Authorization.userDefinition.EmployeeRowID
                    || (item.Status != OTApplicationStatus.Pending))
                    return
                var getResponse = 0
                var superior=1
               
                const isHr = Authorization.hasPermission(PermissionKeys.HumanResources)
                if (item.Status == OTApplicationStatus.Pending) {
                    if ((item.EmployeeStatus == OTApplicationStatus.NotNeeded)
                        || (isHr && item.HrStatus == OTApplicationStatus.NotNeeded))
                        return

                    else if ((isHr && item.HrStatus == OTApplicationStatus.Pending)
                        || (item.EmployeeStatus == OTApplicationStatus.Pending)) //is superior
                    {
                        $('.approveButton, .rejectButton').removeClass("hidden")

//                        $('.approveButton, .rejectButton').show()
                        return true;

                    }
                }
            }
        });
        */
        let employeeRowNumber = new Promise<number[]>((resolve, reject) => {
            serviceCall<RetrieveResponse<number[]>>({
                service: OrganisationChartService.baseUrl + '/GetEmployeeUserCanView',
                data: {
                    'EmployeeRowID': Authorization.userDefinition.EmployeeRowID,
                    'PermissionKey': PermissionKeys.MoneyClaiming
                },
                method: "GET",
                onError: (error) => reject(error), // Handle failure properly
                onSuccess: (response) => resolve(response || []),  // Ensure data is resolved
            })
        });
        employeeRowNumber
            .then(response => {
                self.SuperiorOfEmployeeRowIdList = response

                console.log("Received data:", response);
                self.rowSelection = new GridRowSelectionMixin(self, {
                    // demo code
                    selectable: (item: OTApplicationRow) => {
                        var superior = response.includes(item.EmployeeRowId)
                        if (item.EmployeeRowId == Authorization.userDefinition.EmployeeRowID
                            || (item.Status != OTApplicationStatus.Pending))
                            return
                     
                        const isHr = Authorization.hasPermission(PermissionKeys.HumanResources)
                        if (item.Status == OTApplicationStatus.Pending) {
                            if ((item.EmployeeStatus == OTApplicationStatus.NotNeeded)
                                || (isHr && item.HrStatus == OTApplicationStatus.NotNeeded))
                                return

                            else if ((isHr && item.HrStatus == OTApplicationStatus.Pending)
                                || (superior &&  item.EmployeeStatus == OTApplicationStatus.Pending)) //is superior
                            {
                                $('.approveButton, .rejectButton').removeClass("hidden")
                                //                        $('.approveButton, .rejectButton').show()
                                return true;

                            }
                        }
                    }
                });


            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });


        $(document).on('click', '.select-item.check-box.no-float', function () {
            // Remove highlight from previously highlighted rows
            $('.select-item.check-box.no-float').parent().parent().removeClass('highlighted-row');
            // Add highlight to clicked row
            $('.select-item.check-box.no-float.checked').parent().parent().addClass('highlighted-row');
        });
        // Add CSS for highlighting selected rows
        $('<style>')
            .prop('type', 'text/css')
            .html(`
            .slick-row.highlighted-row {
                background-color: #D3E5FF !important;
            }
        `)
            .appendTo('head');
    }

    protected getColumns() {
        var columns = super.getColumns();
        var index

        if (!Authorization.hasPermission(PermissionKeys.HumanResources)) //if he is not HR guy, hide the employeeID and approved by column
        {
            for (index in columns) {

                if (columns[index].name == OTApplicationRow.Fields.EmployeeID || columns[index].name == OTApplicationRow.Fields.ApprovedBy) {
                    columns.splice(index, 1);
                }

            }
        }
        columns.unshift(GridRowSelectionMixin.createSelectColumn(() => this.rowSelection));

        return columns;

    }
    protected onViewProcessData(response: ListResponse<OTApplicationRow>) {
        response = super.onViewProcessData(response);
        let userDefinition = Authorization.userDefinition
        let userId = userDefinition.EmployeeRowID
        const allSame = response.Entities.every(entity => entity.EmployeeRowId === userId);
        if (allSame) {
            const isHr = Authorization.hasPermission(PermissionKeys.HumanResources)
            if (isHr) {
                $('.approveButton, .rejectButton').removeClass("hidden")
            }
            else {
                $('.approveButton, .rejectButton').addClass("hidden")
            }
        }
        else {
            $('.approveButton, .rejectButton').removeClass("hidden")
        }
        this.toolbar.findButton("column-picker-button").toggle(false);
        return response;

    }

}