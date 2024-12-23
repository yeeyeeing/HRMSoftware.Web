import { LookupEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface UserCreationForm {
    OccupationList: LookupEditor;
    DepartmentList: LookupEditor;
    DivisionList: LookupEditor;
    JobGradeList: LookupEditor;
    SectionList: LookupEditor;
    EmployeeRowList: LookupEditor;
    AllEmployee: BooleanEditor;
    EmployeeRowHrPriveledge: LookupEditor;
}

export class UserCreationForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.UserCreation';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!UserCreationForm.init)  {
            UserCreationForm.init = true;

            var w0 = LookupEditor;
            var w1 = BooleanEditor;

            initFormType(UserCreationForm, [
                'OccupationList', w0,
                'DepartmentList', w0,
                'DivisionList', w0,
                'JobGradeList', w0,
                'SectionList', w0,
                'EmployeeRowList', w0,
                'AllEmployee', w1,
                'EmployeeRowHrPriveledge', w0
            ]);
        }
    }
}