import { Decorators, EntityGrid, ListResponse } from '@serenity-is/corelib';
import { AbsentRecordColumns, AbsentRecordRow, AbsentRecordService } from '../../../ServerTypes/AbsentRecord';
import { AbsentRecordDialog } from './AbsentRecordDialog';
import { OccupationService } from '../../../ServerTypes/OrganisationHierarchy';
import { JobGradeService } from '../../../ServerTypes/OrganisationHierarchy';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { Authorization } from '@serenity-is/corelib/q';
import { Select2Editor, QuickFilter, Widget } from '@serenity-is/corelib';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { DepartmentService } from '../../../ServerTypes/OrganisationHierarchy/DepartmentService';
import { DivisionService } from '../../../ServerTypes/OrganisationHierarchy/DivisionService';

@Decorators.registerClass('HRMSoftware.AbsentRecord.AbsentRecordGrid')
export class AbsentRecordGrid extends EntityGrid<AbsentRecordRow, any> {
    protected getColumnsKey() { return AbsentRecordColumns.columnsKey; }
    protected getDialogType() { return AbsentRecordDialog; }
    protected getRowDefinition() { return AbsentRecordRow; }
    protected getService() { return AbsentRecordService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
    protected onViewProcessData(response: ListResponse<AbsentRecordRow>) {
        response = super.onViewProcessData(response);
        this.toolbar.findButton("column-picker-button").toggle(false);
        return response;
    }
    protected getQuickFilters(): QuickFilter<Widget<any>, any>[] {
        //Gets the Filters defined in the Columns or in parent grids.
        let filters = super.getQuickFilters();
        var thisrow = AbsentRecordRow
        // console.log(filters[3].type = Select2Editor)
        if (Authorization.hasPermission(PermissionKeys.HumanResources)) {

            filters.push({
                cssClass: "hidden-xs",
                field: thisrow.Fields.OccupationName,
                type: Select2Editor,
                title: "Occupation",

            });
            filters.push({
                cssClass: "hidden-xs",
                field: thisrow.Fields.JobGradeName,
                type: Select2Editor,
                title: "Job Grade",

            });
            filters.push({
                cssClass: "hidden-xs",
                field: thisrow.Fields.DivisionName,
                type: Select2Editor,
                title: "Division",

            });

            filters.push({
                cssClass: "hidden-xs",
                field: thisrow.Fields.DepartmentName,
                type: Select2Editor,
                title: "Department",

            });
            filters.push({
                cssClass: "hidden-xs",
                field: thisrow.Fields.EmployeeName,
                type: Select2Editor,
                title: "Name",
            });
            filters.push({
                cssClass: "hidden-xs",
                field: thisrow.Fields.EmployeeId,
                type: Select2Editor,
                title: "Employee ID",
            });
            filters.reverse()

        }
        return filters;
    }
    protected createQuickFilters(): void {
        // let base class to create quick filters first

        super.createQuickFilters();
        var thisrow = AbsentRecordRow
        if (Authorization.hasPermission(PermissionKeys.HumanResources)) {

            OccupationService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, thisrow.Fields.OccupationName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            JobGradeService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, thisrow.Fields.JobGradeName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            DepartmentService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, thisrow.Fields.DepartmentName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            DivisionService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, thisrow.Fields.DivisionName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

            })
            EmployeeProfileService.List({
            }, response => {
                for (var index in response.Entities) {
                    this.findQuickFilter(Select2Editor, thisrow.Fields.EmployeeName).items.push({ id: (response.Entities[index].EmployeeName).toString(), text: (response.Entities[index].EmployeeName).toString(), })
                    this.findQuickFilter(Select2Editor, thisrow.Fields.EmployeeId).items.push({ id: (response.Entities[index].EmployeeID).toString(), text: (response.Entities[index].EmployeeID).toString(), })

                }
            })
        }
        else
            this.toolbar.findButton("add-button").toggle(false);

    }

}