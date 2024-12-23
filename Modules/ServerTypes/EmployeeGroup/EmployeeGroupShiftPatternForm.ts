import { IntegerEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeGroupShiftPatternForm {
    EmployeeRowId: IntegerEditor;
    InsertDate: DateEditor;
    ShiftStartDate: DateEditor;
    ShiftEndDate: DateEditor;
    ShiftId: IntegerEditor;
    UpdateDate: DateEditor;
    DeleteDate: DateEditor;
    IsActive: IntegerEditor;
    InsertUserId: IntegerEditor;
    DeleteUserId: IntegerEditor;
    UpdateUserId: IntegerEditor;
    EmployeeGroupId: IntegerEditor;
}

export class EmployeeGroupShiftPatternForm extends PrefixedContext {
    static formKey = 'EmployeeGroup.EmployeeGroupShiftPattern';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeGroupShiftPatternForm.init)  {
            EmployeeGroupShiftPatternForm.init = true;

            var w0 = IntegerEditor;
            var w1 = DateEditor;

            initFormType(EmployeeGroupShiftPatternForm, [
                'EmployeeRowId', w0,
                'InsertDate', w1,
                'ShiftStartDate', w1,
                'ShiftEndDate', w1,
                'ShiftId', w0,
                'UpdateDate', w1,
                'DeleteDate', w1,
                'IsActive', w0,
                'InsertUserId', w0,
                'DeleteUserId', w0,
                'UpdateUserId', w0,
                'EmployeeGroupId', w0
            ]);
        }
    }
}