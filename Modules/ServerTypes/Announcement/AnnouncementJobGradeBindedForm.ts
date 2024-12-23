import { IntegerEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface AnnouncementJobGradeBindedForm {
    AnnouncementWizardId: IntegerEditor;
    JobGradeId: IntegerEditor;
    InsertDate: DateEditor;
    UpdateDate: DateEditor;
    DeleteDate: DateEditor;
    IsActive: IntegerEditor;
    InsertUserId: IntegerEditor;
    UpdateUserId: IntegerEditor;
    DeleteUserId: IntegerEditor;
}

export class AnnouncementJobGradeBindedForm extends PrefixedContext {
    static formKey = 'Announcement.AnnouncementJobGradeBinded';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!AnnouncementJobGradeBindedForm.init)  {
            AnnouncementJobGradeBindedForm.init = true;

            var w0 = IntegerEditor;
            var w1 = DateEditor;

            initFormType(AnnouncementJobGradeBindedForm, [
                'AnnouncementWizardId', w0,
                'JobGradeId', w0,
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