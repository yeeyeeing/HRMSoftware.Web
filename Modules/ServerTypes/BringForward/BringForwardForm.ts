import { IntegerEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface BringForwardForm {
    DeleteUserId: IntegerEditor;
    UpdateUserId: IntegerEditor;
    InsertUserId: IntegerEditor;
    IsActive: IntegerEditor;
    InsertDate: DateEditor;
    UpdateDate: DateEditor;
    DeleteDate: DateEditor;
    EmployeeRowId: IntegerEditor;
    BringForward: IntegerEditor;
    BringForwardToYear: IntegerEditor;
}

export class BringForwardForm extends PrefixedContext {
    static formKey = 'BringForward.BringForward';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!BringForwardForm.init)  {
            BringForwardForm.init = true;

            var w0 = IntegerEditor;
            var w1 = DateEditor;

            initFormType(BringForwardForm, [
                'DeleteUserId', w0,
                'UpdateUserId', w0,
                'InsertUserId', w0,
                'IsActive', w0,
                'InsertDate', w1,
                'UpdateDate', w1,
                'DeleteDate', w1,
                'EmployeeRowId', w0,
                'BringForward', w0,
                'BringForwardToYear', w0
            ]);
        }
    }
}