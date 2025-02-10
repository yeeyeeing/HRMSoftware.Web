import { LookupEditor, DecimalEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeCp38Form {
    EmployeeRowId: LookupEditor;
    Cp38Amount: DecimalEditor;
    EffectiveFrom: DateEditor;
    EffectiveUntil: DateEditor;
}

export class EmployeeCp38Form extends PrefixedContext {
    static formKey = 'EmployeeProfile.EmployeeCp38';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeCp38Form.init)  {
            EmployeeCp38Form.init = true;

            var w0 = LookupEditor;
            var w1 = DecimalEditor;
            var w2 = DateEditor;

            initFormType(EmployeeCp38Form, [
                'EmployeeRowId', w0,
                'Cp38Amount', w1,
                'EffectiveFrom', w2,
                'EffectiveUntil', w2
            ]);
        }
    }
}