import { Criteria, Decorators, EntityDialog } from '@serenity-is/corelib';
import { EmployeeProfileRow, EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { WeeklyPayrollEmployeeService, WeeklyPayrollSettingsForm, WeeklyPayrollSettingsRow, WeeklyPayrollSettingsService } from '../../../ServerTypes/PayrollSettings';
import { confirmDialog, notifyInfo, confirm, isEmptyOrNull } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.PayrollSettings.WeeklyPayrollSettingsDialog')
export class WeeklyPayrollSettingsDialog extends EntityDialog<WeeklyPayrollSettingsRow, any> {
    protected getFormKey() { return WeeklyPayrollSettingsForm.formKey; }
    protected getRowDefinition() { return WeeklyPayrollSettingsRow; }
    protected getService() { return WeeklyPayrollSettingsService.baseUrl; }

    protected form = new WeeklyPayrollSettingsForm(this.idPrefix);
    public EmployeeData: EmployeeProfileRow[];

    constructor() {
        super();
        var criteria: any;
        EmployeeProfileService.List({
            Criteria: Criteria.and(criteria, [[EmployeeProfileRow.Fields.Retired], '=', '0'],
                [[EmployeeProfileRow.Fields.Terminated], '=', '0'],
                [[EmployeeProfileRow.Fields.Resigned], '=', '0']
            )
        }, response => {
            this.EmployeeData = response.Entities
        })



    }

    public dialogOpen() {
        super.dialogOpen()
        var self = this
        $(document).ready(function () {
            $('<button>Add Employee into Group</button>')
                .insertAfter(`#${self.idPrefix}NewAddedEmployee`)  // Insert the button after the specified element
                .on('click', function () {
                    if (!isEmptyOrNull(self.form.NewAddedEmployee.value)) {
                        confirmDialog(
                            `Do you want to add these employees?`,
                            () => {

                                self.form.EmployeeList.value = `${self.form.EmployeeList.value},${self.form.NewAddedEmployee.value}`
                                self.form.NewAddedEmployee.value = ''
                                var itemsToFilter = self.form.EmployeeList.values
                                self.form.NewAddedEmployee.items = self.form.NewAddedEmployee.items.filter(item => !itemsToFilter.includes(item.id));
                                
                            }, {
                            onNo: () => {
                                console.log("User canceled");
                            }
                        }
                        )
                    }
                });
        });


    }
    public SearchCallback(): void {
        var self = this
        var OccupationListElement = document.getElementById(this.idPrefix + 'OccupationList');
        var DepartmentListElement = document.getElementById(this.idPrefix + 'DepartmentList');
        var DivisionListElement = document.getElementById(this.idPrefix + 'DivisionList');
        var JobGradeListElement = document.getElementById(this.idPrefix + 'JobGradeList');
        var SectionListElement = document.getElementById(this.idPrefix + 'SectionList');
        var CostCentreListElement = document.getElementById(this.idPrefix + 'CostCentreList');

        function parseListFromElement(element) {
            const valueStr = $(element).val();
            return valueStr.length
                ? valueStr.split(',').map(number => parseInt(number, 10))
                : [];
        }
        // Use the utility function for each list
        const JobGradeList = parseListFromElement(JobGradeListElement);
        const DivisionList = parseListFromElement(DivisionListElement);
        const DepartmentList = parseListFromElement(DepartmentListElement);
        const OccupationList = parseListFromElement(OccupationListElement);
        const SectionList = parseListFromElement(SectionListElement);
        const CostCentreList = parseListFromElement(CostCentreListElement);

        // Convert the lists to Sets for faster lookup
        const jobGradeSet = new Set(JobGradeList);
        const divisionSet = new Set(DivisionList);
        const departmentSet = new Set(DepartmentList);
        const occupationSet = new Set(OccupationList);
        const sectionSet = new Set(SectionList);
        const costcentreSet = new Set(CostCentreList);

        var employeeRowList
        if (self.isNew() == true)
            employeeRowList = self.form.EmployeeList.value ? self.form.EmployeeList.value.split(',').map(Number) : [];
        else if (self.isNew() == false)
            employeeRowList = self.form.NewAddedEmployee.value ? self.form.NewAddedEmployee.value.split(',').map(Number) : [];

        for (let employee of self.EmployeeData) {
            const { JobGradeID, DivisionID, DepartmentID, OccupationID, SectionID, Id, CostCentreID } = employee;
            const found =
                jobGradeSet.has(JobGradeID) ||
                divisionSet.has(DivisionID) ||
                departmentSet.has(DepartmentID) ||
                occupationSet.has(OccupationID) ||
                sectionSet.has(SectionID) ||
                costcentreSet.has(CostCentreID) 

            if (!found)
                employeeRowList = employeeRowList.filter(num => num !== Id);
            else {
                if (!employeeRowList.includes(Id))
                    employeeRowList.push(Id);
            }
            // Update the buffer value
        }
        let finalOutput: number[] = [];
        for (let i = 0; i < employeeRowList.length; i++) {
            //if (isEmptyOrNull(employeeGroup)) {
            finalOutput.push(employeeRowList[i])
            // }
        }
        if (self.isNew() == true)
            self.form.EmployeeList.value = finalOutput.join(',');

        else if (self.isNew() == false)
            self.form.NewAddedEmployee.value = finalOutput.join(',');


        //const result = data.find(item => item.Id === 12);

    }

    public onDialogOpen() {
        super.onDialogOpen()
        var self = this

      


        var SectionListElement = document.getElementById(this.idPrefix + 'SectionList');
        var OccupationListElement = document.getElementById(this.idPrefix + 'OccupationList');
        var DepartmentListElement = document.getElementById(this.idPrefix + 'DepartmentList');
        var DivisionListElement = document.getElementById(this.idPrefix + 'DivisionList');
        var JobGradeListElement = document.getElementById(this.idPrefix + 'JobGradeList');
        var CostCentreListElement = document.getElementById(this.idPrefix + 'CostCentreList');
        var EmployeeListElement = document.getElementById(this.idPrefix + 'EmployeeList');
        var EmployeeListValues = this.form.EmployeeList.values
        function getDifference(list1: string[], list2: string[]): string[] {
            return list1.filter(char => !list2.includes(char));
        }
        $(EmployeeListElement).on('change', async function () {
            var EmployeeToAddBack = getDifference(EmployeeListValues, self.form.EmployeeList.values)
            for (let i = 0; i < EmployeeToAddBack.length; i++) {
                var haha = self.EmployeeData.filter(item => item.Id == parseInt(EmployeeToAddBack[i]))
                self.form.NewAddedEmployee.addOption(haha[0].Id.toString(), haha[0].EmployeeID)
            }
        })
        $(`#s2id_${this.idPrefix}EmployeeList`).on('click', async function (e) {
            $(`.select2-drop`).hide()
            return
        })
        WeeklyPayrollEmployeeService.List({}, response => {
            let filteredItems = this.form.NewAddedEmployee.items
            for (var res in response.Entities) 
                filteredItems = filteredItems.filter(item => parseInt(item.id) !== response.Entities[res].EmployeeRowId);
            this.form.NewAddedEmployee.items = filteredItems
        })


        $(CostCentreListElement).on('change', async function () {
            self.SearchCallback()
            //  self.SearchEmployeeCallback();

        })
        $(OccupationListElement).on('change', async function () {
            self.SearchCallback()
            //  self.SearchEmployeeCallback();

        })
        $(DivisionListElement).on('change', async function () {
            self.SearchCallback();
            // self.SearchEmployeeCallback();

        })
        $(JobGradeListElement).on('change', async function () {
            self.SearchCallback();
            //self.SearchEmployeeCallback();
        })
        $(DepartmentListElement).on('change', async function () {
            self.SearchCallback();
            //self.SearchEmployeeCallback();
        })
        $(SectionListElement).on('change', async function () {
            self.SearchCallback();
            //self.SearchEmployeeCallback();

        })
      




    }
}