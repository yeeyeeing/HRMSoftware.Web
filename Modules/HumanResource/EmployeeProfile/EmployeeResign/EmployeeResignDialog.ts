import { addAttribute, Decorators, EditorUtils, EntityDialog } from '@serenity-is/corelib';
import { EmployeeProfileService, EmployeeResignForm, EmployeeResignRow, EmployeeResignService } from '../../../ServerTypes/EmployeeProfile';
import { isEmptyOrNull, alertDialog, getHighlightTarget, RetrieveResponse, serviceCall,confirm} from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeeResignDialog')
export class EmployeeResignDialog extends EntityDialog<EmployeeResignRow, any> {
    protected getFormKey() { return EmployeeResignForm.formKey; }
    protected getRowDefinition() { return EmployeeResignRow; }
    protected getService() { return EmployeeResignService.baseUrl; }

    protected form = new EmployeeResignForm(this.idPrefix);



    protected onDialogOpen() {
        super.onDialogOpen()
        this.deleteButton.hide()
        var self = this
        var LeaveDateElement = document.getElementById(this.idPrefix + 'ResignLeaveDate')


        var ResignationDateElement = document.getElementById(this.idPrefix + 'ResignationDate')
        var NoticePeriodElement = document.getElementById(this.idPrefix + 'NoticePeriod') 
        EditorUtils.setReadonly(this.form.ResignLeaveDate.element, true);
        $('#' + this.idPrefix + 'NoticePeriod').attr('placeholder','notice period in day') 
        $(NoticePeriodElement).on('change', function (e) {

            if (isEmptyOrNull($(NoticePeriodElement).val())) {
                self.form.ResignLeaveDate.value = ''
                return
            }
            if (isEmptyOrNull($(ResignationDateElement).val())) {
                self.form.ResignLeaveDate.value = ''
                return
            }

            let dateString = $(ResignationDateElement).val(); // Get the value from the input element

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
        $(ResignationDateElement).on('change', function (e) {

            if (isEmptyOrNull($(NoticePeriodElement).val()) ) 
                return
            if (isEmptyOrNull($(ResignationDateElement).val()) ) 
                return
            let dateString = $(ResignationDateElement).val(); // Get the value from the input element

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
        if (isEmptyOrNull(self.form.ResignationDate.value)) {
            alertDialog('Please make sure the resign date is correct')
            return
        }

        confirm("Are you sure this employee has resigned?", () => {
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