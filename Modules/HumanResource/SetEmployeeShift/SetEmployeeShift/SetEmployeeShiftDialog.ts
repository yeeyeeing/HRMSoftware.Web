import { Decorators, EditorUtils, EntityDialog,Criteria } from '@serenity-is/corelib';
import { Authorization, isEmptyOrNull, alertDialog } from '@serenity-is/corelib/q';
import { EmployeeCp38Row, EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { SetEmployeeShiftForm, SetEmployeeShiftRow, SetEmployeeShiftService } from '../../../ServerTypes/SetEmployeeShift';
import { ShiftRow, ShiftService } from '../../../ServerTypes/Shift';
import { ViewShiftHistoryRow, ViewShiftHistoryService } from '../../../ServerTypes/ViewShiftHistory';
import { ShiftDialog } from '../../Shift/Shift/ShiftDialog';

@Decorators.registerClass('HRMSoftware.SetEmployeeShift.SetEmployeeShiftDialog')
export class SetEmployeeShiftDialog extends EntityDialog<SetEmployeeShiftRow, any> {
    protected getFormKey() { return SetEmployeeShiftForm.formKey; }
    protected getRowDefinition() { return SetEmployeeShiftRow; }
    protected getService() { return SetEmployeeShiftService.baseUrl; }

    protected form = new SetEmployeeShiftForm(this.idPrefix);
    public EmployeeRowID: number;
    public ShiftRowObject: ShiftRow[];

    constructor(EmployeeRowID: number, StartDate: string, Edit: number, MaximumDate: string)
    {
        super();
        this.EmployeeRowID = EmployeeRowID
        var StartingDate = new Date(StartDate)
        this.form.ShiftStartDate.set_value(StartDate)
        this.form.ShiftEndDate.set_minDate(StartingDate)
        EditorUtils.setReadonly(this.form.ShiftStartDate.element, true);
        this.cloneButton.remove()
        if (Edit == 1)
            this.saveAndCloseButton.remove();
        else
        {
            this.localizationButton.remove();
            this.applyChangesButton.remove();
            this.undeleteButton.remove();
        }
    }



    public dialogOpen(asPanel?: boolean): void
    {
        function getClashingShifts(startDate: string, endDate: string, shifts: SetEmployeeShiftRow[]): { ShiftStartDate: string, ShiftEndDate: string, ShiftId: number }[] {
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

        if (this.isNew()) {
            this.deleteButton.remove()
            $('.EmployeeGroupId').hide()
        }
        else {
            if (isEmptyOrNull(this.form.EmployeeGroupId.value))
                $('.EmployeeGroupId').hide()
            else 
                this.readOnly = true
            
        }
        super.dialogOpen(asPanel);
        console.log('haha')
        var self = this
        var criteria: any;

        ViewShiftHistoryService.List({
            Criteria: Criteria.and(criteria,
                [[ViewShiftHistoryRow.Fields.EmployeeRowID], '=', self.EmployeeRowID]
            )
        }, response => {
            console.log(response.Entities)
            self.ShiftRowObject = response.Entities
        })
        EmployeeProfileService.List({
        }, response => {
            for (var index in response.Entities) {
                if (response.Entities[index].Id == this.EmployeeRowID)
                {

                    this.form.EmployeeRowId.value = response.Entities[index].Id.toString()
                    EditorUtils.setReadonly(this.form.EmployeeRowId.element, true);

                    this.form.EmployeeName.value = response.Entities[index].EmployeeName.toString()
                    EditorUtils.setReadonly(this.form.EmployeeName.element, true);

                    break
                }
            }
        });

        var TabId = $(".fieldset").children().uniqueId()
        var tab = ''
        var CurrentDialogId = this.idPrefix + 'PropertyGrid'
        for (var index in TabId)
        {
            if (CurrentDialogId == TabId[index].id )
                tab = TabId[index].id.toString()
        }
        var ShiftIdElement = "#" + tab.replace('PropertyGrid', 'ShiftId');
        $(ShiftIdElement).on('change', function (e)
        {    
            var dlg = new ShiftDialog()          
            dlg.loadByIdAndOpenDialog($(ShiftIdElement).val())
            dlg.readOnly = true
        });
        var ShiftEndDateElement = "#" + tab.replace('PropertyGrid', 'ShiftEndDate');
        $(ShiftEndDateElement).on('change', function (e) { 
            console.log('haha')
            console.log(self.form.ShiftEndDate.value)
            if (self.form.ShiftStartDate.valueAsDate > self.form.ShiftEndDate.valueAsDate) {
                alertDialog('Shift End Date cannot be earlier than shift end date')
                $(ShiftEndDateElement).val(null)
                return
            }
            console.log(self.ShiftRowObject)
            console.log(self.form.ShiftStartDate.value)
            console.log(self.form.ShiftEndDate.value)
            var ClashObject = getClashingShifts(self.form.ShiftStartDate.value, self.form.ShiftEndDate.value, self.ShiftRowObject)
            console.log(ClashObject)
            if (ClashObject.length > 0) {
                alertDialog(`There is already a shift from ${ClashObject.map(s => `${s.ShiftStartDate.substring(0, 10)} to ${s.ShiftEndDate.substring(0, 10)}`).join("\n")}`);
                $(ShiftEndDateElement).val(null)
            }
        });



        var ShiftStartDateElement = "#" + tab.replace('PropertyGrid', 'ShiftStartDate');
        $(ShiftStartDateElement).on('change', function (e) {
            console.log('haha')
            console.log(self.form.ShiftEndDate.value)
            if (self.form.ShiftStartDate.valueAsDate > self.form.ShiftEndDate.valueAsDate) {
                alertDialog('Shift End Date cannot be earlier than shift end date')
                $(ShiftEndDateElement).val(null)
                return
            }
            var ClashObject = getClashingShifts(self.form.ShiftStartDate.value, self.form.ShiftEndDate.value, self.ShiftRowObject)
            console.log(ClashObject)
            if (ClashObject.length > 0) {
                alertDialog(`There is already a shift from ${ClashObject.map(s => `${s.ShiftStartDate.substring(0, 10)} to ${s.ShiftEndDate.substring(0, 10)}`).join("\n")}`);
                $(ShiftEndDateElement).val(null)
            }
        });
    }


    protected save_submitHandler(response): void {
        var criteria: any;
        var self = this
        var res = response
        console.log('haha')

        super.save_submitHandler(response);
    }

}