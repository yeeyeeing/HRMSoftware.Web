import { IntegerEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface AnnouncementDepartmentBindedForm {
    AnnouncementWizardId: IntegerEditor;
    DepartmentId: IntegerEditor;
}

export class AnnouncementDepartmentBindedForm extends PrefixedContext {
    static formKey = 'Announcement.AnnouncementDepartmentBinded';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!AnnouncementDepartmentBindedForm.init)  {
            AnnouncementDepartmentBindedForm.init = true;

            var w0 = IntegerEditor;

            initFormType(AnnouncementDepartmentBindedForm, [
                'AnnouncementWizardId', w0,
                'DepartmentId', w0
            ]);
        }
    }
}