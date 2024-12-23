import { Decorators, EntityGrid, ListResponse, QuickFilter, Select2Editor, Widget } from '@serenity-is/corelib';
import { ShiftAttendanceRecordColumns, ShiftAttendanceRecordRow, ShiftAttendanceRecordService } from '../../../ServerTypes/EmployeeAttendance';
import { ShiftAttendanceRecordDialog } from './ShiftAttendanceRecordDialog';
import { OccupationService, JobGradeService, DepartmentService, DivisionService } from '../../../ServerTypes/OrganisationHierarchy';

import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { MasterCostCentreService } from '../../../ServerTypes/Master';
import { Authorization } from '@serenity-is/corelib/q';
import { PermissionKeys } from '../../../ServerTypes/Administration';
@Decorators.registerClass('HRMSoftware.EmployeeAttendance.ShiftAttendanceRecordGrid')
export class ShiftAttendanceRecordGrid extends EntityGrid<ShiftAttendanceRecordRow, any> {
    protected getColumnsKey() { return ShiftAttendanceRecordColumns.columnsKey; }
    protected getDialogType() { return ShiftAttendanceRecordDialog; }
    protected getRowDefinition() { return ShiftAttendanceRecordRow; }
    protected getService() { return ShiftAttendanceRecordService.baseUrl; }


    protected getQuickFilters(): QuickFilter<Widget<any>, any>[] {
        //Gets the Filters defined in the Columns or in parent grids.
        let filters = super.getQuickFilters();

        // console.log(filters[3].type = Select2Editor)

        if (Authorization.hasPermission(PermissionKeys.HumanResources)) {
            filters.push({
                cssClass: "hidden-xs",
                field: ShiftAttendanceRecordRow.Fields.OccupationName,
                type: Select2Editor,
                title: "Occupation",

            });
            filters.push({
                cssClass: "hidden-xs",
                field: ShiftAttendanceRecordRow.Fields.JobGradeName,
                type: Select2Editor,
                title: "Job Grade",

            });
            filters.push({
                cssClass: "hidden-xs",
                field: ShiftAttendanceRecordRow.Fields.DivisionName,
                type: Select2Editor,
                title: "Division",

            });

            filters.push({
                cssClass: "hidden-xs",
                field: ShiftAttendanceRecordRow.Fields.DepartmentName,
                type: Select2Editor,
                title: "Department",

            });

            filters.push({
                cssClass: "hidden-xs",
                field: ShiftAttendanceRecordRow.Fields.EmployeeName,
                type: Select2Editor,
                title: "Name",
            });
            filters.push({
                cssClass: "hidden-xs",
                field: ShiftAttendanceRecordRow.Fields.EmployeeID,
                type: Select2Editor,
                title: "Employee ID",
            });
            filters.push({
                cssClass: "hidden-xs",
                field: ShiftAttendanceRecordRow.Fields.CostCentreName,
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
                    this.findQuickFilter(Select2Editor, ShiftAttendanceRecordRow.Fields.OccupationName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            JobGradeService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, ShiftAttendanceRecordRow.Fields.JobGradeName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            DepartmentService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, ShiftAttendanceRecordRow.Fields.DepartmentName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            DivisionService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, ShiftAttendanceRecordRow.Fields.DivisionName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

            })
            EmployeeProfileService.List({
            }, response => {
                for (var index in response.Entities) {
                    this.findQuickFilter(Select2Editor, ShiftAttendanceRecordRow.Fields.EmployeeName).items.push({ id: (response.Entities[index].EmployeeName).toString(), text: (response.Entities[index].EmployeeName).toString(), })
                    this.findQuickFilter(Select2Editor, ShiftAttendanceRecordRow.Fields.EmployeeID).items.push({ id: (response.Entities[index].EmployeeID).toString(), text: (response.Entities[index].EmployeeID).toString(), })

                }
            })
            MasterCostCentreService.List({
            }, response => {
                for (var index in response.Entities) {
                    this.findQuickFilter(Select2Editor, ShiftAttendanceRecordRow.Fields.CostCentreName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

                }
            })


        }

    }

    constructor(container: JQuery) {
        super(container);
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
    protected onViewProcessData(response: ListResponse<ShiftAttendanceRecordRow>) {
        response = super.onViewProcessData(response);
        this.toolbar.findButton("column-picker-button").toggle(false);
        return response;

    }
}