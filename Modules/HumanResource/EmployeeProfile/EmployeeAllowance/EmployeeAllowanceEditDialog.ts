import { Decorators, EditorUtils, EntityDialog } from '@serenity-is/corelib';
import { EmployeeAllowanceForm, EmployeeAllowanceRow, EmployeeAllowanceService } from '../../../ServerTypes/EmployeeProfile';
import { GridEditorDialog } from "@serenity-is/extensions";
import { alertDialog, getHighlightTarget, RetrieveResponse, serviceCall } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeeAllowanceEditDialog')
export class EmployeeAllowanceEditDialog extends GridEditorDialog<EmployeeAllowanceRow> {
    protected getFormKey() { return EmployeeAllowanceForm.formKey; }
    protected getRowDefinition() { return EmployeeAllowanceRow; }
    protected getService() { return EmployeeAllowanceService.baseUrl; }
    protected getLocalTextPrefix() { return EmployeeAllowanceRow.localTextPrefix; }
    protected getNameProperty() { return EmployeeAllowanceRow.nameProperty; }

    protected form: EmployeeAllowanceForm = new EmployeeAllowanceForm(this.idPrefix);
    public currentVal: any;
    constructor() {
        super();
        this.form = new EmployeeAllowanceForm(this.idPrefix);

    }
    public onDialogOpen() {
        super.onDialogOpen()
        var self = this
        $('.field.SubjectionEis label.caption, .field.SubjectionEpf label.caption, .field.SubjectionHrdf label.caption').removeClass('caption');
        $('.field.SubjectionPcb label.caption, .field.SubjectionSocso label.caption, .field.SubjectionOt label.caption').removeClass('caption');
        $('.field.SubjectionEis, .field.SubjectionEpf, .field.SubjectionHrdf, .field.SubjectionPcb, .field.SubjectionSocso,  .field.SubjectionOt').addClass('col-md-2');




        EditorUtils.setReadonly(this.form.PaidOneTime.element, true);
        if (this.form.OneTime.value == true && this.form.PaidOneTime.value == true)
            EditorUtils.setReadonly(this.form.PaidOneTime.element, false);
        var AllowanceSubjectionsElement = document.getElementById(this.idPrefix + 'AllowanceSubjections')
        $(AllowanceSubjectionsElement).on('change', async function () {
            if (self.form.AllowanceSubjections.value == true) {
                $('.FullAttendance').show()
                $('.NoLate').show()
                $('.NoAbsence').show()
                $('.NoEarlyLeaving').show()
                if (self.form.FullAttendance.value == false) 
                    $('.ExemptUnpaidLeave').parent().hide()
            }
            else {
                self.form.FullAttendance.value = self.form.NoLate.value = self.form.NoAbsence.value = false
                $('.FullAttendance').hide()
                $('.NoLate').hide()
                $('.NoAbsence').hide()
                $('.NoEarlyLeaving').hide()
                $('.ExemptUnpaidLeave').parent().hide()
            }
        })
        var FullAttendanceElement = document.getElementById(this.idPrefix + 'FullAttendance')
        $(FullAttendanceElement).on('change', async function () {
            self.form.ExemptUnpaidLeave.value = self.form.ExemptHospitalisationLeave.value = self.form.ExemptSickLeave.value = 
            self.form.ExemptAnnualLeave.value = self.form.ExemptMaternityLeave.value = self.form.ExemptPaternityLeave.value = 
            self.form.ExemptMarriageLeave.value = self.form.ExemptCompassionateLeave.value = self.form.ExemptEmergencyLeave.value = 
            self.form.ExemptGatepassLeave.value = false
            if (self.form.FullAttendance.value == true) 
                $('.ExemptUnpaidLeave').parent().show()
            else
                $('.ExemptUnpaidLeave').parent().hide()
        })

        var RecurringElement = document.getElementById(this.idPrefix + 'Recurring')
        $(RecurringElement).on('change', async function () {
            $('.PaidOneTime').hide()

            if (self.form.OneTime.value == true) 
                self.form.OneTime.value = false
            
            if (self.form.Recurring.value == true) {
                self.form.OneTime.value = false
            }
        })
        var OneTimeElement = document.getElementById(this.idPrefix + 'OneTime')
        $(OneTimeElement).on('change', async function () {
            $('.PaidOneTime').hide()
            if (self.form.Recurring.value == true) 
                self.form.Recurring.value = false
            if (self.form.OneTime.value == true) {
                $('.PaidOneTime').show()
                self.form.Recurring.value = false
            }
                
        })
        if (self.form.OneTime.value == true) {
            $('.PaidOneTime').show()
            self.form.Recurring.value = false
        }
        $(AllowanceSubjectionsElement).trigger('change')

    }

    protected save_submitHandler(response): void {

        if (this.form.Recurring.value == false && this.form.OneTime.value == false) {
            alertDialog('Please choose the frequency of this allowance')
            return
        }

        if (this.form.AllowanceSubjections.value == true &&
            (this.form.FullAttendance.value == false && this.form.NoAbsence.value == false && this.form.NoEarlyLeaving.value == false && this.form.NoLate.value == false)) {
            alertDialog('Please choose subjection of this allowance')
            return
        }

        super.save_submitHandler(response);

    }
}