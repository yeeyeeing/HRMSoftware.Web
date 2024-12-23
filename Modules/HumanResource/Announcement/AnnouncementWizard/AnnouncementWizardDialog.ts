import { Decorators, EntityDialog, EditorUtils } from '@serenity-is/corelib';
import { AnnouncementDepartmentBindedRow, AnnouncementDivisionBindedRow, AnnouncementGeneratedRow, AnnouncementGeneratedService, AnnouncementJobGradeBindedRow, AnnouncementJobGradeBindedService, AnnouncementOccupationBindedRow, AnnouncementOccupationBindedService, AnnouncementSectionBindedRow, AnnouncementSectionBindedService } from '../../../ServerTypes/Announcement';
import { AnnouncementWizardForm  } from '../../../ServerTypes/Announcement/AnnouncementWizardForm';
import { AnnouncementWizardRow } from '../../../ServerTypes/Announcement/AnnouncementWizardRow';
import { AnnouncementWizardService } from '../../../ServerTypes/Announcement/AnnouncementWizardService';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { alertDialog } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementWizardDialog')
export class AnnouncementWizardDialog extends EntityDialog<AnnouncementWizardRow, any> {
    protected getFormKey() { return AnnouncementWizardForm.formKey; }
    protected getRowDefinition() { return AnnouncementWizardRow; }
    protected getService() { return AnnouncementWizardService.baseUrl; }
    public EmployeeData: any[];
    public OriginalEmployeeList: string;
    public OriginalDocString: string;
    public EditedDocString: string;


    public OriginalDepartmentList: string;
    public OriginalDivisionList: string;
    public OriginalOccupationList: string;
    public OriginalJobGradeList: string;
    public OriginalSectionList: string;

    public AnnouncedDateTime: string;

    protected form = new AnnouncementWizardForm(this.idPrefix);
    public onDialogOpen(): void {
        super.onDialogOpen();
        EditorUtils.setReadonly(this.form.Remarks.element, true);
        var time = $('#announcement-clocklet')
        var today = new Date()
       
        this.OriginalDocString = JSON.stringify(this.form.UploadDocument.value)
        this.editButton.hide()
        this.applyChangesButton.hide()
        this.localizationButton.hide()
        this.cloneButton.hide()
        this.undeleteButton.hide()
        var self = this;
        if (this.isNew()) {

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
            const AnnouncementTimeString = "AnnouncementTime";
            const lastIndex = tabId.lastIndexOf(searchString);
            if (lastIndex !== -1)
                var RecurringTimeElementId = tabId.substring(0, lastIndex) + AnnouncementTimeString;
            var RecurringClocklet = document.getElementById(RecurringTimeElementId)
            RecurringClocklet.setAttribute('data-clocklet', '');
            RecurringClocklet.setAttribute("id", "announcement-clocklet");
            RecurringClocklet.addEventListener("clocklet.opening", function (event) {

                var myClocklet = document.getElementById("announcement-clocklet") as HTMLElement;
                if (myClocklet)
                    myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
            });
            RecurringClocklet.addEventListener("clocklet.closed", function (event) {
                self.GenerateRemarks()
            });
            $('.AnnouncementDateTime').hide()
            $('.AnnouncementTime').hide()
            time.val('12:00')
            self.form.AnnouncementDateTime.value = today.toISOString()
            self.SetCallBack()
        }

        else if (!this.isNew()) {
            console.log('haha')

            AnnouncementWizardService.Retrieve({
                EntityId: self.entityId
            }, response => {
                EditorUtils.setReadonly(self.form.Delayed.element, true);
                EditorUtils.setReadonly(self.form.Immediate.element, true);
                EditorUtils.setReadonly(self.form.AnnouncementTime.element, true);
                EditorUtils.setReadonly(self.form.AnnouncementDateTime.element, true);
                self.form.AnnouncementTime.value = response.Entity.AnnouncementDateTime.substring(11, 16)
                self.form.AnnouncementList.value = response.Entity.AnnouncementList
                self.form.AnnouncementList.updateInterface()
              console.log('haha')
                self.AnnouncedDateTime = response.Entity.AnnouncementDateTime
                for (let i = 0; i < this.form.AnnouncementList.value.length; i++)
                    self.form.EmployeeRowList.value = self.form.EmployeeRowList.value + ' , ' + this.form.AnnouncementList.value[i].EmployeeRowId.toString()
                self.OriginalEmployeeList = self.form.EmployeeRowList.value
                self.SetCallBack()

            })
          
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
                var EmployeeRowString = self.form.EmployeeRowList.value
                if (EmployeeRowString != "") {
                    let EmployeeRowListBuffer = EmployeeRowString.split(',')
                    EmployeeRowListBuffer.forEach(number => {
                        EmployeeRowList.push(parseInt(number)); // Convert string to integer and push to numberList
                    })
                    EmployeeRowList = EmployeeRowList.filter(number => number !== self.EmployeeData[index].Id);
                    self.form.EmployeeRowList.value = EmployeeRowList.join(',')
                }
                else
                    self.form.EmployeeRowList.value = ""

            }
            else {
                let EmployeeRowList = []
                var EmployeeRowString = self.form.EmployeeRowList.value
                if (EmployeeRowString != "") {
                    if (EmployeeRowString.includes(',')) {
                        let EmployeeRowListBuffer = EmployeeRowString.split(',')
                        EmployeeRowListBuffer.forEach(number => {
                            EmployeeRowList.push(parseInt(number)); // Convert string to integer and push to numberList
                        })
                        if (EmployeeRowList.indexOf(self.EmployeeData[index].Id) === -1)
                            self.form.EmployeeRowList.value = self.form.EmployeeRowList.value + ' , ' + self.EmployeeData[index].Id.toString()
                    }
                    else
                        self.form.EmployeeRowList.value = self.form.EmployeeRowList.value + ' , ' + self.EmployeeData[index].Id.toString()

                }
                else
                    self.form.EmployeeRowList.value = self.EmployeeData[index].Id.toString()
            }
            }
    }



    public BindChangeCallback(): void {
        var BindToOccupation = this.form.BindToOccupation.value
        var BindToDepartment = this.form.BindToDepartment.value
        var BindToDivision = this.form.BindToDivision.value
        var BindToJobGrade = this.form.BindToJobGrade.value
        var BindToSection = this.form.BindToSection.value
        for (let i = 0; i < this.form.AnnouncementList.value.length; i++) {
            this.form.AnnouncementList.value[i].BindToDepartment = BindToDepartment
            this.form.AnnouncementList.value[i].BindToDivision = BindToDivision
            this.form.AnnouncementList.value[i].BindToJobGrade = BindToJobGrade
            this.form.AnnouncementList.value[i].BindToOccupation = BindToOccupation
            this.form.AnnouncementList.value[i].BindToSection = BindToSection
        }
    }
    public EmployeeChangeCallback(): void {
        var Results: any[] = []
        var self = this
        this.form.All.value = false

        var documents = JSON.stringify(this.form.UploadDocument.value)
        var Content = this.form.AnnouncementContent.value
        
     
        for (let i = 0; i < this.form.EmployeeRowList.values.length; i++) {
            var result = new ConcreteAnnouncementSentEditorRow()
            result.AnnouncementContent = Content
            result.UploadDocument = documents
            result.EmployeeRowId = parseInt(this.form.EmployeeRowList.values[i])
            result.BindToDepartment = this.form.BindToDepartment.value
            result.BindToDivision = this.form.BindToDivision.value
            result.BindToJobGrade = this.form.BindToJobGrade.value
            result.BindToSection = this.form.BindToSection.value
            result.BindToOccupation = this.form.BindToOccupation.value

            result.AnnouncementDateTime = self.AnnouncedDateTime
            var employeeId = this.EmployeeData.find(emp => emp.Id === parseInt(this.form.EmployeeRowList.values[i]));
            result.EmployeeID = employeeId.EmployeeID
            Results.push(result)

        }
        
        this.form.AnnouncementList.value = Results
        this.form.AnnouncementList.updateInterface()



    }
    public SetCallBack(): void {
        var self = this
        var ImmediateElement = document.getElementById(this.idPrefix + 'Immediate');
        var DelayedElement = document.getElementById(this.idPrefix + 'Delayed');
        var AnnouncementContentElement = document.getElementById(this.idPrefix + 'AnnouncementContent');
        $(AnnouncementContentElement).on('change', async function () {
            for (let i = 0; i < self.form.AnnouncementList.value.length; i++)
                self.form.AnnouncementList.value[i].AnnouncementContent = self.form.AnnouncementContent.value
        })

        $(ImmediateElement).on('change', async function () {
            if (self.form.Immediate.value == true && self.form.Delayed.value == true)
                self.form.Delayed.value = false
            if (self.form.Delayed.value == true &&
                self.form.Immediate.value == false) {
                $('.AnnouncementTime').show()
                $('.AnnouncementDateTime').show()
                self.GenerateRemarks()
            }
            else if (self.form.Delayed.value == false &&
                self.form.Immediate.value == true) {
                $('.AnnouncementTime').hide()
                $('.AnnouncementDateTime').hide()
                self.GenerateRemarks()
            }
            else {
                $('.AnnouncementTime').hide()
                $('.AnnouncementDateTime').hide()

                self.GenerateRemarks()
            }
        })
        $(DelayedElement).on('change', async function () {
            if (self.form.Immediate.value == true && self.form.Delayed.value == true)
                self.form.Immediate.value = false
            if (self.form.Delayed.value == true &&
                self.form.Immediate.value == false) {
                $('.AnnouncementTime').show()
                $('.AnnouncementDateTime').show()
                self.GenerateRemarks()
            }
            else if (self.form.Delayed.value == false &&
                self.form.Immediate.value == true) {
                $('.AnnouncementTime').hide()
                $('.AnnouncementDateTime').hide()
                self.GenerateRemarks()
            }
            else {
                $('.AnnouncementTime').hide()
                $('.AnnouncementDateTime').hide()

                self.GenerateRemarks()
            }
        })
        var OccupationListActualElement = document.getElementById(this.idPrefix + 'OccupationListActual');
        var DepartmentListActualElement = document.getElementById(this.idPrefix + 'DepartmentListActual');
        var DivisionListActualElement = document.getElementById(this.idPrefix + 'DivisionListActual');
        var JobGradeListActualElement = document.getElementById(this.idPrefix + 'JobGradeListActual');
        var SectionListActualElement = document.getElementById(this.idPrefix + 'SectionListActual');
        var EmployeeRowListElement = document.getElementById(this.idPrefix + 'EmployeeRowList');

        var BindToOccupationElement = document.getElementById(this.idPrefix + 'BindToOccupation');
        var BindToDepartmentElement = document.getElementById(this.idPrefix + 'BindToDepartment');
        var BindToDivisionElement = document.getElementById(this.idPrefix + 'BindToDivision');
        var BindToJobGradeElement = document.getElementById(this.idPrefix + 'BindToJobGrade');
        var BindToSectionElement = document.getElementById(this.idPrefix + 'BindToSection');
        $(BindToOccupationElement).on('change', async function () {
            self.BindChangeCallback()
        })
        $(BindToDepartmentElement).on('change', async function () {
            self.BindChangeCallback()
        })
        $(BindToDivisionElement).on('change', async function () {
            self.BindChangeCallback()
        })
        $(BindToJobGradeElement).on('change', async function () {
            self.BindChangeCallback()
        })
        $(BindToSectionElement).on('change', async function () {
            self.BindChangeCallback()
        })




        $(DepartmentListActualElement).on('change', async function () {
            self.SearchCallback()
        })

        var AllElement = document.getElementById(this.idPrefix + 'All');

        $(OccupationListActualElement).on('change', async function () {
            self.SearchCallback()
        })
        $(EmployeeRowListElement).on('change', async function () {
            self.EmployeeChangeCallback()
        })
        $(SectionListActualElement).on('change', async function () {
            self.SearchCallback()
        })
        $(DivisionListActualElement).on('change', async function () {
            self.SearchCallback();
        })
        $(JobGradeListActualElement).on('change', async function () {
            self.SearchCallback();
        })
        $(DepartmentListActualElement).on('change', async function () {
            self.SearchCallback();
        })
        $(AllElement).on('change', async function () {
            if (self.form.All.value == true) {
                let EmployeeRowList = []
                for (var index in self.EmployeeData) {
                    var EmployeeRowString = self.form.EmployeeRowList.value
                    if (EmployeeRowString != "") {
                        if (EmployeeRowString.includes(',')) {
                            let EmployeeRowListBuffer = EmployeeRowString.split(',')
                            EmployeeRowListBuffer.forEach(number => {
                                EmployeeRowList.push(parseInt(number)); // Convert string to integer and push to numberList
                            })
                            if (EmployeeRowList.indexOf(self.EmployeeData[index].Id) === -1)
                                self.form.EmployeeRowList.value = self.form.EmployeeRowList.value + ' , ' + self.EmployeeData[index].Id.toString()
                        }
                        else
                            self.form.EmployeeRowList.value = self.form.EmployeeRowList.value + ' , ' + self.EmployeeData[index].Id.toString()

                    }
                    else
                        self.form.EmployeeRowList.value = self.EmployeeData[index].Id.toString()
                }
            }
            else {
                self.SearchCallback();
            }
        })


    }
    constructor() {
        super();
        var self = this
        EmployeeProfileService.List({
        }, response => {
            this.EmployeeData = response.Entities
        })




    }
    public GenerateRemarks(): void {
        var self = this
      
        var StartingString = 'The announcement will be sent at '
        var time = document.getElementById('announcement-clocklet') as HTMLInputElement
        var FinalString = ''
        if (self.form.Immediate.value == true) {
            FinalString = 'The announcement will be made to the employee immediately'
        }
        else if (self.form.Delayed.value == true) {
            FinalString = StartingString + self.form.AnnouncementDateTime.value + ' ' + time.value + ':00'
        }
        else
            FinalString = ''

        self.form.Remarks.value = FinalString
    }

    protected save_submitHandler(response): void {
        if (this.form.EmployeeRowList.value == '') {
            alertDialog('No employee chosen')
            return
        }
        if (this.form.Remarks.value == '') {
            alertDialog('Invalid settings, please check again')
            return
        }
        super.save_submitHandler(response)

        
    }
    /*
    protected onDeleteSuccess(response): void {
        var res = response
        var self = this

        AnnouncementGeneratedService.List({
            Criteria: [[AnnouncementGeneratedRow.Fields.GeneratedWizardId], '=', this.entityId]
        }, response => {
            for (let i = 0; i < response.Entities.length; i++) {
                AnnouncementGeneratedService.Delete({
                    EntityId: response.Entities[i].Id,
                 
                });
            }
            AnnouncementWizardService.Delete({
                EntityId: self.entityId,
            });
            self.dialogClose();
        })

    }
    */
}


class ConcreteAnnouncementSentEditorRow extends AnnouncementGeneratedRow {
    constructor() {
        super();
    }
}
