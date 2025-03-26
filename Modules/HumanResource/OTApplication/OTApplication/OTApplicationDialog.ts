import { Decorators, EditorUtils, EntityDialog, parseDate, RetrieveResponse } from '@serenity-is/corelib';
import { OTApplicationForm, OTApplicationRow, OTApplicationService, OTApplicationStatus } from '../../../ServerTypes/OTApplication';
import timepicker from 'timepicker/jquery.timepicker'

import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { Authorization } from '@serenity-is/corelib/q';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { CompanySettingsService } from '../../../ServerTypes/CompanySettings';
import { alertDialog } from '@serenity-is/corelib/q';
import { serviceCall, ListResponse, confirm, isEmptyOrNull } from '@serenity-is/corelib/q';
import { userDefinition } from '../../../Administration/User/Authentication/Authorization';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { EmployeeBasicDataDialog } from '../../EmployeeBasicData/EmployeeBasicData/EmployeeBasicDataDialog';
import { OrganisationChartService } from '../../../ServerTypes/OrganisationChart';
import { AnnouncementWizardService } from '../../../ServerTypes/Announcement';
import { OTApplicationRejectDialog } from './OTApplicationRejectDialog';
import { PublicHolidayService } from '../../../ServerTypes/PublicHoliday';

@Decorators.registerClass('HRMSoftware.OTApplication.OTApplicationDialog')
export class OTApplicationDialog extends EntityDialog<OTApplicationRow, any> {
    protected getFormKey() { return OTApplicationForm.formKey; }
    protected getRowDefinition() { return OTApplicationRow; }
    protected getService() { return OTApplicationService.baseUrl; }

    protected form = new OTApplicationForm(this.idPrefix);
    public minimum_ot_time: number;
    public fixedOtRateOption: boolean;
    public fixedOtRate: number;
    public thresholdSalary: number;
    public EmployeeApproval: number;
    public HrApproval: number;
    public SuperiorPermission: boolean;
    public ListOfPublicHolidayDate: string[]=[];
    public SundayWeekday: boolean;
    public MondayWeekday: boolean;
    public TuesdayWeekday: boolean;
    public WednesdayWeekday: boolean;
    public ThursdayWeekday: boolean;
    public FridayWeekday: boolean;
    public SaturdayWeekday: boolean;

    constructor() {
        super();
        var self = this
        CompanySettingsService.List({}, response => {
            var CountryCode
            for (var res in response.Entities) {
                if (response.Entities[res].IsActive == 1) {
                    CountryCode = response.Entities[res].BasedCountry
                    this.SundayWeekday = response.Entities[res].SundayWeekday
                    this.MondayWeekday = response.Entities[res].MondayWeekday
                    this.TuesdayWeekday = response.Entities[res].TuesdayWeekday
                    this.WednesdayWeekday = response.Entities[res].WednesdayWeekday
                    this.ThursdayWeekday = response.Entities[res].ThursdayWeekday
                    this.FridayWeekday = response.Entities[res].FridayWeekday
                    this.SaturdayWeekday = response.Entities[res].SaturdayWeekday
                }
            }
            PublicHolidayService.List({}, response => {
                for (var res in response.Entities) {
                    if (response.Entities[res].IsActive == 1 && response.Entities[res].CountryCode.replace(/\s+/g, "") == CountryCode) 
                        self.ListOfPublicHolidayDate.push(response.Entities[res].Date.substring(0,10))
                    
                }

            })

        })

        // Create link element for CSS
        var linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = "https://cdn.jsdelivr.net/npm/clocklet@0.3.0/css/clocklet.min.css";
        var scriptElement = document.createElement('script');
        scriptElement.src = "https://cdn.jsdelivr.net/npm/clocklet@0.3.0";
        // Append link and script elements to the head of the document
        document.head.appendChild(linkElement);
        document.head.appendChild(scriptElement);
        var tabId = $(".fieldset").children().attr('id');
        const searchString = "PropertyGrid";
        const StartingreplacementString = "StartingAt";
        const EndingreplacementString = "EndingAt";
        const lastIndex = tabId.lastIndexOf(searchString);
        if (lastIndex !== -1) {
            var starting_time_element_id = tabId.substring(0, lastIndex) + StartingreplacementString;
            var ending_time_element_id = tabId.substring(0, lastIndex) + EndingreplacementString;
        }
        var StartClocklet = document.getElementById(starting_time_element_id)
        StartClocklet.setAttribute('data-clocklet', '');
        StartClocklet.setAttribute("id", "ot-start-clocklet");
        StartClocklet.addEventListener("clocklet.opening", function (event) {
            const myClocklet = document.getElementById("ot-start-clocklet") as HTMLElement;
            if (myClocklet) {
                myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
            }
        });
        StartClocklet.addEventListener("clocklet.closed", function (event) {
        });
        var EndClocklet = document.getElementById(ending_time_element_id)
        EndClocklet.setAttribute('data-clocklet', '');
        EndClocklet.setAttribute("id", "ot-end-clocklet");
        EndClocklet.addEventListener("clocklet.opening", function (event) {
            const myClocklet = document.getElementById("ot-end-clocklet") as HTMLElement;
            if (myClocklet) {
                myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
            }
        });
        EndClocklet.addEventListener("clocklet.closed", function (event) {
        });
    }
    public calculateOtRate(check:boolean): void {
        function getDayOfWeek(dateString: string): number {
            const date = new Date(dateString);
            return date.getDay();
        }
        function isDateInArray(dateArray: string[], targetDate: string): boolean {
            // Normalize the target date (remove dashes for easy comparison)
            const normalizedTarget = targetDate.replace(/-/g, "");

            // Normalize and check each date in the array
            return dateArray.some(date => {
                const normalizedDate = date.replace(/-/g, "").padEnd(8, "0");
                return normalizedDate === normalizedTarget;
            });
        }
        var self = this
        if (isEmptyOrNull(self.form.EmployeeRowId.value) || isEmptyOrNull(self.form.OtDate.value)) {
            self.form.OtRate.value = null
            return
        }
        if (check == true) {
            self.form.PublicHolidayOt.value = self.form.WeekendOt.value = self.form.WeekdayOt.value = false

            var isPublicHoliday = isDateInArray(self.ListOfPublicHolidayDate, self.form.OtDate.value)
            if (isPublicHoliday == true) {
                self.form.PublicHolidayOt.value = true
            }
            else {
                var day = getDayOfWeek(self.form.OtDate.value)
                if ((day == 0 && self.SundayWeekday == false) ||
                    (day == 1 && self.MondayWeekday == false) ||
                    (day == 2 && self.TuesdayWeekday == false) ||
                    (day == 3 && self.WednesdayWeekday == false) ||
                    (day == 4 && self.ThursdayWeekday == false) ||
                    (day == 5 && self.FridayWeekday == false) ||
                    (day == 6 && self.SaturdayWeekday == false)) {

                    self.form.WeekendOt.value = true;
                } else {
                    self.form.WeekdayOt.value = true; // Reset if the day is allowed
                }
            }

        }
        serviceCall<RetrieveResponse<any>>({
            service: EmployeeProfileService.baseUrl + '/CalculateOtRate',
            data: {
                "EmployeeRowID": self.form.EmployeeRowId.value,
                "Date": self.form.OtDate.value

            },
            method: "GET",
            async: false,
            onSuccess: (response) => {
                console.log(response)
                if (self.form.WeekendOt.value == true)
                    self.form.OtRate.value = response.Entities[0].OtRateWeekend
                else if (self.form.WeekdayOt.value == true)
                    self.form.OtRate.value = response.Entities[0].OtRateWeekday
                else if (self.form.PublicHolidayOt.value == true)
                    self.form.OtRate.value = response.Entities[0].OtRatePublicHoliday
                if (!isEmptyOrNull(self.form.OtHourBuffer.value)) {
                    var subTotal = self.form.OtRate.value * self.form.OtHourBuffer.value
                    self.form.TotalOtPayBuffer.value = subTotal
                }
            }
        })



    }
    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);
       
        EditorUtils.setReadonly(this.form.OtRate.element, true);

        EditorUtils.setReadonly(this.form.EmployeeName.element, true);
        var self = this

        var OtDate = document.getElementById(this.idPrefix + 'OtDate')
        $(OtDate).on('change', () => {


            self.calculateOtRate(true)
        });

        var WeekendOt = document.getElementById(this.idPrefix + 'WeekendOt')
        $(WeekendOt).on('change', () => {
            if (self.form.PublicHolidayOt.value == true)
                self.form.PublicHolidayOt.value = false
            if (self.form.WeekdayOt.value == true)
                self.form.WeekdayOt.value = false

            self.calculateOtRate(false)
        });

        var PublicHolidayOt = document.getElementById(this.idPrefix + 'PublicHolidayOt')
        $(PublicHolidayOt).on('change', () => {
            if (self.form.WeekendOt.value == true)
                self.form.WeekendOt.value = false
            if (self.form.WeekdayOt.value == true)
                self.form.WeekdayOt.value = false

            self.calculateOtRate(false)
        });
        var WeekdayOt = document.getElementById(this.idPrefix + 'WeekdayOt')
        $(WeekdayOt).on('change', () => {
            if (self.form.WeekendOt.value == true)
                self.form.WeekendOt.value = false
            if (self.form.PublicHolidayOt.value == true)
                self.form.PublicHolidayOt.value = false

            self.calculateOtRate(false)
        });
        function getHoursBetween(start: string, end: string): number {
            const startTime = new Date();
            const endTime = new Date();

            // Parse the HH:mm format and set the time in Date object
            const [startHour, startMinute] = start.split(":").map(Number);
            const [endHour, endMinute] = end.split(":").map(Number);

            startTime.setHours(startHour, startMinute, 0, 0);
            endTime.setHours(endHour, endMinute, 0, 0);

            // If end time is earlier than start time, it means the shift crossed midnight
            if (endTime < startTime) {
                // Add 24 hours to the end time to correctly calculate night shift hours
                endTime.setDate(endTime.getDate() + 1);
            }

            // Calculate the difference in milliseconds and convert to hours
            return (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        }
        var StartingElement = document.getElementById('ot-start-clocklet') as HTMLInputElement
        var EndingElement = document.getElementById('ot-end-clocklet') as HTMLInputElement
       
        $(StartingElement).on('change', () => {
            console.log('hahaha')
            var startTimeStr = StartingElement.value
            var endTimeStr = EndingElement.value
            var hours = getHoursBetween(startTimeStr, endTimeStr)
            self.form.OtHourBuffer.value = hours
            if (!isEmptyOrNull(self.form.OtRate.value)) {
                var subTotal = self.form.OtRate.value * self.form.OtHourBuffer.value
                self.form.OtPayBuffer.value = subTotal
            }
        });
        $(EndingElement).on('change', () => {
            var startTimeStr = StartingElement.value
            var endTimeStr = EndingElement.value
            var hours = getHoursBetween(startTimeStr, endTimeStr)
            self.form.OtHourBuffer.value = hours
            if (!isEmptyOrNull(self.form.OtRate.value)) {
                var subTotal = self.form.OtRate.value * self.form.OtHourBuffer.value
                self.form.OtPayBuffer.value = subTotal
            }

        });


        /*
        serviceCall<ListResponse<any>>({
            service: AnnouncementWizardService.baseUrl + '/GetTodayDateTime',
            method: "GET",
            data: {
            },
            async: false,
            onSuccess: (response) => {
                self.form.OtDate.value = response;
            }
        })

        
        if (this.isNew()) { 
            CompanySettingsService.List({}, response => {
                for (var index in response.Entities)
                {
                    if (response.Entities[index].IsActive == 1) {
                        if (response.Entities[index].FixedOtRateOption == true) {
                            EditorUtils.setReadonly(this.form.OtRate.element, true);
                            self.fixedOtRateOption = true
                            self.fixedOtRate = response.Entities[index].FixedOtRate
                            self.thresholdSalary = response.Entities[index].MaximumBasicSalary
                        }
                        else 
                        {
                            EmployeeProfileService.List({
                            }, response => {
                                for (var index in response.Entities) {
                                    if (response.Entities[index].UserRowID == Authorization.userDefinition.UserId) {
                                        this.form.EmployeeRowId.value = response.Entities[index].Id.toString()
                                        break
                                    }
                                }
                            });

                        }
                        this.minimum_ot_time = response.Entities[index].OTMinimumMinute
                    }
                    }
            })
        

    }
         */
    }


    protected save_submitHandler(response): void {
        var self = this
        var StartingElement = document.getElementById('ot-start-clocklet') as HTMLInputElement
        var EndingElement = document.getElementById('ot-end-clocklet') as HTMLInputElement
        var startTimeStr = StartingElement.value
        var endTimeStr = EndingElement.value

        // Split the strings into hours and minutes
        const startTimeParts: string[] = startTimeStr.split(':');
        const endTimeParts: string[] = endTimeStr.split(':');

        // Convert the parts into numbers
        const startHours: number = parseInt(startTimeParts[0], 10);
        const startMinutes: number = parseInt(startTimeParts[1], 10);
        const endHours: number = parseInt(endTimeParts[0], 10);
        const endMinutes: number = parseInt(endTimeParts[1], 10);
        var timediff = 60 * (endHours - startHours) + (endMinutes - startMinutes)
        // Check if start time is greater than end time

        if (this.minimum_ot_time > timediff) {
            alertDialog('This OT cannot be applied as the duration is less than minimum time')
            return
        }
        if (self.form.PublicHolidayOt.value == false && self.form.WeekdayOt.value == false && self.form.WeekendOt.value == false)
            alertDialog('Please choose the type of ot to determine the rate')


        super.save_submitHandler(response)

    }
    protected onDialogOpen() {
        super.onDialogOpen()
        $(".EmployeeUpdated").hide()
        $(".HrUpdated").hide()
        var self = this

        if (isEmptyOrNull(this.form.EmployeeUpdatedName.value))
            $(".EmployeeUpdatedName").hide()
        else {
            var EmployeeUpdatedNameElement = document.getElementById(this.idPrefix + 'EmployeeUpdatedName')
            $(EmployeeUpdatedNameElement).on('click', async function () {
                var dlg = new EmployeeBasicDataDialog(parseInt(this.form.EmployeeUpdated.value))
                dlg.loadByIdAndOpenDialog(parseInt(this.form.EmployeeUpdated.value))
            })
            if (!isEmptyOrNull(self.form.SuperiorRejectReason.value))
                $(".SuperiorRejectReason").show()

        }
        if (isEmptyOrNull(this.form.HrUpdatedName.value))
            $(".HrUpdatedName").hide()
        else {

            var HrUpdatedNameNameElement = document.getElementById(this.idPrefix + 'HrUpdatedName')
            $(HrUpdatedNameNameElement).on('click', async function () {
                var dlg = new EmployeeBasicDataDialog(parseInt(this.form.HrUpdated.value))
                dlg.loadByIdAndOpenDialog(parseInt(this.form.HrUpdated.value))
            })
            if (!isEmptyOrNull(self.form.HrRejectReason.value))
                $(".HrRejectReason").show()
        }


        var RejectedBy = '.RejectedEmployeeName'
        var ApprovedBy = '.ApproveEmployeeName'
        var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'EmployeeRowId')
        var OtDate = document.getElementById(this.idPrefix + 'OtDate')

        if (!Authorization.userDefinition.Permissions[PermissionKeys.HumanResources] && this.isNew()) {
            this.form.EmployeeRowId.value = Authorization.userDefinition.EmployeeRowID
            EditorUtils.setReadonly(this.form.EmployeeRowId.element, true);
            EmployeeProfileService.Retrieve({
                EntityId: $(EmployeeRowIdElement).val()
            }, response => {
                self.form.EmployeeName.value = response.Entity.EmployeeName
                $(self.form.EmployeeRowId.element).val(Authorization.userDefinition.EmployeeRowID.toString()).trigger('change');
            });
        }
        if (this.isNew()) {
            $(EmployeeRowIdElement).on('change', async function () {
                if (isEmptyOrNull($(EmployeeRowIdElement).val())) {
                    self.form.EmployeeName.value = ''
                    $(self.form.OtRate.element).val('')
                    return
                }
                self.calculateOtRate()

                EmployeeProfileService.Retrieve({
                    EntityId: $(EmployeeRowIdElement).val()
                }, response => {
                    self.form.EmployeeName.value = response.Entity.EmployeeName
                    /*
                    if (self.fixedOtRateOption == true && response.Entity.BasicSalary < self.thresholdSalary)
                        self.form.OtRate.value = self.fixedOtRate
                    else
                        $(self.form.OtRate.element).val('')
                    if (isEmptyOrNull($(this).val()) || isEmptyOrNull($(OtDate).val()))
                        return;
                    var EmployeeRowId = response.Entity.Id
                    var parts = $(OtDate).val().split(/[\/?]/);
                    // Rearrange the parts to the desired format "YYYY//MM/DD"
                    var yyyy = parts[2];
                    var mm = parts[0];
                    var dd = parts[1];
                    */
                    // Construct the new date string in the desired format
                    /*
                    if (self.fixedOtRateOption == true && response.Entity.BasicSalary > self.thresholdSalary) 
                        self.form.OtRate.value = self.fixedOtRate
                    else {
                        serviceCall<RetrieveResponse<any>>({
                            service: OTApplicationService.baseUrl + '/CalculateOtRate',
                            data: {
                                'EmployeeRowID': EmployeeRowId,
                                'Date': convertedDate
                            },
                            method: "GET",
                            async: false,
                            onSuccess: (response) => {
                                
                                self.form.OtRate.value = response
                            },
                            onError: (error) => {
                                console.log(error.Error);
                            }
                        });
                    }
                    */
                });
            });

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
            $(ApprovedBy).hide()



            /*
            $(OtDate).on('change', async function() {
              
                var parts = $(this).val().split(/[\/?]/);

                // Rearrange the parts to the desired format "YYYY//MM/DD"
                var yyyy = parts[2];
                var mm = parts[0];
                var dd = parts[1];

                var convertedDate = yyyy + "/" + mm + "/" + dd;

                EmployeeProfileService.Retrieve({
                    EntityId: $(EmployeeRowIdElement).val()
                }, response => {
                    self.form.EmployeeName.value = response.Entity.EmployeeName

                    if (self.fixedOtRateOption == true && response.Entity.BasicSalary > self.thresholdSalary) {
                        self.form.OtRate.value = self.fixedOtRate
                    }
                    else
                        $(self.form.OtRate.element).val('')
                    if (isEmptyOrNull($(this).val()) || isEmptyOrNull($(OtDate).val()))
                        return;
                    var EmployeeRowId = response.Entity.Id
                    var parts = $(OtDate).val().split(/[\/?]/);
                    // Rearrange the parts to the desired format "YYYY//MM/DD"
                    var yyyy = parts[2];
                    var mm = parts[0];
                    var dd = parts[1];
                    // Construct the new date string in the desired format
                    var convertedDate = yyyy + "/" + mm + "/" + dd;
                    console.log(self.thresholdSalary)
                    if (self.fixedOtRateOption == true && response.Entity.BasicSalary > self.thresholdSalary) {
                        self.form.OtRate.value = self.fixedOtRate
                    }
                    else {
                        console.log(convertedDate)
                        console.log(EmployeeRowId)

                        serviceCall<RetrieveResponse<any>>({
                            service: OTApplicationService.baseUrl + '/CalculateOtRate',
                            data: {
                                'EmployeeRowID': EmployeeRowId,
                                'Date': convertedDate
                            },
                            method: "GET",
                            async: false,
                            onSuccess: (response) => {
                                self.form.OtRate.value = response
                            },
                            onError: (error) => {
                                console.log(error.Error);
                            }
                        });
                    }
                });
                
            });
            */

        }
        else if (!this.isNew()) {
            if (!Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]
                && self.form.EmployeeRowId.value != Authorization.userDefinition.EmployeeRowID)//if no hr privilege
                this.readOnly = true
            if (self.form.EmployeeRowId.value == Authorization.userDefinition.EmployeeRowID) {
                EditorUtils.setReadonly(this.form.EmployeeRowId.element, true);
                EditorUtils.setReadonly(this.form.EmployeeName.element, true);
                return
            }
            OTApplicationService.Retrieve({
                EntityId: this.entityId
            }, response => {
                var applicant = response.Entity.EmployeeRowId
                var HrStatus = self.HrApproval = response.Entity.HrStatus
                var EmployeeStatus = self.EmployeeApproval = response.Entity.EmployeeStatus
                var applicationStatus = response.Entity.Status
                if (applicationStatus == OTApplicationStatus.Pending) {
                    serviceCall<RetrieveResponse<any>>({
                        service: OrganisationChartService.baseUrl + '/PermissionToAcknowledge',
                        data: {
                            'UserEmployeeRowID': Authorization.userDefinition.EmployeeRowID,
                            'ApplicantEmployeeRowID': applicant
                        },
                        method: "GET",
                        async: false,
                        onSuccess: (response) => {
                            var PermissionToAck = self.SuperiorPermission = response
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
                            else if ((HrStatus == OTApplicationStatus.Rejected || EmployeeStatus == OTApplicationStatus.Rejected)
                                || (HrStatus == OTApplicationStatus.Approved && EmployeeStatus == OTApplicationStatus.Approved)) {
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

 
    protected getToolbarButtons() {
        var self = this
        var buttons = super.getToolbarButtons();
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
                cssClass: 'text-bg-success p-2 hidden approveApplication',
                icon: 'fa-check text-green',
                onClick: () => {
                    confirm("Do you want to approve this application?", () => {
                        let updateData: OTApplicationRow = {};

                        if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]) { // HR
                            if (self.SuperiorPermission) {
                                if (self.EmployeeApproval === OTApplicationStatus.NotNeeded || self.HrApproval === OTApplicationStatus.NotNeeded) {
                                    if (self.EmployeeApproval === OTApplicationStatus.NotNeeded) {
                                        updateData = {
                                            HrStatus: OTApplicationStatus.Approved,
                                            HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                        };
                                    } else if (self.HrApproval === OTApplicationStatus.NotNeeded) {
                                        updateData = {
                                            EmployeeStatus: OTApplicationStatus.Approved,
                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                        };
                                    }
                                } else {
                                    if (self.HrApproval === OTApplicationStatus.Approved) {
                                        updateData = {
                                            EmployeeStatus: OTApplicationStatus.Approved,
                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                        };
                                    } else if (self.EmployeeApproval === OTApplicationStatus.Approved) {
                                        updateData = {
                                            HrStatus: OTApplicationStatus.Approved,
                                            HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                        };
                                    } else {
                                        updateData = {
                                            EmployeeStatus: OTApplicationStatus.Approved,
                                            HrStatus: OTApplicationStatus.Approved,
                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                            HrUpdated: Authorization.userDefinition.EmployeeRowID
                                        };
                                    }
                                }
                            } else {
                                updateData = {
                                    HrStatus: OTApplicationStatus.Approved,
                                    HrUpdated: Authorization.userDefinition.EmployeeRowID
                                };
                            }
                        }
                        else {
                            updateData = {
                                EmployeeStatus: OTApplicationStatus.Approved,
                                EmployeeUpdated: Authorization.userDefinition.EmployeeRowID
                            };
                        }
                        OTApplicationService.Update({
                            EntityId: self.entityId,
                            Entity: updateData
                        }, response => {
                            self.loadById(response.EntityId)
                            $('.rejectApplication, .approveApplication').hide()
                        })
                    });

                },
            }
        );
                
        buttons.push(
            {
                title: "Rejected Application",	// *** Get button text from translation
                cssClass: 'text-bg-danger p-2 hidden rejectApplication',
                icon: 'fa-times text-red',
                onClick: () => {
                    confirm("Do you want to reject this application?", () => {
                        var rejectDlg = new OTApplicationRejectDialog()
                        rejectDlg.dialogOpen()
                        rejectDlg.element.on('dialogclose', () => {
                        let updateData: OTApplicationRow = {};
                         var rejectReason = window["rejectReason"]


                        if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]) { // is HR
                            if (self.SuperiorPermission == true) {
                                if (self.EmployeeApproval == OTApplicationStatus.NotNeeded || self.HrApproval == OTApplicationStatus.NotNeeded) {
                                    if (self.EmployeeApproval == OTApplicationStatus.NotNeeded) {
                                        updateData = {
                                            HrStatus: OTApplicationStatus.Rejected,
                                            HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                            HrRejectReason: rejectReason,
                                        };
                                    }
                                    else if (self.HrApproval == OTApplicationStatus.NotNeeded) {
                                        updateData = {
                                            EmployeeStatus: OTApplicationStatus.Rejected,
                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                            SuperiorRejectReason: rejectReason
                                        };
                                    }
                                }
                                else {
                                    if (self.HrApproval == OTApplicationStatus.Pending) {
                                        updateData = {
                                            HrStatus: OTApplicationStatus.Rejected,
                                            HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                            HrRejectReason: rejectReason,
                                        };
                                    }
                                    else if (self.EmployeeApproval == OTApplicationStatus.Pending) {
                                        updateData = {
                                            EmployeeStatus: OTApplicationStatus.Rejected,
                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                            SuperiorRejectReason: rejectReason
                                        };
                                    }
                                    else {
                                        updateData = {
                                            EmployeeStatus: OTApplicationStatus.Rejected,
                                            EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                            HrStatus: OTApplicationStatus.Rejected,
                                            HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                            HrRejectReason: rejectReason,
                                            SuperiorRejectReason: rejectReason
                                        };
                                    }
                                }
                            }
                            else {
                                updateData = {
                                    HrStatus: OTApplicationStatus.Rejected,
                                    HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                     HrRejectReason: rejectReason,
                                };
                            }

                        }
                        else {
                            updateData = {
                                EmployeeStatus: OTApplicationStatus.Rejected,
                                EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                SuperiorRejectReason: rejectReason
                            };
                        }


                        OTApplicationService.Update({
                            EntityId: self.entityId,
                            Entity: updateData
                        }, response => {
                            self.loadById(response.EntityId, response => {
                                console.log(response)
                                if (!isEmptyOrNull(self.form.SuperiorRejectReason.value))
                                    $('.SuperiorRejectReason').show()
                                if (!isEmptyOrNull(self.form.HrRejectReason.value))
                                    $('.HrRejectReason').show()
                            })
                            $('.rejectApplication, .approveApplication').hide()

                        })
                    })

                    });
                },
            }
        );
            
        return buttons;
    }
    
}