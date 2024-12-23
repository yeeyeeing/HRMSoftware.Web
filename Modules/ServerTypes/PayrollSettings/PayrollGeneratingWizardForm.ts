import { IntegerEditor, DateEditor, LookupEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface PayrollGeneratingWizardForm {
    PayMonth: IntegerEditor;
    PayYear: IntegerEditor;
    PayDate: DateEditor;
    PayPeriodStart: DateEditor;
    PayPeriodEnd: DateEditor;
    OccupationList: LookupEditor;
    DepartmentList: LookupEditor;
    DivisionList: LookupEditor;
    JobGradeList: LookupEditor;
    SectionList: LookupEditor;
    EmployeeRowListBuffer: LookupEditor;
    EmployeeRowList: LookupEditor;
    Download: BooleanEditor;
}

export class PayrollGeneratingWizardForm extends PrefixedContext {
    static formKey = 'PayrollSettings.PayrollGeneratingWizard';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PayrollGeneratingWizardForm.init)  {
            PayrollGeneratingWizardForm.init = true;

            var w0 = IntegerEditor;
            var w1 = DateEditor;
            var w2 = LookupEditor;
            var w3 = BooleanEditor;

            initFormType(PayrollGeneratingWizardForm, [
                'PayMonth', w0,
                'PayYear', w0,
                'PayDate', w1,
                'PayPeriodStart', w1,
                'PayPeriodEnd', w1,
                'OccupationList', w2,
                'DepartmentList', w2,
                'DivisionList', w2,
                'JobGradeList', w2,
                'SectionList', w2,
                'EmployeeRowListBuffer', w2,
                'EmployeeRowList', w2,
                'Download', w3
            ]);
        }
    }
}