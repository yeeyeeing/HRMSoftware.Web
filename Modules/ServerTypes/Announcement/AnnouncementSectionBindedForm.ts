import { IntegerEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface AnnouncementSectionBindedForm {
    AnnouncementWizardId: IntegerEditor;
    SectionId: IntegerEditor;
    InsertDate: DateEditor;
    UpdateDate: DateEditor;
    DeleteDate: DateEditor;
    IsActive: IntegerEditor;
    InsertUserId: IntegerEditor;
    UpdateUserId: IntegerEditor;
    DeleteUserId: IntegerEditor;
}

export class AnnouncementSectionBindedForm extends PrefixedContext {
    static formKey = 'Announcement.AnnouncementSectionBinded';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!AnnouncementSectionBindedForm.init)  {
            AnnouncementSectionBindedForm.init = true;

            var w0 = IntegerEditor;
            var w1 = DateEditor;

            initFormType(AnnouncementSectionBindedForm, [
                'AnnouncementWizardId', w0,
                'SectionId', w0,
                'InsertDate', w1,
                'UpdateDate', w1,
                'DeleteDate', w1,
                'IsActive', w0,
                'InsertUserId', w0,
                'UpdateUserId', w0,
                'DeleteUserId', w0
            ]);
        }
    }
}