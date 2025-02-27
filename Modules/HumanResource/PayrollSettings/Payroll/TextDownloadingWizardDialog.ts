import { Decorators, EntityDialog, EditorUtils, ListResponse, Criteria } from '@serenity-is/corelib';
import { PayrollGeneratingWizardForm, PayrollGeneratingWizardRow, PayrollGeneratingWizardService, PayrollRow, PayrollService, PayrollSettingsService, TextClass, TextDownloadingWizardForm, TextFormatEpf } from '../../../ServerTypes/PayrollSettings';
import { alertDialog, isEmptyOrNull } from '@serenity-is/corelib/q';
import { confirm, serviceCall, notifySuccess, notifyError } from '@serenity-is/corelib/q';
import {  Select2Editor } from '@serenity-is/corelib';
import { EmployeeProfileRow, EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { PayrollDialog } from '../Payroll/PayrollDialog';
import { PayrollWizDialog } from '../PayrollWiz/PayrollWizDialog';
import { PayrollWizardDialog } from '../PayrollWizard/PayrollWizardDialog';
import { CompanySettingsService } from '../../../ServerTypes/CompanySettings';
import { AnnouncementWizardService } from '../../../ServerTypes/Announcement';
import { Authorization } from '@serenity-is/corelib/q';
import { MasterStateService } from '../../../ServerTypes/Master';

@Decorators.registerClass('HRMSoftware.PayrollSettings.TextDownloadingWizardDialog')
export class TextDownloadingWizardDialog extends EntityDialog<PayrollGeneratingWizardRow, any> {
    protected getFormKey() { return TextDownloadingWizardForm.formKey; }
    protected getRowDefinition() { return PayrollGeneratingWizardRow; }
    protected getService() { return PayrollGeneratingWizardService.baseUrl; }
    public EmployeeData: any[];
    public PayrollData: any[];
    public payrollSettingId: number;

    public dateString: string;




    public payDay: number;
    public OrganisationName: string;
    public Email: string;
    public PhoneNumber: string;
    public OrganisationCode: string;
    public ContactPerson: string;

    constructor() {
        super();
        var criteria: any;
        var self = this
        PayrollSettingsService.List({}, response => {
            for (var res in response.Entities) {
                if (response.Entities[res].IsActive == 1) {
                    self.payrollSettingId = response.Entities[res].Id
                    self.payDay = response.Entities[res].CreditingDay
                    self.form.OrganisationName.value = response.Entities[res].OrganisationName
                    self.form.OrganisationCode.value = response.Entities[res].OrganisationCode
                    self.form.Email.value = response.Entities[res].Email
                    self.form.PhoneNumber.value = response.Entities[res].PhoneNumber
                    self.form.ContactPerson.value = response.Entities[res].ContactPerson


                    self.ContactPerson = response.Entities[res].ContactPerson
                    self.OrganisationCode = response.Entities[res].OrganisationCode
                    self.OrganisationName = response.Entities[res].OrganisationName
                    self.PhoneNumber = response.Entities[res].PhoneNumber
                    self.Email = response.Entities[res].Email

                }
            }
        
        })
        EmployeeProfileService.List({
            Criteria: Criteria.and(criteria, [[EmployeeProfileRow.Fields.Retired], '=', '0'],
                [[EmployeeProfileRow.Fields.Terminated], '=', '0'],
                [[EmployeeProfileRow.Fields.Resigned], '=', '0']
            )
        }, response => {
            this.EmployeeData = response.Entities
        })



    }
    protected form = new TextDownloadingWizardForm(this.idPrefix);

    public counter: number;
    public WaitingCounter: number;
    protected getToolbarButtons() {
        var self = this;
        var buttons = super.getToolbarButtons();
        $(`#${this.idPrefix}Toolbar`).addClass("ms-auto")
        buttons.push(
            {
                title: "Download Text File",	// *** Get button text from translation
                cssClass: 'text-bg-success p-2 ml-auto',
                icon: 'fas fa-hat-wizard text-green',
                onClick: () => {
                    if (isEmptyOrNull(self.form.TextType.value)) {
                        alertDialog('Please fill in the type of government payment to generate')
                        return;
                    }
                    if (isEmptyOrNull(self.form.EmployeeRowList.value)) {
                        alertDialog('Please select the employee to include in the report')
                        return;
                    }
                    console.log(self.form.EmployeeRowList.value)
                    console.log(self.form.MasterStateId.value)
                    if (parseInt(self.form.TextType.value) == TextClass.LHDN.valueOf()) {
                        PayrollSettingsService.Update({
                            EntityId: self.payrollSettingId,
                            Entity:
                            {
                                "Email": self.form.Email.value,
                                "PhoneNumber": self.form.PhoneNumber.value,
                                "ContactPerson": self.form.ContactPerson.value
                            },
                        });
                    }
                    else if (parseInt(self.form.TextType.value) == TextClass.AUTOPAY.valueOf()) {
                        PayrollSettingsService.Update({
                            EntityId: self.payrollSettingId,
                            Entity:
                            {
                                "CreditingDay": self.form.CreditingDate.valueAsDate.getDay(),
                                "OrganisationName": self.form.OrganisationName.value,
                                "OrganisationCode": self.form.OrganisationCode.value
                            },
                        });
                    }
                    else if (parseInt(self.form.TextType.value) == TextClass.EPF.valueOf()) {
                        if (isEmptyOrNull(self.form.MasterStateId.value)) {
                            alertDialog('Please fill in the State Code')
                            return
                        }
                        if (parseInt(self.form.TextFormatEpfId.value) == TextFormatEpf.CIMB.valueOf()) {
                            PayrollSettingsService.Update({
                                EntityId: self.payrollSettingId,
                                Entity:
                                {
                                    "ContactPerson": self.form.ContactPerson.value,
                                    "PhoneNumber": self.form.PhoneNumber.value
                                },
                            });
                        }
                        PayrollSettingsService.Update({
                        EntityId: self.payrollSettingId,
                        Entity:
                        {
                            "StateCodeId": self.form.MasterStateId.value,
                            "OrganisationName": self.form.OrganisationName.value,
                            "OrganisationCode": self.form.OrganisationCode.value

                        },
                        });
                        
                    }
                    
                    var TextFormat;
                    if (parseInt(self.form.TextType.value) == TextClass.LHDN.valueOf())
                        TextFormat = self.form.TextFormatLhdnId.value;

                    else if (parseInt(self.form.TextType.value) == TextClass.AUTOPAY.valueOf()) 
                        TextFormat = self.form.TextFormatAutopayId.value;
                    else if (parseInt(self.form.TextType.value) == TextClass.EPF.valueOf()) 
                        TextFormat = self.form.TextFormatEpfId.value;
                    
                    else if (parseInt(self.form.TextType.value) == TextClass.EIS.valueOf()
                        || parseInt(self.form.TextType.value) == TextClass.SOCSO.valueOf()) 
                        TextFormat = self.form.TextFormatEisSocsoId.value;
                    



                    
                    var queryString = "PayMonth=" + encodeURIComponent(self.form.PayMonth.value) +
                        "&PayYear=" + encodeURIComponent(self.form.PayYear.value) +
                        "&Type=" + encodeURIComponent(self.form.TextType.value) +
                        "&CompanyCode=" + encodeURIComponent(self.form.OrganisationCode.value) +
                        "&CompanyName=" + encodeURIComponent(self.form.OrganisationName.value) +
                        "&CreditingDate=" + encodeURIComponent(self.form.CreditingDate.value) +
                        "&Email=" + encodeURIComponent(self.form.Email.value) +
                        "&PhoneNumber=" + encodeURIComponent(self.form.PhoneNumber.value) +
                        "&ContactPerson=" + encodeURIComponent(self.form.ContactPerson.value) +
                        "&EmployeeArrayString=" + encodeURIComponent(self.form.EmployeeRowList.value) +
                        "&StateCodeId=" + encodeURIComponent(self.form.MasterStateId.value) +
                        "&TextFormat=" + encodeURIComponent(TextFormat) +
                        "&testMode=" + encodeURIComponent(self.form.TestingMode.value)
                    console.log(self.form.MasterStateId.value)
                    console.log(queryString)



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
                            var fileName = `${self.form.TextType.text}.txt`; // Default filename if not provided by the server
                            a.download = fileName;
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
        var ContactPersonElement = document.getElementById(this.idPrefix + 'ContactPerson')
        $(ContactPersonElement).on('input', async function () {
            let value = this.value;

            
            // Limit to 3 characters
            if (value.length > 40) {
                value = value.slice(0, 40);
            }

            // Update input value
            this.value = value;
        })
        var EmailElement = document.getElementById(this.idPrefix + 'Email')
        $(EmailElement).on('input', async function () {
            let value = this.value;


            // Limit to 3 characters
            if (value.length > 40) {
                value = value.slice(0, 40);
            }

            // Update input value
            this.value = value;
        })

        var PhoneNumberElement = document.getElementById(this.idPrefix + 'PhoneNumber')
        $(PhoneNumberElement).on('input', async function () {
            let value = this.value;

            // Remove non-numeric characters
            value = value.replace(/\D/g, '');

            // Limit to 3 characters
            if (value.length > 20) {
                value = value.slice(0, 20);
            }

            // Update input value
            this.value = value;
        })

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
        var MasterStateElement = document.getElementById(this.idPrefix + 'MasterStateId')
    
        var PayMonthElement = document.getElementById(this.idPrefix + 'PayMonth')
        var PayYearElement = document.getElementById(this.idPrefix + 'PayYear')
        let PayMonthEditor = new Select2Editor($(PayMonthElement))
        let PayYearEditor = new Select2Editor($(PayYearElement))
        let StateEditor = new Select2Editor($(MasterStateElement))
        

        MasterStateService.List({
            //Criteria: Criteria('EmployeeRowId').in(self.form.EmployeeRowListBuffer.values),
        }, response => {
            for (var res in response.Entities) {
                if (!isEmptyOrNull(response.Entities[res].StateCode))
                    StateEditor.addItem({ id: (response.Entities[res].Id).toString(), text: (response.Entities[res].Name).toString(), }); // 8am - 6pm , will consider lates
            }
        })
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

        var MasterStateIdElement = document.getElementById(this.idPrefix + 'MasterStateId')
        $(MasterStateIdElement).on('change', async function () {

        })
        var TextFormatEpfElement = document.getElementById(this.idPrefix + 'TextFormatEpfId')
        $(TextFormatEpfElement).on('change', async function () {
            if (parseInt(self.form.TextFormatEpfId.value) == TextFormatEpf.CIMB.valueOf()) 
                $(`.PhoneNumber, .ContactPerson`).show()
            
            else 
                $(`.PhoneNumber, .ContactPerson`).hide()

           
        });

        var TextTypeElement = document.getElementById(this.idPrefix + 'TextType')
        $(`.TextFormatEisSocsoId, .TextFormatEpfId, .TextFormatAutopayId, .TextFormatLhdnId, .TestingMode, .MasterStateId`).hide();
        $(TextTypeElement).on('change', async function () {
            $(`.Email, .PhoneNumber, .ContactPerson, .CreditingDate, .OrganisationName, .OrganisationCode, .MasterStateId`).hide()
            $(`.TextFormatEisSocsoId, .TextFormatEpfId, .TextFormatAutopayId, .TextFormatLhdnId, .TestingMode`).hide();
            if (parseInt(self.form.TextType.value) == TextClass.LHDN.valueOf()) {
                self.form.Email.value = self.Email
                self.form.PhoneNumber.value = self.PhoneNumber
                self.form.ContactPerson.value = self.ContactPerson
                $(`.Email, .PhoneNumber, .ContactPerson`).show()
                $(`.TextFormatLhdnId`).show();

            }
            else if (parseInt(self.form.TextType.value) == TextClass.AUTOPAY.valueOf()) {
                $(`.TextFormatAutopayId`).show();
                var dateGenerated = new Date(todayYear, todayMonth, self.payDay)
                var DateObjYear = dateGenerated.getFullYear().toString()
                var DateObjMonth = (dateGenerated.getMonth() + 1).toString()
                var DateObjDay = dateGenerated.getDate().toString()
                var LatestDateFormat = DateObjMonth.padStart(2, '0') + '/' + DateObjDay.padStart(2, '0') + '/' + DateObjYear
                self.form.CreditingDate.value = LatestDateFormat
                self.form.OrganisationName.value = self.OrganisationName
                self.form.OrganisationCode.value = self.OrganisationCode
                $(` .CreditingDate, .OrganisationName, .OrganisationCode`).show()
            }            
            else if (parseInt(self.form.TextType.value) == TextClass.EPF.valueOf()) {
                $(`.TextFormatEpfId, .TestingMode`).show();
                var dateGenerated = new Date(todayYear, todayMonth, self.payDay)
                var DateObjYear = dateGenerated.getFullYear().toString()
                var DateObjMonth = (dateGenerated.getMonth() + 1).toString()
                var DateObjDay = dateGenerated.getDate().toString()
                var LatestDateFormat = DateObjMonth.padStart(2, '0') + '/' + DateObjDay.padStart(2, '0') + '/' + DateObjYear

                self.form.CreditingDate.value = LatestDateFormat
                $(` .CreditingDate, .MasterStateId`).show()
            }
            else if (parseInt(self.form.TextType.value) == TextClass.EIS.valueOf()
                || parseInt(self.form.TextType.value) == TextClass.SOCSO.valueOf()) {
                $(`.TextFormatEisSocsoId`).show();
            }  


            //dispute in format occur in epf and SOCSO/EIS 
        })
        var SectionListElement = document.getElementById(this.idPrefix + 'SectionList');
        var OccupationListElement = document.getElementById(this.idPrefix + 'OccupationList');
        var DepartmentListElement = document.getElementById(this.idPrefix + 'DepartmentList');
        var DivisionListElement = document.getElementById(this.idPrefix + 'DivisionList');
        var JobGradeListElement = document.getElementById(this.idPrefix + 'JobGradeList');
      
        console.log(this.idPrefix)
        $(`#s2id_${this.idPrefix}EmployeeRowList`).on('click', async function (e) {
            $(`.select2-drop`).hide()
            return

        })


        $(PayMonthElement).on('change', async function () {
            if (isEmptyOrNull($(PayMonthElement).val()) || isEmptyOrNull($(PayYearElement).val()))
                self.form.EmployeeRowList.value = ""
            self.AllButton()

        })
        $(PayYearElement).on('change', async function () {
            if (isEmptyOrNull($(PayMonthElement).val()) || isEmptyOrNull($(PayYearElement).val()))
                self.form.EmployeeRowList.value = ""
            self.AllButton()

        })
        $(OccupationListElement).on('change', async function () {
            self.AllButton()

        })
        $(DivisionListElement).on('change', async function () {
            self.AllButton()

        })
        $(JobGradeListElement).on('change', async function () {
            self.AllButton()

        })
        $(DepartmentListElement).on('change', async function () {
            self.AllButton()

        })
        $(SectionListElement).on('change', async function () {
            self.AllButton()

        })

        var AllElement = document.getElementById(this.idPrefix + 'All');
        $(AllElement).on('change', async function () {
           self.AllButton()
        })


        $(PayMonthElement).on('change', async function () {
            self.AllButton()

        })
        $(PayYearElement).on('change', async function () {
            self.AllButton()

        })
        $(`.Email, .PhoneNumber, .ContactPerson, .CreditingDate, .OrganisationName, .OrganisationCode, .MasterStateId, .TextFormatId`).hide()
      
    }
    public AllButton(): void {
        var self = this
        if (self.form.All.value == true) {
            let EmployeeRowList = []
            for (var index in self.EmployeeData) {
                var EmployeeRowString = self.form.EmployeeRowListBuffer.value
                if (EmployeeRowString != "") {
                    if (EmployeeRowString.includes(',')) {
                        let EmployeeRowListBuffer = EmployeeRowString.split(',')
                        EmployeeRowListBuffer.forEach(number => {
                            EmployeeRowList.push(parseInt(number)); // Convert string to integer and push to numberList
                        })
                        if (EmployeeRowList.indexOf(self.EmployeeData[index].Id) === -1)
                            self.form.EmployeeRowListBuffer.value = self.form.EmployeeRowListBuffer.value + ' , ' + self.EmployeeData[index].Id.toString()
                    }
                    else
                        self.form.EmployeeRowListBuffer.value = self.form.EmployeeRowListBuffer.value + ' , ' + self.EmployeeData[index].Id.toString()

                }
                else
                    self.form.EmployeeRowListBuffer.value = self.EmployeeData[index].Id.toString()
            }
            self.SearchEmployeeCallback();

        }
        else {
            self.SearchCallback();
            self.SearchEmployeeCallback();
        }
    }
    protected getDialogOptions() {
        let opt = super.getDialogOptions()
        opt.width = opt.width + 100
        return opt
    }

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
        var PayMonthElement = document.getElementById(this.idPrefix + 'PayMonth')
        var PayYearElement = document.getElementById(this.idPrefix + 'PayYear')
        var PayYear = $(PayYearElement).val()
        var PayMonth = $(PayMonthElement).val()
        var criteria: any;
        self.form.EmployeeRowList.value = ''
        PayrollService.List({
            //Criteria: Criteria('EmployeeRowId').in(self.form.EmployeeRowListBuffer.values),
            Criteria: Criteria.and(criteria,
                [[PayrollRow.Fields.PayYear], '=', self.form.PayYear.value],
                [[PayrollRow.Fields.PayMonth], '=', self.form.PayMonth.value])
        }, response =>
        {
            console.log(EmployeeRowIdList)
            for (var index in response.Entities)
            {
                var currentEmployeeRowId = response.Entities[index].EmployeeRowId
                var currentPayMonth = response.Entities[index].PayMonth
                var currentPayYear = response.Entities[index].PayYear
                console.log(currentEmployeeRowId)

                if (EmployeeRowIdList.indexOf(currentEmployeeRowId) != -1 && currentPayMonth == PayMonth && currentPayYear == PayYear) {
                    console.log(currentEmployeeRowId)
                    self.form.EmployeeRowList.value = currentEmployeeRowId + ' , '+  self.form.EmployeeRowList.value 
                }
            }
        })
        
    }
}