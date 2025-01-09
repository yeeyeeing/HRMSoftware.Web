import { Decorators, EntityDialog, EditorUtils, ListResponse, Criteria } from '@serenity-is/corelib';
import { PayrollGeneratingWizardForm, PayrollGeneratingWizardRow, PayrollGeneratingWizardService, PayrollService } from '../../../ServerTypes/PayrollSettings';
import { alertDialog, isEmptyOrNull } from '@serenity-is/corelib/q';
import { confirm, serviceCall, notifySuccess, notifyError } from '@serenity-is/corelib/q';
import {  Select2Editor } from '@serenity-is/corelib';
import { EmployeeProfileRow, EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { PayrollDialog } from '../Payroll/PayrollDialog';
import { PayrollWizDialog } from '../PayrollWiz/PayrollWizDialog';
import { PayrollWizardDialog } from '../PayrollWizard/PayrollWizardDialog';
import { CompanySettingsService } from '../../../ServerTypes/CompanySettings';
import { AnnouncementWizardService } from '../../../ServerTypes/Announcement';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayrollGeneratingWizardDialog')
export class PayrollGeneratingWizardDialog extends EntityDialog<PayrollGeneratingWizardRow, any> {
    protected getFormKey() { return PayrollGeneratingWizardForm.formKey; }
    protected getRowDefinition() { return PayrollGeneratingWizardRow; }
    protected getService() { return PayrollGeneratingWizardService.baseUrl; }
    public EmployeeData: any[];
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
    protected form = new PayrollGeneratingWizardForm(this.idPrefix);
    public SearchCallback(): void {
        var self = this
        var PayMonthElement = document.getElementById(this.idPrefix + 'PayMonth');
        var PayYearElement = document.getElementById(this.idPrefix + 'PayYear');
        var OccupationListElement = document.getElementById(this.idPrefix + 'OccupationList');
        var DepartmentListElement = document.getElementById(this.idPrefix + 'DepartmentList');
        var DivisionListElement = document.getElementById(this.idPrefix + 'DivisionList');
        var JobGradeListElement = document.getElementById(this.idPrefix + 'JobGradeList');
        var SectionListElement = document.getElementById(this.idPrefix + 'SectionList');
        if (isEmptyOrNull($(PayMonthElement).val()) || isEmptyOrNull($(PayYearElement).val())) {
            this.form.EmployeeRowList.value = this.form.EmployeeRowListBuffer.value = ''
            return
        }
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
    }

    public counter: number;
    public WaitingCounter: number;
    public SearchEmployeeCallback(): void
    {
        var self = this
        var EmployeeRowIdListElement = document.getElementById(this.idPrefix + 'EmployeeRowListBuffer');
        var EmployeeRowIdString = $(EmployeeRowIdListElement).val()
        let numbers = EmployeeRowIdString.split(',')
        let EmployeeRowIdList = [];
        if (EmployeeRowIdString.length)
            numbers.forEach(number => {
                EmployeeRowIdList.push(parseInt(number)); // Convert string to integer and push to numberList
            })
        var PayMonthElement = document.getElementById(this.idPrefix + 'PayMonth')
        var PayYearElement = document.getElementById(this.idPrefix + 'PayYear')
        var PayYear = $(PayYearElement).val()
        var PayMonth = $(PayMonthElement).val()
       
        let EmployeeRowList = [];
        var EmployeeRowString = self.form.EmployeeRowListBuffer.value
        let EmployeeRowListBuffer = EmployeeRowString.split(',')
        EmployeeRowListBuffer.forEach(number => {
            EmployeeRowList.push(parseInt(number)); // Convert string to integer and push to numberList
        })

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
    }
    protected getToolbarButtons() {
        var self = this;
        var buttons = super.getToolbarButtons();
        $(`#${this.idPrefix}Toolbar`).addClass("ms-auto")
        buttons.push(
            {
                title: "Generate Payslips",	// *** Get button text from translation
                cssClass: 'text-bg-success p-2 ml-auto',
                icon: 'fas fa-hat-wizard text-green',
                onClick: () => {
                    if (isEmptyOrNull(self.form.PayDate.value)) {
                        notifyError('Please enter pay date');
                        return
                    }
                    if (isEmptyOrNull(self.form.PayMonth.value)) {
                        notifyError('Please enter pay Month');
                        return
                    }
                    if (isEmptyOrNull(self.form.PayYear.value)) {
                        notifyError('Please enter pay Year');
                        return;
                    }
                    if (isEmptyOrNull(self.form.PayPeriodEnd.value)) {
                        notifyError('Please enter pay period end');
                        return
                    }
                    if (isEmptyOrNull(self.form.PayPeriodStart.value)) {
                        notifyError('Please enter pay period start');
                        return
                    }
                    var EmployeeRowIdString = self.form.EmployeeRowList.value
                    let EmployeeRowIdList = [];
                    let numbers = EmployeeRowIdString.split(',')
                    if (EmployeeRowIdString.length)
                        numbers.forEach(number => {
                            EmployeeRowIdList.push(parseInt(number)); // Convert string to integer and push to numberList
                        })
                    self.counter = 0
                    self.WaitingCounter = EmployeeRowIdList.length
                    confirm(//  the user confirm dont want to download
                        "Are you sure to generate payslip of these employees?",
                        () => {
                            function handleEmployee(EmployeeRowId) {
                                return new Promise<void>((resolve) => {
                                    let PayrollDlg = new PayrollDialog(
                                        1,
                                        EmployeeRowId,
                                        self.form.PayYear.value,
                                        self.form.PayMonth.value,
                                        self.form.PayDate.value,
                                        self.form.PayPeriodStart.value,
                                        self.form.PayPeriodEnd.value
                                    );
                                    PayrollDlg.element.on("dialogopen", function () {
                                        $(".s-PayrollDialog").hide()
                                    });
                                    PayrollDlg.dialogOpen();
                                    PayrollDlg.element.on("dialogclose", function () {
                                        self.counter += 1;
                                        if (self.counter == EmployeeRowIdList.length)
                                            notifySuccess("Payslip generated")
                                        resolve();
                                    });
                                });
                            }
                            function handleDownload() {
                                return new Promise<void>((resolve) => {
                                    var DownloadWiz = new PayrollWizardDialog(
                                        EmployeeRowIdString,
                                        self.form.PayMonth.value,
                                        self.form.PayYear.value
                                    );
                                    DownloadWiz.dialogOpen();
                                    DownloadWiz.element.on("dialogclose", function () {
                                        self.SearchCallback();
                                        resolve();
                                    });
                                });
                            }
                            async function processEmployees(EmployeeRowIdList) {
                                for (let index = 0; index < EmployeeRowIdList.length; index++) {
                                   
                                    await handleEmployee(EmployeeRowIdList[index]);
                                }
                                if (self.form.Download.value == true) 
                                    await handleDownload();
                                 else 
                                    self.SearchCallback();
                            }
                            console.log(EmployeeRowIdList)
                            processEmployees(EmployeeRowIdList)
                     
                            if (self.form.Download.value == true)
                                notifySuccess("Payslip downloaded")

                            self.form.EmployeeRowListBuffer.value = self.form.EmployeeRowList.value = ''
                            


                        }
                    )
                },
            }
        );
        buttons.push(
            {
                title: "Download Txt",	// *** Get button text from translation
                cssClass: 'text-bg-success p-2 ml-auto',
                icon: 'fas fa-hat-wizard text-green',
                onClick: () => {

                    var queryString = "PayMonth=" + encodeURIComponent(self.form.PayMonth.value) +
                        "&PayYear=" + encodeURIComponent(self.form.PayYear.value);
                    var url = window.location.origin + '/PayrollSettings/Payroll/TxtGenerate?' + queryString
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.responseType = 'blob';
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            var blob = xhr.response;
                            const fileUrl = window.URL.createObjectURL(blob);

                            // Create an anchor element
                            const a = document.createElement('a');
                            a.style.display = 'none';

                            // Set the href to the Object URL
                            a.href = fileUrl;

                            // Set the download attribute with the desired file name
                            a.download = 'example.txt';  // You can customize the filename here

                            // Append the anchor to the body (required for it to work)
                            document.body.appendChild(a);

                            // Simulate a click to trigger the download
                            a.click();

                            // Clean up by removing the anchor and revoking the object URL
                            document.body.removeChild(a);
                            window.URL.revokeObjectURL(fileUrl);

                        } else {
                            notifyError('Error encounter when downloading Payslip Pdf');
                        }
                    };
                    xhr.send() 


                        }
                    
               
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
                    todayMonth = todayMonth+1
                    var LastMonth = new Date(todayYear, todayMonth, PayDate)
                    LastMonth.setDate(LastMonth.getDate() + 1);
                    var LastMonthObjYear = LastMonth.getFullYear().toString()
                    var LastMonthObjMonth = (LastMonth.getMonth() + 1).toString()
                    var LastMonthObjDay = LastMonth.getDate().toString()
                    var LatestDateFormat = DateObjMonth.padStart(2, '0') + '/' + DateObjDay.padStart(2, '0') + '/' + DateObjYear
                    var LastMonthFormat = LastMonthObjMonth.padStart(2, '0') + '/' + LastMonthObjDay.padStart(2, '0') + '/' + LastMonthObjYear
                    if (this.isNew()) {
                        self.form.PayDate.value = LatestDateFormat
                        self.form.PayPeriodEnd.value = LatestDateFormat
                        self.form.PayPeriodStart.value = LastMonthFormat
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
        var PayPeriodStartElement = document.getElementById(this.idPrefix + 'PayPeriodStart')
        var PayPeriodEndElement = document.getElementById(this.idPrefix + 'PayPeriodEnd')
        var EmployeeRowListElement = document.getElementById(this.idPrefix + 'EmployeeRowList')
       
        console.log(this.idPrefix)
        $(`#s2id_${this.idPrefix}EmployeeRowList`).on('click', async function (e) {
            $(`.select2-drop`).hide()
            return

        })


        $(PayMonthElement).on('change', async function () {
            if (isEmptyOrNull($(PayMonthElement).val()) || isEmptyOrNull($(PayYearElement).val())) 
                self.form.EmployeeRowList.value = ""
            self.SearchCallback();
            self.SearchEmployeeCallback();
        })
        $(PayYearElement).on('change', async function () {
            if (isEmptyOrNull($(PayMonthElement).val()) || isEmptyOrNull($(PayYearElement).val())) 
                self.form.EmployeeRowList.value = ""
            
            self.SearchCallback();
            self.SearchEmployeeCallback();
        })
        $(OccupationListElement).on('change', async function () {
            self.SearchCallback()
            self.SearchEmployeeCallback();

        })
        $(DivisionListElement).on('change', async function () {
            self.SearchCallback();
            self.SearchEmployeeCallback();

        })
        $(JobGradeListElement).on('change', async function () {
            self.SearchCallback();
            self.SearchEmployeeCallback();
        })
        $(DepartmentListElement).on('change', async function () {
            self.SearchCallback();
            self.SearchEmployeeCallback();
        })
        $(SectionListElement).on('change', async function () {
            self.SearchCallback();
            self.SearchEmployeeCallback();

        })
   
        $(PayPeriodStartElement).on('change', async function () {
            //                    self.GeneratePayrollTable()
            if (self.form.PayPeriodStart.valueAsDate > self.form.PayPeriodEnd.valueAsDate) {
                alertDialog('Pay period start cannot be ahead of pay period end')
                self.form.PayPeriodStart.value = ''
                return
            }

        })
        $(PayPeriodEndElement).on('change', async function () {
            // self.GeneratePayrollTable()
            if (self.form.PayPeriodStart.valueAsDate > self.form.PayPeriodEnd.valueAsDate) {
                alertDialog('Pay period start cannot be ahead of pay period end')
                self.form.PayPeriodEnd.value = ''
                return
            }
        })
    }
    protected getDialogOptions() {
        let opt = super.getDialogOptions()
        opt.width = opt.width + 100
        return opt
    }
}