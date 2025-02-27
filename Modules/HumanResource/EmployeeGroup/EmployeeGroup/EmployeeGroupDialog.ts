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
            console.log(response.Entities)
            this.EmployeeData = response.Entities
        })
        EmployeeGroupingsService.List({
        }, response => {
            console.log(response.Entities)
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
        var employeeRowList = self.form.EmployeeList.value ? self.form.EmployeeList.value.split(',').map(Number) : [];
        for (let employee of self.EmployeeData) {
            const { JobGradeID, DivisionID, DepartmentID, OccupationID, SectionID, Id } = employee;
            const found =
                jobGradeSet.has(JobGradeID) ||
                divisionSet.has(DivisionID) ||
                departmentSet.has(DepartmentID) ||
                occupationSet.has(OccupationID) ||
                sectionSet.has(SectionID);

            console.log(employeeRowList)
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
        
            if (isEmptyOrNull(employeeGroup))
                finalOutput.push(employeeRowList[i])
            // employeeRowList = employeeRowList.filter(num => num !== Id);
        }

        self.form.EmployeeList.value = finalOutput.join(',');


        //const result = data.find(item => item.Id === 12);

    }

  
    protected save_submitHandler(response): void
    {
        var originalRes = response
        var self = this
        function parseDate(dateStr: string): Date {
            return new Date(dateStr);
        }
        function areShiftsOverlapping(
            start1: Date, end1: Date,
            start2: Date, end2: Date
        ): boolean {
            // Check if one shift starts before the other shift ends and ends after the other shift starts
            return start1 < end2 && end1 >= start2;
        }
        function areAnyShiftsOverlapping(shifts): boolean {
            var result = false
            for (let i = 0; i < shifts.length; i++) {

                var start1 = parseDate(shifts[i].ShiftStartDate);
                var end1 = parseDate(shifts[i].ShiftEndDate);
                for (let j = 0; j < shifts.length; j++) {
                    if (i == j)
                        continue
                    var start2 = parseDate(shifts[j].ShiftStartDate);
                    var end2 = parseDate(shifts[j].ShiftEndDate);
                    if (areShiftsOverlapping(start1, end1, start2, end2)) {
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

        for (let i = 0; i < self.form.Shifts.value.length; i++) {
            for (let j = 0; j < self.form.Shifts.value.length; j++) {
                if (self.form.Shifts.value[i] != self.form.Shifts.value[j]) {
                    if (areShiftsOverlapping(parseDate(self.form.Shifts.value[i].ShiftStartDate), parseDate(self.form.Shifts.value[i].ShiftEndDate),
                        parseDate(self.form.Shifts.value[j].ShiftStartDate), parseDate(self.form.Shifts.value[j].ShiftEndDate))) {
                        var concatenatedString = `There is a clash of date at ${self.form.Shifts.value[i].ShiftStartDate}-${self.form.Shifts.value[i].ShiftEndDate} and ${self.form.Shifts.value[j].ShiftStartDate}-${self.form.Shifts.value[j].ShiftEndDate} `
                        alertDialog(concatenatedString)
                    }

                }
                            }
        }
        var Results: any[] = []
        var IdToBypass: number[] = []

        if (areAnyShiftsOverlapping(this.form.Shifts.value))//check for overlapping shift dates
            return
        for (let i = 0; i < this.form.ActualShifts.value.length; i++)
            IdToBypass.push(this.form.ActualShifts.value[i].Id)

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
        this.form.ActualShifts.refresh()

        //super.save_submitHandler(response)

        ViewShiftHistoryService.List({
            Criteria: Criteria(EmployeeGroupShiftRow.Fields.EmployeeRowId).in(this.form.EmployeeList.values),
        }, response => {
            console.log(response.Entities)
            for (var res in response.Entities) {
                if (IdToBypass.indexOf(response.Entities[res].Id) != -1)
                    continue
                var Start1 = parseDate(response.Entities[res].ShiftStartDate)
                var End1 = parseDate(response.Entities[res].ShiftEndDate)
                for (let i = 0; i < self.form.Shifts.value.length; i++) {
                    var Start2 = parseDate(self.form.Shifts.value[i].ShiftStartDate)
                    var End2 = parseDate(self.form.Shifts.value[i].ShiftEndDate)
                    if (areShiftsOverlapping(Start1, End1, Start2, End2) == true) {
                        var EmployeeID
                        for (var index in self.EmployeeProfileTable.items) {
                            if (self.EmployeeProfileTable.items[index].Id == response.Entities[res].EmployeeRowID) {
                                EmployeeID = self.EmployeeProfileTable.items[index].EmployeeID
                                break
                            }
                        }


                        var concatenatedString = 'Employee ' + EmployeeID + ' Already has a Shift from ' + response.Entities[res].ShiftStartDate.substring(0,10) +
                            ' until ' + response.Entities[res].ShiftEndDate.substring(0, 10)

                        alertDialog(concatenatedString)
                        return

                    }
                }

            }
            super.save_submitHandler(originalRes)

        })
        /*
        if (this.isNew()) {
            EmployeeGroupShiftPatternService.List({
                Criteria: Criteria(EmployeeGroupShiftRow.Fields.EmployeeRowId).in(this.form.EmployeeList.values),
            }, response => {
                var save = true
                console.log(response)
                for (res in response.Entities) {
                    if (!isEmptyOrNull(response.Entities[res].EmployeeRowId)) {
                        if (this.form.EmployeeList.values.includes(response.Entities[res].EmployeeRowId.toString())) {
                            var Start1 = parseDate(response.Entities[res].ShiftStartDate)
                            var End1 = parseDate(response.Entities[res].ShiftEndDate)
                            for (let i = 0; i < self.form.Shifts.value.length; i++) {
                                var Start2 = parseDate(self.form.Shifts.value[i].ShiftStartDate)
                                var End2 = parseDate(self.form.Shifts.value[i].ShiftEndDate)
                                if (areShiftsOverlapping(Start1, End1, Start2, End2) == true) {
                                    var EmployeeID
                                    for (var index in self.EmployeeProfileTable.items) {
                                        if (self.EmployeeProfileTable.items[index].Id == response.Entities[res].EmployeeRowId) {
                                            EmployeeID = self.EmployeeProfileTable.items[index].EmployeeID
                                            break
                                        }
                                    }


                                        var concatenatedString = 'Employee ' + EmployeeID + ' Already has a Shift from ' + response.Entities[res].ShiftStartDate +
                                            ' until ' + response.Entities[res].ShiftEndDate
                                        save = false
                                        alertDialog(concatenatedString)

                                    if (save = false)
                                        return

                                }
                            }

                        }

                    }

                }
                if (save == true)
                    super.save_submitHandler(res)
            })

        }
        else {
            EmployeeGroupShiftPatternService.List({
                Criteria: Criteria(EmployeeGroupShiftRow.Fields.EmployeeRowId).in(this.form.EmployeeList.values),
            }, response => {
                var save = true
                for (res in response.Entities) {
                    if (response.Entities[res].EmployeeGroupId = self.entityId) 
                        continue
                    else if (!isEmptyOrNull(response.Entities[res].EmployeeRowId)) {
                        if (this.form.EmployeeList.values.indexOf(response.Entities[res].EmployeeRowId.toString()) != -1) {
                            var Start1 = parseDate(response.Entities[res].ShiftStartDate)
                            var End1 = parseDate(response.Entities[res].ShiftEndDate)
                            for (let i = 0; i < self.form.Shifts.value.length; i++) {
                                var Start2 = parseDate(self.form.Shifts.value[i].ShiftStartDate)
                                var End2 = parseDate(self.form.Shifts.value[i].ShiftEndDate)
                           
                                if (areShiftsOverlapping(Start1, End1, Start2, End2)) {
                                    var EmployeeID
                                    for (var index in self.EmployeeProfileTable.items) {
                                        if (self.EmployeeProfileTable.items[index].Id == response.Entities[res].EmployeeRowId) {
                                            EmployeeID = self.EmployeeProfileTable.items[index].EmployeeID
                                            break
                                        }
                                    }
                                        var concatenatedString = 'Employee ' + EmployeeID + ' Already has a Shift from ' + response.Entities[res].ShiftStartDate +
                                            ' until ' + response.Entities[res].ShiftEndDate
                                        save = false
                                        alertDialog(concatenatedString)
                                    if (save = false)
                                        return
                                }
                            }
                        }
                    }
                }
                if (save == true) {
                    for (res in response.Entities) {
                        if (response.Entities[res].EmployeeGroupId == self.entityId) {
                            EmployeeGroupService.Delete({
                                EntityId: response.Entities[res].Id
                            });
                        }
                    }
                    EmployeeGroupShiftService.List({
                        Criteria: [[EmployeeGroupShiftRow.Fields.EmployeeGroupID], '=', self.entityId]
                    }, response => {
                        for (var res in response.Entities) {
                            if (response.Entities[res].EmployeeGroupId == self.entityId) {
                                EmployeeGroupShiftService.Delete({
                                    EntityId: response.Entities[res].Id
                                });
                            }
                        }

                        for (let i = 0; i < self.form.Shifts.value.length; i++) {
                            EmployeeGroupShiftService.Create({
                                Entity:
                                {
                                    "EmployeeGroupId": self.entityId,
                                    "ShiftStartDate": self.form.Shifts.value[i].ShiftStartDate,
                                    "ShiftEndDate": self.form.Shifts.value[i].ShiftEndDate,
                                    "ShiftId": self.form.Shifts.value[i].ShiftId,
                                },
                            });
                            for (let j = 0; j < self.form.EmployeeList.values.length; j++) {
                                EmployeeGroupShiftPatternService.Create({
                                    Entity:
                                    {
                                        "EmployeeRowId": parseInt(self.form.EmployeeList.values[j]),
                                        "EmployeeGroupId": self.entityId,
                                        "ShiftStartDate": self.form.Shifts.value[i].ShiftStartDate,
                                        "ShiftEndDate": self.form.Shifts.value[i].ShiftEndDate,
                                        "ShiftId": self.form.Shifts.value[i].ShiftId,
                                    },
                                });

                            }

                        }


                        self.dialogClose()

                    })
                    

                }
            })





        }
        */
        
        
    }


    protected onDialogOpen()
    {
        super.onDialogOpen()
        var self = this
        if (!this.isNew()) {
            this.form.Shifts.value = this.form.Shifts.value.sort((a, b) => new Date(a.ShiftStartDate).getTime() - new Date(b.ShiftStartDate).getTime());
            this.form.Shifts.refresh()
        }

        $(this.form.Shifts.value).on("change", function () {
            console.log('haha')
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

        console.log(this.idPrefix)
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



    }
}

class ConcreteEmployeeShiftPatternRow extends EmployeeGroupShiftPatternRow {
    constructor() {
        super();
    }
}