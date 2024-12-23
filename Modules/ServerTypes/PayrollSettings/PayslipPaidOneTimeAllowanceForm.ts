import { IntegerEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface PayslipPaidOneTimeAllowanceForm {
    AllowanceId: IntegerEditor;
    PayslipId: IntegerEditor;
    IsActive: IntegerEditor;
    InsertDate: DateEditor;
    UpdateDate: DateEditor;
    DeleteDate: DateEditor;
    InsertUserId: IntegerEditor;
    UpdateUserId: IntegerEditor;
    DeleteUserId: IntegerEditor;
}

export class PayslipPaidOneTimeAllowanceForm extends PrefixedContext {
    static formKey = 'PayrollSettings.PayslipPaidOneTimeAllowance';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PayslipPaidOneTimeAllowanceForm.init)  {
            PayslipPaidOneTimeAllowanceForm.init = true;

            var w0 = IntegerEditor;
            var w1 = DateEditor;

            initFormType(PayslipPaidOneTimeAllowanceForm, [
                'AllowanceId', w0,
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