import { Decorators, EntityDialog, EditorUtils, Criteria } from '@serenity-is/corelib';
import { EmployeeProfileRow, UserCreationForm, UserCreationRow, UserCreationService } from '../../../ServerTypes/EmployeeProfile';
import { alertDialog, isEmptyOrNull } from '@serenity-is/corelib/q';
import { confirm, serviceCall, notifySuccess, notifyError } from '@serenity-is/corelib/q';
import { Select2Editor } from '@serenity-is/corelib';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { PayrollDialog } from '../../../Payroll/PayrollDialog';
import { PayrollWizDialog } from '../../PayrollWiz/PayrollWizDialog';
import { PayrollWizardDialog } from '../../PayrollWizard/PayrollWizardDialog';
import { CompanySettingsService } from '../../../ServerTypes/CompanySettings';
import { UserService } from '../../../ServerTypes/Administration';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.UserCreationDialog')
export class UserCreationDialog extends EntityDialog<UserCreationRow, any> {
    protected getFormKey() { return UserCreationForm.formKey; }
    protected getRowDefinition() { return UserCreationRow; }
    protected getService() { return UserCreationService.baseUrl; }

    protected form = new UserCreationForm(this.idPrefix);
    public multipleSelectHr:any;

    public SearchCallback(): void {
        var self = this
        function findEmployee(data, id) {
            return data.find(item => item.id == id.toString());
        }
        if (self.form.AllEmployee.value == true) {
            self.form.AllEmployee.value = false
            self.form.EmployeeRowList.value = ''
        }

        

        var OccupationListElement = document.getElementById(this.idPrefix + 'OccupationList');
        var DepartmentListElement = document.getElementById(this.idPrefix + 'DepartmentList');
        var DivisionListElement = document.getElementById(this.idPrefix + 'DivisionList');
        var JobGradeListElement = document.getElementById(this.idPrefix + 'JobGradeList');
        var SectionListElement = document.getElementById(this.idPrefix + 'SectionList');

        var JobGradeStr = $(JobGradeListElement).val()
        let JobGradeList = [];
        let numbers = JobGradeStr.split(',')
        if (JobGradeStr.length)
            numbers.forEach(number => {
                JobGradeList.push(parseInt(number)); // Convert string to integer and push to numberList
            })
        var SectionStr = $(SectionListElement).val()
        let SectionList = [];
        numbers = SectionStr.split(',')
        if (SectionStr.length)
            numbers.forEach(number => {
                SectionList.push(parseInt(number)); // Convert string to integer and push to numberList
            })
        var DivisionStr = $(DivisionListElement).val()
        numbers = DivisionStr.split(',')
        let DivisionList = [];
        if (DivisionStr.length)
            numbers.forEach(number => {
                DivisionList.push(parseInt(number)); // Convert string to integer and push to numberList
            })
        var DepartmentStr = $(DepartmentListElement).val()
        numbers = DepartmentStr.split(',')
        let DepartmentList = [];
        if (DepartmentStr.length)
            numbers.forEach(number => {
                DepartmentList.push(parseInt(number)); // Convert string to integer and push to numberList
            })
        var OccupationStr = $(OccupationListElement).val()
        numbers = OccupationStr.split(',')
        let OccupationList = [];
        if (OccupationStr.length)
            numbers.forEach(number => {
                OccupationList.push(parseInt(number)); // Convert string to integer and push to numberList
            })
        var criteria: any;

        EmployeeProfileService.List({
            Criteria: Criteria.and(criteria, [[EmployeeProfileRow.Fields.Terminated], '=', 0]
                , [[EmployeeProfileRow.Fields.Resigned], '=', 0]
                , [[EmployeeProfileRow.Fields.Retired], '=', 0])
        }, response => {
            let EmployeeBuffer : any [] = []
            for (var index in response.Entities) {
                if (response.Entities[index].CreateUser == true)
                continue
                var found = 0
                for (var JobGradeIndex in JobGradeList) {
                    if (response.Entities[index].JobGradeID == JobGradeList[JobGradeIndex]) {
                        found = 1
                        break
                    }
                }
                for (var DivisionIndex in DivisionList) {
                    if (response.Entities[index].DivisionID == DivisionList[DivisionIndex]) {
                        found = 1
                        break
                    }
                }
                for (var DepartmentIndex in DepartmentList) {
                    if (response.Entities[index].DepartmentID == DepartmentList[DepartmentIndex]) {
                        found = 1
                        break
                    }
                }
                for (var OccupationIndex in OccupationList) {
                    if (response.Entities[index].OccupationID == OccupationList[OccupationIndex]) {
                        found = 1
                        break
                    }
                }
                for (var SectionIndex in SectionList) {
                    if (response.Entities[index].SectionID == SectionList[SectionIndex]) {
                        found = 1
                        break
                    }
                }
                if (found == 0) {
                    let EmployeeRowList = []
                    var EmployeeRowString = self.form.EmployeeRowList.value
                    if (EmployeeRowString != "") {
                        let EmployeeRowListBuffer = EmployeeRowString.split(',')
                        EmployeeRowListBuffer.forEach(number => {
                            EmployeeRowList.push(parseInt(number)); // Convert string to integer and push to numberList
                        })
                        EmployeeRowList = EmployeeRowList.filter(number => number !== response.Entities[index].Id);
                        self.form.EmployeeRowList.value = EmployeeRowList.join(',')
                    }
                    else
                        self.form.EmployeeRowList.value = ""
                }
                else {

                    var obj = findEmployee(self.originalItems, response.Entities[index].Id)
                    EmployeeBuffer.push(obj)
                    let EmployeeRowList = []
                    var EmployeeRowString = self.form.EmployeeRowList.value
                    if (EmployeeRowString != "") {
                        if (EmployeeRowString.includes(',')) {
                            let EmployeeRowListBuffer = EmployeeRowString.split(',')
                            EmployeeRowListBuffer.forEach(number => {
                                EmployeeRowList.push(parseInt(number)); // Convert string to integer and push to numberList
                            })
                            if (EmployeeRowList.indexOf(response.Entities[index].Id) === -1)
                                self.form.EmployeeRowList.value = self.form.EmployeeRowList.value + ' , ' + response.Entities[index].Id.toString()
                        }
                        else
                            self.form.EmployeeRowList.value = self.form.EmployeeRowList.value + ' , ' + response.Entities[index].Id.toString()
                    }
                    else 
                        self.form.EmployeeRowList.value = response.Entities[index].Id.toString()
                }
            }
            $(self.form.EmployeeRowHrPriveledge).trigger('change')
            self.form.EmployeeRowHrPriveledge.items = EmployeeBuffer
            self.form.EmployeeRowHrPriveledge.values = self.form.EmployeeRowHrPriveledge.values.filter(item => self.form.EmployeeRowList.values.includes(item));


        })



    }
    public PartialSearchCallback(): void {
        var self = this
        function findEmployee(data, id) {
            return data.find(item => item.id == id.toString());
        }
        let EmployeeBuffer: any[] = []
        for (var index in this.form.EmployeeRowList.values) {
            var obj = findEmployee(self.originalItems, this.form.EmployeeRowList.values[index])
            EmployeeBuffer.push(obj)
        }
        this.form.EmployeeRowHrPriveledge.values = this.form.EmployeeRowHrPriveledge.values.filter(item => this.form.EmployeeRowList.values.includes(item));
        self.form.EmployeeRowHrPriveledge.items = EmployeeBuffer
    }
    public counter: number;
    public originalItems: any[];

    public WaitingCounter: number;
    protected getToolbarButtons() {
        var self = this;
        var buttons = super.getToolbarButtons();
        $("#" + this.idPrefix + 'Toolbar').addClass("ms-auto")
        buttons.push(
            {

                title: "Create Accounts",	// *** Get button text from translation
                cssClass: 'text-bg-success p-2 ml-auto',
                icon: 'fas fa-hat-wizard text-green',
                onClick: () => {
                    if (self.form.EmployeeRowList.value.length == 0) {
                        alertDialog("No employee account to create")

                        return
                    }

                    confirm(//  the user confirm dont want to download
                        "Are you sure to create account for these employees?",
                        () => {

                            if (isEmptyOrNull(self.form.EmployeeRowList.value)) {
                                notifyError('No employee is selected');
                                return
                            }
                            var EmployeeRowIdString = self.form.EmployeeRowList.value
                            let EmployeeRowIdList = [];
                            let numbers = EmployeeRowIdString.split(',')
                            if (EmployeeRowIdString.length)
                                numbers.forEach(number => {
                                    EmployeeRowIdList.push(parseInt(number)); // Convert string to integer and push to numberList
                                })
                            for (var index in EmployeeRowIdList) {
                                EmployeeProfileService.Retrieve({
                                    EntityId: EmployeeRowIdList[index]
                                }, response => {
                                    var Username = 'T' + response.Entity.EmployeeID
                                    var PassWord= 'TSH' + response.Entity.EmployeeID

                                    UserService.Create({
                                        Entity:
                                        {
                                            "Username": Username,
                                            "DisplayName": response.Entity.EmployeeName,
                                            "Password": PassWord,
                                            "PasswordConfirm": PassWord,
                                            "Email": response.Entity.EmployeeEmail,
                                            "MobilePhoneNumber": response.Entity.TelNumber1,
                                            "EmployeeRowID": response.Entity.Id
                                        },
                                    });
                                    EmployeeProfileService.Update({
                                        EntityId: response.Entity.Id,
                                        Entity:
                                        {
                                            "UserPassword": PassWord,
                                            "UserName": Username

                                        },
                                    });


                                })
                            }

                            self.form.EmployeeRowList.value = ''
                            notifySuccess("Account creation success, the username will be same as password in format T{ID}")
                        })
                },
            }
        );
        return buttons
    }

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen();
        function removeObjectById(data, idToRemove) {
            return data.filter(item => item.id !== idToRemove.toString());
        }
        this.saveAndCloseButton.hide()
        //this.saveAndCloseButton.text("Generate Payslip")
        this.editButton.hide()
        this.applyChangesButton.hide()
        this.deleteButton.hide()
        this.localizationButton.hide()
        this.cloneButton.hide()
        this.undeleteButton.hide()
        
        var criteria: any;
        this.originalItems = Array.from(this.form.EmployeeRowHrPriveledge.items)
        this.form.EmployeeRowHrPriveledge.clearItems()
        EmployeeProfileService.List({
            Criteria: Criteria.and(criteria, [[EmployeeProfileRow.Fields.Terminated], '=', 0]
                , [[EmployeeProfileRow.Fields.Resigned], '=', 0]
                , [[EmployeeProfileRow.Fields.Retired], '=', 0])


        }, response => {
            var EmployeeList = this.form.EmployeeRowList.items
            console.log(response.Entities)
            for (var index in response.Entities) {
                if (response.Entities[index].CreateUser == true) {
                    console.log(response.Entities[index])
                    EmployeeList = removeObjectById(EmployeeList, response.Entities[index].Id);
                }
            }
            console.log(EmployeeList)
            this.form.EmployeeRowList.items = EmployeeList
        })
        var self = this;
      

        var SectionListElement = document.getElementById(this.idPrefix + 'SectionList');
        var OccupationListElement = document.getElementById(this.idPrefix + 'OccupationList');
        var DepartmentListElement = document.getElementById(this.idPrefix + 'DepartmentList');
        var DivisionListElement = document.getElementById(this.idPrefix + 'DivisionList');
        var JobGradeListElement = document.getElementById(this.idPrefix + 'JobGradeList');
        var EmployeeRowIdListElement = document.getElementById(this.idPrefix + 'EmployeeRowList');
        var AllEmployeeElement = document.getElementById(this.idPrefix + 'AllEmployee');
        $(SectionListElement).on('change', async function () {
            self.SearchCallback()
        })
        $(OccupationListElement).on('change', async function () {
            self.SearchCallback()
        })
        $(DivisionListElement).on('change', async function () {
            self.SearchCallback();
        })
        $(JobGradeListElement).on('change', async function () {
            self.SearchCallback();
        })
        $(DepartmentListElement).on('change', async function () {
            self.SearchCallback();
        })
        $(EmployeeRowIdListElement).on('change', async function () {
            self.PartialSearchCallback();
        })
        $(AllEmployeeElement).on('change', async function () {
            if (self.form.AllEmployee.value == true) {
                self.form.DepartmentList.value = ''
                self.form.SectionList.value = ''
                self.form.DivisionList.value = ''
                self.form.JobGradeList.value = ''
                self.form.OccupationList.value = ''
                self.form.EmployeeRowList.value = ''
                EmployeeProfileService.List({
                }, response => {
                    let EmployeeRowList = []

                    for (var index in response.Entities) {
                        var number = response.Entities[index].Id                      
                        EmployeeRowList.push(number); // Convert string to integer and push to numberList

                    }
                    self.form.EmployeeRowList.value = EmployeeRowList.join(',')
                    

                })

            }
            else
                self.form.EmployeeRowList.value = ''
        })

        

    }


}