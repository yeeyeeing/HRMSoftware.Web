import { StringEditor, MultipleImageUploadEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface AnnouncementForm {
    AnnouncerID: StringEditor;
    AnnouncerName: StringEditor;
    AnnouncementContent: StringEditor;
    UploadDocument: MultipleImageUploadEditor;
}

export class AnnouncementForm extends PrefixedContext {
    static formKey = 'Announcement.Announcement';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!AnnouncementForm.init)  {
            AnnouncementForm.init = true;

            var w0 = StringEditor;
            var w1 = MultipleImageUploadEditor;

            initFormType(AnnouncementForm, [
                'AnnouncerID', w0,
                'AnnouncerName', w0,
                'AnnouncementContent', w0,
                'UploadDocument', w1
            ]);
        }
    }
}