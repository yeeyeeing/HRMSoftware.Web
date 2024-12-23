import { LookupEditor, DateEditor, StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface ShiftAttendanceRecordForm {
    EmployeeRowId: LookupEditor;
    ShiftId: LookupEditor;
    TimeIn: DateEditor;
    TimeInHour: StringEditor;
    TimeOut: DateEditor;
    TimeOutHour: StringEditor;
    ShiftStartTime: DateEditor;
    ShiftStartTimeHour: StringEditor;
    ShiftEndTime: DateEditor;
    ShiftEndTimeHour: StringEditor;
}

export class ShiftAttendanceRecordForm extends PrefixedContext {
    static formKey = 'EmployeeAttendance.ShiftAttendanceRecord';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ShiftAttendanceRecordForm.init)  {
            ShiftAttendanceRecordForm.init = true;

            var w0 = LookupEditor;
            var w1 = DateEditor;
            var w2 = StringEditor;

            initFormType(ShiftAttendanceRecordForm, [
                'EmployeeRowId', w0,
                'ShiftId', w0,
                'TimeIn', w1,
                'TimeInHour', w2,
                'TimeOut', w1,
                'TimeOutHour', w2,
                'ShiftStartTime', w1,
                'ShiftStartTimeHour', w2,
                'ShiftEndTime', w1,
                'ShiftEndTimeHour', w2
            ]);
        }
    }
}