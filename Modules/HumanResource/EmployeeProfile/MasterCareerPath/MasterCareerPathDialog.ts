import { Decorators, EntityDialog,  } from '@serenity-is/corelib';
import { MasterCareerPathForm, MasterCareerPathRow, MasterCareerPathService } from '../../../ServerTypes/EmployeeProfile';
import { alertDialog, getHighlightTarget, RetrieveResponse, serviceCall } from '@serenity-is/corelib/q';
import { isEmptyOrNull } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.MasterCareerPathDialog')
export class MasterCareerPathDialog extends EntityDialog<MasterCareerPathRow, any> {
    protected getFormKey() { return MasterCareerPathForm.formKey; }
    protected getRowDefinition() { return MasterCareerPathRow; }
    protected getService() { return MasterCareerPathService.baseUrl; }

    protected form = new MasterCareerPathForm(this.idPrefix);
    protected onDialogOpen() {
        super.onDialogOpen()
        var self = this
        $('.CategoryId').hide()
        var CareerPathTypeElement = document.getElementById(`${this.idPrefix}CareerPathType`)
        $(CareerPathTypeElement).on('change', async function () {
            if ( parseInt(self.form.CareerPathType.value) >= 2)
                $('.CategoryId').show()
            else
                $('.CategoryId').hide()

        })
        if (this.isNew() == false)
            $(CareerPathTypeElement).trigger('change')
    }
    protected save_submitHandler(response): void {

        if (parseInt(this.form.CareerPathType.value) >= 2) {
            if (isEmptyOrNull(this.form.CategoryId.value)) {
                alertDialog('Please Choose A Category')
                return
            }
        }
        super.save_submitHandler(response)
    }
}