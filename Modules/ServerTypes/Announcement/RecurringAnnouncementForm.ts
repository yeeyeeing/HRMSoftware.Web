import { StringEditor, TextAreaEditor, MultipleImageUploadEditor, BooleanEditor, LookupEditor, DateEditor, IntegerEditor, PrefixedContext } from "@serenity-is/corelib";
import { AnnouncementGeneratedEditor } from "@/HumanResource/Announcement/AnnouncementGenerated/AnnouncementGeneratedEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface RecurringAnnouncementForm {
    Name: StringEditor;
    AnnouncementContent: TextAreaEditor;
    UploadDocument: MultipleImageUploadEditor;
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
    EmployeeListActual: LookupEditor;
    All: BooleanEditor;
    StartingDateTime: DateEditor;
    RecurringTime: StringEditor;
    DaysOfWeekRecurring: BooleanEditor;
    DaysPerRecurring: BooleanEditor;
    IntervalInDays: IntegerEditor;
    Sunday: BooleanEditor;
    Monday: BooleanEditor;
    Tuesday: BooleanEditor;
    Wednesday: BooleanEditor;
    Thursday: BooleanEditor;
    Friday: BooleanEditor;
    Saturday: BooleanEditor;
    Remarks: TextAreaEditor;
    AnnouncementList: AnnouncementGeneratedEditor;
}

export class RecurringAnnouncementForm extends PrefixedContext {
    static formKey = 'Announcement.RecurringAnnouncement';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!RecurringAnnouncementForm.init)  {
            RecurringAnnouncementForm.init = true;

            var w0 = StringEditor;
            var w1 = TextAreaEditor;
            var w2 = MultipleImageUploadEditor;
            var w3 = BooleanEditor;
            var w4 = LookupEditor;
            var w5 = DateEditor;
            var w6 = IntegerEditor;
            var w7 = AnnouncementGeneratedEditor;

            initFormType(RecurringAnnouncementForm, [
                'Name', w0,
                'AnnouncementContent', w1,
                'UploadDocument', w2,
                'BindToOccupation', w3,
                'BindToDepartment', w3,
                'BindToDivision', w3,
                'BindToJobGrade', w3,
                'BindToSection', w3,
                'OccupationListActual', w4,
                'DepartmentListActual', w4,
                'DivisionListActual', w4,
                'JobGradeListActual', w4,
                'SectionListActual', w4,
                'EmployeeListActual', w4,
                'All', w3,
                'StartingDateTime', w5,
                'RecurringTime', w0,
                'DaysOfWeekRecurring', w3,
                'DaysPerRecurring', w3,
                'IntervalInDays', w6,
                'Sunday', w3,
                'Monday', w3,
                'Tuesday', w3,
                'Wednesday', w3,
                'Thursday', w3,
                'Friday', w3,
                'Saturday', w3,
                'Remarks', w1,
                'AnnouncementList', w7
            ]);
        }
    }
}