import { Decorators, EditorUtils, EntityDialog, Select2Editor } from '@serenity-is/corelib';
import { GridEditorDialog } from "@serenity-is/extensions";
import { alertDialog } from '@serenity-is/corelib/q';
import { EmployeeGroupShiftForm, EmployeeGroupShiftPatternForm, EmployeeGroupShiftPatternRow, EmployeeGroupShiftRow } from '../../../ServerTypes/EmployeeGroup';
import { ShiftService } from '../../../ServerTypes/Shift';
import { ShiftDialog } from '../../Shift/Shift/ShiftDialog';
import { isEmptyOrNull } from '@serenity-is/corelib/q';
import { ViewShiftHistoryService } from '../../../ServerTypes/ViewShiftHistory';
import { Criteria, ToolButton } from '@serenity-is/corelib';
import { getLookup, getLookupAsync } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.EmployeeGroup.EmployeeGroupShiftEditDialog')
export class EmployeeGroupShiftEditDialog extends GridEditorDialog<EmployeeGroupShiftPatternRow> {
    protected getFormKey() { return EmployeeGroupShiftForm.formKey; }
    protected getLocalTextPrefix() { return EmployeeGroupShiftRow.localTextPrefix; }

    protected form: EmployeeGroupShiftForm;

    constructor()
    {
        super();
        this.form = new EmployeeGroupShiftForm(this.idPrefix);

    }

    public dialogOpen(asPanel?: boolean): void
    {
        super.dialogOpen(asPanel);
        function getClashingShifts(startDate: string, endDate: string, shifts: any[]): { ShiftStartDate: string, ShiftEndDate: string, ShiftId: number }[] {
            let start = new Date(startDate);
            let end = new Date(endDate);

            return shifts.filter(shift => {
                let shiftStart = new Date(shift.ShiftStartDate);
                let shiftEnd = new Date(shift.ShiftEndDate);

                return (
                    (start >= shiftStart && start <= shiftEnd) ||  // Case 1: startDate within shift
                    (end >= shiftStart && end <= shiftEnd) ||      // Case 2: endDate within shift
                    (shiftStart >= start && shiftStart <= end) ||  // Case 3: shift starts within range
                    (shiftEnd >= start && shiftEnd <= end)         // Case 4: shift ends within range
                );
            }).map(shift => ({
                ShiftStartDate: shift.ShiftStartDate,
                ShiftEndDate: shift.ShiftEndDate,
                ShiftId: shift.ShiftId
            }));
        }
        function getClashingDate(inputDate: string, shifts: any[]): { ShiftStartDate: string, ShiftEndDate: string, ShiftId: number }[] {
            let date = new Date(inputDate);

            return shifts.filter(shift => {
                let shiftStart = new Date(shift.ShiftStartDate);
                let shiftEnd = new Date(shift.ShiftEndDate);

                return (
                    (date >= shiftStart && date <= shiftEnd)
                );
            }).map(shift => ({
                ShiftStartDate: shift.ShiftStartDate,
                ShiftEndDate: shift.ShiftEndDate,
                ShiftId: shift.ShiftId
            }));
        }

        var self = this
        console.log(window['ShiftList'])
        if (this.isNew() == false)
        {
            ShiftService.List({
            }, response => {

                for (var index in response.Entities) {
                    if (response.Entities[index].Id == parseInt( self.form.ShiftId.value)) {

                        var dlg = new ShiftDialog();
                        dlg.loadByIdAndOpenDialog(this.form.ShiftId.value);
                        dlg.set_readOnly(true);

                    }
                }

            });


        }
        var tab = ''
        var CurrentDialogId = this.idPrefix + 'PropertyGrid'
        var TabId = $(".fieldset").children().uniqueId()
        for (var index in TabId) {
            if (CurrentDialogId == TabId[index].id)
                tab = TabId[index].id.toString()
        }
        var ShiftStartDateElement = "#" + tab.replace('PropertyGrid', 'ShiftStartDate');

        var ShiftEndDateElement = "#" + tab.replace('PropertyGrid', 'ShiftEndDate');
        $(this.form.ShiftStartDate.element).on('change', function (e) {
            if (!isEmptyOrNull(self.form.ShiftStartDate.value)) {
                var ClashDate = getClashingDate(self.form.ShiftStartDate.value, window['ShiftList'])
                if (ClashDate.length > 0) {
                    alertDialog(`There is already a shift from ${ClashDate.map(s => `${s.ShiftStartDate.substring(0, 10)} to ${s.ShiftEndDate.substring(0, 10)}`).join("\n")}`);
                    $(ShiftStartDateElement).val(null)
                }
            }
            if (isEmptyOrNull(self.form.ShiftEndDate.value) || isEmptyOrNull(self.form.ShiftStartDate.value)) 
                return

            if (self.form.ShiftStartDate.valueAsDate > self.form.ShiftEndDate.valueAsDate) {
                alertDialog("Shift Start Date cannot be later than Shift End Date")
                self.form.ShiftStartDate.value = ''
            }

            if (!isEmptyOrNull(window['ShiftList'])) {
                var ClashObject = getClashingShifts(self.form.ShiftStartDate.value, self.form.ShiftEndDate.value, window['ShiftList'])
                if (ClashObject.length > 0) {
                    alertDialog(`There is already a shift from ${ClashObject.map(s => `${s.ShiftStartDate.substring(0, 10)} to ${s.ShiftEndDate.substring(0, 10)}`).join("\n")}`);
                    $(ShiftStartDateElement).val(null)
                    return
                }
            }
            console.log(window['CurrentEmployee'])
            console.log(window['NewEmployee'])

        })

        $(this.form.ShiftEndDate.element).on('change', function (e) {
            if (!isEmptyOrNull(self.form.ShiftEndDate.value)) {
                var ClashDate = getClashingDate(self.form.ShiftEndDate.value, window['ShiftList'])
                if (ClashDate.length > 0) {
                    alertDialog(`There is already a shift from ${ClashDate.map(s => `${s.ShiftStartDate.substring(0, 10)} to ${s.ShiftEndDate.substring(0, 10)}`).join("\n")}`);
                    $(ShiftEndDateElement).val(null)
                }

            }
            
            
            if (isEmptyOrNull(self.form.ShiftEndDate.value) || isEmptyOrNull(self.form.ShiftStartDate.value))
                return

            if (self.form.ShiftStartDate.valueAsDate > self.form.ShiftEndDate.valueAsDate) {
                alertDialog("Shift Start Date cannot be later than Shift End Date")
                self.form.ShiftEndDate.value = ''
               
            }
            if (!isEmptyOrNull(window['ShiftList'])) {
                var ClashObject = getClashingShifts(self.form.ShiftStartDate.value, self.form.ShiftEndDate.value, window['ShiftList'])
                if (ClashObject.length > 0) {
                    alertDialog(`There is already a shift from ${ClashObject.map(s => `${s.ShiftStartDate.substring(0, 10)} to ${s.ShiftEndDate.substring(0, 10)}`).join("\n")}`);
                    $(ShiftEndDateElement).val(null)
                }
            }
        })

        $(this.form.ShiftId.element).on('change', function (e)
        {
            ShiftService.List({
            }, response => {

                for (var index in response.Entities) {
                    if (response.Entities[index].Id == this.form.ShiftId.value)
                    {

                        var dlg = new ShiftDialog();
                        dlg.loadByIdAndOpenDialog(this.form.ShiftId.value);
                        dlg.set_readOnly(true);

                    }
                }

            });
           
        });
        

    }
    
    protected save_submitHandler(response): void
    {
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
        var EmployeeProfileTable = getLookup("EmployeeProfile.EmployeeProfile")

        var originalRes = response
        var array1 = window['CurrentEmployee']
        var array2 = window['NewEmployee']
        var IdToBypass = window['idToBypass']
        console.log(IdToBypass)
        var Shifts = window['ShiftList']
        var combined = array1.concat(array2)
        console.log(combined)
        console.log(Shifts.length)
        console.log(array2.length)
        console.log(array1.length)

        if (Shifts.length == 0 && array2.length == 0 && array1.length == 0)
            super.save_submitHandler(originalRes)
        else {
            var criteria = combined.length > 0
                ? Criteria(EmployeeGroupShiftRow.Fields.EmployeeRowId).in(combined)
                : Criteria(EmployeeGroupShiftRow.Fields.EmployeeRowId).ge('0')
            ViewShiftHistoryService.List({
                Criteria: criteria
            }, response => {
                if (combined.length > 0) {
                    for (var res in response.Entities) {
                        if (!isEmptyOrNull(IdToBypass)) {
                            if (IdToBypass.indexOf(response.Entities[res].Id) != -1)
                                continue
                        }
                        var Start1 = parseDate(response.Entities[res].ShiftStartDate)
                        var End1 = parseDate(response.Entities[res].ShiftEndDate)
                        console.log(Shifts)
                        for (let i = 0; i < Shifts.length; i++) {
                            var Start2 = parseDate(Shifts[i].ShiftStartDate)
                            var End2 = parseDate(Shifts[i].ShiftEndDate)
                            if (areShiftsOverlapping(Start1, End1, Start2, End2) == true) {
                                var EmployeeID
                                for (var index in EmployeeProfileTable.items) {
                                    if (EmployeeProfileTable.items[index].Id == response.Entities[res].EmployeeRowID) {
                                        EmployeeID = EmployeeProfileTable.items[index].EmployeeID
                                        break
                                    }
                                }
                                var concatenatedString = 'Employee ' + EmployeeID + ' Already has a Shift from ' + response.Entities[res].ShiftStartDate.substring(0, 10) +
                                    ' until ' + response.Entities[res].ShiftEndDate.substring(0, 10)
                                alertDialog(concatenatedString)
                                return
                            }
                        }
                    }
                }
                super.save_submitHandler(originalRes)

            })

        }

    }
    
}