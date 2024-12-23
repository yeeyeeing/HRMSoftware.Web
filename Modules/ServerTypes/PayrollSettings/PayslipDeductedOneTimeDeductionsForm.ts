import { IntegerEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface PayslipDeductedOneTimeDeductionsForm {
    DeductionId: IntegerEditor;
    PayslipId: IntegerEditor;
    IsActive: IntegerEditor;
    InsertDate: DateEditor;
    UpdateDate: DateEditor;
    DeleteDate: DateEditor;
    InsertUserId: IntegerEditor;
    UpdateUserId: IntegerEditor;
    DeleteUserId: IntegerEditor;
}

export class PayslipDeductedOneTimeDeductionsForm extends PrefixedContext {
    static formKey = 'PayrollSettings.PayslipDeductedOneTimeDeductions';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PayslipDeductedOneTimeDeductionsForm.init)  {
            PayslipDeductedOneTimeDeductionsForm.init = true;

            var w0 = IntegerEditor;
            var w1 = DateEditor;

            initFormType(PayslipDeductedOneTimeDeductionsForm, [
                'DeductionId', w0,
                'PayslipId', w0,
                'IsActive', w0,
                'InsertDate', w1,
                'UpdateDate', w1,
                'DeleteDate', w1,
                'InsertUserId', w0,
                'UpdateUserId', w0,
                'DeleteUserId', w0
            ]);
        }
    }
}