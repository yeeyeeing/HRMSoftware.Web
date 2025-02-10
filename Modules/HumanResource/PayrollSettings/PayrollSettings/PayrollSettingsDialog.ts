import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { PayrollSettingsService, PayrollSettingsRow, PayrollSettingsForm } from '../../../ServerTypes/PayrollSettings';

@Decorators.registerClass('HRMSoftware.PayrollSettings.PayrollSettingsDialog')
export class PayrollSettingsDialog extends EntityDialog<PayrollSettingsRow, any> {
    protected getFormKey() { return PayrollSettingsForm.formKey; }
    protected getRowDefinition() { return PayrollSettingsRow; }
    protected getService() { return PayrollSettingsService.baseUrl; }

    protected form = new PayrollSettingsForm(this.idPrefix);
    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);
        var self = this
        self.cloneButton.remove()
        self.deleteButton.remove()
        self.localizationButton.remove()
        self.undeleteButton.remove()
        self.applyChangesButton.remove()

        $(`.field.BonusSubjectEpf, .field.BonusSubjectSocso, .field.BonusSubjectEis, .field.BonusSubjectHrdf, .field.BonusSubjectPcb`).addClass('col-md-2');
        $(`.field.IncentiveSubjectEpf, .field.IncentiveSubjectSocso, .field.IncentiveSubjectEis, .field.IncentiveSubjectHrdf, .field.IncentiveSubjectPcb`).addClass('col-md-2');

        var SeperateBonus = document.getElementById(this.idPrefix + 'SeperateBonus')
        $(SeperateBonus).on('change', async function () {
            if (self.form.AnnualizedBonus.value == true)
                self.form.AnnualizedBonus.value = false
        })
        var AnnualizedBonus = document.getElementById(this.idPrefix + 'AnnualizedBonus')
        $(AnnualizedBonus).on('change', async function () {
            if (self.form.SeperateBonus.value == true)
                self.form.SeperateBonus.value = false
        })



        var SeperateIncentive = document.getElementById(this.idPrefix + 'SeperateIncentive')
        $(SeperateIncentive).on('change', async function () {
            if (self.form.AnnualizedIncentive.value == true)
                self.form.AnnualizedIncentive.value = false
        })
        var AnnualizedIncentive = document.getElementById(this.idPrefix + 'AnnualizedIncentive')
        $(AnnualizedIncentive).on('change', async function () {
            if (self.form.SeperateIncentive.value == true)
                self.form.SeperateIncentive.value = false
        })
    }
}