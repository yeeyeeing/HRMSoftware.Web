import { Criteria, Decorators, EntityGrid, GridRowSelectionMixin, IntegerEditor, ListResponse, LookupEditor, QuickFilter, Select2Editor, StringEditor, Widget } from '@serenity-is/corelib';
import { LeaveApplicationColumns, LeaveApplicationRow, LeaveApplicationService } from '../../../ServerTypes/LeaveApplication';
import { LeaveApplicationDialog } from './LeaveApplicationDialog';
import { Authorization } from '@serenity-is/corelib/q';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { OccupationService, JobGradeService, DepartmentService, DivisionService } from '../../../ServerTypes/OrganisationHierarchy';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { MasterCostCentreRow, MasterCostCentreService } from '../../../ServerTypes/Master';
import { MasterCp8dRow, MasterCp8dService } from '../../../ServerTypes/Master';


@Decorators.registerClass('HRMSoftware.LeaveApplication.LeaveApplicationGrid')
export class LeaveApplicationGrid extends EntityGrid<LeaveApplicationRow, any> {
    protected getColumnsKey() { return LeaveApplicationColumns.columnsKey; }
    protected getDialogType() { return LeaveApplicationDialog; }
    protected getRowDefinition() { return LeaveApplicationRow; }
    protected getService() { return LeaveApplicationService.baseUrl; }
    protected getAddButtonCaption() {
        return "Apply Leave";
    }
    protected getQuickFilters(): QuickFilter<Widget<any>, any>[] {
        //Gets the Filters defined in the Columns or in parent grids.
        let filters = super.getQuickFilters();

        // console.log(filters[3].type = Select2Editor)

        if (Authorization.hasPermission(PermissionKeys.HumanResources)) {
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

    }


    constructor(container: JQuery) {
        super(container);






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
        return columns;
    }
  
    protected onViewProcessData(response: ListResponse<LeaveApplicationRow>)
    {
        this.toolbar.findButton("column-picker-button").toggle(false);

        response = super.onViewProcessData(response);
        if (Authorization.hasPermission(PermissionKeys.HumanResources))
        {
            for (var my in response.Entities)
            {

            }
        }

        else
            console.log('this user is not a HR guy')

        return response;

    }


}