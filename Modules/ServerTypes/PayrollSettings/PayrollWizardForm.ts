import { StringEditor, LookupEditor, MultipleImageUploadEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface PayrollWizardForm {
    PayMonth: StringEditor;
    OccupationList: LookupEditor;
    DepartmentList: LookupEditor;
    DivisionList: LookupEditor;
    JobGradeList: LookupEditor;
    SectionList: LookupEditor;
    EmployeeRowList: LookupEditor;
    EmployeeRowListBuffer: LookupEditor;
    PayslipList: MultipleImageUploadEditor;
}

export class PayrollWizardForm extends PrefixedContext {
    static formKey = 'PayrollSettings.PayrollWizard';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PayrollWizardForm.init)  {
            PayrollWizardForm.init = true;

            var w0 = StringEditor;
            var w1 = LookupEditor;
            var w2 = MultipleImageUploadEditor;

            initFormType(PayrollWizardForm, [
                'PayMonth', w0,
                'OccupationList', w1,
                'DepartmentList', w1,
                'DivisionList', w1,
                'JobGradeList', w1,
                'SectionList', w1,
                'EmployeeRowList', w1,
                'EmployeeRowListBuffer', w1,
                'PayslipList', w2
            ]);
        }
    }
}