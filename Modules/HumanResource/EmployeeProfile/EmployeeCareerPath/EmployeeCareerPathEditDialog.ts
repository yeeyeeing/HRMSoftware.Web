import { Decorators, EditorUtils, EntityDialog } from '@serenity-is/corelib';
import {  Category, EmployeeCareerPathForm, EmployeeCareerPathRow, EmployeeCareerPathService, EmployeeProfileService, MasterCareerPathService, MasterCareerPathType } from '../../../ServerTypes/EmployeeProfile';
import { GridEditorDialog } from "@serenity-is/extensions";
import { alertDialog, getHighlightTarget, RetrieveResponse, serviceCall, isEmptyOrNull, getLookup } from '@serenity-is/corelib/q';
import { SaveResponse, Select2Editor } from '@serenity-is/corelib';
import { DepartmentService, DivisionService, JobGradeService, OccupationService, SectionService } from '../../../ServerTypes/OrganisationHierarchy';
import { MasterCostCentreService } from '../../../ServerTypes/Master';
import { confirmDialog, notifyInfo } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeeCareerPathEditDialog')
export class EmployeeCareerPathEditDialog extends GridEditorDialog<EmployeeCareerPathRow> {
    protected getFormKey() { return EmployeeCareerPathForm.formKey; }
    protected getRowDefinition() { return EmployeeCareerPathRow; }
    protected getService() { return EmployeeCareerPathService.baseUrl; }
    protected getLocalTextPrefix() { return EmployeeCareerPathRow.localTextPrefix; }
    protected getNameProperty() { return EmployeeCareerPathRow.nameProperty; }

    protected form: EmployeeCareerPathForm = new EmployeeCareerPathForm(this.idPrefix);
    public currentVal: any;
    public CareerPathType: MasterCareerPathType
    public DivisionID: number;
    public DepartmentID: number;
    public SectionID: number;
    public OccupationID: number;
    public JobGradeID: number;
    public CostCentreID: number;
    public BasicSalary: number;
    public oldValue: number;
    public categoryId: number;

    constructor() {
        super();
        this.form = new EmployeeCareerPathForm(this.idPrefix);
    }
    public doDelete(res) {
        var self = this
        var lookupTables = {
            [Category.DIVISION]: getLookup("Division.Division"),
            [Category.DEPARTMENT]: getLookup("Department.Department"),
            [Category.SECTION]: getLookup("Section.Section"),
            [Category.OCCUPATION]: getLookup("Occupation.Occupation"),
            [Category.JOBGRADE]: getLookup("JobGrade.JobGrade"),
            [Category.COSTCENTRE]: getLookup("MasterCostCentre.MasterCostCentre")
        };
        console.log(self.form.careerPaathType.value)
        console.log(MasterCareerPathType.increment.valueOf())

        if (self.form.careerPaathType.value == MasterCareerPathType.promotion.valueOf()
            || self.form.careerPaathType.value == MasterCareerPathType.demotion.valueOf()) {

            var rollBack = ` ${self.form.EmployeeRowId.text} will be transferred back to `;
            var table = lookupTables[self.form.CategoryId.value];
            console.log(table)
            console.log(self.form.CategoryId.value)
            console.log(self.form.oldValue.value)

            if (table) {
                var oldItem = table.items.find(item => item.Id == self.form.oldValue.value);
                if (oldItem) rollBack += oldItem.Name;
            }
        }

        else if (self.form.careerPaathType.value == MasterCareerPathType.increment.valueOf()
            || self.form.careerPaathType.value == MasterCareerPathType.decrement.valueOf()) {
            var newSalary
            if (self.form.careerPaathType.value == MasterCareerPathType.increment.valueOf())
                newSalary = self.BasicSalary - self.form.NewValue.value
            else if (self.form.careerPaathType.value == MasterCareerPathType.decrement.valueOf())
                newSalary = self.BasicSalary + self.form.NewValue.value
            var rollBack = ` ${self.form.EmployeeRowId.text}'s salary will go back to ${newSalary}`;
            console.log(newSalary)
            console.log(self.BasicSalary)

        }

        else if (self.form.careerPaathType.value == MasterCareerPathType.transfer.valueOf()) {
            var rollBack = ` ${self.form.EmployeeRowId.text} will be transferred back to `;
            var details = [];

            var NewTables = {
                oldCostCentre: getLookup("MasterCostCentre.MasterCostCentre"),
                oldDepartment: getLookup("Department.Department"),
                oldDivision: getLookup("Division.Division"),
                oldSection: getLookup("Section.Section"),
                oldOccupation: getLookup("Occupation.Occupation"),
                oldJobGrade: getLookup("JobGrade.JobGrade")
            };

            for (var key in NewTables) {
                if (!isEmptyOrNull(self.form[key]?.value)) {
                    if (typeof NewTables[key] === "string") {
                        details.push(NewTables[key]);
                    } else {
                        var item = NewTables[key].items.find(i => i.Id == self.form[key].value);
                        if (item) details.push(item.Name);
                    }
                }
            }

            if (details.length) rollBack += details.join("\n");
        }


        if (self.Executed == 1) {
            confirmDialog(
                `Do you want to perform rollback, ${rollBack}`,
                () => {
                    if (self.form.careerPaathType.value == MasterCareerPathType.promotion.valueOf()
                        || self.form.careerPaathType.value == MasterCareerPathType.demotion.valueOf()) {
                        if (self.form.CategoryId.value == Category.DIVISION.valueOf())//division
                        {
                            EmployeeProfileService.Update({
                                EntityId: self.form.EmployeeRowId.value,
                                Entity:
                                {
                                    "DivisionID": self.form.oldValue.value
                                }
                            });
                        }
                        else if (self.form.CategoryId.value == Category.DEPARTMENT.valueOf())//department
                        {
                            EmployeeProfileService.Update({
                                EntityId: self.form.EmployeeRowId.value,
                                Entity:
                                {
                                    "DepartmentID": self.form.oldValue.value
                                }
                            });
                        }
                        else if (self.form.CategoryId.value == Category.SECTION.valueOf())//section
                        {
                            EmployeeProfileService.Update({
                                EntityId: self.form.EmployeeRowId.value,
                                Entity:
                                {
                                    "SectionID": self.form.oldValue.value
                                }
                            });
                        }
                        else if (self.form.CategoryId.value == Category.OCCUPATION.valueOf())//occupation
                        {
                            EmployeeProfileService.Update({
                                EntityId: self.form.EmployeeRowId.value,
                                Entity:
                                {
                                    "OccupationID": self.form.oldValue.value
                                }
                            });
                        }
                        else if (self.form.CategoryId.value == Category.JOBGRADE.valueOf())//JobGrade
                        {
                            EmployeeProfileService.Update({
                                EntityId: self.form.EmployeeRowId.value,
                                Entity:
                                {
                                    "JobGradeID": self.form.oldValue.value
                                }
                            });
                        }
                        else if (self.form.CategoryId.value == Category.COSTCENTRE.valueOf())//JobGrade
                        {
                            EmployeeProfileService.Update({
                                EntityId: self.form.EmployeeRowId.value,
                                Entity:
                                {
                                    "CostCentreID": self.form.oldValue.value
                                }
                            });
                        }
                    }
                    else if (self.form.careerPaathType.value == MasterCareerPathType.increment.valueOf()
                        || self.form.careerPaathType.value == MasterCareerPathType.decrement.valueOf()) {
                        EmployeeProfileService.Update({
                            EntityId: self.form.EmployeeRowId.value,
                            Entity:
                            {
                                "BasicSalary": newSalary
                            }
                        });
                    }
                    else if (self.form.careerPaathType.value == MasterCareerPathType.transfer.valueOf()) {
                        EmployeeProfileService.Update({
                            EntityId: self.form.EmployeeRowId.value,
                            Entity:
                            {
                                "DepartmentID": self.form.oldDepartment.value,
                                "CostCentreID": self.form.oldCostCentre.value,
                                "DivisionID": self.form.oldDivision.value,
                                "JobGradeID": self.form.oldJobGrade.value,
                                "OccupationID": self.form.oldOccupation.value,
                                "SectionID": self.form.oldSection.value
                            }
                        });

                    }

                    EmployeeCareerPathService.Update({
                        EntityId: self.form.Id.value,
                        Entity:
                        {
                            "IsActive": -1
                        },
                    });

                    super.doDelete(res)


                }, {
                onNo: () => {
                    EmployeeCareerPathService.Update({
                        EntityId: self.form.Id.value,
                        Entity:
                        {
                            "IsActive": -1
                        },
                    });

                    super.doDelete(res)


                }

            });
        }
        else {
            EmployeeCareerPathService.Update({
                EntityId: self.form.Id.value,
                Entity:
                {
                    "IsActive": -1
                },
            }, response => {
                super.doDelete(res)

            });

        }



    }
    public Executed: number;
    protected onDialogOpen() {
        super.onDialogOpen()
        var self = this
        self.Executed = 0
        if (!isEmptyOrNull(window['employeeRowId']))
            self.form.EmployeeRowId.value = window['employeeRowId']
        if (!isEmptyOrNull(self.form.Id.value)) {
             EmployeeCareerPathService.Retrieve({
                EntityId: self.form.Id.value
             }, response => {
                 self.form.careerPaathType.value = response.Entity.careerPaathType
                 self.CareerPathType = response.Entity.careerPaathType
                 if (response.Entity.Executed == 1) {
                     self.Executed = 1
                     self.readOnly = true
                     $(`.s-HRMSoftware-EmployeeProfile-EmployeeCareerPathEditDialog .tool-button.delete-button.icon-tool-button`).removeClass('disabled')
                 }
             })
        }
        EmployeeProfileService.Retrieve({
            EntityId: window['employeeRowId']
        }, response => {
            self.DivisionID = response.Entity.DivisionID
            DivisionName = response.Entity.Division
            self.DepartmentID = response.Entity.DepartmentID
            DepartmentName = response.Entity.DepartmentDept
            self.SectionID = response.Entity.SectionID
            SectionName = response.Entity.Section

            self.OccupationID = response.Entity.OccupationID
            OccupationName = response.Entity.Occupation

            self.JobGradeID = response.Entity.JobGradeID
            JobGradeName = response.Entity.JobGrade

            self.CostCentreID = response.Entity.CostCentreID
            CostCentreName = response.Entity.CostCentreName

            self.BasicSalary = response.Entity.BasicSalary
            
        })


        var newBasic
        
        EditorUtils.setReadonly(this.form.Description.element, true);
        EditorUtils.setReadonly(this.form.EmployeeRowId.element, true);
        var DivisionName, DepartmentName, SectionName, OccupationName, JobGradeName, CostCentreName;

        var CareerPathType, CategoryId;
        var NewValueEditor
        $(`#${this.idPrefix}PropertyGrid`).find('.categories').append('<div id="leftPanel" style="width: 50%;  float: left;"></div>');
        $(`#${this.idPrefix}PropertyGrid`).find('.categories').append('<div id="rightPanel" style="width: 50%;  float: right;"></div>');
        $('.NewValue, .newDivision, .newDepartment, .newSection, .newOccupation, .newJobGrade, .newCostCentre').appendTo('#leftPanel'); // Moves it to a new location
        $('.EffectiveDate, .Description, .ManDesc').appendTo('#rightPanel'); // Moves it to a new location
        $('.NewValue, .newDivision, .newDepartment, .newSection, .newOccupation, .newJobGrade, .newCostCentre').hide(); // Moves it to a new location
        $('.oldValue, .oldDivision, .oldDepartment, .oldSection, .oldOccupation, .oldJobGrade, .oldCostCentre').hide(); // Moves it to a new location


        var NewValueElement = document.getElementById(this.idPrefix + 'NewValue')

        var CareerPathIdElement = document.getElementById(`${this.idPrefix}CareerPathId`)
        $(CareerPathIdElement).on('change', async function () {
            self.form.Description.value = ''
           
            $(NewValueElement).val(null)
            if (isEmptyOrNull(self.form.CareerPathId.value)) {
                $('.NewValue, .newDivision, .newDepartment, .newSection, .newOccupation, .newJobGrade, .newCostCentre').hide(); // Moves it to a new location
                $('.select2-container.s-Serenity-Select2Editor').remove()
                $('.NewValue .editor').removeClass('s-Serenity-Select2Editor s-Select2Editor select2-offscreen');
                $('.NewValue .editor').removeAttr('placeholder'); // Removes the entire placeholder attribute
                return
            }
            MasterCareerPathService.Retrieve({
                    EntityId: self.form.CareerPathId.value
                }, response => {
                self.CareerPathType = CareerPathType=response.Entity.CareerPathType
                    self.form.careerPaathType.value = response.Entity.CareerPathType
                      var NewValueElement = document.getElementById(self.idPrefix + 'NewValue')
                    CategoryId = self.categoryId = response.Entity.CategoryId
                    if (response.Entity.CareerPathType == MasterCareerPathType.decrement ||
                        response.Entity.CareerPathType == MasterCareerPathType.increment) {
                        $('.select2-container.s-Serenity-Select2Editor').remove()
                        $('.newDivision, .newDepartment, .newSection, .newOccupation, .newJobGrade, .newCostCentre').hide(); // Moves it to a new location
                        $('.NewValue .editor').removeClass('s-Serenity-Select2Editor s-Select2Editor select2-offscreen');
                        $('.NewValue .editor').removeAttr('placeholder'); // Removes the entire placeholder attribute
                        $('.NewValue').show()
                        return
                    }
                    else if (response.Entity.CareerPathType == MasterCareerPathType.transfer) {
                        $('.newDivision, .newDepartment, .newSection, .newOccupation, .newJobGrade, .newCostCentre').show(); // Moves it to a new location
                        $('.NewValue').hide()
                        if (!isEmptyOrNull(self.DivisionID))
                            self.form.newDivision.value = self.DivisionID.toString()
                        if (!isEmptyOrNull(self.DepartmentID))
                            self.form.newDepartment.value = self.DepartmentID.toString()
                        if (!isEmptyOrNull(self.SectionID))
                            self.form.newSection.value = self.SectionID.toString()
                        if (!isEmptyOrNull(self.OccupationID))
                            self.form.newOccupation.value = self.OccupationID.toString()
                        if (!isEmptyOrNull(self.JobGradeID))
                            self.form.newJobGrade.value = self.JobGradeID.toString()
                        if (!isEmptyOrNull(self.CostCentreID))
                            self.form.newCostCentre.value = self.CostCentreID.toString()
                        return
                    }
                    else if (response.Entity.CareerPathType == MasterCareerPathType.promotion
                        || response.Entity.CareerPathType == MasterCareerPathType.demotion) {
                        $('.newDivision, .newDepartment, .newSection, .newOccupation, .newJobGrade, .newCostCentre').hide(); // Moves it to a new location
                        $('.NewValue').show()
                    }
                    if (!isEmptyOrNull(NewValueEditor))
                        NewValueEditor.destroy();
                    NewValueEditor = new Select2Editor($(NewValueElement))
                    if (CategoryId == Category.DIVISION)//division
                    {
                        self.oldValue = self.DivisionID
                        DivisionService.List({
                        }, response => {
                            for (var index in response.Entities) {
                                if (response.Entities[index].Id != self.DivisionID)
                                    NewValueEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
                            }
                        })
                    }
                    else if (CategoryId == Category.DEPARTMENT)//department
                    {
                        self.oldValue = self.DepartmentID
                        DepartmentService.List({
                        }, response => {
                            for (var index in response.Entities) {
                                if (response.Entities[index].Id != self.DepartmentID)
                                    NewValueEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
                            }
                        })
                    }
                    else if (CategoryId == Category.SECTION)//section
                    {
                        self.oldValue = self.SectionID

                        SectionService.List({
                        }, response => {
                            for (var index in response.Entities) {
                                if (response.Entities[index].Id != self.SectionID)
                                    NewValueEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
                            }
                        })
                    }
                    else if (CategoryId == Category.OCCUPATION)//occupation
                    {
                        self.oldValue = self.OccupationID
                        OccupationService.List({
                        }, response => {
                            for (var index in response.Entities) {
                                if (response.Entities[index].Id != self.OccupationID)
                                    NewValueEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
                            }
                        })
                    }
                    else if (CategoryId == Category.JOBGRADE)//JobGrade
                    {
                        self.oldValue = self.JobGradeID
                        JobGradeService
                            .List({
                            }, response => {
                                for (var index in response.Entities) {
                                    if (response.Entities[index].Id != self.JobGradeID)
                                        NewValueEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
                                }
                            })
                    }
                    else if (CategoryId == Category.COSTCENTRE)//JobGrade
                    {
                        self.oldValue = self.CostCentreID
                        MasterCostCentreService
                            .List({
                            }, response => {
                                for (var index in response.Entities) {
                                    if (response.Entities[index].Id != self. CostCentreID)
                                        NewValueEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
                                }
                            })
                    }
                   

                })
            
        })
        function formulateDescription() {
            if (isEmptyOrNull(self.form.NewValue.value) && isEmptyOrNull(self.form.CareerPathId.value)) {
                self.form.Description.value = ''
                return
            }
            if (CareerPathType == MasterCareerPathType.increment)  // increment
            {
                newBasic = self.BasicSalary + self.form.NewValue.value
                self.form.Description.value = `${self.form.EmployeeRowId.text} will get a increment from ${self.BasicSalary} to ${newBasic}`
            }
            else if (CareerPathType == MasterCareerPathType.decrement) { // decrement
                newBasic = self.BasicSalary - self.form.NewValue.value
                if (newBasic <= 0) {
                    alertDialog('The salary cannot be smaller than 0');
                    self.form.Description.value = ''
                }
                self.form.Description.value = `${self.form.EmployeeRowId.text} will get a decrement from ${self.BasicSalary} to ${newBasic}`
            }
            else if (CareerPathType == MasterCareerPathType.demotion || CareerPathType == MasterCareerPathType.promotion) { // demotion
                var Table, searchTarget, Criteria
                if (CategoryId == Category.DEPARTMENT) {
                    Table = getLookup("Department.Department")
                    searchTarget = self.DepartmentID
                    Criteria = "Department"
                }
                else if (CategoryId == Category.DIVISION) {
                    Table = getLookup("Division.Division")
                    searchTarget = self.DivisionID
                    Criteria = "Division"
                }
                else if (CategoryId == Category.JOBGRADE) {
                    Table = getLookup("JobGrade.JobGrade")
                    searchTarget = self.JobGradeID
                    Criteria = "Job Grade"
                }
                else if (CategoryId == Category.OCCUPATION) {
                    Table = getLookup("Occupation.Occupation")
                    searchTarget = self.OccupationID
                    Criteria = "Occupation"
                }
                else if (CategoryId == Category.SECTION) {

                    Table = getLookup("Section.Section")
                    searchTarget = self.SectionID
                    Criteria = "Section"
                }
                else if (CategoryId == Category.COSTCENTRE) {

                    Table = getLookup("MasterCostCentre.MasterCostCentre")
                    searchTarget = self.CostCentreID
                    Criteria = "CostCentre"
                }
                var OldString, NewString
                for (var LookupIndex in Table.items) {
                    if (Table.items[LookupIndex].Id == searchTarget)
                        OldString = Table.items[LookupIndex].Name
                    else if (Table.items[LookupIndex].Id == self.form.NewValue.value)
                        NewString = Table.items[LookupIndex].Name
                }
                var promotionDemotion =  CareerPathType == MasterCareerPathType.promotion? "promoted":"demoted"
                if (isEmptyOrNull(OldString))
                    self.form.Description.value = `${self.form.EmployeeRowId.text} is ${promotionDemotion} to ${NewString} ${Criteria}`
                else
                    self.form.Description.value = `${self.form.EmployeeRowId.text} is ${promotionDemotion} from ${OldString} ${Criteria} to ${NewString} ${Criteria}`
            }
            else if (CareerPathType == MasterCareerPathType.transfer) {
                var descBuffer = `${self.form.EmployeeRowId.text} is transferred\n`
                if (self.form.newDepartment.value != self.DepartmentID.toString() && !isEmptyOrNull(self.form.newDepartment.value)) {
                    var Dep
                    if (!isEmptyOrNull(self.DepartmentID))
                        Dep = `DEPARTMENT: from ${DepartmentName} to ${self.form.newDepartment.text}\n`
                    else
                        Dep = `DEPARTMENT:  to ${self.form.newDepartment.text}\n`

                    descBuffer += Dep
                }
                if (self.form.newDivision.value != self.DivisionID.toString() && !isEmptyOrNull(self.form.newDivision.value)) {
                    var Div
                    if (!isEmptyOrNull(self.DivisionID))
                        Div = `DIVISION: from ${DivisionName} to ${self.form.newDivision.text}\n`
                    else
                        Div = `DIVISION:  to ${self.form.newDivision.text}\n`

                    descBuffer += Div
                }

                if (self.form.newCostCentre.value != self.CostCentreID.toString() && !isEmptyOrNull(self.form.newCostCentre.value)) {
                    var CostCentre
                    if (!isEmptyOrNull(self.CostCentreID))
                         CostCentre = `COST CENTRE: from ${CostCentreName} to ${self.form.newCostCentre.text}\n`
                    else
                        CostCentre = `COST CENTRE:  to ${self.form.newCostCentre.text}\n`
                    console.log(CostCentre)
                    descBuffer += CostCentre
                }

                if (self.form.newJobGrade.value != self.JobGradeID.toString() && !isEmptyOrNull(self.form.newJobGrade.value)) {
                    var JobGrade 
                    if (!isEmptyOrNull(self.JobGradeID))
                        JobGrade = `JOBGRADE: from ${JobGradeName} to ${self.form.newJobGrade.text}\n`
                    else
                        JobGrade = `JOBGRADE: to ${self.form.newJobGrade.text}\n`
                    descBuffer += JobGrade
                }

                if (self.form.newOccupation.value != self.OccupationID.toString() && !isEmptyOrNull(self.form.newOccupation.value)) {
                    var Occupation
                    if (!isEmptyOrNull(self.OccupationID))
                        Occupation = `OCCUPATION: from ${OccupationName} to ${self.form.newOccupation.text}\n`
                    else
                        Occupation = `OCCUPATION: to ${self.form.newOccupation.text}\n`

                    descBuffer += Occupation
                }
                if (self.form.newSection.value != self.SectionID.toString() && !isEmptyOrNull(self.form.newSection.value)) {
                    var sec 
                    console.log('sec')
                    if (!isEmptyOrNull(self.SectionID))
                        sec = `SECTION: from ${SectionName} to ${self.form.newSection.text}\n`
                    else
                        sec = `SECTION: to ${self.form.newSection.text}\n`

                    descBuffer += sec
                }
                self.form.Description.value = descBuffer
            }

        }
        var NewValueElement = document.getElementById(`${this.idPrefix}NewValue`)
        $(NewValueElement).on('change', async function () {
            formulateDescription()   
        })
        var newDivisionElement = document.getElementById(`${this.idPrefix}newDivision`)
        $(newDivisionElement).on('change', async function () {
            formulateDescription()
        })
        var newDepartmentElement = document.getElementById(`${this.idPrefix}newDepartment`)
        $(newDepartmentElement).on('change', async function () {
            formulateDescription()
        })
        var newSectionElement = document.getElementById(`${this.idPrefix}newSection`)
        $(newSectionElement).on('change', async function () {
            formulateDescription()
        })
        var newOccupationElement = document.getElementById(`${this.idPrefix}newOccupation`)
        $(newOccupationElement).on('change', async function () {
            formulateDescription()
        })
        var newJobGradeElement = document.getElementById(`${this.idPrefix}newJobGrade`)
        $(newJobGradeElement).on('change', async function () {
            formulateDescription()
        })
        var newCostCentreElement = document.getElementById(`${this.idPrefix}newCostCentre`)
        $(newCostCentreElement).on('change', async function () {
            formulateDescription()
        })
    }
    protected save_submitHandler(response): void {
        var self = this
        if (isEmptyOrNull(this.form.NewValue.value) &&
            (this.CareerPathType == MasterCareerPathType.decrement ||
            this.CareerPathType == MasterCareerPathType.increment ||
            this.CareerPathType == MasterCareerPathType.promotion ||
            this.CareerPathType == MasterCareerPathType.demotion)
        ) {
            alertDialog('Please fill in the New Value!')
            return
        }
        self.form.CategoryId.value = self.categoryId;
        self.form.careerPaathType.value = self.CareerPathType;

        confirmDialog(
            `Are you sure ${this.form.Description.value} on ${this.form.EffectiveDate.value} ?`,
            () => {
                self.form.oldSection.value = self.SectionID
                self.form.oldCostCentre.value = self.CostCentreID
                self.form.oldDepartment.value = self.DepartmentID
                self.form.oldDivision.value = self.DivisionID
                self.form.oldJobGrade.value = self.JobGradeID
                self.form.oldOccupation.value = self.OccupationID
                self.form.oldValue.value = self.oldValue
                super.save_submitHandler(response)
            }, {
                onNo: () => {
                    return
                }

        });
    }
}