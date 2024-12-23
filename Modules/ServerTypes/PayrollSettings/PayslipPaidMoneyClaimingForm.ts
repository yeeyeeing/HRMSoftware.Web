import { IntegerEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface PayslipPaidMoneyClaimingForm {
    PayslipId: IntegerEditor;
    MoneyClaimingId: IntegerEditor;
    IsActive: IntegerEditor;
    InsertDate: DateEditor;
    UpdateDate: DateEditor;
    DeleteDate: DateEditor;
    InsertUserId: IntegerEditor;
    UpdateUserId: IntegerEditor;
    DeleteUserId: IntegerEditor;
}

export class PayslipPaidMoneyClaimingForm extends PrefixedContext {
    static formKey = 'PayrollSettings.PayslipPaidMoneyClaiming';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PayslipPaidMoneyClaimingForm.init)  {
            PayslipPaidMoneyClaimingForm.init = true;

            var w0 = IntegerEditor;
            var w1 = DateEditor;

            initFormType(PayslipPaidMoneyClaimingForm, [
                'PayslipId', w0,
                'MoneyClaimingId', w0,
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