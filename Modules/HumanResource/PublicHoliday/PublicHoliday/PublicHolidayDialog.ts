import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { PublicHolidayForm, PublicHolidayRow, PublicHolidayService } from '../../../ServerTypes/PublicHoliday';

@Decorators.registerClass('HRMSoftware.PublicHoliday.PublicHolidayDialog')
export class PublicHolidayDialog extends EntityDialog<PublicHolidayRow, any> {
    protected getFormKey() { return PublicHolidayForm.formKey; }
    protected getRowDefinition() { return PublicHolidayRow; }
    protected getService() { return PublicHolidayService.baseUrl; }

    protected form = new PublicHolidayForm(this.idPrefix);
}