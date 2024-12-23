import { Decorators, EditorUtils, EntityDialog, Select2Editor } from '@serenity-is/corelib';
import { GridEditorDialog } from "@serenity-is/extensions";
import { alertDialog } from '@serenity-is/corelib/q';
import { EmployeeGroupShiftForm, EmployeeGroupShiftPatternForm, EmployeeGroupShiftPatternRow, EmployeeGroupShiftRow, EmployeeShiftPatternRow } from '../../../ServerTypes/EmployeeGroup';
import { ShiftService } from '../../../ServerTypes/Shift';
import { ShiftDialog } from '../../Shift/Shift/ShiftDialog';
import { isEmptyOrNull } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.EmployeeGroup.EmployeeGroupShiftEditDialog')
export class EmployeeGroupShiftEditDialog extends GridEditorDialog<EmployeeGroupShiftPatternRow> {
    protected getFormKey() { return EmployeeGroupShiftForm.formKey; }
    protected getLocalTextPrefix() { return EmployeeGroupShiftRow.localTextPrefix; }

    protected form: EmployeeGroupShiftPatternForm;

    constructor()
    {
        super();
        this.form = new EmployeeGroupShiftForm(this.idPrefix);
    }

    public dialogOpen(asPanel?: boolean): void
    {
        super.dialogOpen(asPanel);
        var self = this
        if (this.isNew() == false)
        {
            ShiftService.List({
            }, response => {

                for (var index in response.Entities) {
                    if (response.Entities[index].Id == parseInt(this.form.ShiftId.value)) {

                        var dlg = new ShiftDialog();
                        dlg.loadByIdAndOpenDialog(this.form.ShiftId.value);
                        dlg.set_readOnly(true);

                    }
                }

            });


        }
        $(this.form.ShiftStartDate.element).on('change', function (e) {
            if (isEmptyOrNull(self.form.ShiftEndDate.value) || isEmptyOrNull(self.form.ShiftStartDate.value))
                return
            if (self.form.ShiftStartDate.valueAsDate >= self.form.ShiftEndDate.valueAsDate) {
                alertDialog("Shift Start Date cannot be later than Shift End Date")
                self.form.ShiftStartDate.value = ''
            }
        })

        $(this.form.ShiftEndDate.element).on('change', function (e) {
            if (isEmptyOrNull(self.form.ShiftEndDate.value) || isEmptyOrNull(self.form.ShiftStartDate.value))
                return

            if (self.form.ShiftStartDate.valueAsDate >= self.form.ShiftEndDate.valueAsDate) {
                alertDialog("Shift Start Date cannot be later than Shift End Date")
                self.form.ShiftEndDate.value = ''
               
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
        super.save_submitHandler(response)

    }

}