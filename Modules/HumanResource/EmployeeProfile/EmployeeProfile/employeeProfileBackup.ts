import { DataGrid, Decorators, EditorUtils, EntityDialog, Select2Editor } from '@serenity-is/corelib';
import { EmployeeCareerPathRow, EmployeeCareerPathService, EmployeeProfileForm, EmployeeProfileRow, EmployeeProfileService, EmployeeType, ProbationClass, SOCSOClass } from '../../../ServerTypes/EmployeeProfile';
import { alertDialog, getHighlightTarget, RetrieveResponse, serviceCall } from '@serenity-is/corelib/q';
import { ShiftService } from '../../../ServerTypes/Shift';
import { UserDialog } from '../../../Administration/User/UserDialog';
import { UserPermissionService, UserRow, UserService } from '../../../ServerTypes/Administration';
import { UserPermissionDialog } from '../../../Administration/UserPermission/UserPermissionDialog';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { CompanySettingsService } from '../../../ServerTypes/CompanySettings';
import { EmployeeEditHistoryService } from '../../../ServerTypes/EmployeeEditHistory';
import { userDefinition } from '../../../Administration/User/Authentication/Authorization';
import { Authorization, isEmptyOrNull } from '@serenity-is/corelib/q';
import { TerminateEmployeeDialog } from '../TerminateEmployee/TerminateEmployeeDialog';
import { EmployeeResignDialog } from '../EmployeeResign/EmployeeResignDialog';
import { ListResponse, confirm } from '@serenity-is/corelib/q';
import { AnnouncementWizardService } from '../../../ServerTypes/Announcement';
import { OTApplicationService } from '../../../ServerTypes/OTApplication';
import { informationDialog, notifyError, notifySuccess, successDialog, warningDialog } from "@serenity-is/corelib";
import { confirmDialog, notifyInfo } from '@serenity-is/corelib/q';

interface EmployeeUser {
    EmployeeRowId: number;
    UserName: string;
    UserId: number;
}
@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeeProfileDialog')

export class EmployeeProfileDialog extends EntityDialog<EmployeeProfileRow, any> {
    protected getFormKey() { return EmployeeProfileForm.formKey; }
    protected getRowDefinition() { return EmployeeProfileRow; }
    protected getService() { return EmployeeProfileService.baseUrl; }

    protected form = new EmployeeProfileForm(this.idPrefix);
    public list_of_employee_id: string[] = [];
    public list_of_employee_row_id: number[] = [];

    //public ListOfUserName: string[] = [];
    public ListOfUser: EmployeeUser[] = [];


    public OriginalEmployeeId: string;
    public Username: string;
    public ProbationMonths: number;

    public permission: string;
    public UserRowID: number;
    public EmployeeRowID: number;
    public OriginalValue: Record<string, string> = {};
    public EditedValue: Record<string, string> = {};
    public RetireAge: number;
    public OriginalCreateUserValue: number;

    constructor() {
        super();
        this.form.FixedDeductionList.slickGrid.setOptions({ rowHeight: 30 });
        this.form.AllowanceLists.slickGrid.setOptions({ rowHeight: 30 });
        this.form.EmployeeCareerPath.slickGrid.setOptions({ rowHeight: 30 });

        this.cloneButton.remove()
        EmployeeProfileService.List({
        }, response => {
            for (var key in response.Entities) {
                this.list_of_employee_id.push(response.Entities[key].EmployeeID)
                this.list_of_employee_row_id.push(response.Entities[key].Id)
            }
        });

    }

    public onDeleteSuccess(response) {

        super.onDeleteSuccess(response)
        var self = this
        UserService.Update({
            EntityId: self.form.UserRowID.value,
            Entity:
            {
                "EmployeeRowID": null,
                "Email": null,

            },
        });


    }
    public createUser() {
        UserService.Create({
            Entity:
            {
                "Username": this.form.UserName.value,
                "DisplayName": this.form.EmployeeName.value,
                "Password": this.form.UserPassword.value,
                "PasswordConfirm": this.form.UserPassword.value,
                "Email": this.form.EmployeeEmail.value,
                "MobilePhoneNumber": this.form.TelNumber1.value
            },
        });
    }
    protected onSaveSuccess(response): void {
        var self = this
        var entity_id = this.entityId

        if (this.isNew()) {
            var UserName = Authorization.userDefinition.Username
            var Today = new Date()
            var Description = 'Employee ' + this.form.EmployeeName.value + ' is created by ' + UserName
                + ' on ' + Today
            EmployeeEditHistoryService.Create({
                Entity:
                {
                    "Description": Description,
                    "OldValue": null,
                    "NewValue": null,
                    "FieldName": null,
                    "EmployeeRowId": this.EmployeeRowID

                },
            });
            if (this.form.CreateUser.value == true && isEmptyOrNull(self.form.UserRowID.value))
                this.createUser()

        }
        else if (!this.isNew())//not new
        {
            console.log('haha')
            if (this.form.CreateUser.value == true && isEmptyOrNull(self.form.UserRowID.value)) {
                UserService.List({
                }, response => {
                    var found = 0
                    for (var index in response.Entities) {
                        if (response.Entities[index].EmployeeRowID == entity_id) {
                            found = 1
                            UserService.Update({
                                EntityId: response.Entities[index].UserId,
                                Entity:
                                {
                                    "DisplayName": this.form.EmployeeName.value,
                                    "Email": this.form.EmployeeEmail.value,
                                    "MobilePhoneNumber": this.form.TelNumber1.value
                                },
                            });

                        }
                    }
                    if (found == 0)
                        self.createUser()
                    this.Record(this.EditedValue)
                    var keys = Object.keys(this.EditedValue);
                    var UserName = Authorization.userDefinition.Username
                    var Today = new Date()
                    for (const key of keys) {
                        if (this.EditedValue[key] != this.OriginalValue[key] && typeof this.OriginalValue[key] != "object"
                            && typeof this.EditedValue[key] != "object") {
                            var Word = key
                            Word = Word.replace(/ID/g, "")
                            if (isEmptyOrNull(this.OriginalValue[key])) {
                                var Description = Word + ' of ' + this.form.EmployeeName.value + ' is set by ' + UserName
                                    + ' to ' + this.EditedValue[key] + ' on ' + Today
                            }
                            else {
                                var Description = Word + ' of ' + this.form.EmployeeName.value + ' is changed by ' + UserName
                                    + ' from ' + this.OriginalValue[key] + ' to ' + this.EditedValue[key] + ' on ' + Today
                            }


                            EmployeeEditHistoryService.Create({
                                Entity:
                                {
                                    "Description": Description,
                                    "OldValue": this.OriginalValue[key],
                                    "NewValue": this.EditedValue[key],
                                    "FieldName": key,
                                    "EmployeeRowId": this.EmployeeRowID
                                },
                            });

                        }

                    }

                });
            }

            else {
                this.Record(this.EditedValue)
                var keys = Object.keys(this.EditedValue);
                var UserName = Authorization.userDefinition.Username

                for (const key of keys) {
                    if (this.EditedValue[key] !== this.OriginalValue[key] && typeof this.OriginalValue[key] != "object"
                        && typeof this.EditedValue[key] != "object") {
                        var Today = new Date()
                        var Word = key
                        Word = Word.replace(/ID/g, "")
                        if (isEmptyOrNull(this.OriginalValue[key]))
                            var Description = Word + ' of ' + this.form.EmployeeName.value + ' is set by ' + UserName
                                + ' to ' + this.EditedValue[key] + ' on ' + Today
                        else
                            var Description = Word + ' of ' + this.form.EmployeeName.value + ' is changed by ' + UserName
                                + ' from ' + this.OriginalValue[key] + ' to ' + this.EditedValue[key] + ' on ' + Today

                        EmployeeEditHistoryService.Create({
                            Entity:
                            {
                                "Description": Description,
                                "OldValue": this.OriginalValue[key],
                                "NewValue": this.EditedValue[key],
                                "FieldName": key,
                                "EmployeeRowId": this.EmployeeRowID
                            },
                        });

                    }
                }
            }


        }

        super.onSaveSuccess(response);
    }

    protected dialogOpen() {
        super.dialogOpen()
        var self = this
        $(document).on('click', '.tool-button.add-button', function () {
            console.log('Add button clicked');
            var prevLength = self.form.EmployeeCareerPath.value.length
            $('.s-HRMSoftware-EmployeeProfile-EmployeeCareerPathEditDialog').on("dialogclose", function () {
                if (prevLength != self.form.EmployeeCareerPath.value.length) {
                    for (let i = 0; i < self.form.EmployeeCareerPath.value.length; i++) {
                        if (isEmptyOrNull(self.form.EmployeeCareerPath.value[i].IsActive)) {
                            console.log
                            self.form.EmployeeCareerPath.value[i].IsActive = 1
                            EmployeeCareerPathService.Create({
                                Entity:
                                {
                                    "EmployeeRowId": self.entityId,
                                    "CareerPathId": self.form.EmployeeCareerPath.value[i].CareerPathId,
                                    "CareerPathCode": self.form.EmployeeCareerPath.value[i].CareerPathCode,
                                    "NewValue": self.form.EmployeeCareerPath.value[i].NewValue,
                                    "newCostCentre": self.form.EmployeeCareerPath.value[i].newCostCentre,
                                    "newDivision": self.form.EmployeeCareerPath.value[i].newDivision,
                                    "newDepartment": self.form.EmployeeCareerPath.value[i].newDepartment,
                                    "newSection": self.form.EmployeeCareerPath.value[i].newSection,
                                    "newOccupation": self.form.EmployeeCareerPath.value[i].newOccupation,
                                    "newJobGrade": self.form.EmployeeCareerPath.value[i].newJobGrade,
                                    "EffectiveDate": self.form.EmployeeCareerPath.value[i].EffectiveDate,
                                    "Description": self.form.EmployeeCareerPath.value[i].Description,
                                    "ManDesc": self.form.EmployeeCareerPath.value[i].ManDesc
                                },
                            });

                        }
                    }
                }
            })
        });



    }
    protected onDialogOpen() {
        super.onDialogOpen()
        var self = this
        /*
        $(document).on('click', '.s-HRMSoftware-EmployeeProfile-EmployeeCareerPathEditor.tool-button.add-button', function () {
            console.log('Add button clicked');
            $('.s-HRMSoftware-EmployeeProfile-EmployeeCareerPathEditDialog').on("dialogclose", function () {

                console.log(self.form.EmployeeCareerPath.value)
                for (let i = 0; i < self.form.EmployeeCareerPath.value.length; i++) {
                    console.log(self.form.EmployeeCareerPath.value[i])
                }
            })

        });
        */

        if (this.isNew())
            CompanySettingsService.List({
            }, response => {
                for (var key in response.Entities) {
                    if (response.Entities[key].IsActive == 1) {
                        this.ProbationMonths = response.Entities[key].ProbationPeriod
                        this.RetireAge = response.Entities[key].RetireAge
                        self.form.ProbationPeriod.value = this.ProbationMonths
                    }
                }
            });

        $('.UserRowID').hide()
        var EpfAccountNumberElement = document.getElementById(this.idPrefix + 'EpfAccountNumber')
        $(EpfAccountNumberElement).on('input', async function () {
            let value = this.value;

            // Remove non-numeric characters
            value = value.replace(/\D/g, '');

            // Limit to 3 characters
            if (value.length > 19)
                value = value.slice(0, 19);


            // Update input value
            this.value = value;
        })


        var NricElement = document.getElementById(this.idPrefix + 'Nric')
        $(NricElement).on('input', async function () {
            let value = this.value;
            // Remove non-numeric characters
            value = value.replace(/\D/g, '');
            // Limit to 3 characters
            if (value.length > 12)
                value = value.slice(0, 12);
            // Update input value
            this.value = value;
        })
        var SsfwNumberElement = document.getElementById(this.idPrefix + 'SsfwNumber')
        $(SsfwNumberElement).on('input', async function () {
            let value = this.value;
            // Remove non-numeric characters
            value = value.replace(/\D/g, '');
            // Limit to 3 characters
            if (value.length > 12)
                value = value.slice(0, 12);
            // Update input value
            this.value = value;
        })

        EditorUtils.setReadonly(self.form.Age.element, true);









        var PrevLength = self.form.EmployeeCareerPath.value.length


        $('.OtPayEntitlement').parent().after(`<ul role="tablist" class="nav nav-tabs property-tabs">
            <li class="nav-item" role="presentation"> <a class="nav-link custom active AllowanceLists" data-bs-toggle="tab" role="tab">Allowance</a> </li>
            <li class="nav-item" role="presentation"> <a class="nav-link custom FixedDeductionList" data-bs-toggle="tab" role="tab"> Deductions</a></li>
        </ul>
        `)
        $('.field.FixedDeductionList').parent().hide()


        $('.field.OtPayEntitlement, .field.FixedOtRateOption, .field.PayByMonth, .field.PayByHour, .field.PayByDay').addClass('col-2');


        document.querySelectorAll('.nav-link.custom').forEach(link => {
            link.addEventListener('click', function () {
                // Remove 'active' class from all <a> elements
                document.querySelectorAll('.nav-link.custom').forEach(item => item.classList.remove('active'));

                // Add 'active' class to the clicked <a> element
                this.classList.add('active');
                console.log(this.classList)
                const containsAllowanceList = Object.values(this.classList).includes("AllowanceLists");
                const containsFixedDeductionList = Object.values(this.classList).includes("FixedDeductionList");
                if (containsAllowanceList) {
                    $('.field.AllowanceLists').parent().show()
                    $('.field.FixedDeductionList').parent().hide()
                }
                else if (containsFixedDeductionList) {
                    $('.field.AllowanceLists').parent().hide()
                    $('.field.FixedDeductionList').parent().show()
                }
            });
        });
        $('.FixedOtRateOption').hide();

        var EmployeeTypeElement = document.getElementById(`${this.idPrefix}EmployeeType`)
        $(EmployeeTypeElement).on('change', async function () {
            $(`.SsfwNumber, .Nric, .OldNRIC`).hide()
            if (parseInt(self.form.EmployeeType.value) == EmployeeType.Local.valueOf())
                $(`.Nric, .OldNRIC`).show()
            else if (parseInt(self.form.EmployeeType.value) == EmployeeType.Foreigner.valueOf())
                $(`.SsfwNumber`).show()

        })
        if (!this.isNew()) {
            $(EmployeeTypeElement).trigger('change')
            var originalDivision = self.form.DivisionID.value
            var originalDepartment = self.form.DepartmentID.value
            var originalOccupation = self.form.OccupationID.value
            var originalSection = self.form.SectionID.value
            var originalJobGrade = self.form.JobGradeID.value
            var originalSalary = self.form.BasicSalary.value


            var DivisionIdElement = document.getElementById(`${this.idPrefix}DivisionID`)
            var Cp8dIdElement = document.getElementById(`${this.idPrefix}Cp8dID`)
            var DepartmentIdElement = document.getElementById(`${this.idPrefix}DepartmentID`)
            var SectionIdElement = document.getElementById(`${this.idPrefix}SectionID`)
            var JobGradeIdElement = document.getElementById(`${this.idPrefix}JobGradeID`)
            var OccupationIdElement = document.getElementById(`${this.idPrefix}OccupationID`)
            var CostCentreIdElement = document.getElementById(`${this.idPrefix}CostCentreID`)
            var BasicSalaryElement = document.getElementById(`${this.idPrefix}BasicSalary`)

            $(DivisionIdElement).find('.select2-selection__clear').remove();
            self.form.DivisionID.element.next('.select2-container').find('.select2-selection__clear').remove();
            function removeNewRecords() {
                console.log(originalSalary)
                console.log(self.form.BasicSalary.value)

                if (self.form.DivisionID.value == originalDivision
                    && self.form.DepartmentID.value == originalDepartment
                    && self.form.OccupationID.value == originalOccupation
                    && self.form.JobGradeID.value == originalJobGrade
                    && self.form.JobGradeID.value == originalJobGrade
                    && self.form.SectionID.value == originalSection
                    && self.form.BasicSalary.value == originalSalary
                ) {
                    $('.EmployeeCareerPath').parent().show()
                }
                else {
                    if ($('.EmployeeCareerPath').parent().is(":hidden") == false) {
                        alertDialog("The edits to Basic Salary, Division, Department, Occupation, Job Grade and Section must be saved before Making employee progressions")
                        $('.EmployeeCareerPath').parent().hide()
                    }
                    var Results: ConcreteEmployeeCareerPathRow[] = []
                    for (let i = 0; i < self.form.EmployeeCareerPath.value.length; i++) {
                        if (!isEmptyOrNull(self.form.EmployeeCareerPath.value[i].Id)) {
                            var result = new ConcreteEmployeeCareerPathRow()
                            result = self.form.EmployeeCareerPath.value[i]
                            Results.push(result)
                        }
                    }
                    self.form.EmployeeCareerPath.value = Results

                }
            }

            $(BasicSalaryElement).on('change', async function () {
                removeNewRecords()
            })
            $(DivisionIdElement).on('change', async function () {
                removeNewRecords()
            })
            $(Cp8dIdElement).on('change', async function () {
                removeNewRecords()
            })
            $(DepartmentIdElement).on('change', async function () {
                removeNewRecords()
            })
            $(SectionIdElement).on('change', async function () {
                removeNewRecords()
            })
            $(JobGradeIdElement).on('change', async function () {
                removeNewRecords()
            })
            $(OccupationIdElement).on('change', async function () {
                removeNewRecords()
            })
            $(CostCentreIdElement).on('change', async function () {
                removeNewRecords()
            })
        }
        else {
            $('.CareerPahth').parent().hide()
            $('.EmployeeCareerPath').parent().hide()
        }


        var OtPayEntitlement = document.getElementById(`${this.idPrefix}OtPayEntitlement`)
        $(OtPayEntitlement).on('change', async function () {
            if (self.form.OtPayEntitlement.value == true)
                $('.FixedOtRateOption, .OtRateWeekday, .OtRateWeekend, .OtRatePublicHoliday, .FixedOtRateOption').show();

            else if (self.form.OtPayEntitlement.value == false) {
                self.form.OtRateWeekday.value = self.form.OtRateWeekend.value = self.form.OtRatePublicHoliday.value = 0
                $('.OtRateWeekday, .OtRateWeekend, .OtRatePublicHoliday, .FixedOtRateOption').hide();
            }
        })
        $(OtPayEntitlement).trigger('change')
        var FixedOtRateOption = document.getElementById(`${this.idPrefix}FixedOtRateOption`)
        $(FixedOtRateOption).on('change', async function () {
            if (self.form.FixedOtRateOption.value == true) {
                EditorUtils.setReadonly(self.form.OtRatePublicHoliday.element, false);
                EditorUtils.setReadonly(self.form.OtRateWeekday.element, false);
                EditorUtils.setReadonly(self.form.OtRateWeekend.element, false);
            }
            else if (self.form.FixedOtRateOption.value == false) {
                EditorUtils.setReadonly(self.form.OtRatePublicHoliday.element, true);
                EditorUtils.setReadonly(self.form.OtRateWeekday.element, true);
                EditorUtils.setReadonly(self.form.OtRateWeekend.element, true);
            }
        })
        $(FixedOtRateOption).trigger('change')


        EditorUtils.setReadonly(this.form.WorkingHour.element, true);
        EditorUtils.setReadonly(this.form.WorkingDays.element, true);
        EditorUtils.setReadonly(this.form.DailyRateBase.element, true);
        EditorUtils.setReadonly(this.form.NplRateBase.element, true);

        var PassWordElement = this.form.UserPassword.element;
        var UserNameElement = this.form.UserName.element;
        $(PassWordElement).attr('autocomplete', 'off');
        $(UserNameElement).attr('autocomplete', 'off');
        const tooltip = document.createElement('div');
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = '#000';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '4px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
        tooltip.style.display = 'none'; // Initially hidden
        document.body.appendChild(tooltip);

        if (parseInt(this.form.EmployeeType.value) == EmployeeType.Local || this.isNew())
            $('.IssueDate, .WorkingPermitIssueDate, .WorkingPermitExpireDate, .WorkingPermitValidFrom, .WorkingPermitValidUntil, .ArrivalDate').hide();


        this.validateBeforeSave()
        {
            this.form.CreateUser.addValidationRule(this.uniqueName,
                e => {
                    if (this.form.CreateUser.value && (isEmptyOrNull(this.form.UserName.value) || isEmptyOrNull(this.form.UserPassword.value))) {
                        return "Please fill in UserName and Password";
                    }
                    return null;
                });
        };
        var BirthdayElement = document.getElementById(this.idPrefix + 'Birthday')
        EditorUtils.setReadonly(this.form.RetireDate.element, true);
        $(BirthdayElement).on("change", function () {
            var birthDate = self.form.Birthday.valueAsDate
            const retireYear = birthDate.getFullYear() + self.RetireAge;

            // Create a new date for the retirement year with the same month and day as the birthdate
            const retireDate = new Date(birthDate);
            retireDate.setFullYear(retireYear);

            // If the birth month and day is after the current date, adjust the retirement date to the next year
            if (retireDate < new Date())
                retireDate.setFullYear(retireYear + 1);

            self.form.RetireDate.valueAsDate = retireDate
        });

        var UsernameElement = document.getElementById(this.idPrefix + 'UserName')
        var UserNameDialog = 'Username Cannot Start With Number, No Special Characters'
        $(UsernameElement).on("blur", function () {
            // If input is empty, set default text
            if (isEmptyOrNull($(this).val())) {
                $(this).val(UserNameDialog);
                $(this).css({
                    "color": "grey" // Set text color to grey
                });
            }
        });
        $(UsernameElement).on("focus", function () {
            if ($(this).val() == UserNameDialog) {
                $(this).val('');
                $(this).css({
                    "color": "black" // Set text color to grey
                });
            }
        });

        $(UsernameElement).on("change", function () {

            if ($(this).val() != '' && $(this).val() != UserNameDialog)
                $(this).css("color", "black");

            else
                $(this).css("color", "grey");

        });
        $(UsernameElement).on("keydown", function (event) {
            var caretPosition = this.selectionStart; // Get the current caret position
            // Allow letters and numbers
            var allowedKeys = /[A-Za-z0-9]/;
            // Allow special keys like backspace, delete, arrows, etc.
            var specialKeys = [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 144, 145];
            // Check if the pressed key is a special key or an allowed character
            if (event.key.match(allowedKeys) || specialKeys.includes(event.keyCode)) {
                // Valid key input, check if it starts with a number
                if (caretPosition === 0 && event.key.match(/[0-9]/)) {
                    event.preventDefault(); // Prevent input if starting with a number
                }
            } else
                event.preventDefault();
        });

        $(UsernameElement).on('mouseenter', () => {
            tooltip.innerHTML = "Please dont use repeated username <br> Username can not contain anything else than number and characters"; // Tooltip text
            const inputRect = $(UserNameElement)[0].getBoundingClientRect();
            tooltip.style.display = 'block';
            tooltip.style.top = `${inputRect.bottom}px`; // Position below input
            tooltip.style.left = `${inputRect.left}px`; // Align with input
        });

        $(UsernameElement).on('mouseleave', () => {
            tooltip.style.display = 'none';
        });
        var UserPasswordElement = document.getElementById(this.idPrefix + 'UserPassword')
        var UserPasswordDialog = 'Password length must be greater or equal to 6'
        $(UserPasswordElement).on("blur", function () {
            // If input is empty, set default text
            if (isEmptyOrNull($(this).val())) {
                $(this).val(UserPasswordDialog);
                $(this).css({
                    "color": "grey" // Set text color to grey
                });
            }
        });
        $(UserPasswordElement).on("focus", function () {
            if ($(this).val() == UserPasswordDialog) {
                $(this).val('');
                $(this).css({
                    "color": "black" // Set text color to grey
                });
            }
        });
        $(UserPasswordElement).on("change", function () {
            if ($(this).val() != '' && $(this).val() != UserPasswordDialog)
                $(this).css("color", "black");
            else
                $(this).css("color", "grey");

        });
        $(UserPasswordElement).on('mouseenter', () => {
            tooltip.innerHTML = 'Password length must be greater or equal to 6'; // Tooltip text
            const inputRect = $(UserPasswordElement)[0].getBoundingClientRect();
            tooltip.style.display = 'block';
            tooltip.style.top = `${inputRect.bottom}px`; // Position below input
            tooltip.style.left = `${inputRect.left}px`; // Align with input
        });
        $(UserPasswordElement).on('mouseleave', () => {
            tooltip.style.display = 'none';
        });
        var CalculationDate = document.getElementById(this.idPrefix + 'CalculationDate')
        $(CalculationDate).on('change', () => {
            serviceCall<RetrieveResponse<any>>({
                service: EmployeeProfileService.baseUrl + '/CalculateWorkingHourAndDayWithDate',
                data: {
                    "EmployeeRowID": this.entityId,
                    "Date": self.form.CalculationDate.value
                },
                method: "GET",
                async: false,
                onSuccess: (response) => {
                    if (!isEmptyOrNull(response.Entities[0].NumberOfWorkingDays) && response.Entities[0].NumberOfWorkingDays > 0)
                        self.form.WorkingHour.value = response.Entities[0].TotalWorkingTimeInMinutes / response.Entities[0].NumberOfWorkingDays
                    else
                        self.form.WorkingHour.value = 0
                    self.form.WorkingDays.value = response.Entities[0].NumberOfWorkingDays
                    self.form.DailyRateBase.value = response.Entities[0].DailyRateBase
                    self.form.NplRateBase.value = response.Entities[0].NplRateBase
                },
                onError: (error) => {
                    console.log(error.Error);
                }
            });

            if (self.form.OtPayEntitlement.value == true) {
                serviceCall<RetrieveResponse<any>>({
                    service: EmployeeProfileService.baseUrl + '/CalculateOtRate',
                    data: {
                        "EmployeeRowID": this.entityId,
                        "Date": self.form.CalculationDate.value

                    },
                    method: "GET",
                    async: false,
                    onSuccess: (response) => {
                        console.log(response)
                        self.form.OtRateWeekday.value = response.Entities[0].OtRateWeekday
                        self.form.OtRateWeekend.value = response.Entities[0].OtRateWeekend
                        self.form.OtRatePublicHoliday.value = response.Entities[0].OtRatePublicHoliday
                    }
                })
            }
            else {
                self.form.OtRateWeekday.value = self.form.OtRateWeekend.value = self.form.OtRatePublicHoliday.value = 0
                $('.OtRateWeekday, .OtRateWeekend, .OtRatePublicHoliday').hide();
            }

        });
        serviceCall<ListResponse<any>>({
            service: AnnouncementWizardService.baseUrl + '/GetTodayDateTime',
            method: "GET",
            data: {
            },
            async: false,
            onSuccess: (response) => {
                self.form.CalculationDate.value = response;
                $(CalculationDate).trigger('change')
            }
        })
        if (this.isNew()) {
            var terminateButtons = document.querySelectorAll('.text-bg-danger')
            terminateButtons.forEach(function (element) {
                $(element).hide()
            });
            var resignButtons = document.querySelectorAll('.text-bg-warning')
            resignButtons.forEach(function (element) {
                $(element).hide()
            });

            var confirmButtons = document.querySelectorAll('.text-bg-success')
            confirmButtons.forEach(function (element) {
                $(element).hide()
            });
        }

        else { //not new
            this.OriginalEmployeeId = this.form.EmployeeID.value
            this.Username = this.form.UserName.value
            console.log(this.form.PassedProbation.value)
            if (parseInt(this.form.PassedProbation.value) == ProbationClass.PassedProbation || parseInt(this.form.PassedProbation.value) == ProbationClass.NoProbation) {
                var confirmButtons = document.querySelectorAll('.text-bg-success')
                confirmButtons.forEach(function (element) {
                    $(element).hide()
                });
                console.log('heree')
                EditorUtils.setReadonly(this.form.ProbationPeriodUntil.element, true);
                EditorUtils.setReadonly(this.form.ProbationPeriodFrom.element, true);
            }
            EmployeeProfileService.Retrieve({
                EntityId: this.entityId
            }, response => {
                if (response.Entity.Retired == 0 && response.Entity.Terminated == 0 && response.Entity.Resigned == 0)
                    $('.tool-button').removeClass('hidden')
                else {
                    self.readOnly = true
                    if (response.Entity.Terminated == 1) {
                        self.dialogTitle = `Terminated Employee (${self.form.EmployeeID.value})`
                        $('.TerminateDate').show()
                        $('.TerminateLeaveDate').show()
                    }
                    else if (response.Entity.Resigned == 1) {
                        self.dialogTitle = `Resigned Employee (${self.form.EmployeeID.value})`
                        $('.ResignationDate').show()
                        $('.ResignLeaveDate').show()
                    }
                    else if (response.Entity.Retired == 1)
                        self.dialogTitle = `Retired Employee (${self.form.EmployeeID.value})`
                }
            });
        }


        EditorUtils.setReadonly(this.form.PassedProbation.element, true);
        EditorUtils.setReadonly(this.form.ProbationPeriodFrom.element, true);
        EditorUtils.setReadonly(this.form.ProbationPeriodUntil.element, true);
        var ProbationPeriodElement = document.getElementById(this.idPrefix + 'ProbationPeriod')
        var ProbationPeriodEndElement = document.getElementById(this.idPrefix + 'ProbationPeriodUntil')

        var JoinDateElement = document.getElementById(this.idPrefix + 'JoinDate')
        var EmployeeTypeElement = document.getElementById(this.idPrefix + 'EmployeeType')
        var PayByDayElement = document.getElementById(this.idPrefix + 'PayByDay')
        var PayByMonthElement = document.getElementById(this.idPrefix + 'PayByMonth')
        var PayByHourElement = document.getElementById(this.idPrefix + 'PayByHour')


        $(PayByDayElement).on('change', function (e) {
            if (self.form.PayByDay.value) //if employee is local
            {
                self.form.PayByHour.value = false;
                self.form.PayByMonth.value = false;
            }
        });

        $(PayByHourElement).on('change', function (e) {
            if (self.form.PayByHour.value) //if employee is local
            {
                self.form.PayByDay.value = false;
                self.form.PayByMonth.value = false;
            }
        });

        $(PayByMonthElement).on('change', function (e) {
            if (self.form.PayByMonth.value) //if employee is local
            {
                self.form.PayByHour.value = false;
                self.form.PayByDay.value = false;
            }
        });

        $(EmployeeTypeElement).on('change', function (e) {

            if ($(EmployeeTypeElement).val() == 1) //if employee is local
            {
                // self.form.EpfContribution.value = 1
                $('.' + 'EpfContribution').hide();
                $('.' + 'WorkingPermit').hide();
                $('.' + 'WorkingPermitIssueDate').hide();
                $('.' + 'WorkingPermitExpireDate').hide();
                $('.' + 'WorkingPermitValidFrom').hide();
                $('.' + 'WorkingPermitValidUntil').hide();
                $('.' + 'ArrivalDate').hide();

            }
            else {
                //self.form
                // self.form.EpfContribution.value = 0
                $('.' + 'EpfContribution').show();
                $('.' + 'WorkingPermit').show();
                $('.' + 'WorkingPermitIssueDate').show();
                $('.' + 'WorkingPermitExpireDate').show();
                $('.' + 'WorkingPermitValidFrom').show();
                $('.' + 'WorkingPermitValidUntil').show();
                $('.' + 'ArrivalDate').show();
            }
        });

        $(document).ready(function () {
            $('<span>months</span>').insertAfter(`#${self.idPrefix}ProbationPeriod`);

        });

        function calculateProbation() {
            var joinDate = $(JoinDateElement).val();
            var probationPeriod = self.form.ProbationPeriod.value;
            if (probationPeriod == 0) {
                self.form.ProbationPeriodFrom.value = self.form.ProbationPeriodUntil.value = '00/00/0000'
                self.form.PassedProbation.value = ProbationClass.NoProbation.valueOf().toString();
                return
            }


            if (isEmptyOrNull(self.form.JoinDate.value) || isEmptyOrNull(self.form.ProbationPeriod.value))
                return;


            if (probationPeriod > 0) {
                var recruitment_date_Parts = joinDate.split('/');
                const recruitment_date_datetime = new Date(
                    parseInt(recruitment_date_Parts[2]), // Year
                    parseInt(recruitment_date_Parts[0]) - 1, // Month (subtract 1 as January is 0)
                    parseInt(recruitment_date_Parts[1]) // Day
                );

                // Extract whole months and fractional days
                const wholeMonths = Math.floor(probationPeriod);
                const fractionalMonths = probationPeriod - wholeMonths;

                // Add whole months
                recruitment_date_datetime.setMonth(recruitment_date_datetime.getMonth() + wholeMonths);

                // Handle fractional months by adding days
                if (fractionalMonths > 0) {
                    const daysInNextMonth = new Date(
                        recruitment_date_datetime.getFullYear(),
                        recruitment_date_datetime.getMonth() + 1,
                        0
                    ).getDate(); // Get total days in the next month

                    const extraDays = Math.round(daysInNextMonth * fractionalMonths);
                    recruitment_date_datetime.setDate(recruitment_date_datetime.getDate() + extraDays);
                }

                // Format the date
                const year = recruitment_date_datetime.getFullYear();
                const month = recruitment_date_datetime.getMonth() + 1; // January is 0, so add 1
                const day = recruitment_date_datetime.getDate();

                var probation_end_string = `${month}/${day}/${year}`;
                self.form.ProbationPeriodFrom.value = joinDate;
                self.form.ProbationPeriodUntil.value = probation_end_string;
                $(ProbationPeriodEndElement).val(probation_end_string);

                console.log(self.form.CalculationDate.valueAsDate)
                console.log(self.form.ProbationPeriodUntil.value)
                var ProbationPeriodUntil = new Date(self.form.ProbationPeriodUntil.value)
                if (self.form.CalculationDate.valueAsDate > ProbationPeriodUntil)
                    self.form.PassedProbation.value = ProbationClass.PassedProbation.valueOf().toString();
                else
                    self.form.PassedProbation.value = ProbationClass.UnderProbation.valueOf().toString();
            }

        }
        console.log('haha')

        if (self.form.PassedProbation.value == ProbationClass.UnderProbation.valueOf().toString()) {
            console.log('haha')
            $(ProbationPeriodElement).on('change', function (e) {
                calculateProbation()
            });
            $(JoinDateElement).on('change', function (e) {
                calculateProbation()
            });
        }


        if (!this.isNew()) //this is old record
        {

            calculateProbation()
            window['employeeRowId'] = this.entityId;  // Store the ID globally (using window)
            $(document).ready(function () {
                $('<button>Revert</button>')
                    .insertAfter(`#${self.idPrefix}DepartmentID`)  // Insert the button after the specified element
                    .on('click', function () {
                        self.form.DivisionID.value = originalDivision
                        self.form.DepartmentID.value = originalDepartment
                        self.form.JobGradeID
                            .value = originalJobGrade
                        self.form.OccupationID.value = originalOccupation
                        self.form.BasicSalary.value = originalSalary
                        self.form.SectionID.value = originalSection

                    });

            });
            /*
            if (this.form.CreateUser.value == true) {
                EditorUtils.setReadonly(this.form.CreateUser.element, true);
                EditorUtils.setReadonly(this.form.UserPassword.element, true);
                EditorUtils.setReadonly(this.form.UserName.element, true);
            }
            else {
                $('.' + 'UserName').hide();
                $('.' + 'UserPassword').hide();
                $('.' + 'GrantHRPrivilege').hide();

                $('.' + 'CreateUser').on('change', (evt: Event) => {
                    if (this.form.CreateUser.value == true) {
                        $('.' + 'UserName').show();
                        $('.' + 'UserPassword').show();
                        $('.' + 'GrantHRPrivilege').show();
                    }
                    else {
                        $('.' + 'GrantHRPrivilege').hide();
                        $('.' + 'UserName').hide();
                        $('.' + 'UserPassword').hide();
                    }
                });
            }
            */

            if (isEmptyOrNull(this.form.RetireDate.value)) {
                var birthDate = self.form.Birthday.valueAsDate
                const retireYear = birthDate.getFullYear() + self.RetireAge;

                // Create a new date for the retirement year with the same month and day as the birthdate
                const retireDate = new Date(birthDate);
                retireDate.setFullYear(retireYear);

                // If the birth month and day is after the current date, adjust the retirement date to the next year
                if (retireDate < new Date()) {
                    retireDate.setFullYear(retireYear + 1);
                }
                self.form.RetireDate.valueAsDate = retireDate
            }

            $(JoinDateElement).prop('readonly', false);
            this.Record(this.OriginalValue)

            for (var index in this.list_of_employee_id) {
                if (this.list_of_employee_id[index] == this.form.EmployeeID.value)
                    this.EmployeeRowID = this.list_of_employee_row_id[index]
            }

            if (parseInt(this.form.PassedProbation.value) == ProbationClass.PassedProbation || parseInt(this.form.PassedProbation.value) == ProbationClass.NoProbation) {
                EditorUtils.setReadonly(this.form.ProbationPeriodFrom.element, true);
                EditorUtils.setReadonly(this.form.ProbationPeriodUntil.element, true);
                EditorUtils.setReadonly(this.form.ProbationPeriod.element, true);
            }




        }
        else {



            $('.' + 'EpfContribution').hide();
            $('.' + 'UserName').hide();
            $('.' + 'UserPassword').hide();
            $('.' + 'GrantHRPrivilege').hide();

            $('.' + 'CreateUser').on('change', (evt: Event) => {
                if (self.form.CreateUser.value == true) {
                    $('.' + 'GrantHRPrivilege').show();

                    $('.' + 'UserName').show();

                    if (isEmptyOrNull($(UserNameElement).val())) {
                        // var UserNameDialog = 'Cannot Start With Number '
                        $(UserNameElement).val(UserNameDialog)
                        $(UserNameElement).css({
                            "color": "grey" // Set text color to grey
                        });
                    }
                    $('.' + 'UserPassword').show();
                    console.log(isEmptyOrNull($(UserPasswordElement).val()))
                    if (isEmptyOrNull($(UserPasswordElement).val())) {

                        //var UserPasswordDialog = 'Password length must be greater or equal to 6'
                        $(UserPasswordElement).val(UserPasswordDialog)
                        $(UserPasswordElement).css({
                            "color": "grey" // Set text color to grey
                        });
                    }
                }
                else {
                    $('.' + 'GrantHRPrivilege').val('');
                    $('.' + 'UserName').val('');
                    $('.' + 'UserPassword').val('');
                    $('.' + 'GrantHRPrivilege').hide();
                    $('.' + 'UserName').hide();
                    $('.' + 'UserPassword').hide();
                }
            });
        }
    }
    public Record(RecordElement: Record<string, string>) {
        var ItemsBuffer = this.propertyGrid.get_items()
        // var stringList: string[];
        var stringList: string[] = [];
        for (var index in ItemsBuffer) {
            // if (!isEmptyOrNull(ItemsBuffer[index].name))
            var name = ItemsBuffer[index].name
            stringList.push(name)
        }
        let Dictionary: Record<string, string> = {};
        for (let item of stringList) {

            var Value = this.form[item]?.text
            if (typeof Value === 'undefined' || Value === null) {
                Value = this.form[item]?.value
                if (typeof Value === 'undefined' || Value === null) {
                    Value = ''
                }
            }
            Dictionary[item] = Value
        }
        Object.assign(RecordElement, Dictionary); // Assigning values to RecordElement
    }
    protected getDialogOptions() {
        let opt = super.getDialogOptions()
        opt.height = 800
        opt.width = 1200
        return opt
    }
    protected save_submitHandler(response): void {
        var list_of_errors: string[] = [];
        function startsWithNumber(input: string): boolean {
            // Regular expression to match any digit character at the start of the string
            const regex = /^[0-9]/;
            return regex.test(input);
        }
        function containsOnlyNumbersAndChars(input: string): boolean {
            // Regular expression to match anything other than numbers and characters
            const regex = /[^a-zA-Z0-9]/;
            return !regex.test(input);
        }
        if (this.form.UserName.value == 'Username Cannot Start With Number, No Special Characters')
            this.form.UserName.value = ''
        var self = this
        if (parseInt(self.form.EmployeeType.value) == EmployeeType.Local.valueOf()) {
            if (isEmptyOrNull(self.form.Nric.value))
                list_of_errors.push('Please fill in NRIC number')
            else if (self.form.Nric.value.length < 12)
                list_of_errors.push('The length of NRIC should be 12')
        }

        else if (parseInt(self.form.EmployeeType.value) == EmployeeType.Foreigner.valueOf()) {
            if (isEmptyOrNull(self.form.SsfwNumber.value))
                list_of_errors.push('Please fill in SSFW number')
            else if (self.form.SsfwNumber.value.length < 12)
                list_of_errors.push('The length of SSFW should be 12')

        }

        if (this.form.CreateUser.value == true && this.form.UserPassword.value == '')
            list_of_errors.push('Please fill in UserPassword')


        if (this.form.CreateUser.value == true && this.form.UserPassword.value.length < 6)
            list_of_errors.push('Length of UserPassword cannot be less than 6')

        if (this.form.CreateUser.value == true && startsWithNumber(this.form.UserName.value) == true)
            list_of_errors.push('User Name cannot start with number')

        if (this.form.CreateUser.value == true && containsOnlyNumbersAndChars(this.form.UserName.value) == false)
            list_of_errors.push('User Name cannot contain anything else than number and characters')

        var EmployeeTypeElement = document.getElementById(this.idPrefix + 'EmployeeType')
        if ($(EmployeeTypeElement).val() == EmployeeType.Local) // if is local
        {
            if (this.form.Nric.value == '')
                list_of_errors.push('Please fill in the Identity Card Number')
        }
        if (this.form.FixedOtRateOption.value == true) {
            if (isEmptyOrNull(this.form.OtRatePublicHoliday.value) || isEmptyOrNull(this.form.OtRateWeekday.value) || isEmptyOrNull(this.form.OtRateWeekend.value))
                list_of_errors.push('Please fill in the Ot Rate')
        }
        var CurrentEmployeeID = this.form.EmployeeID.value.toString()
        if ((this.isNew()) || (!this.isNew() && (this.form.EmployeeID.value != this.OriginalEmployeeId))) // if is new or the value changed
        {
            for (var item in this.list_of_employee_id) {
                if (this.list_of_employee_id[item] === CurrentEmployeeID)
                    list_of_errors.push("There is a active employee with the ID, please check again.")
            }
        }
        if (list_of_errors.length > 0) {
            const concatenatedString: string = list_of_errors.map(item => `- ${item}`).join('\n');
            alertDialog(concatenatedString)
        }
        else {
            //var res = response
            //r self = this
            var waitForConfirm = 0
            var res = response
            console.log(self.form.ProbationPeriod.value == 0)
            if (self.form.CreateUser.value == true) {

                UserService.List({
                }, response => {
                    self.ListOfUser.length = 0
                    for (var index in response.Entities) {
                        if (response.Entities[index].Username == this.form.EmployeeID.value)
                            this.UserRowID = response.Entities[index].UserId
                        this.ListOfUser.push({ EmployeeRowId: response.Entities[index].EmployeeRowID, UserName: response.Entities[index].Username, UserId: response.Entities[index].UserId })
                    }
                    for (var index in this.ListOfUser) {
                        if (this.form.UserName.value == this.ListOfUser[index].UserName) {
                            if (!isEmptyOrNull(this.ListOfUser[index].EmployeeRowId)) {
                                if (this.entityId != this.ListOfUser[index].EmployeeRowId) {
                                    alertDialog('Please use another username, there is another user with same username')
                                    return
                                }
                                else {
                                    if (self.form.ProbationPeriod.value == 0) {
                                        self.form.ProbationPeriodFrom.value = ''
                                        self.form.ProbationPeriodUntil.value = ''
                                    }
                                    super.save_submitHandler(res)
                                }
                            }
                            else {
                                waitForConfirm = 1
                                confirmDialog(
                                    "There is already a user with the same username, do you want to link this employee to that account?",
                                    () => {
                                        self.form.UserRowID.value = self.ListOfUser[index].UserId
                                        UserService.Update({
                                            EntityId: self.ListOfUser[index].UserId,
                                            Entity:
                                            {
                                                "EmployeeRowID": self.entityId,
                                                "Password": self.form.UserPassword.value,
                                                "PasswordConfirm": self.form.UserPassword.value
                                            },
                                        });
                                        if (self.form.ProbationPeriod.value == 0) {
                                            self.form.ProbationPeriodFrom.value = ''
                                            self.form.ProbationPeriodUntil.value = ''
                                        }
                                        super.save_submitHandler(res)

                                    }, {
                                    onNo: () => {
                                        notifyInfo("Please select another unique username")
                                        return
                                    }
                                });
                                break;
                            }
                            break
                        }
                    }

                });


            }
            else {
                if (self.form.ProbationPeriod.value == 0) {
                    self.form.ProbationPeriodFrom.value = ''
                    self.form.ProbationPeriodUntil.value = ''
                }
                super.save_submitHandler(response)
            }
            /*
        if (!this.isNew())
            EmployeeProfileService.Retrieve({
                EntityId: this.entityId
            }, response => {
                console.log('haha')
                // if (response.Entity.CreateUser == false && self.form.CreateUser.value == true) {
                //self.createUser()
                super.save_submitHandler(res)
                //  }

            });
        else
            super.save_submitHandler(res)
        */

        }
    }
    protected getToolbarButtons() {
        var buttons = super.getToolbarButtons();
        var self = this;
        var Linkx = document.createElement('style')
        Linkx.textContent =
            `
            .hidden {
      display: none;
    }
    .nav-link.custom {
        cursor: pointer;
    }

            `
        document.head.appendChild(Linkx)
        buttons.push(
            {
                title: "Empoyee Retire",	// *** Get button text from translation
                cssClass: 'text-bg-primary p-2 hidden retireButton',
                // icon: 'fa-plus text-green',
                onClick: () => {


                    var today = new Date()

                    if (self.form.RetireDate.valueAsDate > today) {
                        confirm("This employee has not reached the retire date, are you sure?", () => {
                            confirm("Are you sure this employee has retired?", () => {


                                EmployeeProfileService.Update({
                                    EntityId: self.entityId,
                                    Entity:
                                    {
                                        "Retired": 1
                                    }
                                });
                                self.readOnly = true
                                self.dialogTitle = `Retired Employee (${self.form.EmployeeID.value})`
                                $('.confirmEmployee').addClass('hidden');
                                $('.terminateButton').addClass('hidden');
                                $('.resignButton').addClass('hidden');
                                $('.retireButton').addClass('hidden');
                            });
                        });

                    }
                    else
                        confirm("Are you sure this employee has retired?", () => {


                            EmployeeProfileService.Update({
                                EntityId: self.entityId,
                                Entity:
                                {
                                    "Retired": 1
                                }
                            });
                            self.readOnly = true
                            self.dialogTitle = `Retired Employee (${self.form.EmployeeID.value})`
                            $('.confirmEmployee').addClass('hidden');
                            $('.terminateButton').addClass('hidden');
                            $('.resignButton').addClass('hidden');
                            $('.retireButton').addClass('hidden');
                        });
                },
            }
        );
        buttons.push(
            {
                title: "Confirm Empoyee",	// *** Get button text from translation
                cssClass: 'text-bg-success p-2 confirmEmployee hidden',
                // icon: 'fa-plus text-green',
                onClick: () => {
                    var today = new Date()
                    if (!isEmptyOrNull(self.form.ProbationPeriodUntil.value)) {
                        console.log(self.form.ProbationPeriodUntil.value)
                        var ProbationPeriodUntil = new Date(self.form.ProbationPeriodUntil.value)

                        if (ProbationPeriodUntil > today) {
                            confirm("This employee has not passed probation period, are you sure?", () => {
                                confirm("Do you want to pass probation of this employee?", () => {
                                    EmployeeProfileService.Update({
                                        EntityId: self.entityId,
                                        Entity:
                                        {
                                            "PassedProbation": ProbationClass.PassedProbation,

                                        }
                                    });
                                    self.form.PassedProbation.value = ProbationClass.PassedProbation.valueOf().toString()
                                    $('.confirmEmployee').addClass('hidden');
                                });
                            });

                        }
                        else {
                            confirm("Do you want to pass probation of this employee?", () => {
                                EmployeeProfileService.Update({
                                    EntityId: self.entityId,
                                    Entity:
                                    {
                                        "PassedProbation": ProbationClass.PassedProbation
                                    }
                                });
                                EditorUtils.setReadonly(self.form.ProbationPeriod.element, true);
                                self.form.PassedProbation.value = ProbationClass.PassedProbation.valueOf().toString()
                                $('.confirmEmployee').addClass('hidden');
                            });

                        }

                    }
                },
            }
        );
        buttons.push(
            {
                title: "Terminate Employee",	// *** Get button text from translation
                cssClass: 'text-bg-danger p-2 hidden terminateButton',
                // icon: 'fa-plus text-green',
                onClick: () => {
                    var dlg = new TerminateEmployeeDialog()
                    dlg.loadByIdAndOpenDialog(this.entityId)
                    dlg.element.on("dialogclose", function () {
                        EmployeeProfileService.Retrieve({
                            EntityId: self.entityId
                        }, response => {

                            if (response.Entity.Retired == 0 && response.Entity.Terminated == 0 && response.Entity.Resigned == 0)
                                $('.tool-button').removeClass('hidden')

                            else {
                                self.readOnly = true
                                if (response.Entity.Terminated == 1)
                                    self.dialogTitle = `Terminated Employee (${self.form.EmployeeID.value})`
                                else if (response.Entity.Resigned == 1)
                                    self.dialogTitle = `Resigned Employee (${self.form.EmployeeID.value})`
                                else if (response.Entity.Retired == 1)
                                    self.dialogTitle = `Retired Employee (${self.form.EmployeeID.value})`
                            }
                        });
                    })

                },
            }
        );
        buttons.push(
            {
                title: "Employee Resign",	// *** Get button text from translation
                cssClass: 'text-bg-warning p-2 hidden resignButton',
                // icon: 'fa-minus text-red',
                onClick: () => {
                    var dlg = new EmployeeResignDialog()
                    dlg.loadByIdAndOpenDialog(this.entityId)
                    dlg.element.on("dialogclose", function () {
                        EmployeeProfileService.Retrieve({
                            EntityId: self.entityId
                        }, response => {

                            if (response.Entity.Retired == 0 && response.Entity.Terminated == 0 && response.Entity.Resigned == 0)
                                $('.tool-button').removeClass('hidden')

                            else {
                                self.readOnly = true
                                if (response.Entity.Terminated == 1)
                                    self.dialogTitle = `Terminated Employee (${self.form.EmployeeID.value})`
                                else if (response.Entity.Resigned == 1)
                                    self.dialogTitle = `Resigned Employee (${self.form.EmployeeID.value})`
                                else if (response.Entity.Retired == 1)
                                    self.dialogTitle = `Retired Employee (${self.form.EmployeeID.value})`
                            }
                        })

                        /*
                        EmployeeProfileService.Retrieve({
                            EntityId: self.entityId
                        }, response => {
                            if (isEmptyOrNull(response.Entity['TerminateLeaveDate'])
                                && isEmptyOrNull(response.Entity['ResignLeaveDate'])) {
                                $('.terminateButton').removeClass('hidden');
                                $('.resignButton').removeClass('hidden');
                                $('.retireButton').removeClass('hidden');
                            }
                            else {
                                if (isEmptyOrNull(response.Entity['TerminateLeaveDate']))  // show terminate
                                {
                                    $('.terminateButton').addClass('hidden');
                                    $('.retireButton').addClass('hidden');
                                }
                                else
                                    $('.terminateButton').removeClass('hidden');
                                if (isEmptyOrNull(response.Entity['ResignLeaveDate']))  // show resign
                                {
                                    $('.resignButton').addClass('hidden');
                                    $('.retireButton').addClass('hidden');
                                }
                                else
                                    $('.resignButton').removeClass('hidden');
                            }

                        });
                        */
                    })
                },
            }
        );

        return buttons;
    }
}



class ConcreteEmployeeCareerPathRow extends EmployeeCareerPathRow {
    constructor() {
        super();
    }
}
