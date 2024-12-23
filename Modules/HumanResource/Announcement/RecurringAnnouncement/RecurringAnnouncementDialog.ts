import { Decorators, EntityDialog, EditorUtils } from '@serenity-is/corelib';
import { alertDialog } from '@serenity-is/corelib/q';
import { RecurringAnnouncementRow, RecurringAnnouncementForm, RecurringAnnouncementService, RecurringBindedEmployeeRow, AnnouncementDepartmentBindedRow, AnnouncementDivisionBindedRow, AnnouncementOccupationBindedRow, AnnouncementSectionBindedRow, AnnouncementJobGradeBindedRow } from '../../../ServerTypes/Announcement';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';

@Decorators.registerClass('HRMSoftware.Announcement.RecurringAnnouncementDialog')
export class RecurringAnnouncementDialog extends EntityDialog<RecurringAnnouncementRow, any> {
    protected getFormKey() { return RecurringAnnouncementForm.formKey; }
    protected getRowDefinition() { return RecurringAnnouncementRow; }
    protected getService() { return RecurringAnnouncementService.baseUrl; }
    public EmployeeData: any[];
    public OriginalEmployeeList: string;
    protected form = new RecurringAnnouncementForm(this.idPrefix);
    constructor() {
        super();
        var self = this
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
        const AnnouncementTimeString = "RecurringTime";
        const lastIndex = tabId.lastIndexOf(searchString);
        if (lastIndex !== -1)
            var RecurringTimeElementId = tabId.substring(0, lastIndex) + AnnouncementTimeString;
        var RecurringClocklet = document.getElementById(RecurringTimeElementId)
        RecurringClocklet.setAttribute('data-clocklet', '');
        RecurringClocklet.setAttribute("id", "recurring-clocklet");
        RecurringClocklet.addEventListener("clocklet.opening", function (event) {
            var myClocklet = document.getElementById("recurring-clocklet") as HTMLElement;
            if (myClocklet)
                myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
        });
        RecurringClocklet.addEventListener("clocklet.closed", function (event) {
            self.GenerateRemarks()
        });
        $('.AnnouncementDateTime').hide()
        $('.AnnouncementTime').hide()

        EmployeeProfileService.List({
        }, response => {
            self.EmployeeData = response.Entities
        })

    }


    public onDialogOpen(): void {
        super.onDialogOpen();
        EditorUtils.setReadonly(this.form.Remarks.element, true);
        $('.OccupationList').hide()
        $('.JobGradeList').hide()
        $('.DivisionList').hide()
        $('.DepartmentList').hide()
        $('.SectionList').hide()
        $('.EmployeeRowList').hide()
        this.editButton.hide()
        this.applyChangesButton.hide()
        this.deleteButton.hide()
        this.localizationButton.hide()
        this.cloneButton.hide()
        this.undeleteButton.hide()
        var self = this;
        


       
        var time = $('#recurring-clocklet') 
        var today = new Date()
        if (!this.isNew()) {
            RecurringAnnouncementService.Retrieve({
                EntityId: self.entityId
            }, response => {

                var HourMinute = response.Entity.StartingDateTime.substring(11, 16)
                time.val(HourMinute)
                self.StartCallBack()
            })
            if (self.form.DaysPerRecurring.value == true)
                $('.Sunday').parent().hide()
            else if (self.form.DaysOfWeekRecurring.value == true)
                $('.IntervalInDays').parent().hide()
        }
        else {
            $('.AnnouncementList').parent().parent().parent().hide()
            time.val('12:00')
            self.form.StartingDateTime.value = today.toISOString()
            $('.Sunday').parent().hide()
            $('.IntervalInDays').parent().hide()  
            self.StartCallBack()
        }
    }
    public SearchCallback(): void {
        var self = this
        var OccupationListActualElement = document.getElementById(this.idPrefix + 'OccupationListActual');
        var DepartmentListActualElement = document.getElementById(this.idPrefix + 'DepartmentListActual');
        var DivisionListActualElement = document.getElementById(this.idPrefix + 'DivisionListActual');
        var JobGradeListActualElement = document.getElementById(this.idPrefix + 'JobGradeListActual');
        var SectionListActualElement = document.getElementById(this.idPrefix + 'SectionListActual');
        var JobGradeStr = $(JobGradeListActualElement).val()
        let JobGradeList = [];
        let numbers = JobGradeStr.split(',')
        if (JobGradeStr.length)
            numbers.forEach(number => {
                JobGradeList.push(parseInt(number)); // Convert string to integer and push to numberList
            })
        




        var DivisionStr = $(DivisionListActualElement).val()
        numbers = DivisionStr.split(',')
        let DivisionList = [];
        if (DivisionStr.length)
            numbers.forEach(number => {
                DivisionList.push(parseInt(number)); // Convert string to integer and push to numberList
            })
        




        var DepartmentStr = $(DepartmentListActualElement).val()
        numbers = DepartmentStr.split(',')
        let DepartmentList = [];
        if (DepartmentStr.length)
            numbers.forEach(number => {
                DepartmentList.push(parseInt(number)); // Convert string to integer and push to numberList
            })



        var OccupationStr = $(OccupationListActualElement).val()
        numbers = OccupationStr.split(',')
        let OccupationList = [];
        if (OccupationStr.length)
            numbers.forEach(number => {
                OccupationList.push(parseInt(number)); // Convert string to integer and push to numberList
            })
        

        var SectionStr = $(SectionListActualElement).val()
        numbers = SectionStr.split(',')
        let SectionList = [];
        if (SectionStr.length)
            numbers.forEach(number => {
                SectionList.push(parseInt(number)); // Convert string to integer and push to numberList
            })
       


        for (var index in self.EmployeeData) {
            var found = 0

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
            for (var SectionIndex in SectionList) {
                if (self.EmployeeData[index].SectionID == SectionList[SectionIndex]) {
                    found = 1
                    break
                }
            }
            if (found == 0) {
                let EmployeeRowList = []
                var EmployeeRowString = self.form.EmployeeListActual.value
                if (EmployeeRowString != "") {
                    let EmployeeRowListBuffer = EmployeeRowString.split(',')
                    EmployeeRowListBuffer.forEach(number => {
                        EmployeeRowList.push(parseInt(number)); // Convert string to integer and push to numberList
                    })
                    EmployeeRowList = EmployeeRowList.filter(number => number !== self.EmployeeData[index].Id);
                    self.form.EmployeeListActual.value = EmployeeRowList.join(',')
                }
                else
                    self.form.EmployeeListActual.value = ""

            }
            else {
                let EmployeeRowList = []
                var EmployeeRowString = self.form.EmployeeListActual.value
                if (EmployeeRowString != "") {
                    if (EmployeeRowString.includes(',')) {
                        let EmployeeRowListBuffer = EmployeeRowString.split(',')
                        EmployeeRowListBuffer.forEach(number => {
                            EmployeeRowList.push(parseInt(number)); // Convert string to integer and push to numberList
                        })
                        if (EmployeeRowList.indexOf(self.EmployeeData[index].Id) === -1)
                            self.form.EmployeeListActual.value = self.form.EmployeeListActual.value + ' , ' + self.EmployeeData[index].Id.toString()
                    }
                    else
                        self.form.EmployeeListActual.value = self.form.EmployeeListActual.value + ' , ' + self.EmployeeData[index].Id.toString()

                }
                else
                    self.form.EmployeeListActual.value = self.EmployeeData[index].Id.toString()
            }
        }
    }
    public StartCallBack(): void {
        var self = this
        var OccupationListElement = document.getElementById(this.idPrefix + 'OccupationListActual');
        var DepartmentListElement = document.getElementById(this.idPrefix + 'DepartmentListActual');
        var DivisionListElement = document.getElementById(this.idPrefix + 'DivisionListActual');
        var JobGradeListElement = document.getElementById(this.idPrefix + 'JobGradeListActual');
        var SectionListElement = document.getElementById(this.idPrefix + 'SectionListActual');
        var EmployeeRowListElement = document.getElementById(this.idPrefix + 'EmployeeListActual');

        var StartingDateElement = document.getElementById(this.idPrefix + 'StartingDateTime');

        var DaysPerRecurringElement = document.getElementById(this.idPrefix + 'DaysPerRecurring');
        var DaysOfWeekRecurringElement = document.getElementById(this.idPrefix + 'DaysOfWeekRecurring');
        var AllElement = document.getElementById(this.idPrefix + 'All');


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
        /*
        $(EmployeeRowListElement).on('change', async function () {
            self.EmployeeChangeCallback();
        })
        */
        $(SectionListElement).on('change', async function () {
            self.SearchCallback();
        })
        $(AllElement).on('change', async function () {
            if (self.form.All.value == true) {
                let EmployeeRowList = []
                for (var index in self.EmployeeData) {
                    var EmployeeRowString = self.form.EmployeeListActual.value
                    if (EmployeeRowString != "") {
                        if (EmployeeRowString.includes(',')) {
                            let EmployeeRowListBuffer = EmployeeRowString.split(',')
                            EmployeeRowListBuffer.forEach(number => {
                                EmployeeRowList.push(parseInt(number)); // Convert string to integer and push to numberList
                            })
                            if (EmployeeRowList.indexOf(self.EmployeeData[index].Id) === -1)
                                self.form.EmployeeListActual.value = self.form.EmployeeRowList.value + ' , ' + self.EmployeeData[index].Id.toString()
                        }
                        else
                            self.form.EmployeeListActual.value = self.form.EmployeeRowList.value + ' , ' + self.EmployeeData[index].Id.toString()
                    }
                    else
                        self.form.EmployeeListActual.value = self.EmployeeData[index].Id.toString()
                }
            }
            else {
                self.SearchCallback();
            }
        })
        $(DaysPerRecurringElement).on('change', async function () {
            if (self.form.DaysOfWeekRecurring.value == true && self.form.DaysPerRecurring.value == true)
                self.form.DaysOfWeekRecurring.value = false
            if (self.form.DaysPerRecurring.value == true &&
                self.form.DaysOfWeekRecurring.value == false) {
                $('.Sunday').parent().hide()
                $('.IntervalInDays').parent().show()
                self.GenerateRemarks()
            }
            else if (self.form.DaysPerRecurring.value == false &&
                self.form.DaysOfWeekRecurring.value == true) {
                $('.IntervalInDays').parent().hide()
                $('.Sunday').parent().show()
                self.GenerateRemarks()
            }
            else {
                $('.IntervalInDays').parent().hide()
                $('.Sunday').parent().hide()
                self.GenerateRemarks()
            }
        })
        $(DaysOfWeekRecurringElement).on('change', async function () {
            if (self.form.DaysPerRecurring.value == true && self.form.DaysOfWeekRecurring.value == true)
                self.form.DaysPerRecurring.value = false
            if (self.form.DaysPerRecurring.value == true &&
                self.form.DaysOfWeekRecurring.value == false) {
                $('.Sunday').parent().hide()
                $('.IntervalInDays').parent().show()
                self.GenerateRemarks()

            }
            else if (self.form.DaysPerRecurring.value == false &&
                self.form.DaysOfWeekRecurring.value == true) {
                $('.IntervalInDays').parent().hide()
                $('.Sunday').parent().show()
                self.GenerateRemarks()

            }
            else {
                $('.IntervalInDays').parent().hide()
                $('.Sunday').parent().hide()
                self.GenerateRemarks()

            }
        })
        let Days: string[] = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ]
        Days.forEach(day => {
            var DaysElement = document.getElementById(this.idPrefix + day);
            $(DaysElement).on('change', async function () {
                self.GenerateRemarks()
            })
        });
        var IntervalElement = document.getElementById(this.idPrefix + 'IntervalInDays');
        $(IntervalElement).on('change', async function () {
            self.GenerateRemarks()
        })
        $(StartingDateElement).on('change', async function () {
            self.GenerateRemarks()
        })
    }
    protected save_submitHandler(response): void {
        if (this.form.Remarks.value == '') {
            alertDialog('Invalid interval settings, please check again')
            return
        }
        if (this.form.EmployeeListActual.value == '') {
            alertDialog('No employee chosen')
            return
        }
        super.save_submitHandler(response)
    }
    public GenerateRemarks(): void {
        var self = this
        var StartingString = 'The announcement will be sent at every '
        var StartingFromString = ' starting from '
        var time = document.getElementById('recurring-clocklet') as HTMLInputElement
        var RemarkString = ''
        var FinalString = ''
        var RecurringInterval = self.form.IntervalInDays.value
        let Days: string[] = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ]
        if (self.form.DaysOfWeekRecurring.value == true) {
            Days.forEach(day => {
                if (self.form[day].value == true)
                    RemarkString = (RemarkString == '') ? day : (RemarkString + ', ' + day)
            });
            if (RemarkString != '')
                FinalString = StartingString + RemarkString + StartingFromString + self.form.StartingDateTime.value + ' ' + time.value + ':00'
        }
        else if (self.form.DaysPerRecurring.value == true) {
            if (RecurringInterval > 0) {
                RemarkString = RecurringInterval + ' days '
                FinalString = StartingString + RemarkString + StartingFromString + self.form.StartingDateTime.value + ' ' + time.value + ':00'
            }
        }
        self.form.Remarks.value = FinalString
    }

}

class ConcreteRecurringBindedEmployeeRow extends RecurringBindedEmployeeRow {
    constructor() {
        super();
    }
}
class ConcreteAnnouncementDepartmentBindedRow extends AnnouncementDepartmentBindedRow {
    constructor() {
        super();
    }
}
class ConcreteAnnouncementDivisionBindedRow extends AnnouncementDivisionBindedRow  {
    constructor() {
        super();
    }
}
class ConcreteAnnouncementOccupationBindedRow extends AnnouncementOccupationBindedRow {
    constructor() {
        super();
    }
}
class ConcreteAnnouncementSectionBindedRow extends AnnouncementSectionBindedRow {
    constructor() {
        super();
    }
}
class ConcreteAnnouncementJobGradeBindedRow extends AnnouncementJobGradeBindedRow {
    constructor() {
        super();
    }
}