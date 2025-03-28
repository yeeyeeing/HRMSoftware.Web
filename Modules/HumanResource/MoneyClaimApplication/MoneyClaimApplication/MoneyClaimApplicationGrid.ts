import { Criteria, Decorators, EntityGrid, GridRowSelectionMixin, IntegerEditor, ListResponse, LookupEditor, QuickFilter, Select2Editor, StringEditor, Widget, RetrieveResponse } from '@serenity-is/corelib';
import { MoneyClaimApplicationColumns, MoneyClaimApplicationRow, MoneyClaimApplicationService, MoneyClaimingStatus } from '../../../ServerTypes/MoneyClaimApplication';
import { MoneyClaimApplicationDialog } from './MoneyClaimApplicationDialog';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { OccupationService, JobGradeService, DepartmentService, DivisionService } from '../../../ServerTypes/OrganisationHierarchy';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { MasterCostCentreService } from '../../../ServerTypes/Master';
import { OrganisationChartService } from '../../../ServerTypes/OrganisationChart';
import { serviceCall, Authorization, isEmptyOrNull, getLookup, confirm, alertDialog, notifyInfo } from '@serenity-is/corelib/q';
import { MoneyClaimApplicationRejectDialog } from './MoneyClaimApplicationRejectDialog';

@Decorators.registerClass('HRMSoftware.MoneyClaimApplication.MoneyClaimApplicationGrid')
export class MoneyClaimApplicationGrid extends EntityGrid<MoneyClaimApplicationRow, any> {
    protected getColumnsKey() { return MoneyClaimApplicationColumns.columnsKey; }
    protected getDialogType() { return MoneyClaimApplicationDialog; }
    protected getRowDefinition() { return MoneyClaimApplicationRow; }
    protected getService() { return MoneyClaimApplicationService.baseUrl; }
    protected getQuickFilters(): QuickFilter<Widget<any>, any>[] {
        //Gets the Filters defined in the Columns or in parent grids.
        let filters = super.getQuickFilters();

        // console.log(filters[3].type = Select2Editor)

            filters.push({
                cssClass: "hidden-xs",
                field: MoneyClaimApplicationRow.Fields.OccupationName,
                type: Select2Editor,
                title: "Occupation",

            });
            filters.push({
                cssClass: "hidden-xs",
                field: MoneyClaimApplicationRow.Fields.JobGradeName,
                type: Select2Editor,
                title: "Job Grade",

            });
            filters.push({
                cssClass: "hidden-xs",
                field: MoneyClaimApplicationRow.Fields.DivisionName,
                type: Select2Editor,
                title: "Division",

            });

            filters.push({
                cssClass: "hidden-xs",
                field: MoneyClaimApplicationRow.Fields.DepartmentName,
                type: Select2Editor,
                title: "Department",

            });

            filters.push({
                cssClass: "hidden-xs",
                field: MoneyClaimApplicationRow.Fields.EmployeeName,
                type: Select2Editor,
                title: "Name",
            });
            filters.push({
                cssClass: "hidden-xs",
                field: MoneyClaimApplicationRow.Fields.EmployeeID,
                type: Select2Editor,
                title: "Employee ID",
            });
            filters.push({
                cssClass: "hidden-xs",
                field: MoneyClaimApplicationRow.Fields.CostCentreName,
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
                    this.findQuickFilter(Select2Editor, MoneyClaimApplicationRow.Fields.OccupationName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            JobGradeService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, MoneyClaimApplicationRow.Fields.JobGradeName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            DepartmentService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, MoneyClaimApplicationRow.Fields.DepartmentName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            DivisionService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, MoneyClaimApplicationRow.Fields.DivisionName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

            })
            EmployeeProfileService.List({
            }, response => {
                for (var index in response.Entities) {
                    this.findQuickFilter(Select2Editor, MoneyClaimApplicationRow.Fields.EmployeeName).items.push({ id: (response.Entities[index].EmployeeName).toString(), text: (response.Entities[index].EmployeeName).toString(), })
                    this.findQuickFilter(Select2Editor, MoneyClaimApplicationRow.Fields.EmployeeID).items.push({ id: (response.Entities[index].EmployeeID).toString(), text: (response.Entities[index].EmployeeID).toString(), })

                }
            })
            MasterCostCentreService.List({
            }, response => {
                for (var index in response.Entities) {
                    this.findQuickFilter(Select2Editor, MoneyClaimApplicationRow.Fields.CostCentreName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

                }
            })


        

    }

    constructor(container: JQuery) {
        super(container);
    }

    protected getButtons() {
        var buttons = super.getButtons();
        var self = this
        /*
        buttons.push({
                title: 'Money Claim Batch Approve',
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
                                return MoneyClaimApplicationService.Retrieve({ EntityId: dataId })
                                    .then(response => {
                                        let EmployeeApproval = response.Entity.EmployeeStatus;
                                        let HrApproval = response.Entity.HrStatus;
                                        let entityId = response.Entity.Id;
                                        let EmployeeRowId = response.Entity.EmployeeRowId;
                                        let updateData: MoneyClaimApplicationRow = {};
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
                                                            if (EmployeeApproval === MoneyClaimingStatus.NotNeeded || HrApproval === MoneyClaimingStatus.NotNeeded) {
                                                                if (EmployeeApproval === MoneyClaimingStatus.NotNeeded) {
                                                                    updateData = {
                                                                        HrStatus: MoneyClaimingStatus.Approved,
                                                                        HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    };
                                                                } else if (HrApproval === MoneyClaimingStatus.NotNeeded) {
                                                                    updateData = {
                                                                        EmployeeStatus: MoneyClaimingStatus.Approved,
                                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    };
                                                                }
                                                            } else {
                                                                if (HrApproval === MoneyClaimingStatus.Approved) {
                                                                    updateData = {
                                                                        EmployeeStatus: MoneyClaimingStatus.Approved,
                                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    };
                                                                } else if (EmployeeApproval === MoneyClaimingStatus.Approved) {
                                                                    updateData = {
                                                                        HrStatus: MoneyClaimingStatus.Approved,
                                                                        HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    };
                                                                } else {
                                                                    updateData = {
                                                                        EmployeeStatus: MoneyClaimingStatus.Approved,
                                                                        HrStatus: MoneyClaimingStatus.Approved,
                                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                        HrUpdated: Authorization.userDefinition.EmployeeRowID
                                                                    };
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            updateData = {
                                                                HrStatus: MoneyClaimingStatus.Approved,
                                                                HrUpdated: Authorization.userDefinition.EmployeeRowID
                                                            };
                                                        }
                                                    }
                                                    else {
                                                        updateData = {
                                                            EmployeeStatus: MoneyClaimingStatus.Approved,
                                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID
                                                        };
                                                    }
                                                    console.log(updateData)
                                                    // Call `Update` and resolve the promise
                                                    MoneyClaimApplicationService.Update({
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
                                    
                            
                        })
                },
                separator: true
            });
        buttons.push({
            title: 'Money Claim Batch Reject',
            cssClass: 'fas fa-hat-wizard text-bg-danger rejectButton',
            onClick: e => {
                if (self.rowSelection.getSelectedAsInt64().length == 0) {
                    alertDialog('Please select at least one application to reject')
                    return
                }
                confirm(
                    "Do you want to reject all selected applications?",
                    () => {
                        var rejectDlg = new MoneyClaimApplicationRejectDialog()
                        rejectDlg.dialogOpen()

                        rejectDlg.element.on('dialogclose', () => {
                            let selectedIds = self.rowSelection.getSelectedAsInt64();
                            var rejectReason = window["rejectReason"]
                            // Create an array of promises for each delete operation
                            let rejectPromises = self.rowSelection.getSelectedAsInt64().map(dataId => {

                                return MoneyClaimApplicationService.Retrieve({
                                    EntityId: dataId
                                }).then(response => {
                                    let EmployeeApproval = response.Entity.EmployeeStatus;
                                    let HrApproval = response.Entity.HrStatus;
                                    let entityId = response.Entity.Id;
                                    let updateData: MoneyClaimApplicationRow = {};
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
                                                        if (EmployeeApproval == MoneyClaimingStatus.NotNeeded || HrApproval == MoneyClaimingStatus.NotNeeded) {
                                                            if (EmployeeApproval == MoneyClaimingStatus.NotNeeded) {
                                                                updateData = {
                                                                    HrStatus: MoneyClaimingStatus.Rejected,
                                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    HrRejectReason:rejectReason
                                                                };
                                                            }
                                                            else if (HrApproval == MoneyClaimingStatus.NotNeeded) {
                                                                updateData = {
                                                                    EmployeeStatus: MoneyClaimingStatus.Rejected,
                                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    SuperiorRejectReason: rejectReason

                                                                };
                                                            }
                                                        }
                                                        else {
                                                            if (HrApproval == MoneyClaimingStatus.Pending) {
                                                                updateData = {
                                                                    HrStatus: MoneyClaimingStatus.Rejected,
                                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    HrRejectReason: rejectReason
                                                                };
                                                            }
                                                            else if (EmployeeApproval == MoneyClaimingStatus.Pending) {
                                                                updateData = {
                                                                    EmployeeStatus: MoneyClaimingStatus.Rejected,
                                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    SuperiorRejectReason: rejectReason

                                                                };
                                                            }
                                                            else {
                                                                updateData = {
                                                                    EmployeeStatus: MoneyClaimingStatus.Rejected,
                                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    HrStatus: MoneyClaimingStatus.Rejected,
                                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                                    SuperiorRejectReason: rejectReason,
                                                                    HrRejectReason: rejectReason

                                                                };
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        updateData = {
                                                            HrStatus: MoneyClaimingStatus.Rejected,
                                                            HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                            HrRejectReason:rejectReason

                                                        };
                                                    }

                                                }
                                                else {
                                                    updateData = {
                                                        SuperiorRejectReason: rejectReason,
                                                        EmployeeStatus: MoneyClaimingStatus.Rejected,
                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID
                                                    };
                                                }

                                                MoneyClaimApplicationService.Update({
                                                    EntityId: entityId,
                                                    Entity: updateData
                                                }).then(resolve).catch(reject);

                                            }
                                        })
                                    })
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



        buttons.push({
            title: 'Money Claim Batch Approve',
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
                                let response = await MoneyClaimApplicationService.Retrieve({ EntityId: dataId });
                                let EmployeeApproval = response.Entity.EmployeeStatus;
                                let HrApproval = response.Entity.HrStatus;
                                let entityId = response.Entity.Id;
                                let EmployeeRowId = response.Entity.EmployeeRowId;
                                let updateData: MoneyClaimApplicationRow = {};
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
                                        if (EmployeeApproval === MoneyClaimingStatus.NotNeeded || HrApproval === MoneyClaimingStatus.NotNeeded) {
                                            if (EmployeeApproval === MoneyClaimingStatus.NotNeeded) {
                                                updateData = {
                                                    HrStatus: MoneyClaimingStatus.Approved,
                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                };
                                            } else if (HrApproval === MoneyClaimingStatus.NotNeeded) {
                                                updateData = {
                                                    EmployeeStatus: MoneyClaimingStatus.Approved,
                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                };
                                            }
                                        } else {
                                            if (HrApproval === MoneyClaimingStatus.Approved) {
                                                updateData = {
                                                    EmployeeStatus: MoneyClaimingStatus.Approved,
                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                };
                                            } else if (EmployeeApproval === MoneyClaimingStatus.Approved) {
                                                updateData = {
                                                    HrStatus: MoneyClaimingStatus.Approved,
                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                };
                                            } else {
                                                updateData = {
                                                    EmployeeStatus: MoneyClaimingStatus.Approved,
                                                    HrStatus: MoneyClaimingStatus.Approved,
                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID
                                                };
                                            }
                                        }
                                    }
                                    else {
                                        updateData = {
                                            HrStatus: MoneyClaimingStatus.Approved,
                                            HrUpdated: Authorization.userDefinition.EmployeeRowID
                                        };
                                    }
                                }
                                else {
                                    updateData = {
                                        EmployeeStatus: MoneyClaimingStatus.Approved,
                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID
                                    };
                                }

                                await MoneyClaimApplicationService.Update({ EntityId: entityId, Entity: updateData });

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
            title: 'Money Claim Batch Reject',
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
                        var rejectDlg = new MoneyClaimApplicationRejectDialog()
                        rejectDlg.dialogOpen()
                        rejectDlg.element.on('dialogclose', async () => {
                            var rejectReason = window["rejectReason"]

                            for (const dataId of selectedIds) {
                                try {
                                    let response = await MoneyClaimApplicationService.Retrieve({ EntityId: dataId });
                                    let EmployeeApproval = response.Entity.EmployeeStatus;
                                    let HrApproval = response.Entity.HrStatus;
                                    let entityId = response.Entity.Id;
                                    let EmployeeRowId = response.Entity.EmployeeRowId;
                                    let updateData: MoneyClaimApplicationRow = {};

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
                                            if (EmployeeApproval == MoneyClaimingStatus.NotNeeded || HrApproval == MoneyClaimingStatus.NotNeeded) {
                                                if (EmployeeApproval == MoneyClaimingStatus.NotNeeded) {
                                                    updateData = {
                                                        HrStatus: MoneyClaimingStatus.Rejected,
                                                        HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        HrRejectReason: rejectReason
                                                    };
                                                }
                                                else if (HrApproval == MoneyClaimingStatus.NotNeeded) {
                                                    updateData = {
                                                        EmployeeStatus: MoneyClaimingStatus.Rejected,
                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        SuperiorRejectReason: rejectReason

                                                    };
                                                }
                                            }
                                            else {
                                                if (HrApproval == MoneyClaimingStatus.Pending) {
                                                    updateData = {
                                                        HrStatus: MoneyClaimingStatus.Rejected,
                                                        HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        HrRejectReason: rejectReason
                                                    };
                                                }
                                                else if (EmployeeApproval == MoneyClaimingStatus.Pending) {
                                                    updateData = {
                                                        EmployeeStatus: MoneyClaimingStatus.Rejected,
                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        SuperiorRejectReason: rejectReason

                                                    };
                                                }
                                                else {
                                                    updateData = {
                                                        EmployeeStatus: MoneyClaimingStatus.Rejected,
                                                        EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        HrStatus: MoneyClaimingStatus.Rejected,
                                                        HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        SuperiorRejectReason: rejectReason,
                                                        HrRejectReason: rejectReason

                                                    };
                                                }
                                            }
                                        }
                                        else {
                                            updateData = {
                                                HrStatus: MoneyClaimingStatus.Rejected,
                                                HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                HrRejectReason: rejectReason

                                            };
                                        }

                                    }
                                    else {
                                        updateData = {
                                            SuperiorRejectReason: rejectReason,
                                            EmployeeStatus: MoneyClaimingStatus.Rejected,
                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID
                                        };
                                    }

                                    await MoneyClaimApplicationService.Update({ EntityId: entityId, Entity: updateData });
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
        return buttons;
    }
    public rowSelection: GridRowSelectionMixin;
    public SuperiorOfEmployeeRowIdList: number[] = [];

    protected createToolbarExtensions() {
        super.createToolbarExtensions();
        /*
        this.rowSelection = new GridRowSelectionMixin(this, {
            // demo code
            selectable: (item: MoneyClaimApplicationRow) => {
                if (item.EmployeeRowId == Authorization.userDefinition.EmployeeRowID
                    || (item.Status != MoneyClaimingStatus.Pending))
                    return
                var getResponse = 0
                var superior
               
                const isHr = Authorization.hasPermission(PermissionKeys.HumanResources)
                if (item.Status == MoneyClaimingStatus.Pending) {
                    if ((item.EmployeeStatus == MoneyClaimingStatus.NotNeeded)
                        || (isHr && item.HrStatus == MoneyClaimingStatus.NotNeeded))
                        return

                    else if ((isHr && item.HrStatus == MoneyClaimingStatus.Pending)
                        || (item.EmployeeStatus == MoneyClaimingStatus.Pending)) //is superior
                    {
                        $('.approveButton, .rejectButton').removeClass("hidden")

//                        $('.approveButton, .rejectButton').show()
                        return true;
                    }
                }
                
            }
        });
        */
       var self = this
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

                self.rowSelection = new GridRowSelectionMixin(self, {
                    // demo code
                    selectable: (item: MoneyClaimApplicationRow) => {
                        var superior = response.includes(item.EmployeeRowId)
                        if (item.EmployeeRowId == Authorization.userDefinition.EmployeeRowID
                            || (item.Status != MoneyClaimingStatus.Pending))
                            return
                        const isHr = Authorization.hasPermission(PermissionKeys.HumanResources)
                        if (item.Status == MoneyClaimingStatus.Pending) {
                            if ((item.EmployeeStatus == MoneyClaimingStatus.NotNeeded)
                                || (isHr && item.HrStatus == MoneyClaimingStatus.NotNeeded))
                                return

                            else if ((isHr && item.HrStatus == MoneyClaimingStatus.Pending)
                                || (superior&&item.EmployeeStatus == MoneyClaimingStatus.Pending)) //is superior
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
    
    protected  getColumns() {
        var columns = super.getColumns();
        var index
        columns.unshift(GridRowSelectionMixin.createSelectColumn(() => this.rowSelection));

        if (!Authorization.hasPermission(PermissionKeys.HumanResources)) //if he is not HR guy, hide the employeeID and approved by column
        {
            for (index in columns) {
                if (columns[index].name == MoneyClaimApplicationRow.Fields.EmployeeID || columns[index].name == MoneyClaimApplicationRow.Fields.ApprovedBy) {
                    columns.splice(index, 1);
                }
            }
        }

        return columns;

    }
    protected onViewSubmit(): boolean {
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

        return super.onViewSubmit();
    }
    protected createEntityDialog(itemType: string, callback: (dlg: MoneyClaimApplicationDialog) => void): MoneyClaimApplicationDialog {
        let dialog = super.createEntityDialog(itemType, callback) as MoneyClaimApplicationDialog;
        var self = this
        // Attach 'dialogclose' event listener to refresh the grid when the dialog closes
        dialog.element.on('dialogclose', () => {
            self.internalRefresh();  // Refresh grid after closing the dialog
            console.log('hahaa')
        });

        return dialog;  // Ensure correct return type
    }

    protected onViewProcessData(response: ListResponse<MoneyClaimApplicationRow>) {
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
    protected getAddButtonCaption() {
        return "Apply money claiming";
    }
   
}