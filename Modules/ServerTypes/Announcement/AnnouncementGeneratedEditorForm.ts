import { LookupEditor, StringEditor, MultipleImageUploadEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface AnnouncementGeneratedEditorForm {
    EmployeeRowId: LookupEditor;
    EmployeeName: StringEditor;
    AnnouncementContent: StringEditor;
    UploadDocument: MultipleImageUploadEditor;
}

export class AnnouncementGeneratedEditorForm extends PrefixedContext {
    static formKey = 'Announcement.AnnouncementGeneratedEditor';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!AnnouncementGeneratedEditorForm.init)  {
            AnnouncementGeneratedEditorForm.init = true;

            var w0 = LookupEditor;
            var w1 = StringEditor;
            var w2 = MultipleImageUploadEditor;

            initFormType(AnnouncementGeneratedEditorForm, [
                'EmployeeRowId', w0,
                'EmployeeName', w1,
                'AnnouncementContent', w1,
                'UploadDocument', w2
            ]);
        }
    }
}