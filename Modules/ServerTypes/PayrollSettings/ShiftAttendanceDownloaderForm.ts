import { DateEditor, LookupEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface ShiftAttendanceDownloaderForm {
    startDate: DateEditor;
    endDate: DateEditor;
    OccupationList: LookupEditor;
    DepartmentList: LookupEditor;
    DivisionList: LookupEditor;
    JobGradeList: LookupEditor;
    SectionList: LookupEditor;
    EmployeeRowListBuffer: LookupEditor;
    EmployeeRowList: LookupEditor;
}

export class ShiftAttendanceDownloaderForm extends PrefixedContext {
    static formKey = 'EmployeeAttendance.ShiftAttendanceDownloader';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ShiftAttendanceDownloaderForm.init)  {
            ShiftAttendanceDownloaderForm.init = true;

            var w0 = DateEditor;
            var w1 = LookupEditor;

            initFormType(ShiftAttendanceDownloaderForm, [
                'startDate', w0,
                'endDate', w0,
                'OccupationList', w1,
                'DepartmentList', w1,
                'DivisionList', w1,
                'JobGradeList', w1,
                'SectionList', w1,
                'EmployeeRowListBuffer', w1,
                'EmployeeRowList', w1
            ]);
        }
    }
}