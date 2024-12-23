import {  Decorators, EditorUtils, EntityDialog, ListResponse } from '@serenity-is/corelib';
import { LeaveApplicationForm, LeaveApplicationRow, LeaveApplicationService, LeaveStatus, LeaveTypes } from '../../../ServerTypes/LeaveApplication';
import { InitYearService } from '../../../ServerTypes/InitYear';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { AnnualLeavePolicyService } from '../../../ServerTypes/AnnualLeavePolicy';
import { SickLeavePolicyService } from '../../../ServerTypes/SickLeavePolicy';
import { serviceCall, RetrieveResponse, alertDialog, isEmptyOrNull, Authorization, getLookup, confirm } from '@serenity-is/corelib/q';
import { EntitledLeaveService } from '../../../ServerTypes/EntitledLeave';
import { PublicHolidayService } from '../../../ServerTypes/PublicHoliday';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { EmployeeBasicDataDialog } from '../../EmployeeBasicData/EmployeeBasicData/EmployeeBasicDataDialog';
import { NoPaidLeaveService, PayrollService } from '../../../ServerTypes/PayrollSettings';
import { OrganisationChartService } from '../../../ServerTypes/OrganisationChart';

@Decorators.registerClass('HRMSoftware.LeaveApplication.LeaveApplicationDialog')
export class LeaveApplicationDialog extends EntityDialog<LeaveApplicationRow, any> {
    protected getFormKey() { return LeaveApplicationForm.formKey; }
    protected getRowDefinition() { return LeaveApplicationRow; }
    protected getService() { return LeaveApplicationService.baseUrl; }

    protected form = new LeaveApplicationForm(this.idPrefix);
    public StartDate: string;
    public EndDate: string;
    public WeekdaysList: string;

    public RowData: any;
    public RecruitmentDate: any;
    public EntitledAnnualLeave: any;
    public EntitledSickLeave: any;
    public YearOfService: number;
    public PolicyUpdateDate: Date;
    public NextPolicyUpdateDate: Date;
    public EmployeeRowID: number;
    public ListOfLeave: any[] = [];
    public PublicHolidayDateList: Date[] = [];
    public PublicHolidayEventList: string[] = [];
    public EmployeeApproval: number;
    public HrApproval: number;



    public EmployeeRowId: string;
    public EmployeeName: string;

    public SuperiorPermission: boolean;
    constructor() {
        super();
        //this.deleteButton.remove();
        this.cloneButton.remove();
       var self = this
        EditorUtils.setReadonly(this.form.LeaveTaken.element, true);
        /*
        EmployeeProfileService.List({
        }, response => {
            var TodayDate = new Date()
            for (var index in response.Entities) {
                if (response.Entities[index].Id == Authorization.userDefinition.EmployeeRowID) {
                    if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources] === undefined) // if not hr guy
                    {
                        self.EmployeeRowId = response.Entities[index].Id.toString()
                        self.EmployeeName = response.Entities[index].EmployeeName.toString()
                    }
                    var RecruitmentDate = new Date(response.Entities[index].RecruitmentDate)
                    this.RecruitmentDate = response.Entities[index].RecruitmentDate
                    var ProbationEndDate =
                        new Date(response.Entities[index].RecruitmentDate);
                    ProbationEndDate.setMonth(RecruitmentDate.getMonth() + response.Entities[index].ProbationPeriod)
                    var YearOfService = TodayDate.getFullYear() - RecruitmentDate.getFullYear()
                    this.YearOfService = YearOfService
                    this.PolicyUpdateDate = new Date(response.Entities[index].RecruitmentDate)
                    this.PolicyUpdateDate.setFullYear(RecruitmentDate.getFullYear() + YearOfService);
                    this.NextPolicyUpdateDate = new Date(response.Entities[index].RecruitmentDate);
                    this.NextPolicyUpdateDate.setFullYear(RecruitmentDate.getFullYear() + YearOfService + 1);
                    break
                }
            }
        });
        
        PublicHolidayService.List({
        }, response => {

            for (var index in response.Entities) {
                var date = new Date(response.Entities[index].Date.substring(0,10))
                this.PublicHolidayDateList.push(date)
                this.PublicHolidayEventList.push(response.Entities[index].Name)
            }

        });
        */
    }
    protected onDialogOpen() {
        super.onDialogOpen()
        $(".EmployeeUpdated").hide()
        $(".HrUpdated").hide()

        if (isEmptyOrNull(this.form.EmployeeUpdatedName.value))
            $(".EmployeeUpdatedName").hide()
        else {
            var EmployeeUpdatedNameElement = document.getElementById(this.idPrefix + 'EmployeeUpdatedName')
            $(EmployeeUpdatedNameElement).on('click', async function () {
                console.log(self.form.EmployeeUpdatedName.value)
                console.log(self.form.EmployeeUpdated.value)
                var dlg = new EmployeeBasicDataDialog(parseInt(self.form.EmployeeUpdated.value))
                dlg.loadByIdAndOpenDialog(parseInt(self.form.EmployeeUpdated.value))
            })
        }
        if (isEmptyOrNull(this.form.HrUpdatedName.value))
            $(".HrUpdatedName").hide()
        else {
            var HrUpdatedNameNameElement = document.getElementById(this.idPrefix + 'HrUpdatedName')
            $(HrUpdatedNameNameElement).on('click', async function () {
                var dlg = new EmployeeBasicDataDialog(parseInt(self.form.HrUpdated.value))
                dlg.loadByIdAndOpenDialog(parseInt(self.form.HrUpdated.value))
            })
        }


        EditorUtils.setReadonly(this.form.EmployeeName.element, true);
        var self = this
        $('.MorningSession').hide()
        $('.AfternoonSession').hide()
        var ApprovedBy = '.ApproveEmployeeName'
        var RejectedBy = '.RejectedEmployeeName'
        if (this.isNew()) {
            var ApproveButtons = document.querySelectorAll('.text-bg-success')
            ApproveButtons.forEach(function (element) {
                $(element).hide()
            });
            $(ApprovedBy).hide()
            var RejectButtons = document.querySelectorAll('.text-bg-danger')
            RejectButtons.forEach(function (element) {
                $(element).hide()
            });
            $(RejectedBy).hide()

        }
        else if (!this.isNew()) {
            if (!Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]
                && self.form.EmployeeRowId.value != Authorization.userDefinition.EmployeeRowID)//if no hr privilege
                this.readOnly = true
            if (self.form.EmployeeRowId.value == Authorization.userDefinition.EmployeeRowID)
            {
                EditorUtils.setReadonly(this.form.EmployeeRowId.element, true);
                EditorUtils.setReadonly(this.form.EmployeeName.element, true);
                return
            }
            LeaveApplicationService.Retrieve({
                EntityId: this.entityId
            }, response => {
                var applicant = response.Entity.EmployeeRowId
                var HrStatus = response.Entity.HrStatus
                var EmployeeStatus = response.Entity.EmployeeStatus
                console.log(applicant)
                self.EmployeeApproval = response.Entity.EmployeeStatus
                self.HrApproval = response.Entity.HrStatus

                var applicationStatus = response.Entity.Status
                if (applicationStatus == LeaveStatus.Pending) {
                    serviceCall<RetrieveResponse<any>>({
                        service: OrganisationChartService.baseUrl + '/PermissionToAcknowledge',
                        data: {
                            'UserEmployeeRowID': Authorization.userDefinition.EmployeeRowID,
                            'ApplicantEmployeeRowID': applicant
                        },
                        method: "GET",
                        async: false,
                        onSuccess: (response) => {
                            var PermissionToAck = response
                            self.SuperiorPermission = response
                            if (self.form.EmployeeRowId.value != Authorization.userDefinition.EmployeeRowID)
                                this.set_readOnly(true)
                            $('.delete-button').removeClass('disabled');
                            if (HrStatus == 0 || EmployeeStatus == 0)//if one of the condition still pending
                            {
                                if (PermissionToAck == true && !EmployeeStatus)
                                    $('.tool-button').removeClass('hidden');
                                if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources] && !HrStatus)
                                    $('.tool-button').removeClass('hidden');
                            }
                            /*
                                else if ((HrStatus == LeaveStatus.Rejected || EmployeeStatus == LeaveStatus.Rejected)
                                || (HrStatus == LeaveStatus.Approved && EmployeeStatus == LeaveStatus.Approved)) 
                            
                            */
                            else
                            {
                                $(RejectedBy).hide()
                                $(ApprovedBy).hide()


                                if (self.form.EmployeeRowId.value == Authorization.userDefinition.EmployeeRowID) {
                                    var ApproveButtons = document.querySelectorAll('.text-bg-success')
                                    ApproveButtons.forEach(function (element) {
                                        $(element).hide()
                                    });
                                    var RejectButtons = document.querySelectorAll('.text-bg-danger')
                                    RejectButtons.forEach(function (element) {
                                        $(element).hide()
                                    });
                                }

                            }



                        },
                        onError: (error) => {
                            console.log(error.Error);
                        }
                    });
                }
                else {
                    this.set_readOnly(true)
                    $('.delete-button').removeClass('disabled');
                }

            });

        }
    }
    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);
        function processValue(value: number): number {
            // Convert the number to a string to check if it contains a decimal point
            const valueString = value.toString();
        
            // Check if the value contains a decimal point
            if (valueString.includes('.')) {
                // Extract the decimal part of the value
                const decimalPart = parseFloat(valueString.split('.')[1]);
                const integerPart = parseFloat(valueString.split('.')[0]);
            
                // Check if the decimal part is greater than 0.5
                if (decimalPart > 0.5) {
                    // If it is, round the value to the nearest integer
                    return integerPart + 0.5;
                }
                else {
                    // If it's not, set the value to 0.5
                    return integerPart;
                }
            } else {
                // If the value doesn't contain a decimal point, return the original value
                return value;
            }
        }
        const HalfDayElement = '#' + this.idPrefix + 'HalfDay';
        const EliglibleDayElement = '#' + this.idPrefix + 'EligibleDay';
        const BalanceLeaveElement = '#' + this.idPrefix + 'BalanceLeave';
        const EmployeeIDElement = '#' + this.idPrefix + 'EmployeeID';
        const MorningSessionElement = '#' + this.idPrefix + 'MorningSession';
        const AfternoonSessionElement = '#' + this.idPrefix + 'AfternoonSession';
        this.form.HalfDay.value = '0'
        var HalfDay = this.form.HalfDay
        $(HalfDayElement).prop('readonly', true);
        $(EliglibleDayElement).prop('readonly', true);
        $(BalanceLeaveElement).prop('readonly', true);
        const LeaveReasonElement = '#' + this.idPrefix + 'LeaveReasonId'
        const StartingFromElement = '#' + this.idPrefix + 'StartDate'
        const EndingElement = '#' + this.idPrefix + 'EndDate'
        var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'EmployeeRowId')
        var self = this
        if (this.isNew()) {
            if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources])//is hr guy
                $(EmployeeRowIdElement).on('change', async function () {
                    self.form.EmployeeName.value = ''
                    self.form.StartDate.value = ''
                    self.form.EndDate.value = ''
                    self.form.LeaveReasonId.value = ''
                    $(EliglibleDayElement).val('');
                    $(BalanceLeaveElement).val('');
                    if (isEmptyOrNull($(this).val()))
                        return;
                    EmployeeProfileService.Retrieve({
                        EntityId: $(EmployeeRowIdElement).val()
                    }, response => {
                        self.form.EmployeeName.value = response.Entity.EmployeeName
                    });
                    EntitledLeaveService.List({
                    }, response => {
                        var Id: number = parseInt($(EmployeeRowIdElement).val());
                        for (var index in response.Entities) {
                            if (response.Entities[index].EmployeeRowId == Id)
                                self.ListOfLeave.push(response.Entities[index])
                        }
                        self.RowData = self.ListOfLeave[self.ListOfLeave.length - 1]
                        for (let key in self.RowData) {
                            if (key.includes("Entitled")) {
                                let modifiedKey = key.replace("Entitled", "");
                                self.RowData[modifiedKey] = self.RowData[key];
                                delete self.RowData[key];
                            }
                        }
                        var Row = self.RowData
                        if (Row['MaternityLeave'] === undefined)
                            Row['MaternityLeave'] = 0
                        if (Row['PaternityLeave'] === undefined)
                            Row['PaternityLeave'] = 0
                        console.log(self.ListOfLeave)
                        console.log(Row)
                        var NextPolicyUpdateDate = new Date(self.ListOfLeave[self.ListOfLeave.length - 1].CurrentPolicyEndDate.substring(0, 10))
                        var CurrentPolicyUpdateDate = new Date(NextPolicyUpdateDate)
                        CurrentPolicyUpdateDate.setFullYear(CurrentPolicyUpdateDate.getFullYear() - 1)

                        $(LeaveReasonElement).on('change', function (e) {
                            var currentValue = $(LeaveReasonElement).val()
                            var LeaveReasonTable = getLookup("LeaveReason.LeaveReason")
                            var key
                            for (var LookupIndex in LeaveReasonTable.items) {
                                if (LeaveReasonTable.items[LookupIndex].Id == currentValue) {
                                    key = LeaveReasonTable.items[LookupIndex].LeaveReason.replace(/\s/g, "")
                                    break
                                }
                            }
                            var year = CurrentPolicyUpdateDate.getFullYear();
                            var month = (CurrentPolicyUpdateDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
                            var day = CurrentPolicyUpdateDate.getDate().toString().padStart(2, '0');
                            var StartingRange = `${year}-${month}-${day}`;
                            year = NextPolicyUpdateDate.getFullYear();
                            month = (NextPolicyUpdateDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
                            day = NextPolicyUpdateDate.getDate().toString().padStart(2, '0');
                            var EndingRange = `${year}-${month}-${day}`;
                            var done_retrieve_taken_leave = false
                            var taken_leave
                            console.log('hereee')
                            console.log(self.form.EmployeeRowId.value)
                            console.log(StartingRange)
                            console.log(EndingRange)
                            console.log(currentValue)

                            serviceCall<ListResponse<any>>({
                                service: LeaveApplicationService.baseUrl + '/RetrieveLeaveTaken',
                                method: "GET",
                                data: {
                                    'EmployeeID': self.form.EmployeeRowId.value,
                                    'StartingDate': StartingRange,
                                    'EndingDate': EndingRange,
                                    'TypeOfLeave': currentValue
                                },
                                async: false,
                                onSuccess: (response) => {
                                    taken_leave = response
                                    if (isEmptyOrNull(taken_leave))
                                        taken_leave = 0
                                    done_retrieve_taken_leave = true
                                },
                                onError: (error) => {
                                }
                            });
                            while (done_retrieve_taken_leave == false) { }
                            var eligible_day = Row[key]
                            if (eligible_day === undefined)
                                eligible_day = 99999
                            $(EliglibleDayElement).val(processValue(eligible_day))
                            if ($(EliglibleDayElement).val() != '-') {
                                $(BalanceLeaveElement).prop('readonly', false);
                                var Balance = eligible_day - taken_leave

                                $(BalanceLeaveElement).val(processValue(Balance));
                                $(BalanceLeaveElement).prop('readonly', true);
                            }
                            else {
                                $(BalanceLeaveElement).prop('readonly', false);
                                $(BalanceLeaveElement).val('-');
                                $(BalanceLeaveElement).prop('readonly', true);
                            }
                        });



                        /*
                        InitYearService.List({
                        }, response => {
                            var todayDate = new Date()
                            var currentYear = new Date().getFullYear();
                            var RecruitmentDateObject = new Date(self.RecruitmentDate)
                            var YearOfService = currentYear - RecruitmentDateObject.getFullYear()
                            var buffer = RecruitmentDateObject
                            buffer.setFullYear(buffer.getFullYear() + YearOfService)
                            var PolicyYear = buffer.getFullYear()
                            if (todayDate < buffer)
                                PolicyYear = PolicyYear - 1
                            var MaternityLeave = 0
                            var PaternityLeave = 0
                            console.log(response.Entities)
                            for (var index in response.Entities) {
                                if (response.Entities[index].Year == PolicyYear) {
                                    PaternityLeave = response.Entities[index].PaternityLeave
                                    MaternityLeave = response.Entities[index].MaternityLeave
                                }
                            }
                           // console.log(PaternityLeave)
                          //  console.log(MaternityLeave)
    
                            var Row = self.RowData
                            Row['PaternityLeave'] = PaternityLeave
                            Row['MaternityLeave'] = MaternityLeave
    
    
                         //   console.log(Row)
                         //   console.log(self.RowData)
    
    
                            var CurrentPolicyUpdateDate = self.PolicyUpdateDate
                            var NextPolicyUpdateDate = self.NextPolicyUpdateDate
    
    
                        });
                        */
                    });
                }
                )
            else {
                var self = this

                //this.form.EmployeeName.value = self.EmployeeName
                this.form.EmployeeRowId.value = Authorization.userDefinition.EmployeeRowID
                this.form.EmployeeName.value = Authorization.userDefinition.DisplayName


                console.log(Authorization.userDefinition.DisplayName)

                EditorUtils.setReadonly(this.form.EmployeeName.element, true);
                EditorUtils.setReadonly(this.form.EmployeeRowId.element, true);

                EntitledLeaveService.List({
                }, response => {
                    var Id: number = parseInt(this.form.EmployeeRowId.value);
                    for (var index in response.Entities) {
                        if (response.Entities[index].EmployeeRowId == Id)
                            this.ListOfLeave.push(response.Entities[index])
                    }
                    this.RowData = this.ListOfLeave[this.ListOfLeave.length - 1]
                    for (let key in this.RowData) {
                        if (key.includes("Entitled")) {
                            let modifiedKey = key.replace("Entitled", "");
                            this.RowData[modifiedKey] = this.RowData[key];
                            delete this.RowData[key];
                        }
                    }
                    var Row = this.RowData
                    console.log(Row)
                    if (Row['MaternityLeave'] === undefined)
                        Row['MaternityLeave'] = 0
                    if (Row['PaternityLeave'] === undefined)
                        Row['PaternityLeave'] = 0
                    var NextPolicyUpdateDate = new Date(this.ListOfLeave[this.ListOfLeave.length - 1].CurrentPolicyEndDate.substring(0, 10))
                    var CurrentPolicyUpdateDate = new Date(NextPolicyUpdateDate)
                    CurrentPolicyUpdateDate.setFullYear(CurrentPolicyUpdateDate.getFullYear() - 1)
              
                    $(LeaveReasonElement).on('change', function (e) {
                        var currentValue = $(LeaveReasonElement).val()
                        var LeaveReasonTable = getLookup("LeaveReason.LeaveReason")
                        var key
                        for (var LookupIndex in LeaveReasonTable.items) {
                            if (LeaveReasonTable.items[LookupIndex].Id == currentValue) {
                                key = LeaveReasonTable.items[LookupIndex].LeaveReason.replace(/\s/g, "")
                                break
                            }
                        }
                        var year = CurrentPolicyUpdateDate.getFullYear();
                        var month = (CurrentPolicyUpdateDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
                        var day = CurrentPolicyUpdateDate.getDate().toString().padStart(2, '0');
                        var StartingRange = `${year}-${month}-${day}`;
                        year = NextPolicyUpdateDate.getFullYear();
                        month = (NextPolicyUpdateDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
                        day = NextPolicyUpdateDate.getDate().toString().padStart(2, '0');
                        var EndingRange = `${year}-${month}-${day}`;
                        // console.log(StartingRange)
                        //  console.log(EndingRange)
                        //   console.log(Authorization.userDefinition.EmployeeRowID)
                        var done_retrieve_taken_leave = false
                        var taken_leave
                        console.log('hereee')
                        serviceCall<ListResponse<any>>({
                            service: LeaveApplicationService.baseUrl + '/RetrieveLeaveTaken',
                            method: "GET",
                            data: {
                                'EmployeeID': self.form.EmployeeRowId.value,
                                'StartingDate': StartingRange,
                                'EndingDate': EndingRange,
                                'TypeOfLeave': currentValue
                            },
                            async: false,
                            onSuccess: (response) => {
                                taken_leave = response
                                if (isEmptyOrNull(taken_leave))
                                    taken_leave = 0
                                done_retrieve_taken_leave = true
                            },
                            onError: (error) => {
                            }
                        });
                        while (done_retrieve_taken_leave == false) { }
                        //self.form.LeaveTaken.value = taken_leave
                        //  console.log(taken_leave)
                        var eligible_day = Row[key]
                        console.log(eligible_day)
                        if (eligible_day === undefined)
                            eligible_day = 99999

                        //  console.log($(LeaveReasonElement).val())
                        $(EliglibleDayElement).val(processValue(eligible_day))
                        //  console.log(Row[key])
                        //   console.log(Row)
                        if ($(EliglibleDayElement).val() != '-') {
                            $(BalanceLeaveElement).prop('readonly', false);
                            var Balance = eligible_day - taken_leave

                            $(BalanceLeaveElement).val(processValue(Balance));
                            $(BalanceLeaveElement).prop('readonly', true);
                        }
                        else {
                            $(BalanceLeaveElement).prop('readonly', false);
                            $(BalanceLeaveElement).val('-');
                            $(BalanceLeaveElement).prop('readonly', true);
                        }
                    });
                });
            }
        }
        
        const parseDate = (dateStr: string): Date => {
            const [month, day, year] = dateStr.split('/');
            return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        };
        var self = this
        $(StartingFromElement).on('change', function (e)
        {
            if ($(EndingElement).val() != "")
            {
                var StartDate = parseDate($(StartingFromElement).val())
                var EndDate = parseDate($(EndingElement).val())
                if (StartDate > EndDate) {
                    alertDialog("the start date cannot be greater than end date")
                    $(StartingFromElement).val(null)
                    return
                }
                if ($(EndingElement).val() == $(StartingFromElement).val()) {
                    $(HalfDayElement).prop('readonly', false);
                    var wait = false;
                    serviceCall<ListResponse<any>>({
                        service: LeaveApplicationService.baseUrl + '/CalculateHolidayToTake',
                        method: "GET",
                        data: {
                            'startDate': self.form.StartDate.value,
                            'endDate': self.form.EndDate.value,
                        },
                        async: false,
                        onSuccess: (response) => {
                            self.WeekdaysList = response.Entities[0].WeekdaysList
                            console.log(response.Entities)
                            this.form.LeaveTaken.value = response.Entities[0].LeaveToTake
                            wait = true
                        },
                        onError: (error) => {
                        }
                    });
                    while (wait == false);
                    if ($(HalfDayElement).val() == 1)
                        this.form.LeaveTaken.value = 0.5

                }

                else {
                    $('.MorningSession').hide()
                    $('.AfternoonSession').hide()
                    self.form.MorningSession.value = false
                    self.form.AfternoonSession.value = false
                    var wait = false;
                    serviceCall<ListResponse<any>>({
                        service: LeaveApplicationService.baseUrl + '/CalculateHolidayToTake',
                        method: "GET",
                        data: {
                            'startDate': self.form.StartDate.value,
                            'endDate': self.form.EndDate.value,
                        },
                        async: false,
                        onSuccess: (response) => {
                            self.WeekdaysList = response.Entities[0].WeekdaysList
                            console.log(response.Entities)
                            this.form.LeaveTaken.value = response.Entities[0].LeaveToTake
                            wait = true
                        },
                        onError: (error) => {
                        }
                    });
                    while (wait == false);

                    HalfDay.value = '0'
                    $(HalfDayElement).prop('readonly', true);
                }

                if (this.form.LeaveTaken.value <= 0) {
                    this.form.LeaveTaken.value = 0
                    var string = "No need to take leave in this period for holiday"
                    alertDialog(string)

                }

            }
        });
        $(EndingElement).on('change', function (e)
        {
            if ($(StartingFromElement).val() != "")
            {
           
                var StartDate = parseDate($(StartingFromElement).val())
                var EndDate = parseDate($(EndingElement).val())

                if (StartDate > EndDate) {
                    alertDialog("the start date cannot be greater than end date")
                    $(EndingElement).val(null)
                    return
                }

                if ($(EndingElement).val() == $(StartingFromElement).val()) {
                    $(HalfDayElement).prop('readonly', false);
                    var wait = false;
                    serviceCall<ListResponse<any>>({
                        service: LeaveApplicationService.baseUrl + '/CalculateHolidayToTake',
                        method: "GET",
                        data: {
                            'startDate': self.form.StartDate.value,
                            'endDate': self.form.EndDate.value,
                        },
                        async: false,
                        onSuccess: (response) => {
                            console.log(response.Entities)
                            self.WeekdaysList = response.Entities[0].WeekdaysList

                            this.form.LeaveTaken.value = response.Entities[0].LeaveToTake
                            wait = true
                        },
                        onError: (error) => {
                        }
                    });
                    while (wait == false);
                    if ($(HalfDayElement).val() == 1)
                        this.form.LeaveTaken.value = 0.5

                }

                else {
                    $('.MorningSession').hide()
                    $('.AfternoonSession').hide()
                    self.form.MorningSession.value = false
                    self.form.AfternoonSession.value = false
                    var wait = false;
                    serviceCall<ListResponse<any>>({
                        service: LeaveApplicationService.baseUrl + '/CalculateHolidayToTake',
                        method: "GET",
                        data: {
                            'startDate': self.form.StartDate.value,
                            'endDate': self.form.EndDate.value,
                        },
                        async: false,
                        onSuccess: (response) => {
                            self.WeekdaysList = response.Entities[0].WeekdaysList
                            console.log(response.Entities)

                            this.form.LeaveTaken.value = response.Entities[0].LeaveToTake
                            wait = true
                        },
                        onError: (error) => {
                        }
                    });
                    while ( wait == false);

                    HalfDay.value = '0'
                    $(HalfDayElement).prop('readonly', true);
                }

                if (this.form.LeaveTaken.value <= 0) {
                    this.form.LeaveTaken.value = 0
                    var string = "No need to take leave in this period for holiday"
                    alertDialog(string)

                }
                    
            }
            //console.log(self.form.StartDate.valueAsDate)
            //console.log(self.form.EndDate.valueAsDate)

        });
        $(HalfDayElement).on('change', function (e)
        {
            if ($(EndingElement).val() == $(StartingFromElement).val()) {
                if ($(HalfDayElement).val() == 1) {
                    this.form.LeaveTaken.value = 0.5
                    $('.MorningSession').show()
                    $('.AfternoonSession').show()
                }
                else {
                    this.form.LeaveTaken.value = 1
                    self.form.MorningSession.value = false
                    self.form.AfternoonSession.value = false
                    $('.MorningSession').hide()
                    $('.AfternoonSession').hide()
                }
            }
        });
        $(MorningSessionElement).on('change', function (e) {
            if (self.form.MorningSession.value) 
                self.form.AfternoonSession.value = false
        });
        $(AfternoonSessionElement).on('change', function (e) {
            if (self.form.AfternoonSession.value)
                self.form.MorningSession.value = false

        });
    }
    protected save_submitHandler(response): void
    {
        if (this.form.LeaveTaken.value == 0)
        {
            var string = "No need to take leave in this period for holiday"
            alertDialog(string)
            return;
        }
        var TabId = $(".fieldset").children().uniqueId()
        var res = response
        const StartingFromElement = "#" + this.idPrefix + 'StartDate';
        const EndingElement = "#" + this.idPrefix + 'EndDate';
        const HalfDayElement = "#" + this.idPrefix + 'HalfDay';
        if ($(HalfDayElement).val() == 1)
        {
            if (this.form.MorningSession.value == false && this.form.AfternoonSession.value == false)
            {
                var string = 'Please choose morning session or afternoon session'
                alertDialog(string)
                return
            } 
            if (this.form.MorningSession.value == true && this.form.AfternoonSession.value == true) {
                var string = 'Please choose only morning session or afternoon session'
                alertDialog(string)
                return
            } 
        }
        const BalanceLeaveElement = "#" + TabId[0].id.replace('PropertyGrid', 'BalanceLeave');
        var taken_leave = this.form.LeaveTaken.value
        var start = new Date($(StartingFromElement).val())
        var end = new Date($(EndingElement).val())
        var diff = end.getTime() - start.getTime()
        var differenceDays = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1
        if (taken_leave == 1)
            if ($(HalfDayElement).val() == 1)
                taken_leave = 0.5
        if ($(BalanceLeaveElement).val() - taken_leave >= 0) 
        {
            var res = response

            if (parseInt(this.form.HalfDay.value) == 1)
            {
                if (this.form.MorningSession.value == false&& this.form.AfternoonSession.value == false)
                {
                    var string = "Please select whether is morning session or afternoon session"
                    alertDialog(string)
                    return
                }
            }
            super.save_submitHandler(res);
        }
        else
        {
            var string = 'The applied leave exceed the available leave by ' + (taken_leave - $(BalanceLeaveElement).val()).toString() + ' days.'
            alertDialog(string)
        }
    }
    protected getToolbarButtons() {
        var buttons = super.getToolbarButtons();
        var self = this
        var Linkx = document.createElement('style')
        Linkx.textContent = 
            `
        .hidden {
  display: none;
}
            `
        document.head.appendChild(Linkx)
        buttons.push(
            {
                title: "Approve Application",	// *** Get button text from translation
                cssClass: 'text-bg-success p-2 hidden ',
                icon: 'fa-check text-green',
                onClick: () => {
                    confirm("Do you want to approve this leave application?", () => {
                     
                        if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources])//is HR
                        {
                            
                            if (self.SuperiorPermission == true) {
                                if (self.EmployeeApproval == LeaveStatus.NotNeeded || self.HrApproval == LeaveStatus.NotNeeded) {
                                    if (self.EmployeeApproval == LeaveStatus.NotNeeded) {
                                        LeaveApplicationService.Update({
                                                EntityId: this.entityId,
                                                Entity:
                                                {
                                                    HrStatus: LeaveStatus.Approved,
                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                }
                                            });
                                        }
                                    else if (self.HrApproval == LeaveStatus.NotNeeded) {
                                        LeaveApplicationService.Update({
                                                EntityId: this.entityId,
                                                Entity:
                                                {
                                                    EmployeeStatus: LeaveStatus.Approved,
                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                }
                                            });
                                        }
                                    }
                                    else {
                                    if (self.HrApproval == LeaveStatus.Approved) {
                                        LeaveApplicationService.Update({
                                                EntityId: this.entityId,
                                                Entity:
                                                {
                                                    EmployeeStatus: LeaveStatus.Approved,
                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                }
                                            });
                                        }
                                    else if (self.EmployeeApproval == LeaveStatus.Approved) {
                                        LeaveApplicationService.Update({
                                                EntityId: this.entityId,
                                                Entity:
                                                {
                                                    HrStatus: LeaveStatus.Approved,
                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                                }
                                            });
                                        }
                                        else {
                                        LeaveApplicationService.Update({
                                                EntityId: this.entityId,
                                                Entity:
                                                {
                                                    EmployeeStatus: LeaveStatus.Approved,
                                                    HrStatus: LeaveStatus.Approved,
                                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                    HrUpdated: Authorization.userDefinition.EmployeeRowID
                                                }
                                            });
                                        }
                                    }
                                }
                            else {
                                self.HrApproval = LeaveStatus.Approved
                                LeaveApplicationService.Update({
                                    EntityId: this.entityId,
                                    Entity:
                                    {
                                        HrStatus: LeaveStatus.Approved,
                                        "HrUpdated": Authorization.userDefinition.EmployeeRowID
                                    }
                                });

                            }
                        }
                        else {
                            self.EmployeeApproval = LeaveStatus.Approved
                            LeaveApplicationService.Update({
                                EntityId: this.entityId,
                                Entity:
                                {
                                    EmployeeStatus: LeaveStatus.Approved,
                                    "EmployeeUpdated": Authorization.userDefinition.EmployeeRowID
                                }
                            });
                        }

                        if (self.HrApproval == LeaveStatus.Approved && self.EmployeeApproval == LeaveStatus.Approved && parseInt(self.form.LeaveReasonId.value)==1)
                            {
                                serviceCall<ListResponse<number>>({
                                    service: NoPaidLeaveService.baseUrl + '/CalculateNoPaidLeaveRate',
                                    method: "GET",
                                    data: {
                                        'EmployeeRowID': self.form.EmployeeRowId.value
                                    },
                                    async: false,
                                    onSuccess: (response) => {
                                        var deductions = response
                                        if (parseInt(this.form.HalfDay.value))
                                            deductions = deductions / 2.0
                                        function binaryToBoolean(value: number): boolean {
                                            return value === 1;
                                        }
                                        console.log(self.WeekdaysList)
                                        serviceCall<ListResponse<any>>({
                                            service: LeaveApplicationService.baseUrl + '/CalculateHolidayToTake',
                                            method: "GET",
                                            data: {
                                                'startDate': self.form.StartDate.value,
                                                'endDate': self.form.EndDate.value,
                                            },
                                            async: false,
                                            onSuccess: (response) => {
                                                self.WeekdaysList = response.Entities[0].WeekdaysList

                                                var datesArray = self.WeekdaysList.split(', ');
                                                datesArray.forEach(date => {
                                                    NoPaidLeaveService.Create({
                                                        Entity:
                                                        {
                                                            "EmployeeRowId": parseInt(self.form.EmployeeRowId.value),
                                                            "Deducted": 0,
                                                            "LeaveDate": date,
                                                            "HalfDay": binaryToBoolean(parseInt(this.form.HalfDay.value)),
                                                            "Deductions": deductions,
                                                            "MorningSession": (this.form.MorningSession.value),
                                                            "AfternoonSession": (this.form.AfternoonSession.value)
                                                        }
                                                    });
                                                });
                                                 location.reload()
                                            },
                                            onError: (error) => {
                                            }
                                        });
                                    }
                                })
                        }
                        else
                        location.reload()
                      });
                },
            }
        );
        buttons.push(
            {
                title: "Reject Application",	// *** Get button text from translation
                cssClass: 'text-bg-danger p-2 hidden',
                icon: 'fa-times text-red',
                onClick: () => {
                    confirm("Do you want to reject this Leave application?", () => {
                        if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources])//is HR
                        {

                            if (self.SuperiorPermission == true) {
                                if (self.EmployeeApproval == LeaveStatus.NotNeeded || self.HrApproval == LeaveStatus.NotNeeded) {
                                    if (self.EmployeeApproval == LeaveStatus.NotNeeded) {
                                        LeaveApplicationService.Update({
                                            EntityId: this.entityId,
                                            Entity:
                                            {
                                                HrStatus: LeaveStatus.Rejected,
                                                HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                            }
                                        });
                                    }
                                    else if (self.HrApproval == LeaveStatus.NotNeeded) {
                                        LeaveApplicationService.Update({
                                            EntityId: this.entityId,
                                            Entity:
                                            {
                                                EmployeeStatus: LeaveStatus.Rejected,
                                                EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                            }
                                        });
                                    }
                                }
                                else {
                                    if (self.HrApproval == LeaveStatus.Pending) {
                                        LeaveApplicationService.Update({
                                            EntityId: this.entityId,
                                            Entity:
                                            {
                                                HrStatus: LeaveStatus.Rejected,
                                                HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                            }
                                        });
                                    }
                                    else if (self.EmployeeApproval == LeaveStatus.Pending) {
                                        LeaveApplicationService.Update({
                                            EntityId: this.entityId,
                                            Entity:
                                            {
                                                EmployeeStatus: LeaveStatus.Rejected,
                                                EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                            }
                                        });
                                    }
                                    else {
                                        LeaveApplicationService.Update({
                                            EntityId: this.entityId,
                                            Entity:
                                            {
                                                EmployeeStatus: LeaveStatus.Rejected,
                                                EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                HrStatus: LeaveStatus.Rejected,
                                                HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                            }
                                        });
                                    }
                                }
                            }
                            else
                                LeaveApplicationService.Update({
                                    EntityId: this.entityId,
                                    Entity:
                                    {
                                        HrStatus: LeaveStatus.Rejected,
                                        "HrUpdated": Authorization.userDefinition.EmployeeRowID
                                    }
                                });
                        }
                        else {

                            LeaveApplicationService.Update({
                                EntityId: this.entityId,
                                Entity:
                                {
                                    EmployeeStatus: LeaveStatus.Rejected,
                                    "EmployeeUpdated": Authorization.userDefinition.EmployeeRowID
                                }
                            });

                        }
                        location.reload()

                    });
                },
            }
        );
        
        return buttons;
    }
}