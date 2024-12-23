import {  Decorators, EditorUtils, EntityDialog } from '@serenity-is/corelib';
import { EmployeeProfileService, TerminateEmployeeForm, TerminateEmployeeRow, TerminateEmployeeService } from '../../../ServerTypes/EmployeeProfile';
import { isEmptyOrNull } from '@serenity-is/corelib/q';
import { ListResponse, confirm } from '@serenity-is/corelib/q';
import { alertDialog, getHighlightTarget, RetrieveResponse, serviceCall } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.TerminateEmployeeDialog')
export class TerminateEmployeeDialog extends EntityDialog<TerminateEmployeeRow, any> {
    protected getFormKey() { return TerminateEmployeeForm.formKey; }
    protected getRowDefinition() { return TerminateEmployeeRow; }
    protected getService() { return TerminateEmployeeService.baseUrl; }

    protected form = new TerminateEmployeeForm(this.idPrefix);

     protected onDialogOpen() {
        super.onDialogOpen()
        this.deleteButton.hide()
        var self = this
        var LeaveDateElement = document.getElementById(this.idPrefix + 'TerminateLeaveDate')



         var TerminateDateElement = document.getElementById(this.idPrefix + 'TerminateDate')

        var NoticePeriodElement = document.getElementById(this.idPrefix + 'NoticePeriod') 
         EditorUtils.setReadonly(this.form.TerminateLeaveDate.element, true);
        $('#' + this.idPrefix + 'NoticePeriod').attr('placeholder','notice period in day') 
        $(NoticePeriodElement).on('change', function (e) {

            if (isEmptyOrNull($(NoticePeriodElement).val())) {
                self.form.TerminateLeaveDate.value = ''
                return
            }
            if (isEmptyOrNull($(TerminateDateElement).val())) {
                self.form.TerminateLeaveDate.value = ''
                return
            }
                
            let dateString = $(TerminateDateElement).val(); // Get the value from the input element

            // Parse the date string into a Date object
            let dateParts = dateString.split('/');
            let month = parseInt(dateParts[0]) - 1; // Months are zero-based in JavaScript
            let day = parseInt(dateParts[1]);
            let year = parseInt(dateParts[2]); // Assuming 2-digit years correspond to years in the 21st century

            let LeaveDate = new Date(year, month, day);

            LeaveDate.setDate(LeaveDate.getDate() + self.form.NoticePeriod.value);
            month = (LeaveDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month as it starts from 0
            day = LeaveDate.getDate().toString().padStart(2, '0');
            year = LeaveDate.getFullYear();
            dateString = `${month}/${day}/${year}`;

            $(LeaveDateElement).val(dateString)


        });
         $(TerminateDateElement).on('change', function (e) {

             if (isEmptyOrNull($(NoticePeriodElement).val())) {
                 self.form.TerminateLeaveDate.value = ''
                 return
             }
             if (isEmptyOrNull($(TerminateDateElement).val())) {
                 self.form.TerminateLeaveDate.value = ''
                 return
             }
             let dateString = $(TerminateDateElement).val(); // Get the value from the input element

            // Parse the date string into a Date object
            let dateParts = dateString.split('/');
            let month = parseInt(dateParts[0]) - 1; // Months are zero-based in JavaScript
            let day = parseInt(dateParts[1]);
            let year = parseInt(dateParts[2]); // Assuming 2-digit years correspond to years in the 21st century

            let LeaveDate = new Date(year, month, day);

            LeaveDate.setDate(LeaveDate.getDate() + self.form.NoticePeriod.value);
            month = (LeaveDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month as it starts from 0
            day = LeaveDate.getDate().toString().padStart(2, '0');
            year = LeaveDate.getFullYear();
            dateString = `${month}/${day}/${year}`;

             $(LeaveDateElement).val(dateString)

        });


    }


    protected save_submitHandler(response): void {
        var self = this
        if (isEmptyOrNull(self.form.TerminateDate.value)) {
            alertDialog('Please make sure the terminate date is correct')
            return
        }

        confirm("Are you sure to terminate this employee?", () => {
            EmployeeProfileService.Update({
                EntityId: self.entityId,
                Entity:
                {
                    "Terminated": 1
                }
            });
            self.readOnly = true
            super.save_submitHandler(response)
        });


    }
}