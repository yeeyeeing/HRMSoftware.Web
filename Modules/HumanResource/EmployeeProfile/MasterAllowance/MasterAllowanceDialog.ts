import {  Decorators, EntityDialog } from '@serenity-is/corelib';
import { EmployeeAllowanceRow, EmployeeAllowanceService, MasterAllowanceForm, MasterAllowanceRow, MasterAllowanceService } from '../../../ServerTypes/EmployeeProfile';
import {  EditorUtils } from '@serenity-is/corelib';
import { alertDialog, confirmDialog, getHighlightTarget, RetrieveResponse, serviceCall } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.MasterAllowanceDialog')
export class MasterAllowanceDialog extends EntityDialog<MasterAllowanceRow, any> {
    protected getFormKey() { return MasterAllowanceForm.formKey; }
    protected getRowDefinition() { return MasterAllowanceRow; }
    protected getService() { return MasterAllowanceService.baseUrl; }

    protected form = new MasterAllowanceForm(this.idPrefix);


    public onDialogOpen() {
        super.onDialogOpen()
        var self = this
        this.applyChangesButton.hide()
        $('.field.SubjectionEis label.caption, .field.SubjectionEpf label.caption, .field.SubjectionHrdf label.caption').removeClass('caption');
        $('.field.SubjectionPcb label.caption, .field.SubjectionSocso label.caption, .field.SubjectionOt label.caption').removeClass('caption');
        $('.field.SubjectionEis, .field.SubjectionEpf, .field.SubjectionHrdf, .field.SubjectionPcb, .field.SubjectionSocso,  .field.SubjectionOt').addClass('col-md-2');



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
        var res = response
        var self = this
        if (this.form.Recurring.value == false && this.form.OneTime.value == false) {
            alertDialog('Please choose the frequency of this allowance')
            return
        }

        if (this.form.AllowanceSubjections.value == true &&
            (this.form.FullAttendance.value == false && this.form.NoAbsence.value == false && this.form.NoEarlyLeaving.value == false && this.form.NoLate.value == false)) {
            alertDialog('Please choose subjection of this allowance')
            return
        }

        if(!this.isNew())
        {
          
            confirmDialog(
                // here we demonstrate how you can detect which button user has clicked
                // second parameter is Yes handler and it is called only when user clicks Yes.
                // third parameter has some additional options, that you should only use when needed            
                "Do you want to update all employee with the Allowance?",
                () => {
                    EmployeeAllowanceService.List({
                        Criteria: [[EmployeeAllowanceRow.Fields.MasterAllowanceId], '=', self.entityId]
                    }, response => {
                        for (var index in response.Entities) {
                            EmployeeAllowanceService.Update({
                                EntityId: response.Entities[index].Id,
                                Entity:
                                {
                                    "AllowanceCode": self.form.AllowanceCode.value,
                                    "AllowanceSubjections": self.form.AllowanceSubjections.value,
                                    "Amount": self.form.Amount.value,
                                    "Description": self.form.Description.value,
                                    "ExemptAnnualLeave": self.form.ExemptAnnualLeave.value,
                                    "ExemptCompassionateLeave": self.form.ExemptCompassionateLeave.value,
                                    "ExemptEmergencyLeave": self.form.ExemptEmergencyLeave.value,
                                    "ExemptGatepassLeave": self.form.ExemptGatepassLeave.value,
                                    "ExemptHospitalisationLeave": self.form.ExemptHospitalisationLeave.value,
                                    "ExemptMarriageLeave": self.form.ExemptMarriageLeave.value,
                                    "ExemptMaternityLeave": self.form.ExemptMaternityLeave.value,
                                    "ExemptPaternityLeave": self.form.ExemptPaternityLeave.value,
                                    "ExemptSickLeave": self.form.ExemptSickLeave.value,
                                    "ExemptUnpaidLeave": self.form.ExemptUnpaidLeave.value,
                                    "FullAttendance": self.form.FullAttendance.value,
                                    "NoAbsence": self.form.NoAbsence.value,
                                    "NoEarlyLeaving": self.form.NoEarlyLeaving.value,
                                    "NoLate": self.form.NoLate.value,
                                    "OneTime": self.form.OneTime.value,
                                    "Recurring": self.form.Recurring.value,
                                    "SubjectionEis": self.form.SubjectionEis.value,
                                    "SubjectionEpf": self.form.SubjectionEpf.value,
                                    "SubjectionHrdf": self.form.SubjectionHrdf.value,
                                    "SubjectionOt": self.form.SubjectionOt.value,
                                    "SubjectionPcb": self.form.SubjectionPcb.value,
                                    "SubjectionSocso": self.form.SubjectionSocso.value

                                }
                            });
                        }
                        super.save_submitHandler(res);
                    })
                }, {
                onNo: () => { super.save_submitHandler(res) }
            });

            
            
        }
        else
            super.save_submitHandler(response);

    }




}