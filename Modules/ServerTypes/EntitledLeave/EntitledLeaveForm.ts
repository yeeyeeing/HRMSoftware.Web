import { LookupEditor, StringEditor, DecimalEditor, IntegerEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EntitledLeaveForm {
    EmployeeRowId: LookupEditor;
    EmployeeName: StringEditor;
    EntitledAnnualLeave: DecimalEditor;
    EntitledHospitalisationLeave: IntegerEditor;
    EntitledMarriageLeave: IntegerEditor;
    EntitledMaternityLeave: IntegerEditor;
    EntitledPaternityLeave: IntegerEditor;
    EntitledSickLeave: IntegerEditor;
    BringForward: IntegerEditor;
    EntitledCompassionateLeave: IntegerEditor;
}

export class EntitledLeaveForm extends PrefixedContext {
    static formKey = 'EntitledLeave.EntitledLeave';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EntitledLeaveForm.init)  {
            EntitledLeaveForm.init = true;

            var w0 = LookupEditor;
            var w1 = StringEditor;
            var w2 = DecimalEditor;
            var w3 = IntegerEditor;

            initFormType(EntitledLeaveForm, [
                'EmployeeRowId', w0,
                'EmployeeName', w1,
                'EntitledAnnualLeave', w2,
                'EntitledHospitalisationLeave', w3,
                'EntitledMarriageLeave', w3,
                'EntitledMaternityLeave', w3,
                'EntitledPaternityLeave', w3,
                'EntitledSickLeave', w3,
                'BringForward', w3,
                'EntitledCompassionateLeave', w3
            ]);
        }
    }
}