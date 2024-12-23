import { IntegerEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeGroupingsForm {
    IsActive: IntegerEditor;
    InsertUserId: IntegerEditor;
    UpdateUserId: IntegerEditor;
    DeleteUserId: IntegerEditor;
    InsertDate: DateEditor;
    UpdateDate: DateEditor;
    DeleteDate: DateEditor;
    EmployeeRowId: IntegerEditor;
    EmployeeGroupId: IntegerEditor;
}

export class EmployeeGroupingsForm extends PrefixedContext {
    static formKey = 'EmployeeGroup.EmployeeGroupings';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeGroupingsForm.init)  {
            EmployeeGroupingsForm.init = true;

            var w0 = IntegerEditor;
            var w1 = DateEditor;

            initFormType(EmployeeGroupingsForm, [
                'IsActive', w0,
                'InsertUserId', w0,
                'UpdateUserId', w0,
                'DeleteUserId', w0,
                'InsertDate', w1,
                'UpdateDate', w1,
                'DeleteDate', w1,
                'EmployeeRowId', w0,
                'EmployeeGroupId', w0
            ]);
        }
    }
}