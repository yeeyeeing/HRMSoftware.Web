import { Decorators, EditorUtils, EntityDialog } from '@serenity-is/corelib';
import { EmployeeAllowanceForm, EmployeeAllowanceRow, EmployeeAllowanceService, MasterAllowanceRow, MasterAllowanceService } from '../../../ServerTypes/EmployeeProfile';
import { GridEditorDialog } from "@serenity-is/extensions";
import { alertDialog, isEmptyOrNull, getHighlightTarget, RetrieveResponse, serviceCall } from '@serenity-is/corelib/q';

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
        $('.category-links').hide()

        $('.field.SubjectionEis label.caption, .field.SubjectionEpf label.caption, .field.SubjectionHrdf label.caption').removeClass('caption');
        $('.field.SubjectionPcb label.caption, .field.SubjectionSocso label.caption, .field.SubjectionOt label.caption').removeClass('caption');
        $('.field.SubjectionEis, .field.SubjectionEpf, .field.SubjectionHrdf, .field.SubjectionPcb, .field.SubjectionSocso,  .field.SubjectionOt').addClass('col-md-2');
      

        var MasterAllowanceIdElement = document.getElementById(`${this.idPrefix}MasterAllowanceId`)
        $(MasterAllowanceIdElement).on('change', async function () {
            console.log(self.form.MasterAllowanceId.value)

            if (isEmptyOrNull(self.form.MasterAllowanceId.value)) {
                self.hideAll()

                self.form.Amount.value = null
                self.form.Description.value = ''
                self.form.FullAttendance.value = self.form.AllowanceSubjections.value = false
                $(FullAttendanceElement).trigger('change')
                $(AllowanceSubjectionsElement).trigger('change')
                return
            }
            self.showAll()
            console.log(self.form.MasterAllowanceId.value)
            MasterAllowanceService.Retrieve({
                EntityId: self.form.MasterAllowanceId.value
            }, response => {
                console.log(response.Entity)
                self.form.Amount.value = response.Entity.Amount
                self.form.Description.value = response.Entity.Description
                self.form.AllowanceSubjections.value = response.Entity.AllowanceSubjections
                $(AllowanceSubjectionsElement).trigger('change')

                self.form.FullAttendance.value = response.Entity.FullAttendance
                self.form.NoAbsence.value = response.Entity.NoAbsence
                self.form.NoEarlyLeaving.value = response.Entity.NoEarlyLeaving
                self.form.NoLate.value = response.Entity.NoLate
                $(FullAttendanceElement).trigger('change')



                self.form.ExemptAnnualLeave.value = response.Entity.ExemptAnnualLeave
                self.form.ExemptCompassionateLeave.value = response.Entity.ExemptCompassionateLeave
                self.form.ExemptEmergencyLeave.value = response.Entity.ExemptEmergencyLeave
                self.form.ExemptGatepassLeave.value = response.Entity.ExemptGatepassLeave
                self.form.ExemptHospitalisationLeave.value = response.Entity.ExemptHospitalisationLeave
                self.form.ExemptMarriageLeave.value = response.Entity.ExemptMarriageLeave
                self.form.ExemptMaternityLeave.value = response.Entity.ExemptMaternityLeave
                self.form.ExemptPaternityLeave.value = response.Entity.ExemptPaternityLeave
                self.form.ExemptSickLeave.value = response.Entity.ExemptSickLeave
                self.form.ExemptUnpaidLeave.value = response.Entity.ExemptUnpaidLeave
                
                self.form.OneTime.value = response.Entity.OneTime
                self.form.Recurring.value = response.Entity.Recurring
                self.form.SubjectionEpf.value = response.Entity.SubjectionEpf
                self.form.SubjectionHrdf.value = response.Entity.SubjectionHrdf
                self.form.SubjectionOt.value = response.Entity.SubjectionOt
                self.form.SubjectionPcb.value = response.Entity.SubjectionPcb
                self.form.SubjectionSocso.value = response.Entity.SubjectionSocso

            })
        })

        EditorUtils.setReadonly(this.form.PaidOneTime.element, true);
        if (this.form.OneTime.value == true && this.form.PaidOneTime.value == true)
            EditorUtils.setReadonly(this.form.PaidOneTime.element, false);
        var AllowanceSubjectionsElement = document.getElementById(this.idPrefix + 'AllowanceSubjections')
        $(AllowanceSubjectionsElement).on('change', async function () {
            console.log('fire')
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
            console.log('fire')
            if (self.form.FullAttendance.value == true)
                $('.ExemptUnpaidLeave').parent().show()
            else {
                self.form.ExemptUnpaidLeave.value = self.form.ExemptHospitalisationLeave.value = self.form.ExemptSickLeave.value =
                    self.form.ExemptAnnualLeave.value = self.form.ExemptMaternityLeave.value = self.form.ExemptPaternityLeave.value =
                    self.form.ExemptMarriageLeave.value = self.form.ExemptCompassionateLeave.value = self.form.ExemptEmergencyLeave.value =
                    self.form.ExemptGatepassLeave.value = false
                $('.ExemptUnpaidLeave').parent().hide()
            }
        })

        var RecurringElement = document.getElementById(this.idPrefix + 'Recurring')
        $(RecurringElement).on('change', async function () {
            $('.PaidOneTime').hide()
            console.log('fire')

            if (self.form.OneTime.value == true) 
                self.form.OneTime.value = false
            
            if (self.form.Recurring.value == true) {
                self.form.OneTime.value = false
            }
        })
        var OneTimeElement = document.getElementById(this.idPrefix + 'OneTime')
        $(OneTimeElement).on('change', async function () {
            console.log('fire')

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
        this.hideAll()
        if (!this.isNew()) {
            $(MasterAllowanceIdElement).trigger('change')
            console.log('haha')
        }
        $('.AllowanceCode').hide()

    }
    public hideAll() {
        $('.AllowanceSubjections ').parent().hide()
        $('.SubjectionEis ').parent().hide()
        $('.Recurring').parent().hide()
        $('.ExemptUnpaidLeave').parent().hide()
        $('.NoLate, .NoAbsence, .NoEarlyLeaving, .FullAttendance').hide()
    }
    public showAll() {
        $('.AllowanceSubjections ').parent().show()
        $('.SubjectionEis ').parent().show()
        $('.Recurring').parent().show()
        $('.NoLate, .NoAbsence, .NoEarlyLeaving, .FullAttendance').show()
        $('.ExemptUnpaidLeave').parent().show()
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
        this.form.AllowanceCode.value = this.form.MasterAllowanceId.text
        super.save_submitHandler(response);

    }



}