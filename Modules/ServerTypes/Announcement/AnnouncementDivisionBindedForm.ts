﻿import { IntegerEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface AnnouncementDivisionBindedForm {
    AnnouncementWizardId: IntegerEditor;
    DivisionId: IntegerEditor;
    InsertDate: DateEditor;
    UpdateDate: DateEditor;
    DeleteDate: DateEditor;
    IsActive: IntegerEditor;
    InsertUserId: IntegerEditor;
    UpdateUserId: IntegerEditor;
    DeleteUserId: IntegerEditor;
}

export class AnnouncementDivisionBindedForm extends PrefixedContext {
    static formKey = 'Announcement.AnnouncementDivisionBinded';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!AnnouncementDivisionBindedForm.init)  {
            AnnouncementDivisionBindedForm.init = true;

            var w0 = IntegerEditor;
            var w1 = DateEditor;

            initFormType(AnnouncementDivisionBindedForm, [
                'AnnouncementWizardId', w0,
                'DivisionId', w0,
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