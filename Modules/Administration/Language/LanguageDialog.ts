import { LanguageForm, LanguageRow, LanguageService } from "@/ServerTypes/Administration";
import { Decorators, EntityDialog } from "@serenity-is/corelib";

@Decorators.registerClass('HRMSoftware.Administration.LanguageDialog')
export class LanguageDialog extends EntityDialog<LanguageRow, any> {
    protected getFormKey() { return LanguageForm.formKey; }
    protected getRowDefinition() { return LanguageRow; }
    protected getService() { return LanguageService.baseUrl; }

    protected form = new LanguageForm(this.idPrefix);
}