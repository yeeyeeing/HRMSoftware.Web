import { TextAreaEditor, MultipleImageUploadEditor, BooleanEditor, DateEditor, StringEditor, LookupEditor, PrefixedContext } from "@serenity-is/corelib";
import { AnnouncementGeneratedEditor } from "@/HumanResource/Announcement/AnnouncementGenerated/AnnouncementGeneratedEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface AnnouncementWizardForm {
    AnnouncementContent: TextAreaEditor;
    UploadDocument: MultipleImageUploadEditor;
    Immediate: BooleanEditor;
    Delayed: BooleanEditor;
    AnnouncementDateTime: DateEditor;
    AnnouncementTime: StringEditor;
    Remarks: StringEditor;
    BindToOccupation: BooleanEditor;
    BindToDepartment: BooleanEditor;
    BindToDivision: BooleanEditor;
    BindToJobGrade: BooleanEditor;
    BindToSection: BooleanEditor;
    OccupationListActual: LookupEditor;
    DepartmentListActual: LookupEditor;
    DivisionListActual: LookupEditor;
    JobGradeListActual: LookupEditor;
    SectionListActual: LookupEditor;
    EmployeeRowList: LookupEditor;
    All: BooleanEditor;
    AnnouncementList: AnnouncementGeneratedEditor;
}

export class AnnouncementWizardForm extends PrefixedContext {
    static formKey = 'Announcement.AnnouncementWizard';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!AnnouncementWizardForm.init)  {
            AnnouncementWizardForm.init = true;

            var w0 = TextAreaEditor;
            var w1 = MultipleImageUploadEditor;
            var w2 = BooleanEditor;
            var w3 = DateEditor;
            var w4 = StringEditor;
            var w5 = LookupEditor;
            var w6 = AnnouncementGeneratedEditor;

            initFormType(AnnouncementWizardForm, [
                'AnnouncementContent', w0,
                'UploadDocument', w1,
                'Immediate', w2,
                'Delayed', w2,
                'AnnouncementDateTime', w3,
                'AnnouncementTime', w4,
                'Remarks', w4,
                'BindToOccupation', w2,
                'BindToDepartment', w2,
                'BindToDivision', w2,
                'BindToJobGrade', w2,
                'BindToSection', w2,
                'OccupationListActual', w5,
                'DepartmentListActual', w5,
                'DivisionListActual', w5,
                'JobGradeListActual', w5,
                'SectionListActual', w5,
                'EmployeeRowList', w5,
                'All', w2,
                'AnnouncementList', w6
            ]);
        }
    }
}