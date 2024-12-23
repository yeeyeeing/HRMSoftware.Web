import {  DataGrid, Decorators, EditorUtils, EntityDialog, Select2Editor } from '@serenity-is/corelib';
import { EmployeeProfileForm, EmployeeProfileRow, EmployeeProfileService, EmployeeType, ProbationClass, SOCSOClass } from '../../../ServerTypes/EmployeeProfile';
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
import {  ListResponse, confirm } from '@serenity-is/corelib/q';
import { AnnouncementWizardService } from '../../../ServerTypes/Announcement';
import { OTApplicationService } from '../../../ServerTypes/OTApplication';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeeProfileDialog')
export class EmployeeProfileDialog extends EntityDialog<EmployeeProfileRow, any> {
    protected getFormKey() { return EmployeeProfileForm.formKey; }
    protected getRowDefinition() { return EmployeeProfileRow; }
    protected getService() { return EmployeeProfileService.baseUrl; }

    protected form = new EmployeeProfileForm(this.idPrefix);
    public list_of_employee_id: string[] = [];
    public list_of_employee_row_id: number[] = [];
    public ListOfUserName: string[] = [];


    public OriginalEmployeeId: string;
    public Username: string;

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
        this.form.AllowanceLists.slickGrid.setOptions({ rowHeight: 30});
        this.cloneButton.remove()
        EmployeeProfileService.List({
        }, response => {
            for (var key in response.Entities)
            {
                this.list_of_employee_id.push(response.Entities[key].EmployeeID)
                this.list_of_employee_row_id.push(response.Entities[key].Id)
            }
        });
        CompanySettingsService.List({
        }, response => {
            for (var key in response.Entities) {
                if (response.Entities[key].IsActive == 1)
                    this.RetireAge = response.Entities[key].RetireAge
            }
        });

    }
    public createUser()
    {
        var self = this
       
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
    protected onSaveSuccess(response): void
    {
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
            if (this.form.CreateUser.value == true) 
                this.createUser()
        }
        else if (!this.isNew())//not new
        {
            if (this.form.CreateUser.value == true) {
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
                            Word = Word.replace(/ID/g,"")
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
            
            else
            { 
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
                                "OldValue" : this.OriginalValue[key],
                                "NewValue" : this.EditedValue[key],
                                "FieldName" : key,
                                "EmployeeRowId" : this.EmployeeRowID
                            },
                        });
                        
                    }
                }
            }
            

        }
        
        super.onSaveSuccess(response);
    }
    protected onDialogOpen()
    {
        super.onDialogOpen()
        var self = this
    
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
        EditorUtils.setReadonly(this.form.PassedProbation.element, true);

        // Create a tooltip element
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
            if (retireDate < new Date()) {
                retireDate.setFullYear(retireYear + 1);
            }
            self.form.RetireDate.valueAsDate = retireDate
        });
    
        var UsernameElement = document.getElementById(this.idPrefix + 'UserName')
        var UserNameDialog = 'Username Cannot Start With Number, No Special Characters'
        $(UsernameElement).on("blur", function() {
            // If input is empty, set default text
            if (isEmptyOrNull($(this).val())) {
                $(this).val(UserNameDialog);
                $(this).css({
                    "color": "grey" // Set text color to grey
                });
            }
        });
        $(UsernameElement).on("focus", function() {
            if ($(this).val() == UserNameDialog) {
                $(this).val('');
                $(this).css({
                    "color": "black" // Set text color to grey
                });
            }
        });

        $(UsernameElement).on("change", function() {

            if ($(this).val() != '' && $(this).val() != UserNameDialog)
                $(this).css("color", "black");

            else
                $(this).css("color", "grey");

        });
        $(UsernameElement).on("keydown", function(event) {
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
        $(UserPasswordElement).on("blur", function() {
            // If input is empty, set default text
            if (isEmptyOrNull($(this).val())) {
                $(this).val(UserPasswordDialog);
                $(this).css({
                    "color": "grey" // Set text color to grey
                });
            }
        });
        $(UserPasswordElement).on("focus", function() {
            if ($(this).val() == UserPasswordDialog) {
                $(this).val('');
                $(this).css({
                    "color": "black" // Set text color to grey
                });
            }
        });
        $(UserPasswordElement).on("change", function() {
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
            if (parseInt(this.form.PassedProbation.value) == ProbationClass.PassedProbation) {
                var confirmButtons = document.querySelectorAll('.text-bg-success')
                confirmButtons.forEach(function (element) {
                    $(element).hide()
                });
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
        UserService.List({
        }, response => {
            for (var index in response.Entities) {
                if (response.Entities[index].Username == this.form.EmployeeID.value)
                    this.UserRowID = response.Entities[index].UserId
                this.ListOfUserName.push(response.Entities[index].Username)
            }
        });
       // EditorUtils.setReadonly(this.form.ProbationPeriodEnd.element, true);
        var ProbationPeriodElement = document.getElementById(this.idPrefix + 'ProbationPeriod')
        var ProbationPeriodEndElement = document.getElementById(this.idPrefix + 'ProbationPeriodEnd')
        var RecruitmentDateElement = document.getElementById(this.idPrefix + 'RecruitmentDate')
        var EmployeeTypeElement = document.getElementById(this.idPrefix + 'EmployeeType')
        var PayByDayElement = document.getElementById(this.idPrefix + 'PayByDay')
        var PayByMonthElement = document.getElementById(this.idPrefix + 'PayByMonth')
        var PayByHourElement = document.getElementById(this.idPrefix + 'PayByHour')


        $(PayByDayElement).on('change', function(e) {
            if (self.form.PayByDay.value) //if employee is local
            {
                self.form.PayByHour.value = false;
                self.form.PayByMonth.value = false;
            }
        });
        
        $(PayByHourElement).on('change', function(e) {
            if (self.form.PayByHour.value) //if employee is local
            {
                self.form.PayByDay.value = false;
                self.form.PayByMonth.value = false;
            }
        });

        $(PayByMonthElement).on('change', function(e) {
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
                console.log(self.form.EpfClass.items[0].disabled = true)
            }
        });


        $(ProbationPeriodEndElement).prop('readonly', true);
        $(ProbationPeriodElement).on('change', function (e) {
            var recruitment_date = $(RecruitmentDateElement).val()

            if (isEmptyOrNull(recruitment_date))
                return
            
            var recruitment_date_Parts = recruitment_date.split('/');
            const recruitment_date_datetime = new Date(
                parseInt(recruitment_date_Parts[2]), // Year
                parseInt(recruitment_date_Parts[0]) - 1, // Month (subtract 1 as January is 0)
                parseInt(recruitment_date_Parts[1]) // Day
            );
            recruitment_date_datetime.setMonth(recruitment_date_datetime.getMonth() + 3);
            const year = recruitment_date_datetime.getFullYear();
            const month = recruitment_date_datetime.getMonth() + 1; // Note: January is 0, so we add 1
            const day = recruitment_date_datetime.getDate();

            var probation_end_string = `${month}/${day}/${year}`
            $(ProbationPeriodEndElement).prop('readonly', false);
            $(ProbationPeriodEndElement).val(probation_end_string)
            $(ProbationPeriodEndElement).prop('readonly', true);
        });

        $(RecruitmentDateElement).on('change', function (e) {
            var currentValue = $(ProbationPeriodElement).val()
            var recruitment_date = $(RecruitmentDateElement).val()

            if (isEmptyOrNull(currentValue)) 
                return
            

            var recruitment_date_Parts = recruitment_date.split('/');
            const recruitment_date_datetime = new Date(
                parseInt(recruitment_date_Parts[2]), // Year
                parseInt(recruitment_date_Parts[0]) - 1, // Month (subtract 1 as January is 0)
                parseInt(recruitment_date_Parts[1]) // Day
            );

            recruitment_date_datetime.setMonth(recruitment_date_datetime.getMonth() + 3);


            const year = recruitment_date_datetime.getFullYear();
            const month = recruitment_date_datetime.getMonth() + 1; // Note: January is 0, so we add 1
            const day = recruitment_date_datetime.getDate();

            var probation_end_string = `${month}/${day}/${year}`
            $(ProbationPeriodEndElement).prop('readonly', false);
            $(ProbationPeriodEndElement).val(probation_end_string)
            $(ProbationPeriodEndElement).prop('readonly', true);

        });
        if (!this.isNew()) //this is old record
        {
            if (this.form.CreateUser.value == true) {
                EditorUtils.setReadonly(this.form.CreateUser.element, true);
                EditorUtils.setReadonly(this.form.UserPassword.element, true);
                EditorUtils.setReadonly(this.form.UserName.element, true);

            }
            else
            {
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

            $(RecruitmentDateElement).prop('readonly', false);
            this.Record(this.OriginalValue)

            for (var index in this.list_of_employee_id) {
                if (this.list_of_employee_id[index] == this.form.EmployeeID.value)
                    this.EmployeeRowID = this.list_of_employee_row_id[index]
            }

            if (parseInt(this.form.PassedProbation.value) == ProbationClass.PassedProbation)
            {
                EditorUtils.setReadonly(this.form.ProbationPeriodFrom.element, true);
                EditorUtils.setReadonly(this.form.ProbationPeriodUntil.element, true);
            }

            if (isEmptyOrNull(self.form.PassedProbation.value)) {
                self.form.PassedProbation.value = ProbationClass.UnderProbation.toString()
                EmployeeProfileService.Update({
                    EntityId: this.entityId,
                    Entity:
                    {
                        "PassedProbation": ProbationClass.UnderProbation
                    }
                });

            }



        }
        else
        {
            $('.' + 'EpfContribution').hide();
            $('.' + 'UserName').hide();
            $('.' + 'UserPassword').hide();
            $('.' + 'GrantHRPrivilege').hide();

            $('.' + 'CreateUser').on('change', (evt: Event) => {
                if (self.form.CreateUser.value == true) {
                    $('.' + 'GrantHRPrivilege').show();
                    
                    $('.' + 'UserName').show();

                    if (isEmptyOrNull($(UserNameElement).val()))
                    {
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
                else
                {
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
    
  
    
    public Record(RecordElement: Record<string, string>)
    {
        var ItemsBuffer = this.propertyGrid.get_items()
       // var stringList: string[];
        var stringList: string[] = [];
        for (var index in ItemsBuffer) {
            // if (!isEmptyOrNull(ItemsBuffer[index].name))
            var name = ItemsBuffer[index].name
            stringList.push(name)
        }
        let Dictionary: Record<string, string> = {};
        for (let item of stringList)
        {

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
    protected getDialogOptions()
    {
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
        if (this.isNew() || (this.Username.toLowerCase() != this.form.UserName.value.toLowerCase()) && !isEmptyOrNull(this.Username))
        {
            for (var index in this.ListOfUserName)
                if (this.form.UserName.value.toLowerCase() == this.ListOfUserName[index].toLowerCase())
                    list_of_errors.push('Please use another username, there is another user with same username')
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
        if ($(EmployeeTypeElement).val() == 1) // if is local
        {
            if (this.form.Nric.value == '')
                list_of_errors.push('Please fill in the Identity Card Number')
        }
       
        var CurrentEmployeeID = this.form.EmployeeID.value.toString()
        if ((this.isNew()) || (!this.isNew() && (this.form.EmployeeID.value != this.OriginalEmployeeId))) // if is new or the value changed
        {
            for (var item in this.list_of_employee_id) {
                if (this.list_of_employee_id[item] === CurrentEmployeeID)
                    list_of_errors.push("There is a active employee with the ID, please check again.")
            }
        }

        if (this.form.FixedOtRateOption.value == true) {
            if (isEmptyOrNull(this.form.OtRateWeekday.value) || isEmptyOrNull(this.form.OtRateWeekend.value) 
            || isEmptyOrNull(this.form.OtRatePublicHoliday.value)) {
                alertDialog("Please fill in the OT rate")
                return
            }
        }
        if (list_of_errors.length > 0) {
            const concatenatedString: string = list_of_errors.map(item => `- ${item}`).join('\n');
            alertDialog(concatenatedString)
        }
        else {
            var res = response
            var self = this
            if(!this.isNew())
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
                    if (!isEmptyOrNull(self.form.ProbationPeriodUntil.valueAsDate)) {
                        if (self.form.ProbationPeriodUntil.valueAsDate > today) {
                            confirm("This employee has not passed probation period, are you sure?", () => {
                                confirm("Do you want to pass probation of this employee?", () => {
                                    EmployeeProfileService.Update({
                                        EntityId: self.entityId,
                                        Entity:
                                        {
                                            "PassedProbation": ProbationClass.PassedProbation
                                        }
                                    });
                                    $('.confirmEmployee').addClass('hidden');
                                });
                            });

                        }
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
                            $('.confirmEmployee').addClass('hidden');
                        });

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