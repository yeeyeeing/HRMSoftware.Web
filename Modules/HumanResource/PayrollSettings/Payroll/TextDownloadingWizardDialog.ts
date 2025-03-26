import { Decorators, EntityDialog, EditorUtils, ListResponse, Criteria } from '@serenity-is/corelib';
import { PayrollGeneratingWizardForm, PayrollGeneratingWizardRow, PayrollGeneratingWizardService, PayrollRow, PayrollService, PayrollSettingsService, TextClass, TextDownloadingWizardForm, TextFormatAutopay, TextFormatEpf, TextFormatLHDN } from '../../../ServerTypes/PayrollSettings';
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
                let entity = response.Entities[res];

                if (entity.IsActive == 1) {
                    self.payrollSettingId = entity.Id || null;
                    self.payDay = entity.CreditingDay || null;

                    if (entity.OrganisationName) self.form.OrganisationName.value = entity.OrganisationName;
                    if (entity.OrganisationCode) self.form.OrganisationCode.value = entity.OrganisationCode;
                    if (entity.Email) self.form.Email.value = entity.Email;
                    if (entity.PhoneNumber) self.form.PhoneNumber.value = entity.PhoneNumber;
                    if (entity.ContactPerson) self.form.ContactPerson.value = entity.ContactPerson;
                    if (entity.StateCodeId) self.form.MasterStateId.value = entity.StateCodeId;

                    self.ContactPerson = entity.ContactPerson || "";
                    self.OrganisationCode = entity.OrganisationCode || "";
                    self.OrganisationName = entity.OrganisationName || "";
                    self.PhoneNumber = entity.PhoneNumber || "";
                    self.Email = entity.Email || "";

                    if (entity.LhdnFormatId) self.form.TextFormatLhdnId.value = entity.LhdnFormatId.toString();
                    if (entity.SocsoFormatId) self.form.TextFormatEisSocsoId.value = entity.SocsoFormatId.toString();
                    if (entity.EisFormatId) self.form.TextFormatEisSocsoId.value = entity.EisFormatId.toString();
                    if (entity.AutopayFormatId) self.form.TextFormatAutopayId.value = entity.AutopayFormatId.toString();
                    if (entity.EpfFormatId) self.form.TextFormatEpfId.value = entity.EpfFormatId.toString();
                }
            }
        });
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
                cssClass: 'text-bg-success p-2 ml-auto downloadButton hidden',
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
                    if (parseInt(self.form.TextType.value) == TextClass.LHDN.valueOf()) {
                        PayrollSettingsService.Update({
                            EntityId: self.payrollSettingId,
                            Entity:
                            {
                                "Email": self.form.Email.value,
                                "PhoneNumber": self.form.PhoneNumber.value,
                                "ContactPerson": self.form.ContactPerson.value,
                                "LhdnFormatId": parseInt(self.form.TextFormatLhdnId.value),
                                "StateCodeId": self.form.MasterStateId.value,
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
                                "OrganisationCode": self.form.OrganisationCode.value,
                                "AutopayFormatId": parseInt(self.form.TextFormatAutopayId.value)
                            },
                        });
                    }
                    else if (parseInt(self.form.TextType.value) == TextClass.SOCSO.valueOf()) {
                        PayrollSettingsService.Update({
                            EntityId: self.payrollSettingId,
                            Entity:
                            {
                                "SocsoFormatId": parseInt(self.form.TextFormatEisSocsoId.value)
                            },
                        });
                    }
                    else if (parseInt(self.form.TextType.value) == TextClass.EIS.valueOf()) {
                        PayrollSettingsService.Update({
                            EntityId: self.payrollSettingId,
                            Entity:
                            {
                                "EisFormatId": parseInt(self.form.TextFormatEisSocsoId.value)
                            },
                        });
                    }
                    else if (parseInt(self.form.TextType.value) == TextClass.EPF.valueOf()) {
                        PayrollSettingsService.Update({
                            EntityId: self.payrollSettingId,
                            Entity:
                            {
                                "EpfFormatId": parseInt(self.form.TextFormatEpfId.value)
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
            self.handleDownloadButton()

        })
        var TestingModeElement = document.getElementById(this.idPrefix + 'TestingMode')
        $(TestingModeElement).on('change', async function () {
            self.handleDownloadButton()


        })
        var TextFormatEpfElement = document.getElementById(this.idPrefix + 'TextFormatEpfId')
        $(TextFormatEpfElement).on('change', async function () {
            if (parseInt(self.form.TextFormatEpfId.value) == TextFormatEpf.CIMB.valueOf()) 
                $(`.PhoneNumber, .ContactPerson`).show()
            
            else 
                $(`.PhoneNumber, .ContactPerson`).hide()
            self.handleDownloadButton()
            
           
        });
        var TextFormatAutopayIdElement = document.getElementById(this.idPrefix + 'TextFormatAutopayId');
        $(TextFormatAutopayIdElement).on('change', async function () {
            self.handleDownloadButton()
        })
        var TextTypeElement = document.getElementById(this.idPrefix + 'TextType')
        var TextFormatEisSocsoIdElement = document.getElementById(this.idPrefix + 'TextFormatEisSocsoId')
        $(TextFormatEisSocsoIdElement).on('change', async function () {
            self.handleDownloadButton()
        })
        var TextFormatLhdnIdElement = document.getElementById(this.idPrefix + 'TextFormatLhdnId')
        $(TextFormatLhdnIdElement).on('change', async function () {
            self.handleDownloadButton()
        })

        $(`.TextFormatEisSocsoId, .TextFormatEpfId, .TextFormatAutopayId, .TextFormatLhdnId, .TestingMode, .MasterStateId`).hide();
        $(TextTypeElement).on('change', async function () {
            $(`.Email, .PhoneNumber, .ContactPerson, .CreditingDate, .OrganisationName, .OrganisationCode, .MasterStateId`).hide()
            $(`.TextFormatEisSocsoId, .TextFormatEpfId, .TextFormatAutopayId, .TextFormatLhdnId, .TestingMode`).hide();
            if (parseInt(self.form.TextType.value) == TextClass.LHDN.valueOf()) {
                self.form.Email.value = self.Email
                self.form.PhoneNumber.value = self.PhoneNumber
                self.form.ContactPerson.value = self.ContactPerson 
                $(`.Email, .PhoneNumber, .ContactPerson, .TextFormatLhdnId, .CreditingDate`).show()
                console.log('hahaha')
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
        
                    if (parseInt(self.form.TextFormatEpfId.value) == TextFormatEpf.CIMB.valueOf()) {
                        if (!isEmptyOrNull(self.form.MasterStateId.value) && !isEmptyOrNull(self.form.TextFormatEpfId.value)
                            && !isEmptyOrNull(self.form.TestingMode.value) && !isEmptyOrNull(self.form.ContactPerson.value)
                            && !isEmptyOrNull(self.form.PhoneNumber.value)) {
                            $('.downloadButton').removeClass('hidden')
                            return
                        }
                    }
                

                   
            }
            else if (parseInt(self.form.TextType.value) == TextClass.EIS.valueOf()
                || parseInt(self.form.TextType.value) == TextClass.SOCSO.valueOf()) {
                $(`.TextFormatEisSocsoId`).show();
            }  
            self.handleDownloadButton()
            //dispute in format occur in epf and SOCSO/EIS 
        })
        var ContactPersonElement = document.getElementById(this.idPrefix + 'ContactPerson')
        $(ContactPersonElement).on('input', async function () {
            let value = this.value;
            // Limit to 3 characters
            if (value.length > 40) 
                value = value.slice(0, 40);
            // Update input value
            this.value = value;
            self.handleDownloadButton()
        })
        var EmailElement = document.getElementById(this.idPrefix + 'Email')
        $(EmailElement).on('input', async function () {
            let value = this.value;
            // Limit to 3 characters
            if (value.length > 40) 
                value = value.slice(0, 40);
            this.value = value;
            self.handleDownloadButton()

        })
        var PhoneNumberElement = document.getElementById(this.idPrefix + 'PhoneNumber')
        $(PhoneNumberElement).on('input', async function () {
            let value = this.value;
            // Remove non-numeric characters
            value = value.replace(/\D/g, '');
            // Limit to 3 characters
            if (value.length > 20) 
                value = value.slice(0, 20);
            // Update input value
            this.value = value;
            self.handleDownloadButton()
        })
        var SectionListElement = document.getElementById(this.idPrefix + 'SectionList');
        var OccupationListElement = document.getElementById(this.idPrefix + 'OccupationList');
        var DepartmentListElement = document.getElementById(this.idPrefix + 'DepartmentList');
        var DivisionListElement = document.getElementById(this.idPrefix + 'DivisionList');
        var JobGradeListElement = document.getElementById(this.idPrefix + 'JobGradeList');
        var TestingModeElement = document.getElementById(this.idPrefix + 'TestingMode');
        $(TestingModeElement).on('change', async function () {
            self.handleDownloadButton()
        })
        var EmailElement = document.getElementById(this.idPrefix + 'Email');
        $(EmailElement).on('change', async function () {
            self.handleDownloadButton()
        })
        var CreditingDateElement = document.getElementById(this.idPrefix + 'CreditingDate');
        $(CreditingDateElement).on('change', async function () {
            self.handleDownloadButton()
        })
        var OrganisationCodeElement = document.getElementById(this.idPrefix + 'OrganisationCode');
        $(OrganisationCodeElement).on('input', async function () {
            self.handleDownloadButton()
        })
        var OrganisationNameElement = document.getElementById(this.idPrefix + 'OrganisationName');
        $(OrganisationNameElement).on('input', async function () {
            self.handleDownloadButton()
        })
        var TextFormatAutopayIdElement = document.getElementById(this.idPrefix + 'TextFormatAutopayId');
        $(TextFormatAutopayIdElement).on('input', async function () {
            self.handleDownloadButton()
        })

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
            self.form.All.value = false
            self.AllButton()

        })
        $(DivisionListElement).on('change', async function () {
            self.form.All.value = false
            self.AllButton()

        })
        $(JobGradeListElement).on('change', async function () {
            self.form.All.value = false
            self.AllButton()

        })
        $(DepartmentListElement).on('change', async function () {
            self.form.All.value = false
            self.AllButton()

        })
        $(SectionListElement).on('change', async function () {
            self.form.All.value = false
            self.AllButton()

        })

        var AllElement = document.getElementById(this.idPrefix + 'All');
        $(AllElement).on('change', async function () {
           self.AllButton()
        })
        $(`.Email, .PhoneNumber, .ContactPerson, .CreditingDate, .OrganisationName, .OrganisationCode, .MasterStateId, .TextFormatId`).hide()
      
    }
    public handleDownloadButton(): void{
        var self = this
        if (isEmptyOrNull(self.form.EmployeeRowList.value)) {
            $('.downloadButton').addClass('hidden')
            return
        }
        if (parseInt(self.form.TextType.value) == TextClass.EPF.valueOf()) {
            if (parseInt(self.form.TextFormatEpfId.value) == TextFormatEpf.CIMB.valueOf()) {
                if (!isEmptyOrNull(self.form.MasterStateId.value) && !isEmptyOrNull(self.form.TextFormatEpfId.value)
                    && !isEmptyOrNull(self.form.TestingMode.value) && !isEmptyOrNull(self.form.ContactPerson.value)
                    && !isEmptyOrNull(self.form.PhoneNumber.value) && !isEmptyOrNull(self.form.CreditingDate.value)) {
                    $('.downloadButton').removeClass('hidden')
                    return
                }
                else
                    $('.downloadButton').addClass('hidden')
            }
            else if (parseInt(self.form.TextFormatEpfId.value) == TextFormatEpf.KWSP.valueOf()) {
                if (!isEmptyOrNull(self.form.MasterStateId.value) && !isEmptyOrNull(self.form.TestingMode.value)
                    && !isEmptyOrNull(self.form.CreditingDate.value)) {
                    $('.downloadButton').removeClass('hidden')
                    return
                }
                else
                    $('.downloadButton').addClass('hidden')
            }
            else
                $('.downloadButton').addClass('hidden')

        }
        else if (parseInt(self.form.TextType.value) == TextClass.LHDN.valueOf()) {
            if (parseInt(self.form.TextFormatLhdnId.value) == TextFormatLHDN.CIMB.valueOf()) {
                if (!isEmptyOrNull(self.form.Email.value) && !isEmptyOrNull(self.form.ContactPerson.value)
                    && !isEmptyOrNull(self.form.PhoneNumber.value) && !isEmptyOrNull(self.form.CreditingDate.value)) {
                    $('.downloadButton').removeClass('hidden')
                    return
                }
                else
                    $('.downloadButton').addClass('hidden')
            }
            else
                $('.downloadButton').addClass('hidden')
        }
        else if (parseInt(self.form.TextType.value) == TextClass.AUTOPAY.valueOf()) {
            if (parseInt(self.form.TextFormatAutopayId.value) == TextFormatAutopay.CIMB.valueOf()) {
                if (!isEmptyOrNull(self.form.OrganisationName.value) 
                    && !isEmptyOrNull(self.form.OrganisationCode.value) && !isEmptyOrNull(self.form.CreditingDate.value)) {
                    $('.downloadButton').removeClass('hidden')
                    return
                }
                else
                    $('.downloadButton').addClass('hidden')
            }
            else
                $('.downloadButton').addClass('hidden')
        }
        else if (parseInt(self.form.TextType.value) == TextClass.EIS.valueOf()
            || (parseInt(self.form.TextType.value) == TextClass.SOCSO.valueOf())
        ) {
            if (!isEmptyOrNull(self.form.TextFormatEisSocsoId.value)) {
                $('.downloadButton').removeClass('hidden')
                return
            }
            else
                $('.downloadButton').addClass('hidden')
        }
        else
            $('.downloadButton').addClass('hidden')
    }

    public  AllButton(): void {
        var self = this
        if (self.form.All.value == true) {
            var resultHolder = ''
            for (var index in self.EmployeeData) 
                resultHolder = `${resultHolder} , ${self.EmployeeData[index].Id.toString() }`
            self.form.EmployeeRowListBuffer.value = resultHolder
        }
        else if (self.form.All.value == false) 
            self.SearchCallback();
        
        self.SearchEmployeeCallback();
        self.handleDownloadButton();

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
            if (!found) 
                employeeRowList = employeeRowList.filter(num => num !== Id);
             else {
                // Add employee if not already present
                if (!employeeRowList.includes(Id)) 
                    employeeRowList.push(Id);
            }
            // Update the buffer value
            self.form.EmployeeRowListBuffer.value = employeeRowList.join(',');
        }

    }

    public  SearchEmployeeCallback(): void {
        var self = this
        var EmployeeRowIdListElement = document.getElementById(this.idPrefix + 'EmployeeRowListBuffer');
        var EmployeeRowIdString = $(EmployeeRowIdListElement).val()
        let numbers = EmployeeRowIdString.split(',')
        let EmployeeRowIdList = [];
        if (EmployeeRowIdString.length)
            numbers.forEach(number => {
                EmployeeRowIdList.push(parseInt(number)); // Convert string to integer and push to numberList
            })
  
        if (EmployeeRowIdList.length == 0)
            return
        var criteria = Criteria.and(
            [[PayrollRow.Fields.PayYear], '=', self.form.PayYear.value],
            [[PayrollRow.Fields.PayMonth], '=', self.form.PayMonth.value],
            [[PayrollRow.Fields.EmployeeRowId], 'in', [EmployeeRowIdList]],
        );
        PayrollService.List({
            Criteria: criteria
        }, response =>
        {
            var ResultHolder = ''
            for (var index in response.Entities)
            {
                var currentEmployeeRowId = response.Entities[index].EmployeeRowId
                if (EmployeeRowIdList.indexOf(currentEmployeeRowId) != -1 ) {
                    ResultHolder = ResultHolder + ' , ' + currentEmployeeRowId 
                }
            }
            self.form.EmployeeRowList.value = ResultHolder
            self.handleDownloadButton()
        })
        
        
    }
}