import { StringEditor, TextAreaEditor, LookupEditor, PrefixedContext } from "@serenity-is/corelib";
import { EmployeeGroupShiftEditor } from "@/HumanResource/EmployeeGroup/EmployeeGroupShift/EmployeeGroupShiftEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeGroupForm {
    Name: StringEditor;
    ShiftColor: StringEditor;
    Description: TextAreaEditor;
    OccupationList: LookupEditor;
    DepartmentList: LookupEditor;
    DivisionList: LookupEditor;
    JobGradeList: LookupEditor;
    SectionList: LookupEditor;
    EmployeeList: LookupEditor;
    NewAddedEmployee: LookupEditor;
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
                'ShiftColor', w0,
                'Description', w1,
                'OccupationList', w2,
                'DepartmentList', w2,
                'DivisionList', w2,
                'JobGradeList', w2,
                'SectionList', w2,
                'EmployeeList', w2,
                'NewAddedEmployee', w2,
                'Shifts', w3,
                'ActualShifts', w3
            ]);
        }
    }
}