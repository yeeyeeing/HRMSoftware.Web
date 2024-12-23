import { Decorators, EditorUtils, EntityDialog } from '@serenity-is/corelib';
import { Authorization, isEmptyOrNull } from '@serenity-is/corelib/q';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { SetEmployeeShiftForm, SetEmployeeShiftRow, SetEmployeeShiftService } from '../../../ServerTypes/SetEmployeeShift';
import { ShiftDialog } from '../../Shift/Shift/ShiftDialog';

@Decorators.registerClass('HRMSoftware.SetEmployeeShift.SetEmployeeShiftDialog')
export class SetEmployeeShiftDialog extends EntityDialog<SetEmployeeShiftRow, any> {
    protected getFormKey() { return SetEmployeeShiftForm.formKey; }
    protected getRowDefinition() { return SetEmployeeShiftRow; }
    protected getService() { return SetEmployeeShiftService.baseUrl; }

    protected form = new SetEmployeeShiftForm(this.idPrefix);
    public EmployeeRowID: number;

    constructor(EmployeeRowID: number, StartDate: string, Edit: number, MaximumDate: string)
    {
        super();

        this.EmployeeRowID = EmployeeRowID

       


        var StartingDate = new Date(StartDate)
        this.form.ShiftStartDate.set_value(StartDate)


        this.form.ShiftEndDate.set_maxValue(MaximumDate)
        this.form.ShiftEndDate.set_minDate(StartingDate)

        EditorUtils.setReadonly(this.form.ShiftStartDate.element, true);
        //this.deleteButton.remove()
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
        var LeaveReasonElement = "#" + tab.replace('PropertyGrid', 'ShiftId');
        $(LeaveReasonElement).on('change', function (e)
        {    
            var dlg = new ShiftDialog()          
            dlg.loadByIdAndOpenDialog($(LeaveReasonElement).val())
            dlg.readOnly = true
        });
    }
}