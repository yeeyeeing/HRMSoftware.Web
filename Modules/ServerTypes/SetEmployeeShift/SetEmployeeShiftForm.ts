import { LookupEditor, StringEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { ShiftDialog } from "@/HumanResource/Shift/Shift/ShiftDialog";
import { initFormType } from "@serenity-is/corelib/q";

export interface SetEmployeeShiftForm {
    EmployeeRowId: LookupEditor;
    EmployeeName: StringEditor;
    ShiftStartDate: DateEditor;
    ShiftEndDate: DateEditor;
    ShiftId: LookupEditor;
    EmployeeGroupId: LookupEditor;
}

export class SetEmployeeShiftForm extends PrefixedContext {
    static formKey = 'SetEmployeeShift.SetEmployeeShift';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!SetEmployeeShiftForm.init)  {
            SetEmployeeShiftForm.init = true;

            var w0 = LookupEditor;
            var w1 = StringEditor;
            var w2 = DateEditor;

            initFormType(SetEmployeeShiftForm, [
                'EmployeeRowId', w0,
                'EmployeeName', w1,
                'ShiftStartDate', w2,
                'ShiftEndDate', w2,
                'ShiftId', w0,
                'EmployeeGroupId', w0
            ]);
        }
    }
}

[ShiftDialog]; // referenced types