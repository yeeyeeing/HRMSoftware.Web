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
import { serviceCall, Authorization, isEmptyOrNull, getLookup, confirm } from '@serenity-is/corelib/q';
import { OrganisationChartService } from '../../../ServerTypes/OrganisationChart';

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

        if (Authorization.hasPermission(PermissionKeys.HumanResources)) {
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
            cssClass: 'fas fa-hat-wizard text-bg-success approveButton',
            onClick: e => {
                confirm(
                    "Do you want to approve all selected applications?",
                    () => {

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
                                                    if (SuperiorPermission) {
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
                                                } else {
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
                confirm(
                    "Do you want to reject all selected applications?",
                    () => {

                        // Create an array of promises for each delete operation
                        let rejectPromises = self.rowSelection.getSelectedAsInt64().map(dataId => {

                            return OTApplicationService.Retrieve({
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
                                                if (EmployeeApproval == OTApplicationStatus.NotNeeded || HrApproval == OTApplicationStatus.NotNeeded) {
                                                    if (EmployeeApproval == OTApplicationStatus.NotNeeded) {
                                                        updateData = {
                                                            HrStatus: OTApplicationStatus.Rejected,
                                                            HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        };
                                                    }
                                                    else if (HrApproval == OTApplicationStatus.NotNeeded) {
                                                        updateData = {
                                                            EmployeeStatus: OTApplicationStatus.Rejected,
                                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        };
                                                    }
                                                }
                                                else {
                                                    if (HrApproval == OTApplicationStatus.Pending) {
                                                        updateData = {
                                                            HrStatus: OTApplicationStatus.Rejected,
                                                            HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        };
                                                    }
                                                    else if (EmployeeApproval == OTApplicationStatus.Pending) {
                                                        updateData = {
                                                            EmployeeStatus: OTApplicationStatus.Rejected,
                                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        };
                                                    }
                                                    else {
                                                        updateData = {
                                                            EmployeeStatus: OTApplicationStatus.Rejected,
                                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                            HrStatus: OTApplicationStatus.Rejected,
                                                            HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                        };
                                                    }
                                                }
                                            }
                                            else {
                                                updateData = {
                                                    HrStatus: OTApplicationStatus.Rejected,
                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID
                                                };
                                            }

                                        }
                                        else {
                                            updateData = {
                                                EmployeeStatus: OTApplicationStatus.Rejected,
                                                EmployeeUpdated: Authorization.userDefinition.EmployeeRowID
                                            };
                                        }

                                        return OTApplicationService.Update({
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
    protected onViewSubmit(): boolean {
        this.slickGrid.onHeaderCellRendered.subscribe((e, args) => {
            if (args.column.id === "SelectAll") {
                $(args.node).empty().append(`<input type='checkbox' id='selectAll'/>`);
            }
        });
        var self = this
        var grid = this.slickGrid;
        grid.onSelectedRowsChanged.subscribe(() => {
            // get the phone...
            console.log("haha");
            // get the fax...
            // ...and so on!
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

    protected createToolbarExtensions() {
        super.createToolbarExtensions();
        var self = this
        this.rowSelection = new GridRowSelectionMixin(this, {
            // demo code
            selectable: (item: OTApplicationRow) => {
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
                if (item.Status == OTApplicationStatus.Pending) {
                    if ((item.EmployeeRowId == Authorization.userDefinition.EmployeeRowID)
                        || (isHr && item.HrStatus == OTApplicationStatus.NotNeeded))
                        return

                    else if ((isHr && item.HrStatus == OTApplicationStatus.Pending)
                        || (superior && item.EmployeeStatus == OTApplicationStatus.Pending)) //is superior
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
        $('.approveButton, .rejectButton').hide()

        this.toolbar.findButton("column-picker-button").toggle(false);
        return response;

    }

}