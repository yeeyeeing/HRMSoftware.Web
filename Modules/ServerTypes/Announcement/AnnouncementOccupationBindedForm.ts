import { IntegerEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface AnnouncementOccupationBindedForm {
    AnnouncementWizardId: IntegerEditor;
    OccupationId: IntegerEditor;
    InsertDate: DateEditor;
    UpdateDate: DateEditor;
    DeleteDate: DateEditor;
    IsActive: IntegerEditor;
    InsertUserId: IntegerEditor;
    UpdateUserId: IntegerEditor;
    DeleteUserId: IntegerEditor;
}

export class AnnouncementOccupationBindedForm extends PrefixedContext {
    static formKey = 'Announcement.AnnouncementOccupationBinded';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!AnnouncementOccupationBindedForm.init)  {
            AnnouncementOccupationBindedForm.init = true;

            var w0 = IntegerEditor;
            var w1 = DateEditor;

            initFormType(AnnouncementOccupationBindedForm, [
                'AnnouncementWizardId', w0,
                'OccupationId', w0,
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