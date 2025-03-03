import { Decorators, EntityDialog, Select2Editor, EditorUtils } from '@serenity-is/corelib';
import { disableSelection } from '@serenity-is/sleekgrid';
import { EmployeeGroupForm, EmployeeGroupingsRow, EmployeeGroupingsService, EmployeeGroupRow, EmployeeGroupService, EmployeeGroupShiftPatternRow, EmployeeGroupShiftPatternService, EmployeeGroupShiftRow, EmployeeGroupShiftService } from '../../../ServerTypes/EmployeeGroup';
import { EmployeeProfileRow, EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { getLookup, getLookupAsync } from '@serenity-is/corelib/q';
import 'toolcool-color-picker';
import { serviceCall, RetrieveResponse, alertDialog } from '@serenity-is/corelib/q';
import ColorPicker from '@thednp/color-picker';
import { ViewShiftHistoryService } from '../../../ServerTypes/ViewShiftHistory';
import { ShiftService } from '../../../ServerTypes/Shift';
import { SetEmployeeShiftService } from '../../../ServerTypes/SetEmployeeShift';
import { isEmptyOrNull } from '@serenity-is/corelib/q';
import { ShiftHistoryRow, ShiftHistoryService } from '../../../ServerTypes/ShiftHistory';
import { Criteria, ToolButton } from '@serenity-is/corelib';
import { confirmDialog, notifyInfo, confirm } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.EmployeeGroup.EmployeeGroupDialog')
export class EmployeeGroupDialog extends EntityDialog<EmployeeGroupRow, any> {
    protected getFormKey() { return EmployeeGroupForm.formKey; }
    protected getRowDefinition() { return EmployeeGroupRow; }
    protected getService() { return EmployeeGroupService.baseUrl; }
    public ColorCode: string;
    protected form = new EmployeeGroupForm(this.idPrefix);
    public EmployeeProfileTable: any;
    public EmployeeData: EmployeeProfileRow[];
    public GroupingData: EmployeeGroupingsRow[];
    public IdToBypass: number[];

    constructor() {
        super();
         this.EmployeeProfileTable = getLookup("EmployeeProfile.EmployeeProfile")
        var criteria: any;
        
        EmployeeProfileService.List({
            Criteria: Criteria.and(criteria, [[EmployeeProfileRow.Fields.Retired], '=', '0'],
                [[EmployeeProfileRow.Fields.Terminated], '=', '0'],
                [[EmployeeProfileRow.Fields.Resigned], '=', '0']
            )
        }, response => {
            this.EmployeeData = response.Entities
        })
        EmployeeGroupingsService.List({
        }, response => {
            this.GroupingData = response.Entities
        })


    }



    protected getDialogOptions() {
        let opt = super.getDialogOptions()
        opt.height = 800
        opt.width = 1000
        return opt
    }
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
        var employeeRowList
        if (self.isNew() == true)
            employeeRowList = self.form.EmployeeList.value ? self.form.EmployeeList.value.split(',').map(Number) : [];
        else if (self.isNew() == false)
            employeeRowList = self.form.NewAddedEmployee.value ? self.form.NewAddedEmployee.value.split(',').map(Number) : [];

        for (let employee of self.EmployeeData) {
            const { JobGradeID, DivisionID, DepartmentID, OccupationID, SectionID, Id } = employee;
            const found =
                jobGradeSet.has(JobGradeID) ||
                divisionSet.has(DivisionID) ||
                departmentSet.has(DepartmentID) ||
                occupationSet.has(OccupationID) ||
                sectionSet.has(SectionID);

            if (!found) 
                employeeRowList = employeeRowList.filter(num => num !== Id);
             else {
                if (!employeeRowList.includes(Id)) 
                    employeeRowList.push(Id);
            }
            // Update the buffer value
        }
        let finalOutput: number[] = [];
        for (let i = 0; i < employeeRowList.length; i++) {
            var employeeGroup = self.GroupingData.find(item => item.EmployeeRowId === employeeRowList[i]);
            //if (isEmptyOrNull(employeeGroup)) {
                    finalOutput.push(employeeRowList[i])
           // }
        }
        if (self.isNew() == true)
            self.form.EmployeeList.value = finalOutput.join(',');
        else if (self.isNew() == false)
            self.form.NewAddedEmployee.value = finalOutput.join(',');


        //const result = data.find(item => item.Id === 12);

    }

    public parseDate(dateStr: string): Date {
    return new Date(dateStr);
    }
    public areShiftsOverlapping(
         start1: Date, end1: Date,
         start2: Date, end2: Date
     ): boolean {
    // Check if one shift starts before the other shift ends and ends after the other shift starts
    return start1 < end2 && end1 >= start2;
     }
    public areAnyShiftsOverlapping(shifts): boolean {
    var result = false
    for (let i = 0; i < shifts.length; i++) {

        var start1 = this.parseDate(shifts[i].ShiftStartDate);
        var end1 = this.parseDate(shifts[i].ShiftEndDate);
        for (let j = 0; j < shifts.length; j++) {
            if (i == j)
                continue
            var start2 = this.parseDate(shifts[j].ShiftStartDate);
            var end2 = this.parseDate(shifts[j].ShiftEndDate);
            if (this.areShiftsOverlapping(start1, end1, start2, end2)) {
                var concatenatedString = 'There is a clash between '
                    + shifts[i].Shift + ' and ' + shifts[j].Shift;
                alertDialog(concatenatedString)
                result = true
                break;
            }
        }
        if (result == true)
            break
    }
    return result; // No overlaps
}

    protected save_submitHandler(response): void
    {
        var originalRes = response
        var self = this
       

        var Results: any[] = []

        if(this.areAnyShiftsOverlapping(this.form.Shifts.value))//check for overlapping shift dates
            return
        
        
        var combined = self.form.EmployeeList.values.concat(self.form.NewAddedEmployee.values)
        ViewShiftHistoryService.List({
            Criteria: Criteria(EmployeeGroupShiftRow.Fields.EmployeeRowId).in(combined),
        }, response => {
            var listOfClashEmployee = []
            var listOfClashEmployeeRowId = []

            var ShiftStartList = []
            var ShiftEndList = []
            for (var res in response.Entities) {
                if (self.IdToBypass.indexOf(response.Entities[res].Id) != -1) 
                    continue
                var Start1 = this.parseDate(response.Entities[res].ShiftStartDate)
                var End1 = this.parseDate(response.Entities[res].ShiftEndDate)
             
                for (let i = 0; i < self.form.Shifts.value.length; i++) {
                    var Start2 = this.parseDate(self.form.Shifts.value[i].ShiftStartDate)
                    var End2 = this.parseDate(self.form.Shifts.value[i].ShiftEndDate)
                    if (this.areShiftsOverlapping(Start1, End1, Start2, End2) == true) {
                        var EmployeeID
                        
                        for (var index in self.EmployeeProfileTable.items) {
                            if (self.EmployeeProfileTable.items[index].Id == response.Entities[res].EmployeeRowID) {
                                EmployeeID = self.EmployeeProfileTable.items[index].EmployeeID
                                break
                            }
                        }
                        listOfClashEmployee.push(EmployeeID)
                        listOfClashEmployeeRowId.push(response.Entities[res].EmployeeRowID.toString())
                        ShiftStartList.push(response.Entities[res].ShiftStartDate)
                        ShiftEndList.push(response.Entities[res].ShiftEndDate)
                    }
                }
            }
           
            if (listOfClashEmployee.length > 0) {
                const earliestDate = new Date(Math.min(...ShiftStartList.map(date => Date.parse(date))));
                const latestDate = new Date(Math.min(...ShiftEndList.map(date => Date.parse(date))));
                const earliestDateString = earliestDate.toISOString().substring(0, 10)
                const latestDateString = latestDate.toISOString().substring(0, 10)

                var concatenatedString = listOfClashEmployee.join(',') + ' Already has a Shift from ' + earliestDateString +
                    ' until ' + latestDateString +' do you want to remove these employees?'
                confirm(concatenatedString, () => {
                    const filteredList = self.form.EmployeeList.values.filter(item => !listOfClashEmployeeRowId.includes(item));

                    console.log(filteredList)
                    console.log(listOfClashEmployeeRowId)
                    console.log(self.form.EmployeeList.values)
                    self.form.EmployeeList.values = filteredList
                    if (self.form.EmployeeList.values.length == 0) {
                        alertDialog("No employee in the list")
                        return
                    }
                    for (let i = 0; i < self.form.EmployeeList.values.length; i++) {
                        for (let j = 0; j < self.form.Shifts.value.length; j++) {
                            var Obj = new ConcreteEmployeeShiftPatternRow()
                            Obj.EmployeeRowId = parseInt(self.form.EmployeeList.values[i])
                            Obj.ShiftStartDate = self.form.Shifts.value[j].ShiftStartDate
                            Obj.ShiftEndDate = self.form.Shifts.value[j].ShiftEndDate
                            Obj.ShiftId = self.form.Shifts.value[j].ShiftId
                            Results.push(Obj)
                        }
                    }
                    self.form.ActualShifts.value = Results

                    super.save_submitHandler(originalRes)
                }, {
                    onNo: () => {
                        return
                    }
                });

                return
            }
            for (let i = 0; i < this.form.EmployeeList.values.length; i++) {
                for (let j = 0; j < this.form.Shifts.value.length; j++) {
                    var Obj = new ConcreteEmployeeShiftPatternRow()
                    Obj.EmployeeRowId = parseInt(this.form.EmployeeList.values[i])
                    Obj.ShiftStartDate = this.form.Shifts.value[j].ShiftStartDate
                    Obj.ShiftEndDate = this.form.Shifts.value[j].ShiftEndDate
                    Obj.ShiftId = this.form.Shifts.value[j].ShiftId
                    Results.push(Obj)
                }
            }
            this.form.ActualShifts.value = Results
            super.save_submitHandler(originalRes)
        })
    }
    protected dialogOpen() {
        super.dialogOpen()
        var self = this
        var itemsToFilter = self.form.EmployeeList.values
        self.form.NewAddedEmployee.items=  self.form.NewAddedEmployee.items.filter(item => !itemsToFilter.includes(item.id));
        $(document).ready(function () {
            $('<button>Add Employee into Group</button>')
                .insertAfter(`#${self.idPrefix}NewAddedEmployee`)  // Insert the button after the specified element
                .on('click', function () {
                    if (!isEmptyOrNull(self.form.NewAddedEmployee.value)) {
                        confirmDialog(
                            `Do you want to add these employees into ${self.form.Name.value} Group?`,
                            () => {
                                var combined = self.form.EmployeeList.values.concat(self.form.NewAddedEmployee.values)
                                ViewShiftHistoryService.List({
                                    Criteria: Criteria(EmployeeGroupShiftRow.Fields.EmployeeRowId).in(combined),
                                }, response => {
                                    var listOfClashEmployee = []
                                    var listOfClashEmployeeRowId = []
                                    var ShiftStartList = []
                                    var ShiftEndList = []
                                    for (var res in response.Entities) {
                                        if (self.IdToBypass.indexOf(response.Entities[res].Id) != -1)
                                            continue
                                        var Start1 = self.parseDate(response.Entities[res].ShiftStartDate)
                                        var End1 = self.parseDate(response.Entities[res].ShiftEndDate)
                                        for (let i = 0; i < self.form.Shifts.value.length; i++) {
                                            var Start2 = self.parseDate(self.form.Shifts.value[i].ShiftStartDate)
                                            var End2 = self.parseDate(self.form.Shifts.value[i].ShiftEndDate)
                                            if (self.areShiftsOverlapping(Start1, End1, Start2, End2) == true) {
                                                var EmployeeID
                                                for (var index in self.EmployeeProfileTable.items) {
                                                    if (self.EmployeeProfileTable.items[index].Id == response.Entities[res].EmployeeRowID) {
                                                        EmployeeID = self.EmployeeProfileTable.items[index].EmployeeID
                                                        break
                                                    }
                                                }
                                                listOfClashEmployee.push(EmployeeID)
                                                listOfClashEmployeeRowId.push(response.Entities[res].EmployeeRowID.toString())
                                                ShiftStartList.push(response.Entities[res].ShiftStartDate)
                                                ShiftEndList.push(response.Entities[res].ShiftEndDate)
                                            }
                                        }
                                    }
                                    if (listOfClashEmployee.length > 0) {
                                        const earliestDate = new Date(Math.min(...ShiftStartList.map(date => Date.parse(date))));
                                        const latestDate = new Date(Math.min(...ShiftEndList.map(date => Date.parse(date))));
                                        const earliestDateString = earliestDate.toISOString().substring(0, 10)
                                        const latestDateString = latestDate.toISOString().substring(0, 10)
                                        var concatenatedString = listOfClashEmployee.join(',') + ' Already has a Shift from ' + earliestDateString +
                                            ' until ' + latestDateString + ' do you want to remove these employees?'
                                        confirm(concatenatedString, () => {
                                            const filteredList = self.form.NewAddedEmployee.values.filter(item => !listOfClashEmployeeRowId.includes(item));
                                            self.form.EmployeeList.value = `${self.form.EmployeeList.value},${filteredList}`
                                            self.form.NewAddedEmployee.value = ''
                                            var itemsToFilter = self.form.EmployeeList.values
                                            self.form.NewAddedEmployee.items = self.fullItems
                                            self.form.NewAddedEmployee.items = self.form.NewAddedEmployee.items.filter(item => !itemsToFilter.includes(item.id));
                                            }, {
                                            onNo: () => {
                                                return
                                            }
                                        });


                                        return
                                    }

                                    self.form.EmployeeList.value = `${self.form.EmployeeList.value},${self.form.NewAddedEmployee.value}`
                                    self.form.NewAddedEmployee.value = ''
                                    var itemsToFilter = self.form.EmployeeList.values
                                    self.form.NewAddedEmployee.items = self.fullItems
                                    self.form.NewAddedEmployee.items = self.form.NewAddedEmployee.items.filter(item => !itemsToFilter.includes(item.id));
                                })
                            }, {
                                onNo: () => {
                                    console.log("User canceled");
                                }
                            }
                                )
                    }
                });
        });
        $(`.Shifts .add-button`).on("click", function(){

            $(`.s-HRMSoftware-EmployeeGroup-EmployeeGroupShiftEditDialog`).on("dialogclose", function () {
                window['ShiftList'] = self.form.Shifts.value;  // Store the ID globally (using window)
                window['CurrentEmployee'] = self.form.EmployeeList.values;  // Store the ID globally (using window)
                window['NewEmployee'] = self.form.NewAddedEmployee.values;  // Store the ID globally (using window)
               
            })

        })
        window['ShiftList'] = self.form.Shifts.value;  // Store the ID globally (using window)
        window['CurrentEmployee'] = self.form.EmployeeList.values;  // Store the ID globally (using window)
        window['NewEmployee'] = self.form.NewAddedEmployee.values;  // Store the ID globally (using window)
        var idToBypass = []
        for (let i = 0; i < self.form.ActualShifts.value.length; i++) 
            idToBypass.push(self.form.ActualShifts.value[i].Id)
        self.IdToBypass = idToBypass
        window['idToBypass'] = self.IdToBypass
    }
    public fullItems: Select2Item[];
    protected onDialogOpen()
    {
        super.onDialogOpen()
        var self = this
        self.fullItems = self.form.NewAddedEmployee.items
        if (!this.isNew()) {
            this.form.Shifts.value = this.form.Shifts.value.sort((a, b) => new Date(a.ShiftStartDate).getTime() - new Date(b.ShiftStartDate).getTime());
            this.form.Shifts.refresh()
        }

        $(this.form.EmployeeList.element).on("change", function () {
            window['ShiftList'] = self.form.Shifts.value;  // Store the ID globally (using window)
            window['CurrentEmployee'] = self.form.EmployeeList.values;  // Store the ID globally (using window)
            window['NewEmployee'] = self.form.NewAddedEmployee.values;  // Store the ID globally (using window)
            var itemsToFilter = self.form.EmployeeList.values
            self.form.NewAddedEmployee.items = self.fullItems
            self.form.NewAddedEmployee.items = self.form.NewAddedEmployee.items.filter(item => !itemsToFilter.includes(item.id));

        })
        $(this.form.NewAddedEmployee.element).on("change", function () {
            window['ShiftList'] = self.form.Shifts.value;  // Store the ID globally (using window)
            window['CurrentEmployee'] = self.form.EmployeeList.values;  // Store the ID globally (using window)
            window['NewEmployee'] = self.form.NewAddedEmployee.values;  // Store the ID globally (using window)
        })


        EditorUtils.setReadonly(this.form.ShiftColor.element, true);
        $('.ActualShifts').hide()

        var ColorChoser = document.createElement('toolcool-color-picker');
        // Set the id attribute
        ColorChoser.setAttribute('id', 'color-picker-1');
        // Set the color attribute
        ColorChoser.setAttribute('color', '#e76ff1');

        this.form.ShiftColor.element.after(ColorChoser)

        
        ColorChoser.addEventListener('change', (evt: Event) => {
            const customEvent = evt as CustomEvent;
            this.ColorCode = customEvent.detail.hex
            this.form.ShiftColor.value = this.ColorCode

        });


        this.form.ShiftColor.element.click(function () {

            ColorChoser.opened = true 

        }
        )


        var SectionListElement = document.getElementById(this.idPrefix + 'SectionList');
        var OccupationListElement = document.getElementById(this.idPrefix + 'OccupationList');
        var DepartmentListElement = document.getElementById(this.idPrefix + 'DepartmentList');
        var DivisionListElement = document.getElementById(this.idPrefix + 'DivisionList');
        var JobGradeListElement = document.getElementById(this.idPrefix + 'JobGradeList');

        $(`#s2id_${this.idPrefix}EmployeeList`).on('click', async function (e) {
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
        window['ShiftList'] = self.form.Shifts.value;  // Store the ID globally (using window)
        window['CurrentEmployee'] = self.form.EmployeeList.values;  // Store the ID globally (using window)
        window['NewEmployee'] = self.form.NewAddedEmployee.values;  // Store the ID globally (using window)




    }
}

class ConcreteEmployeeShiftPatternRow extends EmployeeGroupShiftPatternRow {
    constructor() {
        super();
    }
}