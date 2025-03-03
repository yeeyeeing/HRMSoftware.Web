import { Decorators, EntityDialog, EditorUtils, Criteria, RetrieveResponse } from '@serenity-is/corelib';
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
    public multipleSelectHr: any;
    public UserNamePrefix: string;
    public PasswordPrefix: string;

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
            let EmployeeBuffer: any[] = []
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
                            var listOfUsedUsername: string[] = [];

                            UserService.List({}, response => {
                                console.log(response);
                                for (var res in response.Entities)
                                    listOfUsedUsername.push(response.Entities[res].Username);

                                async function processEmployees(EmployeeRowIdList: number[]) {
                                    let listOfUsername: string[] = [];
                                    let listOfPassword: string[] = [];
                                    let employeeList: EmployeeProfileRow[] = [];
                                    let fail = 0;

                                    // Collect all retrieval promises
                                    let retrievePromises = EmployeeRowIdList.map(id =>
                                        new Promise<void>((resolve, reject) => {
                                            EmployeeProfileService.Retrieve({ EntityId: id }, response => {
                                                if (!isEmptyOrNull(response.Entity.EmployeeID)) {
                                                    let Username = self.UserNamePrefix + response.Entity.EmployeeID;
                                                    let PassWord = self.PasswordPrefix + response.Entity.EmployeeID;

                                                    if (Username.length < 5 || PassWord.length < 6) {
                                                        alertDialog(`Username must be at least 5 characters, Password must be at least 6 characters. Error in creating ${response.Entity.EmployeeID} ${response.Entity.EmployeeName}`);
                                                        fail = 1;
                                                        reject(); // Reject promise on failure
                                                        return;
                                                    }

                                                    if (listOfUsedUsername.indexOf(Username) !== -1) {
                                                        alertDialog(`Username ${Username} for Employee ${response.Entity.EmployeeID} ${response.Entity.EmployeeName} already exists, create failed`);
                                                        fail = 1;
                                                        reject();
                                                        return;
                                                    }

                                                    listOfPassword.push(PassWord);
                                                    listOfUsername.push(Username);
                                                    employeeList.push(response.Entity);
                                                }
                                                resolve();
                                            });
                                        })
                                    );

                                    try {
                                        await Promise.all(retrievePromises);
                                    } catch {
                                        console.error("One or more retrievals failed.");
                                        return; // Stop execution if any retrieval failed
                                    }

                                    // If fail is set, stop execution
                                    if (fail === 1) {
                                        return;
                                    }

                                    // Process user creation
                                    let createUserPromises = listOfUsername.map((Username, i) =>
                                        new Promise<void>((resolve, reject) => {
                                            let PassWord = listOfPassword[i];

                                            UserService.Create({
                                                Entity: {
                                                    "Username": Username,
                                                    "DisplayName": employeeList[i].EmployeeName,
                                                    "Password": PassWord,
                                                    "PasswordConfirm": PassWord,
                                                    "Email": employeeList[i].EmployeeEmail,
                                                    "MobilePhoneNumber": employeeList[i].TelNumber1,
                                                    "EmployeeRowID": employeeList[i].Id
                                                }
                                            }, response => {
                                                var userRowId = response.EntityId
                                                let updateData: EmployeeProfileRow = {};

                                                if (self.form.EmployeeRowHrPriveledge.values.indexOf(employeeList[i].Id.toString()) !== -1)
                                                    updateData.GrantHRPrivilege = true
                                                updateData.UserPassword = PassWord
                                                updateData.UserName = Username
                                                updateData.CreateUser = true
                                                updateData.UserRowID = userRowId

                                                EmployeeProfileService.Update({
                                                    EntityId: employeeList[i].Id,
                                                    Entity: updateData
                                                }, () => resolve(), () => reject());
                                            }, () => reject());
                                        })
                                    );

                                    try {
                                        await Promise.all(createUserPromises);

                                        console.log("All users created and updated successfully.");

                                        // ✅ Moved inside to only trigger on success
                                        notifySuccess(
                                            `Account creation success, username will be in format ${self.UserNamePrefix}{EmployeeID},
                                            default password will be in format ${self.PasswordPrefix}{EmployeeID}`
                                        );
                                        self.loadEntity({});


                                    } catch {
                                        console.error("Some user creations failed.");
                                    }
                                }

                                // Run the function
                                processEmployees(EmployeeRowIdList);

                            });

                        })
                },
            }
        );
        return buttons
    }

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen();
        var self = this
        
        $.ajax({
            type: "POST",
            url: '/GetUserNamePasswordPrefix',
            success: function (response) {
                console.log(response);
                const result = response.split(',');
                self.UserNamePrefix = result[0]
                self.PasswordPrefix = result[1]
            },
            error: function (xhr, status, error) {
                console.error('Error saving image:', error);
            }
        })
 
        this.saveAndCloseButton.hide()
        this.editButton.hide()
        this.applyChangesButton.hide()
        this.deleteButton.hide()
        this.localizationButton.hide()
        this.cloneButton.hide()
        this.undeleteButton.hide()

        this.originalItems = Array.from(this.form.EmployeeRowHrPriveledge.items)
        this.form.EmployeeRowHrPriveledge.clearItems()
 
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
                var criteria: any;

                EmployeeProfileService.List({
                    Criteria: Criteria.and(criteria, [[EmployeeProfileRow.Fields.Terminated], '=', 0]
                        , [[EmployeeProfileRow.Fields.Resigned], '=', 0]
                        , [[EmployeeProfileRow.Fields.Retired], '=', 0]
                        , [[EmployeeProfileRow.Fields.CreateUser], '=', 0]
                    )
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