import { EmployeeIncentiveColumns, EmployeeIncentiveRow, EmployeeIncentiveService } from '../../../ServerTypes/EmployeeProfile';
import { EmployeeIncentiveDialog } from './EmployeeIncentiveDialog';
import { Criteria, Decorators, EntityGrid, IntegerEditor, ListResponse, LookupEditor, StringEditor, GridRowSelectionMixin } from '@serenity-is/corelib';
import { EisSubjectionService, EpfSubjectionService, HrdfSubjectionService, PayrollColumns, PayrollRow, PayrollService, PayrollSettingsService, PcbSubjectionService, SocsoSubjectionService } from '../../../ServerTypes/PayrollSettings';
import { PayrollDialog } from './PayrollDialog';
import { confirmDialog, confirm, serviceCall, notifySuccess, notifyError, notifyInfo } from '@serenity-is/corelib/q';
import { EpfSubjectionDialog } from '../EpfSubjection/EpfSubjectionDialog';
import { EisSubjectionDialog } from '../EisSubjection/EisSubjectionDialog';
import { HrdfSubjectionDialog } from '../HrdfSubjection/HrdfSubjectionDialog';
import { PcbSubjectionDialog } from '../PcbSubjection/PcbSubjectionDialog';
import { SocsoSubjectionDialog } from '../SocsoSubjection/SocsoSubjectionDialog';
import { PayrollWizardDialog } from '../PayrollWizard/PayrollWizardDialog';
import { PayrollGeneratingWizardDialog } from '../PayrollGeneratingWizard/PayrollGeneratingWizardDialog';
import { TextEditor } from '@serenity-is/sleekgrid';
import { OccupationService, DepartmentService, JobGradeService, DivisionService, SectionService } from '../../../ServerTypes/OrganisationHierarchy';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { Authorization, isEmptyOrNull } from '@serenity-is/corelib/q';
import { Select2Editor, QuickFilter, Widget } from '@serenity-is/corelib';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { MasterCostCentreService } from '../../../ServerTypes/Master';
import { TextDownloadingWizardDialog } from './TextDownloadingWizardDialog';
import { PayrollSettingsDialog } from '../PayrollSettings/PayrollSettingsDialog';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeeIncentiveGrid')
export class EmployeeIncentiveGrid extends EntityGrid<EmployeeIncentiveRow, any> {
    protected getColumnsKey() { return EmployeeIncentiveColumns.columnsKey; }
    protected getDialogType() { return EmployeeIncentiveDialog; }
    protected getRowDefinition() { return EmployeeIncentiveRow; }
    protected getService() { return EmployeeIncentiveService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }
    protected getQuickFilters(): QuickFilter<Widget<any>, any>[] {
        //Gets the Filters defined in the Columns or in parent grids.
        let filters = super.getQuickFilters();
        var targetedRow = this.getRowDefinition()
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
        var self = this
        if (Authorization.hasPermission(PermissionKeys.HumanResources)) {
            OccupationService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, self.getRowDefinition().Fields.OccupationName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            JobGradeService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, self.getRowDefinition().Fields.JobGradeName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            DepartmentService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, self.getRowDefinition().Fields.DepartmentName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })
            })
            DivisionService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, self.getRowDefinition().Fields.DivisionName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

            })
            SectionService.List({
            }, response => {
                for (var index in response.Entities)
                    this.findQuickFilter(Select2Editor, self.getRowDefinition().Fields.SectionName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

            })
            EmployeeProfileService.List({
            }, response => {
                for (var index in response.Entities) {
                    this.findQuickFilter(Select2Editor, self.getRowDefinition().Fields.EmployeeName).items.push({ id: (response.Entities[index].EmployeeName).toString(), text: (response.Entities[index].EmployeeName).toString(), })
                    this.findQuickFilter(Select2Editor, self.getRowDefinition().Fields.EmployeeID).items.push({ id: (response.Entities[index].EmployeeID).toString(), text: (response.Entities[index].EmployeeID).toString(), })
                }
            })
            MasterCostCentreService.List({
            }, response => {
                for (var index in response.Entities) {
                    this.findQuickFilter(Select2Editor, self.getRowDefinition().Fields.CostCentreName).items.push({ id: (response.Entities[index].Name).toString(), text: (response.Entities[index].Name).toString(), })

                }
            })

        }
        else
            this.toolbar.findButton("add-button").toggle(false);

        for (var index in months)
            this.findQuickFilter(Select2Editor, self.getRowDefinition().Fields.PayMonth).items.push({ id: (index).toString(), text: (months[index]).toString(), })
        EmployeeIncentiveService.List({
        }, response => {
            let YearList = [];
            for (var index in response.Entities)
                if (YearList.indexOf(response.Entities[index].PayYear) == -1)
                    YearList.push(response.Entities[index].PayYear)
            for (var index in YearList)
                this.findQuickFilter(Select2Editor, self.getRowDefinition().Fields.PayYear).items.push({ id: (YearList[index]).toString(), text: (YearList[index]).toString(), })
        })
    }
}