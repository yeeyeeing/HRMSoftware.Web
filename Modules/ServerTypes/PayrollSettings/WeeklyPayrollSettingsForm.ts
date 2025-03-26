import { StringEditor, TextAreaEditor, LookupEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface WeeklyPayrollSettingsForm {
    Name: StringEditor;
    Description: TextAreaEditor;
    OccupationList: LookupEditor;
    DepartmentList: LookupEditor;
    DivisionList: LookupEditor;
    JobGradeList: LookupEditor;
    SectionList: LookupEditor;
    CostCentreList: LookupEditor;
    GenerateFirst: BooleanEditor;
    GenerateSecond: BooleanEditor;
    GenerateThird: BooleanEditor;
    GenerateFourth: BooleanEditor;
    NewAddedEmployee: LookupEditor;
    EmployeeList: LookupEditor;
}

export class WeeklyPayrollSettingsForm extends PrefixedContext {
    static formKey = 'PayrollSettings.WeeklyPayrollSettings';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!WeeklyPayrollSettingsForm.init)  {
            WeeklyPayrollSettingsForm.init = true;

            var w0 = StringEditor;
            var w1 = TextAreaEditor;
            var w2 = LookupEditor;
            var w3 = BooleanEditor;

            initFormType(WeeklyPayrollSettingsForm, [
                'Name', w0,
                'Description', w1,
                'OccupationList', w2,
                'DepartmentList', w2,
                'DivisionList', w2,
                'JobGradeList', w2,
                'SectionList', w2,
                'CostCentreList', w2,
                'GenerateFirst', w3,
                'GenerateSecond', w3,
                'GenerateThird', w3,
                'GenerateFourth', w3,
                'NewAddedEmployee', w2,
                'EmployeeList', w2
            ]);
        }
    }
}