import { BooleanEditor, DateEditor, StringEditor, LookupEditor, TextAreaEditor, MultipleImageUploadEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface AnnouncementGeneratedForm {
    Immediate: BooleanEditor;
    Delayed: BooleanEditor;
    AnnouncementDateTime: DateEditor;
    AnnouncementTime: StringEditor;
    EmployeeRowId: LookupEditor;
    AnnouncementContent: TextAreaEditor;
    UploadDocument: MultipleImageUploadEditor;
    BindToOccupation: BooleanEditor;
    BindToDepartment: BooleanEditor;
    BindToDivision: BooleanEditor;
    BindToJobGrade: BooleanEditor;
    BindToSection: BooleanEditor;
    Remarks: StringEditor;
}

export class AnnouncementGeneratedForm extends PrefixedContext {
    static formKey = 'Announcement.AnnouncementGenerated';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!AnnouncementGeneratedForm.init)  {
            AnnouncementGeneratedForm.init = true;

            var w0 = BooleanEditor;
            var w1 = DateEditor;
            var w2 = StringEditor;
            var w3 = LookupEditor;
            var w4 = TextAreaEditor;
            var w5 = MultipleImageUploadEditor;

            initFormType(AnnouncementGeneratedForm, [
                'Immediate', w0,
                'Delayed', w0,
                'AnnouncementDateTime', w1,
                'AnnouncementTime', w2,
                'EmployeeRowId', w3,
                'AnnouncementContent', w4,
                'UploadDocument', w5,
                'BindToOccupation', w0,
                'BindToDepartment', w0,
                'BindToDivision', w0,
                'BindToJobGrade', w0,
                'BindToSection', w0,
                'Remarks', w2
            ]);
        }
    }
}