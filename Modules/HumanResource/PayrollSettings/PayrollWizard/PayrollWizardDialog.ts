import { Decorators, EditorUtils, EntityDialog, ListResponse, Select2Editor } from '@serenity-is/corelib';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { PayrollService, PayrollWizardForm, PayrollWizardRow, PayrollWizardService } from '../../../ServerTypes/PayrollSettings';
import { alertDialog, isEmptyOrNull } from '@serenity-is/corelib/q';
import { confirm, serviceCall, notifySuccess, notifyError } from '@serenity-is/corelib/q';
import { AnnouncementWizardService } from '../../../ServerTypes/Announcement';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayrollWizardDialog')
export class PayrollWizardDialog extends EntityDialog<PayrollWizardRow, any> {
    protected getFormKey() { return PayrollWizardForm.formKey; }
    protected getRowDefinition() { return PayrollWizardRow; }
    protected getService() { return PayrollWizardService.baseUrl; }

    protected form = new PayrollWizardForm(this.idPrefix);
    public EmployeeRowIdList: string;
    public PayMonth: number;
    public PayYear: number;
    public RunFromGenerateWiz: boolean;
    public counter: number;
    public EmployeeData: any[];
    public PayrollData: any[];

    constructor(EmployeeRowIdList: string, PayMonth: number, PayYear: number) {
        super();
        serviceCall<ListResponse<any>>({
            service: AnnouncementWizardService.baseUrl + '/GetTodayDateTime',
            method: "GET",
            data: {
            },
            async: false,
            onSuccess: (response) => {
                console.log(response)
            }
        })
        this.RunFromGenerateWiz = false
        if (!isEmptyOrNull(EmployeeRowIdList)) {
            this.EmployeeRowIdList = EmployeeRowIdList
            this.RunFromGenerateWiz = true

        }
        if (!isEmptyOrNull(PayMonth))
            this.PayMonth = PayMonth
        if (!isEmptyOrNull(PayYear))
            this.PayYear = PayYear
        EmployeeProfileService.List({
        }, response => {
            this.EmployeeData = response.Entities
        })
        PayrollService.List({
        }, response => {
            this.PayrollData = response.Entities
        })
    }
    public SearchCallback(): void {
        var self = this
      
        var PayMonthElement = document.getElementById(this.idPrefix + 'PayMonth');
        var OccupationListElement = document.getElementById(this.idPrefix + 'OccupationList');
        var DepartmentListElement = document.getElementById(this.idPrefix + 'DepartmentList');
        var DivisionListElement = document.getElementById(this.idPrefix + 'DivisionList');
        var JobGradeListElement = document.getElementById(this.idPrefix + 'JobGradeList');
        var SectionListElement = document.getElementById(this.idPrefix + 'SectionList');

        if (isEmptyOrNull($(PayMonthElement).val()))
            return

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
      
        for (var index in self.EmployeeData) {
            var found = 0
            for (var SectionIndex in SectionList) {
                if (self.EmployeeData[index].SectionID == SectionList[SectionIndex]) {
                    found = 1
                    break
                }
            }
            for (var JobGradeIndex in JobGradeList) {
                if (self.EmployeeData[index].JobGradeID == JobGradeList[JobGradeIndex]) {
                    found = 1
                    break
                }
            }

            for (var DivisionIndex in DivisionList) {
                if (self.EmployeeData[index].DivisionID == DivisionList[DivisionIndex]) {
                    found = 1
                    break
                }
            }

            for (var DepartmentIndex in DepartmentList) {
                if (self.EmployeeData[index].DepartmentID == DepartmentList[DepartmentIndex]) {
                    found = 1
                    break
                }
            }

            for (var OccupationIndex in OccupationList) {
                if (self.EmployeeData[index].OccupationID == OccupationList[OccupationIndex]) {
                    found = 1
                    break
                }
            }
            if (found == 0) {
                let EmployeeRowList = []
                var EmployeeRowString = self.form.EmployeeRowListBuffer.value
                if (EmployeeRowString != "") {
                    let EmployeeRowListBuffer = EmployeeRowString.split(',')
                    EmployeeRowListBuffer.forEach(number => {
                        EmployeeRowList.push(parseInt(number)); // Convert string to integer and push to numberList
                    })
                    EmployeeRowList = EmployeeRowList.filter(number => number !== self.EmployeeData[index].Id);
                    self.form.EmployeeRowListBuffer.value = EmployeeRowList.join(',')
                }
                else
                    self.form.EmployeeRowListBuffer.value = ""

            }
            else {
                let EmployeeRowList = []
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
        }
        self.form.EmployeeRowList.value = self.form.EmployeeRowListBuffer.value 
        self.PayslipSearchCallback()



    }
    public PayslipSearchCallback(): void {
        var self = this
        var PayMonthElement = document.getElementById(this.idPrefix + 'PayMonth');
        self.form.EmployeeRowListBuffer.value = self.form.EmployeeRowList.value 
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
        var PayMonthElementValue = $(PayMonthElement).val().split('/')
        var PayMonthElementMonth = PayMonthElementValue[1] - 1
        var PayMonthElementYear = PayMonthElementValue[0]
        let EmployeeRowList = []
        var EmployeeRowString = self.form.EmployeeRowList.value
        let EmployeeRowListBuffer = EmployeeRowString.split(',')
        EmployeeRowListBuffer.forEach(number => {
            EmployeeRowList.push(parseInt(number)); // Convert string to integer and push to numberList
        })
        let PayrollIdList = [];
        let EmployeeRowIdList = [];
        var PayrollIndex = 0
        if (isEmptyOrNull(self.form.EmployeeRowListBuffer.value)) {
            self.form.EmployeeRowList.value = ""
            var PayslipString = document.getElementById(self.idPrefix + 'PayslipList');
            var ulElement = PayslipString.querySelector('ul');
            var liElements = ulElement.getElementsByTagName('li')
            if (liElements.length > 0)
                while (1) {
                    var liElement = liElements[0];
                    liElement.remove()
                    var ulElement = PayslipString.querySelector('ul');
                    var liElements = ulElement.getElementsByTagName('li')
                    if (liElements.length == 0)
                        break
                }
            return
        }
        else {
            let CurrentPayslipIdList = []
            let RemovedEmployeeList = []

            var PayslipString = document.getElementById(self.idPrefix + 'PayslipList');
            var ulElement = PayslipString.querySelector('ul');
            var liElements = ulElement.getElementsByTagName('li')
            for (let i = 0; i < liElements.length; i++) {
                var liElement = liElements[i];
                var id = parseInt(liElement.id);
                CurrentPayslipIdList.push(id)
            }
            for (var index in self.PayrollData) {
                var PayrollId = self.PayrollData[index].Id
                var EmployeeRowId = self.PayrollData[index].EmployeeRowId
                var PayYear = self.PayrollData[index].PayYear;
                var PayMonth = self.PayrollData[index].PayMonth;
                var MonthString = months[PayMonth];
                var YearString = PayYear.toString();
                if (EmployeeRowList.indexOf(EmployeeRowId) === -1
                    && RemovedEmployeeList.indexOf(EmployeeRowId) === -1)//remove the payslip
                {
                    var PayslipString = document.getElementById(self.idPrefix + 'PayslipList');
                    var ulElement = PayslipString.querySelector('ul');
                    var liElements = ulElement.getElementsByTagName('li')
                    for (let i = 0; i < liElements.length; i++) {
                        var liElement = liElements[i];
                        if (parseInt(liElement.id) == PayrollId) {
                            liElement.remove();
                            RemovedEmployeeList.push(EmployeeRowId)
                        }
                    }
                }
               else if (EmployeeRowList.indexOf(EmployeeRowId) !== -1 && PayYear == parseInt(PayMonthElementYear)
                    && PayMonth == PayMonthElementMonth) // if employee row list have employee row id
                {
                    PayrollIdList.push(PayrollId)
                    EmployeeRowIdList.push(EmployeeRowId)
                    EmployeeProfileService.Retrieve({
                        EntityId: EmployeeRowId
                    }, response => {
                        var search_index = EmployeeRowIdList.indexOf(response.Entity.Id)
                        var Name = response.Entity.EmployeeName.replace(/\s/g, '');
                        var PayrollId = PayrollIdList[search_index]
                        var queryString = "PayrollRowId=" + encodeURIComponent(PayrollId)
                        var url = window.location.origin + '/PayrollSettings/Payroll/PdfSharpConvert?' + queryString
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', url, true);
                        xhr.responseType = 'blob';
                        xhr.onload = function () {
                            if (xhr.status === 200) {
                                var blob = xhr.response;
                                const url = window.URL.createObjectURL(blob);
                                var li = document.createElement('li');
                                li.className = "file-item file-binary"
                                li.id = PayrollId.toString()
                                var a = document.createElement('a');
                                a.href = url;
                                a.className = "thumb"
                                a.target = "_blank"
                                a.title = Name + "Payslip" + MonthString + YearString + '.pdf'
                                a.download = Name + "Payslip" + MonthString + YearString + '.pdf';
                                a.id = PayrollId.toString()
                                li.appendChild(a)
                                var div = document.createElement('div');
                                div.className = "filename"
                                div.title = Name + "Payslip" + MonthString + YearString + '.pdf'
                                div.textContent = Name + "Payslip" + MonthString + YearString + '.pdf'
                                var cross = document.createElement('a');
                                cross.className = 'delete'
                                cross.addEventListener('click', function (event) {
                                    event.preventDefault(); // Prevent default anchor behavior (e.g., following a link)
                                    li.remove(); // Remove the parent element from the DOM
                                });
                                div.appendChild(cross)
                                var PayslipString = document.getElementById(self.idPrefix + 'PayslipList');
                                var ulElement = PayslipString.querySelector('ul');
                                var liElements = ulElement.getElementsByTagName('li')
                                let CurrentPayroll = [];
                                for (let i = 0; i < liElements.length; i++) {
                                    var liElement = liElements[i];
                                    var id = liElement.id;
                                    CurrentPayroll.push(parseInt(id))
                                }
                                if (CurrentPayroll.indexOf(PayrollId) === -1) {
                                    li.appendChild(div)
                                    ulElement.appendChild(li)
                                }
                                var ulElement = PayslipString.querySelector('ul');
                                var liElements = ulElement.getElementsByTagName('li')
                                for (let i = 0; i < liElements.length; i++) {
                                    var liElement = liElements[i];
                                    var liId = parseInt(liElement.id);
                                    if (PayrollIdList.indexOf(liId) === -1)
                                        liElement.remove()
                                    liElements = ulElement.getElementsByTagName('li')
                                }
                            } else
                                notifyError('Error encounter when downloading Payslip Pdf');

                        };
                        xhr.send()
                        PayrollIndex += 1

                    })
                }
              

            }
        }



    }
    public PartialSearchCallback(): void {
        var self = this
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
        var PayMonthElement = document.getElementById(this.idPrefix + 'PayMonth');

        this.counter = 0
     
            
     
        var PayMonthElementValue = $(PayMonthElement).val().split('/')
        var PayMonthElementMonth = PayMonthElementValue[1] - 1
        var PayMonthElementYear = PayMonthElementValue[0]
        let EmployeeRowList = []
        var EmployeeRowString = self.form.EmployeeRowList.value
        let EmployeeRowListBuffer = EmployeeRowString.split(',')
        EmployeeRowListBuffer.forEach(number => {
            EmployeeRowList.push(parseInt(number)); // Convert string to integer and push to numberList
        })
        let PayrollIdList = [];
        let EmployeeRowIdList = [];
        var PayrollIndex = 0
        if (isEmptyOrNull(self.form.EmployeeRowList.value)) {
            self.form.EmployeeRowList.value = ""
            var PayslipString = document.getElementById(self.idPrefix + 'PayslipList');
            var ulElement = PayslipString.querySelector('ul');
            var liElements = ulElement.getElementsByTagName('li')
            if (liElements.length > 0)
                while (1) {
                    var liElement = liElements[0];
                    liElement.remove()
                    var ulElement = PayslipString.querySelector('ul');
                    var liElements = ulElement.getElementsByTagName('li')
                    if (liElements.length == 0)
                        break
                }
            return
        }
        else {
            let CurrentPayslipIdList = []
            var PayslipString = document.getElementById(self.idPrefix + 'PayslipList');
            var ulElement = PayslipString.querySelector('ul');
            var liElements = ulElement.getElementsByTagName('li')
            for (let i = 0; i < liElements.length; i++) {
                var liElement = liElements[i];
                var id = parseInt(liElement.id);
                CurrentPayslipIdList.push(id)
            }

            for (var index in self.PayrollData) {
                var PayrollId = self.PayrollData[index].Id
                var EmployeeRowId = self.PayrollData[index].EmployeeRowId
                var PayYear = self.PayrollData[index].PayYear;
                var PayMonth = self.PayrollData[index].PayMonth;
                var MonthString = months[PayMonth];
                var YearString = PayYear.toString();
                if (EmployeeRowList.indexOf(EmployeeRowId) !== -1 && PayYear == PayMonthElementYear
                    && PayMonth == PayMonthElementMonth) // if employee row list have employee row id
                {
                    PayrollIdList.push(PayrollId)
                    EmployeeRowIdList.push(EmployeeRowId)
                    EmployeeProfileService.Retrieve({
                        EntityId: EmployeeRowId
                    }, response => {
                        var search_index = EmployeeRowIdList.indexOf(response.Entity.Id)
                        var Name = response.Entity.EmployeeName.replace(/\s/g, '');
                        var PayrollId = PayrollIdList[search_index]
                        var queryString = "PayrollRowId=" + encodeURIComponent(PayrollId)
                        var url = window.location.origin + '/PayrollSettings/Payroll/PdfSharpConvert?' + queryString
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', url, true);
                        xhr.responseType = 'blob';
                        xhr.onload = function () {
                            if (xhr.status === 200) {
                                var blob = xhr.response;
                                const url = window.URL.createObjectURL(blob);
                                var li = document.createElement('li');
                                li.className = "file-item file-binary"
                                li.id = PayrollId.toString()
                                var a = document.createElement('a');
                                a.href = url;
                                a.className = "thumb"
                                a.target = "_blank"
                                a.title = Name + "Payslip" + MonthString + YearString + '.pdf'
                                a.download = Name + "Payslip" + MonthString + YearString + '.pdf';
                                a.id = PayrollId.toString()

                                li.appendChild(a)
                                var div = document.createElement('div');
                                div.className = "filename"
                                div.title = Name + "Payslip" + MonthString + YearString + '.pdf'
                                div.textContent = Name + "Payslip" + MonthString + YearString + '.pdf'
                                var cross = document.createElement('a');
                                cross.className = 'delete'
                                cross.addEventListener('click', function (event) {
                                    event.preventDefault(); // Prevent default anchor behavior (e.g., following a link)
                                    li.remove(); // Remove the parent element from the DOM
                                });
                                div.appendChild(cross)

                                if (self.RunFromGenerateWiz == false) {
                                    var PayslipString = document.getElementById(self.idPrefix + 'PayslipList');
                                    var ulElement = PayslipString.querySelector('ul');
                                    var liElements = ulElement.getElementsByTagName('li')
                                    let CurrentPayroll = [];
                                    for (let i = 0; i < liElements.length; i++) {
                                        var liElement = liElements[i];
                                        var id = liElement.id;
                                        CurrentPayroll.push(parseInt(id))
                                    }
                                    if (CurrentPayroll.indexOf(PayrollId) === -1) {
                                        li.appendChild(div)
                                        ulElement.appendChild(li)
                                    }
                                    var ulElement = PayslipString.querySelector('ul');
                                    var liElements = ulElement.getElementsByTagName('li')
                                    for (let i = 0; i < liElements.length; i++) {
                                        var liElement = liElements[i];
                                        var liId = parseInt(liElement.id);
                                        if (PayrollIdList.indexOf(liId) === -1)
                                            liElement.remove()
                                        liElements = ulElement.getElementsByTagName('li')
                                    }


                                }
                                else
                                    a.click()
                            } else
                                notifyError('Error encounter when downloading Payslip Pdf');

                        };
                        xhr.send()
                        PayrollIndex += 1

                    })
                }
                   
            }
        }





            self.dialogClose()
        
        
    



    }
    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen();
        if (!isEmptyOrNull(this.PayYear)) {
            let str = this.idPrefix
            let lastIndex = str.lastIndexOf('_');
            let result = '#' + str.substring(0, lastIndex);
            $(result).parent().css("display", "none")

        }
        var PayslipString = document.getElementById(this.idPrefix + 'PayslipList');
        var SelectFileElement = PayslipString.querySelector('div');
        SelectFileElement.style.display = 'none'
        this.saveAndCloseButton.hide()
        this.editButton.hide()
        this.applyChangesButton.hide()
        this.deleteButton.hide()
        this.localizationButton.hide()
        this.cloneButton.hide()
        this.undeleteButton.hide()

        $(`#s2id_${this.idPrefix}EmployeeRowList`).on('click', async function (e) {
            $(`.select2-drop`).hide()
            return

        })
        var self = this;
        var PayMonthElement = document.getElementById(this.idPrefix + 'PayMonth');
        var EmployeeRowListElement = document.getElementById(this.idPrefix + 'EmployeeRowList');
        let PayMonthElementEditor = new Select2Editor($(PayMonthElement))
        PayrollService.List({
        }, response => {
            let YearMonthList: string[] = [];
            if (!isEmptyOrNull(this.PayYear) && !isEmptyOrNull(this.PayMonth))
                var required = this.PayYear + '/' + (this.PayMonth + 1).toString().padStart(2, '0')
            for (var index in response.Entities) {
                var YearMonth = response.Entities[index].PayYear.toString() + '/' + (response.Entities[index].PayMonth + 1).toString().padStart(2, '0')
                if (YearMonthList.indexOf(YearMonth) === -1) 
                    YearMonthList.push(YearMonth);
            }
            YearMonthList.sort((a, b) => {
                const [yearA, monthA] = a.split('/').map(Number);
                const [yearB, monthB] = b.split('/').map(Number);
                const dateA = new Date(yearA, monthA - 1);  // Months are 0-indexed in Date objects
                const dateB = new Date(yearB, monthB - 1);
                return dateB.getTime() - dateA.getTime();
            });
            for (var index in YearMonthList)
                PayMonthElementEditor.addItem({ id: (YearMonthList[index]).toString(), text: (YearMonthList[index]).toString(), }); // 8am - 6pm , will consider lates
            if (!isEmptyOrNull(this.PayYear) && !isEmptyOrNull(this.PayMonth))
            {
                if (YearMonthList.indexOf(required) === -1)
                    PayMonthElementEditor.addItem({ id: (required).toString(), text: (required).toString(), }); // 8am - 6pm , will consider lates
                $(PayMonthElement).val(required).trigger('change')
                $(EmployeeRowListElement).val(this.EmployeeRowIdList).trigger('change')
            }
        });

        var OccupationListElement = document.getElementById(this.idPrefix + 'OccupationList');
        var DepartmentListElement = document.getElementById(this.idPrefix + 'DepartmentList');
        var SectionListElement = document.getElementById(this.idPrefix + 'SectionList');
        var DivisionListElement = document.getElementById(this.idPrefix + 'DivisionList');
        var JobGradeListElement = document.getElementById(this.idPrefix + 'JobGradeList');
        var EmployeeRowListElement = document.getElementById(this.idPrefix + 'EmployeeRowList');
        if (this.RunFromGenerateWiz == false) {
            console.log('haha')
            $(PayMonthElement).on('change', async function () {
                if (isEmptyOrNull($(PayMonthElement).val())) {
                    self.form.EmployeeRowList.value = ""
                    var PayslipString = document.getElementById(self.idPrefix + 'PayslipList');
                    var ulElement = PayslipString.querySelector('ul');
                    //PayslipString.appendChild(li)
                    var liElements = ulElement.getElementsByTagName('li')
                    if (liElements.length >= 0)
                        while (1) {
                            var liElement = liElements[0];
                            liElement.remove()
                            var ulElement = PayslipString.querySelector('ul');
                            var liElements = ulElement.getElementsByTagName('li')
                            if (liElements.length == 0)
                                break
                        }
                    return
                }


                self.SearchCallback();

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
            $(SectionListElement).on('change', async function () {
                self.SearchCallback();
            })
            $(EmployeeRowListElement).on('change', async function () {
                self.PayslipSearchCallback();
            })


        }
        else
        {
            $(EmployeeRowListElement).on('change', async function () {
                self.PartialSearchCallback();
            })

        }
    }
    protected getToolbarButtons() {
        var self = this
        var buttons = super.getToolbarButtons();
        $(`#${this.idPrefix}Toolbar`).addClass("ms-auto")
        buttons.push(
            {
                title: "Click to Download",	// *** Get button text from translation
                cssClass: 'text-bg-success p-2 ml-auto',
                icon: 'fas fa-hat-wizard text-green',
                onClick: () => {
                    confirm(
                        "Are you sure to download these payslips?",
                        () => {
                            var PayslipString = document.getElementById(self.idPrefix + 'PayslipList');
                            var ulElement = PayslipString.querySelector('ul');
                            var liElements = ulElement.getElementsByTagName('li')

                            for (let i = 0; i < liElements.length; i++) {
                                var liElement = liElements[i];
                                var aElements = liElement.getElementsByClassName('thumb')
                                for (let i = 0; i < aElements.length; i++) {
                                    var aElement = aElements[i] as HTMLAnchorElement 
                                    aElement.click()
                                }
                            }
                        }
                    )
                },
            }
        );
        return buttons
    }
}