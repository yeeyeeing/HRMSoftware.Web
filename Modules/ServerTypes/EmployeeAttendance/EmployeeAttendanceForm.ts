import { DateEditor, StringEditor, IntegerEditor, LookupEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeAttendanceForm {
    AuthenticationDate: DateEditor;
    AuthenticationTime: StringEditor;
    AuthenticationSecond: IntegerEditor;
    EmployeeRowID: LookupEditor;
    PersonName: StringEditor;
    DeviceName: StringEditor;
    DeviceSerial: StringEditor;
    CardNo: StringEditor;
}

export class EmployeeAttendanceForm extends PrefixedContext {
    static formKey = 'EmployeeAttendance.EmployeeAttendance';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeAttendanceForm.init)  {
            EmployeeAttendanceForm.init = true;

            var w0 = DateEditor;
            var w1 = StringEditor;
            var w2 = IntegerEditor;
            var w3 = LookupEditor;

            initFormType(EmployeeAttendanceForm, [
                'AuthenticationDate', w0,
                'AuthenticationTime', w1,
                'AuthenticationSecond', w2,
                'EmployeeRowID', w3,
                'PersonName', w1,
                'DeviceName', w1,
                'DeviceSerial', w1,
                'CardNo', w1
            ]);
        }
    }
}