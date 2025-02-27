import { Decorators, EntityDialog, EditorUtils, ListResponse, Criteria } from '@serenity-is/corelib';
import { alertDialog, isEmptyOrNull } from '@serenity-is/corelib/q';
import { confirm, serviceCall, notifySuccess, notifyError } from '@serenity-is/corelib/q';
import { Select2Editor } from '@serenity-is/corelib';
import { EmployeeProfileRow, EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { CompanySettingsService } from '../../../ServerTypes/CompanySettings';
import { ShiftAttendanceRecordRow, ShiftAttendanceRecordService } from '../../../ServerTypes/EmployeeAttendance';
import { ShiftAttendanceDownloaderForm } from '../../../ServerTypes/PayrollSettings';
import { AnnouncementWizardService } from '../../../ServerTypes/Announcement';

@Decorators.registerClass('HRMSoftware.EmployeeAttendance.ShiftAttendanceDownloaderDialog')
export class ShiftAttendanceDownloaderDialog extends EntityDialog<ShiftAttendanceRecordRow, any> {
    protected getFormKey() { return ShiftAttendanceDownloaderForm.formKey; }
    protected getRowDefinition() { return ShiftAttendanceRecordRow; }
    protected getService() { return ShiftAttendanceRecordService.baseUrl; }
    public EmployeeData: EmployeeProfileRow[];
    public PayrollData: any[];

    public dateString: string;
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
    protected form = new ShiftAttendanceDownloaderForm(this.idPrefix);
    public SearchCallback(): void {
        var self = this
        var OccupationListElement = document.getElementById(this.idPrefix + 'OccupationList');
        var DepartmentListElement = document.getElementById(this.idPrefix + 'DepartmentList');
        var DivisionListElement = document.getElementById(this.idPrefix + 'DivisionList');
        var JobGradeListElement = document.getElementById(this.idPrefix + 'JobGradeList');
        var SectionListElement = document.getElementById(this.idPrefix + 'SectionList');
       
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
        // Convert the lists to Sets for faster lookup
        const jobGradeSet = new Set(JobGradeList);
        const divisionSet = new Set(DivisionList);
        const departmentSet = new Set(DepartmentList);
        const occupationSet = new Set(OccupationList);
        const sectionSet = new Set(SectionList);

        for (let employee of self.EmployeeData) {
            const { JobGradeID, DivisionID, DepartmentID, OccupationID, SectionID, Id } = employee;
            console.log(employee)

            // Check if the employee matches any criteria
            const found =
                jobGradeSet.has(JobGradeID) ||
                divisionSet.has(DivisionID) ||
                departmentSet.has(DepartmentID) ||
                occupationSet.has(OccupationID) ||
                sectionSet.has(SectionID);

            let employeeRowListBuffer = self.form.EmployeeRowListBuffer.value;
            let employeeRowList = employeeRowListBuffer ? employeeRowListBuffer.split(',').map(Number) : [];

            if (!found) {
                // Remove employee if not found
                employeeRowList = employeeRowList.filter(num => num !== Id);
            } else {
                // Add employee if not already present
                if (!employeeRowList.includes(Id)) {
                    employeeRowList.push(Id);
                }
            }
            // Update the buffer value
            self.form.EmployeeRowListBuffer.value = employeeRowList.join(',');
        }
        self.form.EmployeeRowList.value = self.form.EmployeeRowListBuffer.value

    }

    public counter: number;
    public WaitingCounter: number;
    public SearchEmployeeCallback(): void {
        var self = this
        var EmployeeRowIdListElement = document.getElementById(this.idPrefix + 'EmployeeRowListBuffer');
        var EmployeeRowIdString = $(EmployeeRowIdListElement).val()
        let numbers = EmployeeRowIdString.split(',')
        let EmployeeRowIdList = [];
        if (EmployeeRowIdString.length)
            numbers.forEach(number => {
                EmployeeRowIdList.push(parseInt(number)); // Convert string to integer and push to numberList
            })
      
        let EmployeeRowList = [];
        var EmployeeRowString = self.form.EmployeeRowListBuffer.value
        let EmployeeRowListBuffer = EmployeeRowString.split(',')
        EmployeeRowListBuffer.forEach(number => {
            EmployeeRowList.push(parseInt(number)); // Convert string to integer and push to numberList
        })
        /*
        PayrollService.List({
        }, response => {

            for (var index in response.Entities) {
                var currentEmployeeRowId = response.Entities[index].EmployeeRowId
                var currentPayMonth = response.Entities[index].PayMonth
                var currentPayYear = response.Entities[index].PayYear
                if (EmployeeRowIdList.indexOf(currentEmployeeRowId) !== -1 && currentPayMonth == PayMonth && currentPayYear == PayYear) {
                    EmployeeRowString = self.form.EmployeeRowListBuffer.value
                    if (EmployeeRowString != "") {
                        let EmployeeRowListBuffer = EmployeeRowString.split(',')
                        EmployeeRowListBuffer.forEach(number => {
                            EmployeeRowList.push(parseInt(number)); // Convert string to integer and push to numberList
                        })
                        EmployeeRowList = EmployeeRowList.filter(number => number !== response.Entities[index].EmployeeRowId);
                        self.form.EmployeeRowListBuffer.value = EmployeeRowList.join(',')
                    }
                }
            }
            self.form.EmployeeRowList.value = EmployeeRowList.join(',')
        })
        */
    }
    protected getToolbarButtons() {
        var self = this;
        var buttons = super.getToolbarButtons();
        $(`#${this.idPrefix}Toolbar`).addClass("ms-auto")
        buttons.push(
            {
                title: "Generate Shift Attendance Records",	// *** Get button text from translation
                cssClass: 'text-bg-success p-2 ml-auto',
                icon: 'fas fa-hat-wizard text-green',
                onClick: () => {
                  
                    var EmployeeRowIdString = self.form.EmployeeRowList.value
                    let EmployeeRowIdList = [];
                    let numbers = EmployeeRowIdString.split(',')
                    if (EmployeeRowIdString.length)
                        numbers.forEach(number => {
                            EmployeeRowIdList.push(parseInt(number)); // Convert string to integer and push to numberList
                        })
                    self.counter = 0
                    confirm(//  the user confirm dont want to download
                        "Are you sure to download the timesheet for these employees?",
                        () => {
                            console.log(self.EmployeeData.find(obj => obj.Id === 12))
                            console.log('hhhaaa')
                            function downloadTimesheet(employeeRowId) {
                                return new Promise<void>((resolve, reject) => {
                                    var queryString = "EmployeeRowId=" + encodeURIComponent(employeeRowId) +
                                        "&startDateStr=" + encodeURIComponent(self.form.startDate.value) +
                                        "&endDateStr=" + encodeURIComponent(self.form.endDate.value);
                                    var url = window.location.origin + '/EmployeeAttendance/ShiftAttendanceRecord/GenerateShiftAttendanceTable?' + queryString;

                                    var xhr = new XMLHttpRequest();
                                    xhr.open('GET', url, true);
                                    xhr.responseType = 'blob';
                                    xhr.onload = function () {
                                        if (xhr.status === 200) {
                                            var blob = xhr.response;
                                            const url = window.URL.createObjectURL(blob);
                                            const a = document.createElement('a');
                                            a.style.display = 'none';
                                            var employee = self.EmployeeData.find(obj => obj.Id == employeeRowId)
                                            var employeeName = employee.EmployeeName
                                            var employeeId = employee.EmployeeID

                                            a.href = url;
                                            a.download = `Attendance Timesheet ${employeeName} ${employeeId} from ${self.form.startDate.value}-${self.form.endDate.value}.pdf`;
                                            a.click();
                                            notifySuccess("Timesheet downloaded");
                                            resolve();
                                        } else {
                                            notifyError('Error encountered when downloading timesheet PDF');
                                            reject(new Error('Download failed'));
                                        }
                                    };
                                    xhr.onerror = () => reject(new Error('Network error'));
                                    xhr.send();
                                });
                            }
                            async function downloadTimesheets() {
                                for (let i = 0; i < self.form.EmployeeRowList.values.length; i++) 
                                    await downloadTimesheet(self.form.EmployeeRowList.values[i]);
                                
                            }
                            downloadTimesheets()
                            



                        }
                    )
                },
            }
        );
        return buttons
    }
    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen();
        var self = this;

        serviceCall<ListResponse<any>>({
            service: AnnouncementWizardService.baseUrl + '/GetTodayDateTime',
            method: "GET",
            data: {
            },
            async: false,
            onSuccess: (response) => {
                self.dateString = response
                CompanySettingsService.List({
                }, response => {
                    var today = new Date(self.dateString)
                    var todayMonth = today.getMonth()
                    var todayYear = today.getFullYear()
                    var PayDate = 0
                    for (var index in response.Entities) {
                        if (response.Entities[index].IsActive == 1) {
                            PayDate = response.Entities[index].PayDay
                            break
                        }
                    }
                    var DateObj = new Date(todayYear, todayMonth, PayDate)
                    var DateObjYear = DateObj.getFullYear().toString()
                    var DateObjMonth = (DateObj.getMonth() + 1).toString()
                    var DateObjDay = DateObj.getDate().toString()
                    todayMonth = todayMonth + 1
                    var LastMonth = new Date(todayYear, todayMonth, PayDate)
                    LastMonth.setDate(LastMonth.getDate() + 1);
                    var LastMonthObjYear = LastMonth.getFullYear().toString()
                    var LastMonthObjMonth = (LastMonth.getMonth() + 1).toString()
                    var LastMonthObjDay = LastMonth.getDate().toString()
                    var LatestDateFormat = DateObjMonth.padStart(2, '0') + '/' + DateObjDay.padStart(2, '0') + '/' + DateObjYear
                    var LastMonthFormat = LastMonthObjMonth.padStart(2, '0') + '/' + LastMonthObjDay.padStart(2, '0') + '/' + LastMonthObjYear
                    if (this.isNew()) {
                        self.form.startDate.value = LatestDateFormat
                        self.form.endDate.value = LastMonthFormat
                    }
                })
            }
        })




        this.saveAndCloseButton.hide()
        this.editButton.hide()
        this.applyChangesButton.hide()
        this.deleteButton.hide()
        this.localizationButton.hide()
        this.cloneButton.hide()
        this.undeleteButton.hide()
        //EditorUtils.setReadonly(this.form.EmployeeRowList.element, true);

        var PayMonthElement = document.getElementById(this.idPrefix + 'PayMonth')
        var PayYearElement = document.getElementById(this.idPrefix + 'PayYear')
        let PayMonthEditor = new Select2Editor($(PayMonthElement))
        let PayYearEditor = new Select2Editor($(PayYearElement))
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
        var today = new Date(self.dateString)
        var todayYear = today.getFullYear()
        var todayMonth = today.getMonth()
        // Example usage:
        for (let i = 0; i < months.length; i++)
            PayMonthEditor.addItem({ id: (i).toString(), text: (months[i]).toString(), }); // 8am - 6pm , will consider lates

        PayMonthEditor.set_value(todayMonth.toString())
        for (let i = -1; i < 2; i++)
            PayYearEditor.addItem({ id: (todayYear + i).toString(), text: (todayYear + i).toString(), }); // 8am - 6pm , will consider lates

        PayYearEditor.set_value(todayYear.toString())


        var SectionListElement = document.getElementById(this.idPrefix + 'SectionList');
        var OccupationListElement = document.getElementById(this.idPrefix + 'OccupationList');
        var DepartmentListElement = document.getElementById(this.idPrefix + 'DepartmentList');
        var DivisionListElement = document.getElementById(this.idPrefix + 'DivisionList');
        var JobGradeListElement = document.getElementById(this.idPrefix + 'JobGradeList');
        
        $(`#s2id_${this.idPrefix}EmployeeRowList`).on('click', async function (e) {
            $(`.select2-drop`).hide()
            return

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
    protected getDialogOptions() {
        let opt = super.getDialogOptions()
        opt.width = opt.width + 100
        return opt
    }
}