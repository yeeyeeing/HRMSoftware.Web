import { Decorators, EntityDialog, Select2Editor, EditorUtils } from '@serenity-is/corelib';
import { disableSelection } from '@serenity-is/sleekgrid';
import { EmployeeGroupForm, EmployeeGroupRow, EmployeeGroupService, EmployeeGroupShiftRow, EmployeeGroupShiftService } from '../../../ServerTypes/EmployeeGroup';
import { EmployeeGroupingsService } from '../../../ServerTypes/EmployeeGroupings';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { getLookup, getLookupAsync } from '@serenity-is/corelib/q';
import 'toolcool-color-picker';
import { serviceCall, RetrieveResponse, alertDialog } from '@serenity-is/corelib/q';
import ColorPicker from '@thednp/color-picker';
import { ViewShiftHistoryService } from '../../../ServerTypes/ViewShiftHistory';
import { ShiftService } from '../../../ServerTypes/Shift';
import { EmployeeGroupShiftPatternRow, EmployeeGroupShiftPatternService } from '../../../ServerTypes/EmployeeGroup';
import { SetEmployeeShiftService } from '../../../ServerTypes/SetEmployeeShift';
import { isEmptyOrNull } from '@serenity-is/corelib/q';
import { ShiftHistoryRow, ShiftHistoryService } from '../../../ServerTypes/ShiftHistory';

@Decorators.registerClass('HRMSoftware.EmployeeGroup.EmployeeGroupDialog')
export class EmployeeGroupDialog extends EntityDialog<EmployeeGroupRow, any> {
    protected getFormKey() { return EmployeeGroupForm.formKey; }
    protected getRowDefinition() { return EmployeeGroupRow; }
    protected getService() { return EmployeeGroupService.baseUrl; }
    public ColorCode: string;
    protected form = new EmployeeGroupForm(this.idPrefix);
    public EmployeeProfileTable: any;

    constructor() {
        super();
         this.EmployeeProfileTable = getLookup("EmployeeProfile.EmployeeProfile")

    }



    protected getDialogOptions() {
        let opt = super.getDialogOptions()
        opt.height = 800
        opt.width = 1000
        return opt
    }
   
  
    protected save_submitHandler(response): void
    {
        var res = response
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
        var Results: any[] = []

        if (areAnyShiftsOverlapping(this.form.Shifts.value))//check for overlapping shift dates
            return

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
        if (this.isNew()) {
            var EmployeeListElement = document.getElementById(this.idPrefix + 'EmployeeList')
            EmployeeGroupShiftPatternService.List({
                Criteria: [[EmployeeGroupShiftPatternRow.Fields.EmployeeRowId], '=', $(EmployeeListElement).val()]
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
                Criteria: [[EmployeeGroupShiftPatternRow.Fields.EmployeeRowId], '=', self.form.EmployeeList.values]

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
                            EmployeeShiftPatternService.Delete({
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
                                EmployeeShiftPatternService.Create({
                                    Entity:
                                    {
                                        "EmployeeRowId": parseInt(self.form.EmployeeList.values[j]),
                                        "EmployeeGroupID": self.entityId,
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
            
        
        
    }


    protected onDialogOpen()
    {
        super.onDialogOpen()
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




    }
}

class ConcreteEmployeeShiftPatternRow extends EmployeeGroupShiftPatternRow {
    constructor() {
        super();
    }
}