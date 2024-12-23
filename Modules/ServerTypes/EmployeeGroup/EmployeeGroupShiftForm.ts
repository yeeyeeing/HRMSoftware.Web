import { LookupEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeGroupShiftForm {
    ShiftId: LookupEditor;
    ShiftStartDate: DateEditor;
    ShiftEndDate: DateEditor;
}

export class EmployeeGroupShiftForm extends PrefixedContext {
    static formKey = 'EmployeeGroup.EmployeeGroupShift';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeGroupShiftForm.init)  {
            EmployeeGroupShiftForm.init = true;

            var w0 = LookupEditor;
            var w1 = DateEditor;

            initFormType(EmployeeGroupShiftForm, [
                'ShiftId', w0,
                'ShiftStartDate', w1,
                'ShiftEndDate', w1
            ]);
        }
    }
}