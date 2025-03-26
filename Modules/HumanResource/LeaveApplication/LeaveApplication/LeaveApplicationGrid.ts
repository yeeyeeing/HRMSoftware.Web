import { Criteria, Decorators, EntityGrid, GridRowSelectionMixin, IntegerEditor, ListResponse, LookupEditor, QuickFilter, Select2Editor, StringEditor, Widget, RetrieveResponse } from '@serenity-is/corelib';
import { LeaveApplicationColumns, LeaveApplicationRow, LeaveApplicationService, LeaveStatus } from '../../../ServerTypes/LeaveApplication';
import { LeaveApplicationDialog } from './LeaveApplicationDialog';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { OccupationService, JobGradeService, DepartmentService, DivisionService } from '../../../ServerTypes/OrganisationHierarchy';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { MasterCostCentreRow, MasterCostCentreService } from '../../../ServerTypes/Master';
import { MasterCp8dRow, MasterCp8dService } from '../../../ServerTypes/Master';

import { serviceCall, Authorization, isEmptyOrNull, getLookup, confirm, alertDialog, notifyInfo } from '@serenity-is/corelib/q';
import { OrganisationChartService } from '../../../ServerTypes/OrganisationChart';
import {  LeaveApplicationRejectDialog } from './LeaveApplicationRejectDialog';

@Decorators.registerClass('HRMSoftware.LeaveApplication.LeaveApplicationGrid')
export class LeaveApplicationGrid extends EntityGrid<LeaveApplicationRow, any> {
    protected getColumnsKey() { return LeaveApplicationColumns.columnsKey; }
    protected getDialogType() { return LeaveApplicationDialog; }
    protected getRowDefinition() { return LeaveApplicationRow; }
    protected getService() { return LeaveApplicationService.baseUrl; }
    protected getAddButtonCaption() {
        return "Apply Leave";
    }
    protected getButtons() {
        var buttons = super.getButtons();
        var self = this
        buttons.push({
            title: 'Leave Application Claim Batch Approve',
            cssClass: 'fas fa-hat-wizard text-bg-success approveButton hidden',
            onClick: e => {
                confirm(
                    "Do you want to approve all selected applications?",
                    async () => {
                        if (self.rowSelection.getSelectedAsInt64().length == 0) {
                            alertDialog('Please select at least one application to approve')
                            return
                        }

                        let selectedIds = self.rowSelection.getSelectedAsInt64();

                        for (const dataId of selectedIds) {
                            try {
                                let response = await LeaveApplicationService.Retrieve({ EntityId: dataId });
                                let EmployeeApproval = response.Entity.EmployeeStatus;
                                let HrApproval = response.Entity.HrStatus;
                                let entityId = response.Entity.Id;
                                let EmployeeRowId = response.Entity.EmployeeRowId;
                                let updateData: LeaveApplicationRow = {};
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
                                        if (EmployeeApproval === LeaveStatus.NotNeeded || HrApproval === LeaveStatus.NotNeeded) {
                                            if (EmployeeApproval === LeaveStatus.NotNeeded) {
                                                updateData = {
                                                    HrStatus: LeaveStatus.Approved,
                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                };
                                            } else if (HrApproval === LeaveStatus.NotNeeded) {
                                                updateData = {
                                                    EmployeeStatus: LeaveStatus.Approved,
                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                };
                                            }
                                        } else {
                                            if (HrApproval === LeaveStatus.Approved) {
                                                updateData = {
                                                    EmployeeStatus: LeaveStatus.Approved,
                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                };
                                            } else if (EmployeeApproval === LeaveStatus.Approved) {
                                                updateData = {
                                                    HrStatus: LeaveStatus.Approved,
                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                };
                                            } else {
                                                updateData = {
                                                    EmployeeStatus: LeaveStatus.Approved,
                                                    HrStatus: LeaveStatus.Approved,
                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID
                                                };
                                            }
                                        }
                                    }
                                    else {
                                        updateData = {
                                            HrStatus: LeaveStatus.Approved,
                                            HrUpdated: Authorization.userDefinition.EmployeeRowID
                                        };
                                    }
                                } else {
                                    updateData = {
                                        EmployeeStatus: LeaveStatus.Approved,
                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID
                                    };
                                }

                                await LeaveApplicationService.Update({ EntityId: entityId, Entity: updateData });

                            } catch (error) {
                                console.error(`Error updating application ${dataId}:`, error);
                            }

                        }

                        notifyInfo(`${selectedIds.length} records have been approved.`)
                        self.internalRefresh(); // Refresh after all updates complete
                    }
                );
            },
            separator: true
        });

        buttons.push({
            title: 'Leave Application Batch Reject',
            cssClass: 'fas fa-hat-wizard text-bg-danger rejectButton hidden',
            onClick: e => {
                if (self.rowSelection.getSelectedAsInt64().length == 0) {
                    alertDialog('Please select at least one application to reject')
                    return
                }
                confirm(
                    "Do you want to reject all selected applications?",
                    async () => {

                        let selectedIds = self.rowSelection.getSelectedAsInt64();
                        var rejectDlg = new LeaveApplicationRejectDialog()
                        rejectDlg.dialogOpen()
                        rejectDlg.element.on('dialogclose', async () => {
                            var rejectReason = window["rejectReason"]

                            for (const dataId of selectedIds) {
                                try {
                                    let response = await LeaveApplicationService.Retrieve({ EntityId: dataId });
                                    let EmployeeApproval = response.Entity.EmployeeStatus;
                                    let HrApproval = response.Entity.HrStatus;
                                    let entityId = response.Entity.Id;
                                    let EmployeeRowId = response.Entity.EmployeeRowId;
                                    let updateData: LeaveApplicationRow = {};

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
                                    if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources] == true) { // is HR
                                        if (SuperiorPermission == true) {
                                            if (EmployeeApproval == LeaveStatus.NotNeeded || HrApproval == LeaveStatus.NotNeeded) {
                                                if (EmployeeApproval == LeaveStatus.NotNeeded) {
                                                    updateData = {
                                                        HrStatus: LeaveStatus.Rejected,
                                                        HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        HrRejectReason: rejectReason
                                                    };
                                                }
                                                else if (HrApproval == LeaveStatus.NotNeeded) {
                                                    updateData = {
                                                        EmployeeStatus: LeaveStatus.Rejected,
                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        SuperiorRejectReason: rejectReason

                                                    };
                                                }
                                            }
                                            else {
                                                if (HrApproval == LeaveStatus.Pending) {
                                                    updateData = {
                                                        HrStatus: LeaveStatus.Rejected,
                                                        HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        HrRejectReason: rejectReason
                                                    };
                                                }
                                                else if (EmployeeApproval == LeaveStatus.Pending) {
                                                    updateData = {
                                                        EmployeeStatus: LeaveStatus.Rejected,
                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        SuperiorRejectReason: rejectReason
                                                    };
                                                }
                                                else {
                                                    updateData = {
                                                        EmployeeStatus: LeaveStatus.Rejected,
                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        HrStatus: LeaveStatus.Rejected,
                                                        HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        HrRejectReason: rejectReason,
                                                        SuperiorRejectReason: rejectReason

                                                    };
                                                }
                                            }
                                        }
                                        else {
                                            updateData = {
                                                HrStatus: LeaveStatus.Rejected,
                                                HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                HrRejectReason: rejectReason,

                                            };
                                        }

                                    }
                                    else {
                                        updateData = {
                                            EmployeeStatus: LeaveStatus.Rejected,
                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                            SuperiorRejectReason: rejectReason
                                        };
                                    }

                                    await LeaveApplicationService.Update({ EntityId: entityId, Entity: updateData });
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
        });
        /*
        buttons.push({
            title: 'Leave Application Batch Approve',
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
                            return LeaveApplicationService.Retrieve({ EntityId: dataId })
                                .then(response => {
                                    let EmployeeApproval = response.Entity.EmployeeStatus;
                                    let HrApproval = response.Entity.HrStatus;
                                    let entityId = response.Entity.Id;
                                    let EmployeeRowId = response.Entity.EmployeeRowId;
                                    let updateData: LeaveApplicationRow = {};
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
                                                    if (SuperiorPermission==true) {
                                                        if (EmployeeApproval === LeaveStatus.NotNeeded || HrApproval === LeaveStatus.NotNeeded) {
                                                            if (EmployeeApproval === LeaveStatus.NotNeeded) {
                                                                updateData = {
                                                                    HrStatus: LeaveStatus.Approved,
                                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                };
                                                            } else if (HrApproval === LeaveStatus.NotNeeded) {
                                                                updateData = {
                                                                    EmployeeStatus: LeaveStatus.Approved,
                                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                };
                                                            }
                                                        } else {
                                                            if (HrApproval === LeaveStatus.Approved) {
                                                                updateData = {
                                                                    EmployeeStatus: LeaveStatus.Approved,
                                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                };
                                                            } else if (EmployeeApproval === LeaveStatus.Approved) {
                                                                updateData = {
                                                                    HrStatus: LeaveStatus.Approved,
                                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                };
                                                            } else {
                                                                updateData = {
                                                                    EmployeeStatus: LeaveStatus.Approved,
                                                                    HrStatus: LeaveStatus.Approved,
                                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID
                                                                };
                                                            }
                                                        }
                                                    } else {
                                                        updateData = {
                                                            HrStatus: LeaveStatus.Approved,
                                                            HrUpdated: Authorization.userDefinition.EmployeeRowID
                                                        };
                                                    }
                                                } else {
                                                    updateData = {
                                                        EmployeeStatus: LeaveStatus.Approved,
                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID
                                                    };
                                                }

                                                // Call `Update` and resolve the promise
                                                LeaveApplicationService.Update({
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
            title: 'Leave Application Batch Reject',
            cssClass: 'fas fa-hat-wizard text-bg-danger rejectButton',
            onClick: e => {
                if (self.rowSelection.getSelectedAsInt64().length == 0) {
                    alertDialog('Please select at least one application to reject')
                    return
                }
                confirm(
                    "Do you want to reject all selected applications?",
                    () => {
                        
                        var rejectDlg = new LeaveApplicationRejectDialog()
                        rejectDlg.dialogOpen()
                        rejectDlg.element.on('dialogclose', () => {
                            console.log('haha')
                            console.log(window["rejectReason"])
                            let selectedIds = self.rowSelection.getSelectedAsInt64();
                            var rejectReason = window["rejectReason"]
                            // Create an array of promises for each delete operation
                            let rejectPromises = self.rowSelection.getSelectedAsInt64().map(dataId => {
                                return LeaveApplicationService.Retrieve({ EntityId: dataId })
                                    .then(response => {
                                        let EmployeeApproval = response.Entity.EmployeeStatus;
                                        let HrApproval = response.Entity.HrStatus;
                                        let entityId = response.Entity.Id;
                                        let updateData: LeaveApplicationRow = {};
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
                                                            if (EmployeeApproval == LeaveStatus.NotNeeded || HrApproval == LeaveStatus.NotNeeded) {
                                                                if (EmployeeApproval == LeaveStatus.NotNeeded) {
                                                                    updateData = {
                                                                        HrStatus: LeaveStatus.Rejected,
                                                                        HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                        HrRejectReason: rejectReason
                                                                    };
                                                                }
                                                                else if (HrApproval == LeaveStatus.NotNeeded) {
                                                                    updateData = {
                                                                        EmployeeStatus: LeaveStatus.Rejected,
                                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                        SuperiorRejectReason: rejectReason

                                                                    };
                                                                }
                                                            }
                                                            else {
                                                                if (HrApproval == LeaveStatus.Pending) {
                                                                    updateData = {
                                                                        HrStatus: LeaveStatus.Rejected,
                                                                        HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                        HrRejectReason: rejectReason
                                                                    };
                                                                }
                                                                else if (EmployeeApproval == LeaveStatus.Pending) {
                                                                    updateData = {
                                                                        EmployeeStatus: LeaveStatus.Rejected,
                                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                        SuperiorRejectReason: rejectReason
                                                                    };
                                                                }
                                                                else {
                                                                    updateData = {
                                                                        EmployeeStatus: LeaveStatus.Rejected,
                                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                        HrStatus: LeaveStatus.Rejected,
                                                                        HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                        HrRejectReason: rejectReason,
                                                                        SuperiorRejectReason: rejectReason

                                                                    };
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            updateData = {
                                                                HrStatus: LeaveStatus.Rejected,
                                                                HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                HrRejectReason: rejectReason,

                                                            };
                                                        }

                                                    }
                                                    else {
                                                        updateData = {
                                                            EmployeeStatus: LeaveStatus.Rejected,
                                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                            SuperiorRejectReason: rejectReason
                                                        };
                                                    }


                                                    // Call `Update` and resolve the promise
                                                    LeaveApplicationService.Update({
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
                        });
                       

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
        if (!super.onViewSubmit()) return false;

        var self = this
        this.slickGrid.onHeaderCellRendered.subscribe((e, args) => {
            if (args.column.id === "SelectAll") {
                $(args.node).empty().append(`<input type='checkbox' id='selectAll'/>`);
            }
        });
        

        // Ensure checkbox selects/deselects all rows
        $(document).on('change', '#selectAll', function () {
            let checked = $(this).prop('checked');
            $('.row-checkbox').prop('checked', checked);
        });

        return true;
    }
    

    protected getQuickFilters(): QuickFilter<Widget<any>, any>[] {
        //Gets the Filters defined in the Columns or in parent grids.
        let filters = super.getQuickFilters();

        // console.log(filters[3].type = Select2Editor)

            filters.push({
                cssClass: "hidden-xs",
                field: LeaveApplicationRow.Fields.OccupationName,
                type: Select2Editor,
                title: "Occupation",

            });
            filters.push({
                cssClass: "hidden-xs",
                field: LeaveApplicationRow.Fields.JobGradeName,
                type: Select2Editor,
                title: "Job Grade",

            });
            filters.push({
                cssClass: "hidden-xs",
                field: LeaveApplicationRow.Fields.DivisionName,
                type: Select2Editor,
                title: "Division",

            });

            filters.push({
                cssClass: "hidden-xs",
                field: LeaveApplicationRow.Fields.DepartmentName,
                type: Select2Editor,
                title: "Department",

            });

            filters.push({
                cssClass: "hidden-xs",
                field: LeaveApplicationRow.Fields.EmployeeName,
                type: Select2Editor,
                title: "Name",
            });
            filters.push({
                cssClass: "hidden-xs",
                field: LeaveApplicationRow.Fields.EmployeeID,
                type: Select2Editor,
                
                title: "Employee ID",
            });

            filters.push({
                cssClass: "hidden-xs",
                field: LeaveApplicationRow.Fields.CostCentreName,
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
                    this.findQuickFilter(Select2Editor, LeaveApplicationRow.Fields.OccupationName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            JobGradeService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, LeaveApplicationRow.Fields.JobGradeName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            DepartmentService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, LeaveApplicationRow.Fields.DepartmentName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            DivisionService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, LeaveApplicationRow.Fields.DivisionName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

            })
            EmployeeProfileService.List({
            }, response => {
                for (var index in response.Entities) {
                    this.findQuickFilter(Select2Editor, LeaveApplicationRow.Fields.EmployeeName).items.push({ id: (response.Entities[index].EmployeeName).toString(), text: (response.Entities[index].EmployeeName).toString(), })
                    this.findQuickFilter(Select2Editor, LeaveApplicationRow.Fields.EmployeeID).items.push({ id: (response.Entities[index].EmployeeID).toString(), text: (response.Entities[index].EmployeeID).toString(), })

                }
            })
            MasterCostCentreService.List({
            }, response => {
                for (var index in response.Entities) {
                    this.findQuickFilter(Select2Editor, LeaveApplicationRow.Fields.CostCentreName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

                }
            })



        

    }

    public SuperiorOfEmployeeRowIdList: Promise<number[]> = [];

    constructor(container: JQuery) {
        super(container);
    }
    protected createToolbarExtensions() {
        super.createToolbarExtensions();
        var self = this
       
        console.log('haha')

        let employeeRowNumber = new Promise<number[]>((resolve, reject) => {
           serviceCall<RetrieveResponse<any>>({
               service: OrganisationChartService.baseUrl + '/GetEmployeeUserCanView',
               data: {
                   'EmployeeRowID': Authorization.userDefinition.EmployeeRowID,
                   'PermissionKey': PermissionKeys.LeaveApproval
               },
               method: "GET",
               onError: (error) => reject(error), // Handle failure properly
               onSuccess: (response) => {
                   console.log("API Response:", response);
                   resolve(response || []);
               }
           })
        });
       console.log('haha')
        employeeRowNumber
            .then(response => {
                self.SuperiorOfEmployeeRowIdList = employeeRowNumber
                console.log("Received data:", self.SuperiorOfEmployeeRowIdList);

                console.log("Received data:", employeeRowNumber);
            self.rowSelection = new GridRowSelectionMixin(self, {
                // demo code
                selectable: (item: LeaveApplicationRow) => {

                    var superior = response.includes(item.EmployeeRowId)
                    if (item.EmployeeRowId == Authorization.userDefinition.EmployeeRowID
                        || (item.Status != LeaveStatus.Pending))
                        return false;
                   
                    const isHr = Authorization.hasPermission(PermissionKeys.HumanResources)
                    if (item.Status == LeaveStatus.Pending) {
                        if ((item.EmployeeStatus == LeaveStatus.NotNeeded)
                            || (isHr && item.HrStatus == LeaveStatus.NotNeeded))
                            return false;

                        else if ((isHr && item.HrStatus == LeaveStatus.Pending)
                            || (superior && item.EmployeeStatus == LeaveStatus.Pending)) //is superior
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

    protected getColumns()
    {
        var columns = super.getColumns();
        var index
        if (!Authorization.hasPermission(PermissionKeys.HumanResources)) //if he is not HR guy, hide the employeeID and approved by column
        {
            for (index in columns)
            {
                if (columns[index].name == 'Employee Id' || columns[index].name == 'Approved By')
                {
                    columns.splice(index, 1);
                }
            }
        }
        columns.unshift(GridRowSelectionMixin.createSelectColumn(() => this.rowSelection));

        return columns;
    }
  
    protected onViewProcessData(response: ListResponse<LeaveApplicationRow>)
    {
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

    protected createEntityDialog(itemType: string, callback: (dlg: LeaveApplicationDialog) => void): LeaveApplicationDialog {
        let dialog = super.createEntityDialog(itemType, callback) as LeaveApplicationDialog;
        var self = this
        // Attach 'dialogclose' event listener to refresh the grid when the dialog closes
        dialog.element.on('dialogclose', () => {
            self.internalRefresh();  // Refresh grid after closing the dialog
        });

        return dialog;  // Ensure correct return type
    }

}