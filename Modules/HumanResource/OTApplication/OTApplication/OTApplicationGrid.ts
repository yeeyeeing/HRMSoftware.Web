import { Criteria, Decorators, EntityGrid, GridRowSelectionMixin, IntegerEditor, ListResponse, LookupEditor, QuickFilter, Select2Editor, StringEditor, Widget } from '@serenity-is/corelib';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { OTApplicationColumns, OTApplicationRow, OTApplicationService } from '../../../ServerTypes/OTApplication';
import { OTApplicationDialog } from './OTApplicationDialog';
import { Authorization } from '@serenity-is/corelib/q';
import { OccupationService } from '../../../ServerTypes/OrganisationHierarchy';
import { JobGradeService } from '../../../ServerTypes/OrganisationHierarchy';
import { DepartmentService } from '../../../ServerTypes/OrganisationHierarchy/DepartmentService';
import { DivisionService } from '../../../ServerTypes/OrganisationHierarchy/DivisionService';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { MasterCostCentreService } from '../../../ServerTypes/Master';

@Decorators.registerClass('HRMSoftware.OTApplication.OTApplicationGrid')
export class OTApplicationGrid extends EntityGrid<OTApplicationRow, any> {
    protected getColumnsKey() { return OTApplicationColumns.columnsKey; }
    protected getDialogType() { return OTApplicationDialog; }
    protected getRowDefinition() { return OTApplicationRow; }
    protected getService() { return OTApplicationService.baseUrl; }
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

    protected getColumns() {
        var columns = super.getColumns();
        var index
        if (!Authorization.hasPermission(PermissionKeys.HumanResources)) //if he is not HR guy, hide the employeeID and approved by column
        {
            for (index in columns) {
                if (columns[index].name == 'Employee Id' || columns[index].name == 'Approved By') {
                    columns.splice(index, 1);
                }

            }
        }


        return columns;

    }
    protected onViewProcessData(response: ListResponse<OTApplicationRow>) {
        response = super.onViewProcessData(response);
        this.toolbar.findButton("column-picker-button").toggle(false);
        return response;

    }

}