import { Decorators, EditorUtils, EntityDialog } from '@serenity-is/corelib';
import {  Category, EmployeeCareerPathForm, EmployeeCareerPathRow, EmployeeCareerPathService, EmployeeProfileService, MasterCareerPathService, MasterCareerPathType } from '../../../ServerTypes/EmployeeProfile';
import { GridEditorDialog } from "@serenity-is/extensions";
import { alertDialog, getHighlightTarget, RetrieveResponse, serviceCall, isEmptyOrNull, getLookup } from '@serenity-is/corelib/q';
import { SaveResponse, Select2Editor } from '@serenity-is/corelib';
import { DepartmentService, DivisionService, JobGradeService, OccupationService, SectionService } from '../../../ServerTypes/OrganisationHierarchy';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeeCareerPathEditDialog')
export class EmployeeCareerPathEditDialog extends GridEditorDialog<EmployeeCareerPathRow> {
    protected getFormKey() { return EmployeeCareerPathForm.formKey; }
    protected getRowDefinition() { return EmployeeCareerPathRow; }
    protected getService() { return EmployeeCareerPathService.baseUrl; }
    protected getLocalTextPrefix() { return EmployeeCareerPathRow.localTextPrefix; }
    protected getNameProperty() { return EmployeeCareerPathRow.nameProperty; }

    protected form: EmployeeCareerPathForm = new EmployeeCareerPathForm(this.idPrefix);
    public currentVal: any;
    constructor() {
        super();
        this.form = new EmployeeCareerPathForm(this.idPrefix);

    }
    protected onDialogOpen() {
        super.onDialogOpen()
        var newBasic
        var self = this
        EditorUtils.setReadonly(this.form.Description.element, true);
        EditorUtils.setReadonly(this.form.EmployeeRowId.element, true);
        var DivisionID, DepartmentID, SectionID, OccupationID, JobGradeID,BasicSalary;
        var CareerPathType, CategoryId;
        var NewValueEditor
        $('.CategoryId').hide()
       


        var CareerPathIdElement = document.getElementById(`${this.idPrefix}CareerPathId`)
        $(CareerPathIdElement).on('change', async function () {
            self.form.Description.value = ''
            if (isEmptyOrNull(DivisionID)) {
                EmployeeProfileService.Retrieve({
                    EntityId: self.form.EmployeeRowId.value
                }, response => {
                    DivisionID = response.Entity.DivisionID
                    DepartmentID = response.Entity.DepartmentID
                    SectionID = response.Entity.SectionID
                    OccupationID = response.Entity.OccupationID
                    JobGradeID = response.Entity.JobGradeID
                    BasicSalary = response.Entity.BasicSalary
                    self.form.Description.value = ''
                    self.form.NewValue.value = null
                    if (isEmptyOrNull(self.form.CareerPathId.value)) {
                        $('.select2-container.s-Serenity-Select2Editor').remove()
                        $('.NewValue .editor').removeClass('s-Serenity-Select2Editor s-Select2Editor select2-offscreen');
                        $('.NewValue .editor').removeAttr('placeholder'); // Removes the entire placeholder attribute
                        return
                    }
                    MasterCareerPathService.Retrieve({
                        EntityId: self.form.CareerPathId.value
                    }, response => {
                        var NewValueElement = document.getElementById(self.idPrefix + 'NewValue')
                        CareerPathType = response.Entity.CareerPathType;
                        CategoryId = response.Entity.CategoryId
                        if (response.Entity.CareerPathType < 2) {
                            $('.select2-container.s-Serenity-Select2Editor').remove()
                            $('.NewValue .editor').removeClass('s-Serenity-Select2Editor s-Select2Editor select2-offscreen');
                            $('.NewValue .editor').removeAttr('placeholder'); // Removes the entire placeholder attribute
                            return
                        }
                        if (!isEmptyOrNull(NewValueEditor))
                            NewValueEditor.destroy();
                        NewValueEditor = new Select2Editor($(NewValueElement))

                        CategoryId = response.Entity.CategoryId

                        if (CategoryId == 0)//division
                        {
                            DivisionService.List({
                            }, response => {
                                for (var index in response.Entities) {
                                    if (response.Entities[index].Id != DivisionID)
                                        NewValueEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
                                }
                            })
                        }

                        else if (CategoryId == 1)//department
                        {
                            DepartmentService.List({
                            }, response => {
                                for (var index in response.Entities) {
                                    if (response.Entities[index].Id != DepartmentID)
                                        NewValueEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
                                }
                            })
                        }

                        else if (CategoryId == 2)//section
                        {
                            SectionService.List({
                            }, response => {
                                for (var index in response.Entities) {
                                    if (response.Entities[index].Id != SectionID)
                                        NewValueEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
                                }
                            })
                        }

                        else if (CategoryId == 3)//occupation
                        {
                            OccupationService.List({
                            }, response => {
                                for (var index in response.Entities) {
                                    if (response.Entities[index].Id != OccupationID)
                                        NewValueEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
                                }
                            })
                        }
                        else if (CategoryId == 4)//JobGrade
                        {
                            JobGradeService
                                .List({
                                }, response => {
                                    for (var index in response.Entities) {
                                        if (response.Entities[index].Id != JobGradeID)
                                            NewValueEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
                                    }
                                })
                        }



                    })
                })


            }

            else {
                if (isEmptyOrNull(self.form.CareerPathId.value)) {
                    $('.select2-container.s-Serenity-Select2Editor').remove()
                    $('.NewValue .editor').removeClass('s-Serenity-Select2Editor s-Select2Editor select2-offscreen');
                    $('.NewValue .editor').removeAttr('placeholder'); // Removes the entire placeholder attribute
                    return
                }
                MasterCareerPathService.Retrieve({
                    EntityId: self.form.CareerPathId.value
                }, response => {
                    var NewValueElement = document.getElementById(self.idPrefix + 'NewValue')
                    CareerPathType = response.Entity.CareerPathType;
                    CategoryId = response.Entity.CategoryId
                    if (response.Entity.CareerPathType < 2) {
                        $('.select2-container.s-Serenity-Select2Editor').remove()
                        $('.NewValue .editor').removeClass('s-Serenity-Select2Editor s-Select2Editor select2-offscreen');
                        $('.NewValue .editor').removeAttr('placeholder'); // Removes the entire placeholder attribute
                        return
                    }
                    if (!isEmptyOrNull(NewValueEditor))
                        NewValueEditor.destroy();
                    NewValueEditor = new Select2Editor($(NewValueElement))

                    CategoryId = response.Entity.CategoryId

                    if (CategoryId == 0)//division
                    {
                        DivisionService.List({
                        }, response => {
                            for (var index in response.Entities) {
                                if (response.Entities[index].Id != DivisionID)
                                    NewValueEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
                            }
                        })
                    }

                    else if (CategoryId == 1)//department
                    {
                        DepartmentService.List({
                        }, response => {
                            for (var index in response.Entities) {
                                if (response.Entities[index].Id != DepartmentID)
                                    NewValueEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
                            }
                        })
                    }

                    else if (CategoryId == 2)//section
                    {
                        SectionService.List({
                        }, response => {
                            for (var index in response.Entities) {
                                if (response.Entities[index].Id != SectionID)
                                    NewValueEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
                            }
                        })
                    }

                    else if (CategoryId == 3)//occupation
                    {
                        OccupationService.List({
                        }, response => {
                            for (var index in response.Entities) {
                                if (response.Entities[index].Id != OccupationID)
                                    NewValueEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
                            }
                        })
                    }
                    else if (CategoryId == 4)//JobGrade
                    {
                        JobGradeService
                            .List({
                            }, response => {
                                for (var index in response.Entities) {
                                    if (response.Entities[index].Id != JobGradeID)
                                        NewValueEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
                                }
                            })
                    }



                })

            }


        })
        var NewValueElement = document.getElementById(`${this.idPrefix}NewValue`)
        $(NewValueElement).on('change', async function () {
          
            if (isEmptyOrNull(self.form.NewValue.value) || isEmptyOrNull(self.form.CareerPathId.value)) {
                self.form.Description.value = ''
                return
            }
            if (CareerPathType == MasterCareerPathType.increment)  // increment
            {
                newBasic = BasicSalary + self.form.NewValue.value
                self.form.Description.value = `${self.form.EmployeeRowId.text} will get a increment from ${BasicSalary} to ${newBasic}`
            }
            else if (CareerPathType == MasterCareerPathType.decrement) { // decrement
                newBasic = BasicSalary - self.form.NewValue.value
                if (newBasic <= 0) {
                    alertDialog('The salary cannot be smaller than 0');
                    self.form.Description.value = ''
                }
                self.form.Description.value = `${self.form.EmployeeRowId.text} will get a decrement from ${BasicSalary} to ${newBasic}`
            }
            else if (CareerPathType == MasterCareerPathType.promotion) { // promotion
                var Table,searchTarget
                if (CategoryId == Category.DEPARTMENT) {
                    Table = getLookup("Department.Department")
                    searchTarget = DepartmentID
                    Criteria = "Department"
                }
                else if (CategoryId == Category.DIVISION) {
                    Table = getLookup("Division.Division")
                    searchTarget = DivisionID
                    Criteria = "Division"
                }
                else if (CategoryId == Category.JOBGRADE) {
                    Table = getLookup("JobGrade.JobGrade")
                    searchTarget = JobGradeID
                    Criteria = "Job Grade"
                }
                else if (CategoryId == Category.OCCUPATION) {
                    Table = getLookup("Occupation.Occupation")
                    searchTarget = OccupationID
                    Criteria = "Occupation"
                }
                else if (CategoryId == Category.SECTION) {
                    Table = getLookup("Section.Section")
                    searchTarget = SectionID
                    Criteria = "Section"
                }

                var OldString,NewString
                for (var LookupIndex in Table.items) {
                    if (Table.items[LookupIndex].Id == searchTarget) 
                        OldString = Table.items[LookupIndex].Name
                    else if (Table.items[LookupIndex].Id == self.form.NewValue.value) 
                        NewString = Table.items[LookupIndex].Name
                }
                if (isEmptyOrNull(OldString))
                    self.form.Description.value = `${self.form.EmployeeRowId.text} is promoted to ${NewString} ${Criteria}`
                else
                self.form.Description.value = `${self.form.EmployeeRowId.text} is promoted from ${OldString} ${Criteria} to ${NewString} ${Criteria}`
            }

            else if (CareerPathType == MasterCareerPathType.demotion) { // demotion
                var Table, searchTarget, Criteria 
                if (CategoryId == Category.DEPARTMENT) {
                    Table = getLookup("Department.Department")
                    searchTarget = DepartmentID
                    Criteria = "Department"
                }
                else if (CategoryId == Category.DIVISION) {
                    Table = getLookup("Division.Division")
                    searchTarget = DivisionID
                    Criteria = "Division"
                }
                else if (CategoryId == Category.JOBGRADE) {
                    Table = getLookup("JobGrade.JobGrade")
                    searchTarget = JobGradeID
                    Criteria = "Job Grade"
                }
                else if (CategoryId == Category.OCCUPATION) {
                    Table = getLookup("Occupation.Occupation")
                    searchTarget = OccupationID
                    Criteria = "Occupation"
                }
                else if (CategoryId == Category.SECTION) {
                    Table = getLookup("Section.Section")
                    searchTarget = SectionID
                    Criteria = "Section"
                }
                var OldString, NewString
                for (var LookupIndex in Table.items) {
                    if (Table.items[LookupIndex].Id == searchTarget)
                        OldString = Table.items[LookupIndex].Name
                    else if (Table.items[LookupIndex].Id == self.form.NewValue.value)
                        NewString = Table.items[LookupIndex].Name
                }
              
                self.form.Description.value = `${self.form.EmployeeRowId.text} is demoted from ${OldString} ${Criteria} to ${NewString} ${Criteria}`

            }



        })
    }
}