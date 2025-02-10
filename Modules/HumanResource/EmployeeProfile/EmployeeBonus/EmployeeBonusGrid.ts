import { Decorators, EntityGrid } from '@serenity-is/corelib';
import { EmployeeBonusColumns, EmployeeBonusRow, EmployeeBonusService } from '../../../ServerTypes/EmployeeProfile';
import { EmployeeBonusDialog } from './EmployeeBonusDialog';
import { Authorization, isEmptyOrNull } from '@serenity-is/corelib/q';
import { OccupationService, DepartmentService, JobGradeService, DivisionService, SectionService } from '../../../ServerTypes/OrganisationHierarchy';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { Select2Editor, QuickFilter, Widget } from '@serenity-is/corelib';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { MasterCostCentreService } from '../../../ServerTypes/Master';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeeBonusGrid')
export class EmployeeBonusGrid extends EntityGrid<EmployeeBonusRow, any> {
    protected getColumnsKey() { return EmployeeBonusColumns.columnsKey; }
    protected getDialogType() { return EmployeeBonusDialog; }
    protected getRowDefinition() { return EmployeeBonusRow; }
    protected getService() { return EmployeeBonusService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
    protected getQuickFilters(): QuickFilter<Widget<any>, any>[] {
        //Gets the Filters defined in the Columns or in parent grids.
        let filters = super.getQuickFilters();
        var targetedRow = EmployeeBonusRow
        // console.log(filters[3].type = Select2Editor)
        if (Authorization.hasPermission(PermissionKeys.HumanResources)) {
            filters.push({
                cssClass: "hidden-xs",
                field: targetedRow.Fields.CostCentreName,
                type: Select2Editor,

                title: "Cost Centre",
            });
            filters.push({
                cssClass: "hidden-xs",
                field: targetedRow.Fields.OccupationName,
                type: Select2Editor,
                title: "Occupation",

            });
            filters.push({
                cssClass: "hidden-xs",
                field: targetedRow.Fields.JobGradeName,
                type: Select2Editor,
                title: "Job Grade",

            });
            filters.push({
                cssClass: "hidden-xs",
                field: targetedRow.Fields.DivisionName,
                type: Select2Editor,
                title: "Division",

            });

            filters.push({
                cssClass: "hidden-xs",
                field: targetedRow.Fields.DepartmentName,
                type: Select2Editor,
                title: "Department",

            });

            filters.push({
                cssClass: "hidden-xs",
                field: targetedRow.Fields.SectionName,
                type: Select2Editor,
                title: "Section",

            });
            filters.push({
                cssClass: "hidden-xs",
                field: targetedRow.Fields.EmployeeName,
                type: Select2Editor,
                title: "Name",
            });
            filters.push({
                cssClass: "hidden-xs",
                field: targetedRow.Fields.EmployeeID,
                type: Select2Editor,
                title: "Employee ID",
            });
            filters.reverse()

        }
        filters.push({
            cssClass: "hidden-xs",
            field: targetedRow.Fields.PayMonth,
            type: Select2Editor,
            title: "Pay Month",
        });


        filters.push({
            cssClass: "hidden-xs",
            field: targetedRow.Fields.PayYear,
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
                    this.findQuickFilter(Select2Editor, EmployeeBonusRow.Fields.OccupationName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            JobGradeService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, EmployeeBonusRow.Fields.JobGradeName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            DepartmentService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, EmployeeBonusRow.Fields.DepartmentName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            DivisionService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, EmployeeBonusRow.Fields.DivisionName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

            })
            SectionService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, EmployeeBonusRow.Fields.SectionName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

            })
            EmployeeProfileService.List({
            }, response => {
                for (var index in response.Entities) {
                    this.findQuickFilter(Select2Editor, EmployeeBonusRow.Fields.EmployeeName).items.push({ id: (response.Entities[index].EmployeeName).toString(), text: (response.Entities[index].EmployeeName).toString(), })
                    this.findQuickFilter(Select2Editor, EmployeeBonusRow.Fields.EmployeeID).items.push({ id: (response.Entities[index].EmployeeID).toString(), text: (response.Entities[index].EmployeeID).toString(), })
                }
            })
            MasterCostCentreService.List({
            }, response => {
                for (var index in response.Entities) {
                    this.findQuickFilter(Select2Editor, EmployeeBonusRow.Fields.CostCentreName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

                }
            })

        }
        else
            this.toolbar.findButton("add-button").toggle(false);

        for (var index in months)
            this.findQuickFilter(Select2Editor, EmployeeBonusRow.Fields.PayMonth).items.push({ id: (index).toString(), text: (months[index]).toString(), })
        EmployeeBonusService.List({
        }, response => {
            let YearList = [];
            for (var index in response.Entities)
                if (YearList.indexOf(response.Entities[index].PayYear) == -1)
                    YearList.push(response.Entities[index].PayYear)
            for (var index in YearList)
                this.findQuickFilter(Select2Editor, EmployeeBonusRow.Fields.PayYear).items.push({ id: (YearList[index]).toString(), text: (YearList[index]).toString(), })
        })
    }

}