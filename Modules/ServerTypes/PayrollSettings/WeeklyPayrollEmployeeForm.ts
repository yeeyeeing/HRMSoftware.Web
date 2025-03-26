import { IntegerEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface WeeklyPayrollEmployeeForm {
    WeeklyPayrollSettingId: IntegerEditor;
    EmployeeRowId: IntegerEditor;
    InsertDate: DateEditor;
    InsertUserId: IntegerEditor;
    UpdateDate: DateEditor;
    UpdateUserId: IntegerEditor;
    DeleteDate: DateEditor;
    DeleteUserId: IntegerEditor;
    IsActive: IntegerEditor;
}

export class WeeklyPayrollEmployeeForm extends PrefixedContext {
    static formKey = 'PayrollSettings.WeeklyPayrollEmployee';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!WeeklyPayrollEmployeeForm.init)  {
            WeeklyPayrollEmployeeForm.init = true;

            var w0 = IntegerEditor;
            var w1 = DateEditor;

            initFormType(WeeklyPayrollEmployeeForm, [
                'WeeklyPayrollSettingId', w0,
                'EmployeeRowId', w0,
                'InsertDate', w1,
                'InsertUserId', w0,
                'UpdateDate', w1,
                'UpdateUserId', w0,
                'DeleteDate', w1,
                'DeleteUserId', w0,
                'IsActive', w0
            ]);
        }
    }
}