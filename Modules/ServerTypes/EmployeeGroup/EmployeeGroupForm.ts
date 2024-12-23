import { StringEditor, TextAreaEditor, LookupEditor, PrefixedContext } from "@serenity-is/corelib";
import { EmployeeGroupShiftEditor } from "@/HumanResource/EmployeeGroup/EmployeeGroupShift/EmployeeGroupShiftEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeGroupForm {
    Name: StringEditor;
    Description: TextAreaEditor;
    ShiftColor: StringEditor;
    EmployeeList: LookupEditor;
    Shifts: EmployeeGroupShiftEditor;
    ActualShifts: EmployeeGroupShiftEditor;
}

export class EmployeeGroupForm extends PrefixedContext {
    static formKey = 'EmployeeGroup.EmployeeGroup';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeGroupForm.init)  {
            EmployeeGroupForm.init = true;

            var w0 = StringEditor;
            var w1 = TextAreaEditor;
            var w2 = LookupEditor;
            var w3 = EmployeeGroupShiftEditor;

            initFormType(EmployeeGroupForm, [
                'Name', w0,
                'Description', w1,
                'ShiftColor', w0,
                'EmployeeList', w2,
                'Shifts', w3,
                'ActualShifts', w3
            ]);
        }
    }
}