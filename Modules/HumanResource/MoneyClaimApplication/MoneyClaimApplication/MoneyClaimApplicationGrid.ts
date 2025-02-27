import { Criteria, Decorators, EntityGrid, GridRowSelectionMixin, IntegerEditor, ListResponse, LookupEditor, QuickFilter, Select2Editor, StringEditor, Widget, RetrieveResponse } from '@serenity-is/corelib';
import { MoneyClaimApplicationColumns, MoneyClaimApplicationRow, MoneyClaimApplicationService, MoneyClaimingStatus } from '../../../ServerTypes/MoneyClaimApplication';
import { MoneyClaimApplicationDialog } from './MoneyClaimApplicationDialog';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { OccupationService, JobGradeService, DepartmentService, DivisionService } from '../../../ServerTypes/OrganisationHierarchy';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { MasterCostCentreService } from '../../../ServerTypes/Master';
import { OrganisationChartService } from '../../../ServerTypes/OrganisationChart';
import { serviceCall,Authorization, isEmptyOrNull, getLookup, confirm } from '@serenity-is/corelib/q';

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

        if (Authorization.hasPermission(PermissionKeys.HumanResources)) {
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
        }
        return filters;
    }
    protected createQuickFilters(): void {
        // let base class to create quick filters first
        super.createQuickFilters();

        if (Authorization.hasPermission(PermissionKeys.HumanResources)) {
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

    }

    constructor(container: JQuery) {
        super(container);
    }

    protected getButtons() {
        var buttons = super.getButtons();
        var self = this
         buttons.push({
                title: 'Money Claim Batch Approve',
             cssClass: 'fas fa-hat-wizard text-bg-success approveButton',
                onClick: e => {
                    confirm(
                        "Do you want to approve all selected applications?",
                        () => {

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
                                                        if (SuperiorPermission) {
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
                                                        } else {
                                                            updateData = {
                                                                HrStatus: MoneyClaimingStatus.Approved,
                                                                HrUpdated: Authorization.userDefinition.EmployeeRowID
                                                            };
                                                        }
                                                    } else {
                                                        updateData = {
                                                            EmployeeStatus: MoneyClaimingStatus.Approved,
                                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID
                                                        };
                                                    }

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
            title: 'Money Claim Batch Reject',
            cssClass: 'fas fa-hat-wizard text-bg-danger rejectButton',
            onClick: e => {
                confirm(
                    "Do you want to reject all selected applications?",
                    () => {

                        // Create an array of promises for each delete operation
                        let rejectPromises = self.rowSelection.getSelectedAsInt64().map(dataId=> {

                            return MoneyClaimApplicationService.Retrieve({
                                EntityId: dataId
                            }).then(response => {
                                let EmployeeApproval = response.Entity.EmployeeStatus;
                                let HrApproval = response.Entity.HrStatus;
                                let entityId = response.Entity.Id;
                                let updateData: any = {};
                                let EmployeeRowId = response.Entity.EmployeeRowId

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
                                                        };
                                                    }
                                                    else if (HrApproval == MoneyClaimingStatus.NotNeeded) {
                                                        updateData = {
                                                            EmployeeStatus: MoneyClaimingStatus.Rejected,
                                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        };
                                                    }
                                                }
                                                else {
                                                    if (HrApproval == MoneyClaimingStatus.Pending) {
                                                        updateData = {
                                                            HrStatus: MoneyClaimingStatus.Rejected,
                                                            HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        };
                                                    }
                                                    else if (EmployeeApproval == MoneyClaimingStatus.Pending) {
                                                        updateData = {
                                                            EmployeeStatus: MoneyClaimingStatus.Rejected,
                                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        };
                                                    }
                                                    else {
                                                        updateData = {
                                                            EmployeeStatus: MoneyClaimingStatus.Rejected,
                                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                            HrStatus: MoneyClaimingStatus.Rejected,
                                                            HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        };
                                                    }
                                                }
                                            }
                                            else {
                                                updateData = {
                                                    HrStatus: MoneyClaimingStatus.Rejected,
                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID
                                                };
                                            }

                                        }
                                        else {
                                            updateData = {
                                                EmployeeStatus: MoneyClaimingStatus.Rejected,
                                                EmployeeUpdated: Authorization.userDefinition.EmployeeRowID
                                            };
                                        }

                                        return MoneyClaimApplicationService.Update({
                                            EntityId: entityId,
                                            Entity: updateData
                                        });

                                    }
                                })

                            });
                        }); // Convert jQuery object to array

                        // Wait for all operations to complete before refreshing
                        Promise.all(rejectPromises)
                            .then(() => {
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

        return buttons;
    }
    public rowSelection: GridRowSelectionMixin;

    protected createToolbarExtensions() {
        super.createToolbarExtensions();
        
        this.rowSelection = new GridRowSelectionMixin(this, {
            // demo code
            selectable: (item: MoneyClaimApplicationRow) => {
                var getResponse = 0
                var superior
                serviceCall<RetrieveResponse<any>>({
                    service: OrganisationChartService.baseUrl + '/PermissionToAcknowledge',
                    data: {
                        'UserEmployeeRowID': Authorization.userDefinition.EmployeeRowID,
                        'ApplicantEmployeeRowID': item.EmployeeRowId
                    },
                    method: "GET",
                    async: false,
                    onSuccess: (response) => {
                        getResponse = 1
                        superior = response
                    }
                })
                while (getResponse == 0);
                const isHr = Authorization.hasPermission(PermissionKeys.HumanResources)
                if (item.Status == MoneyClaimingStatus.Pending) {
                    if ((item.EmployeeRowId == Authorization.userDefinition.EmployeeRowID)
                        || (isHr && item.HrStatus == MoneyClaimingStatus.NotNeeded))
                        return

                    else if ((isHr && item.HrStatus == MoneyClaimingStatus.Pending)
                        || (superior && item.EmployeeStatus == MoneyClaimingStatus.Pending)) //is superior
                    {
                        $('.approveButton, .rejectButton').show()
                        return true;

                    }
                }
                
            }
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

    protected onViewProcessData(response: ListResponse<MoneyClaimApplicationRow>) {
        response = super.onViewProcessData(response);
        $('.approveButton, .rejectButton').hide()

        this.toolbar.findButton("column-picker-button").toggle(false);
       
        return response;

    }
    protected getAddButtonCaption() {
        return "Apply money claiming";
    }
   
}