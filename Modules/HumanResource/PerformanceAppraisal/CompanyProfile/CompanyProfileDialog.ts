import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { CompanyProfileForm, CompanyProfileRow, CompanyProfileService } from '../../../ServerTypes/PerformanceAppraisal';

@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.CompanyProfileDialog')
export class CompanyProfileDialog extends EntityDialog<CompanyProfileRow, any> {
    protected getFormKey() { return CompanyProfileForm.formKey; }
    protected getRowDefinition() { return CompanyProfileRow; }
    protected getService() { return CompanyProfileService.baseUrl; }

    protected form = new CompanyProfileForm(this.idPrefix);

    protected onDialogOpen(): void {
        super.onDialogOpen();
        
        this.deleteButton.remove();
    }
}