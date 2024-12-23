import { TextAreaEditor, StringEditor, DecimalEditor, DateEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeAllowanceForm {
    Description: TextAreaEditor;
    AllowanceCode: StringEditor;
    Amount: DecimalEditor;
    EffectiveFrom: DateEditor;
    EffectiveUntil: DateEditor;
    Recurring: BooleanEditor;
    OneTime: BooleanEditor;
    PaidOneTime: BooleanEditor;
    AllowanceSubjections: BooleanEditor;
    FullAttendance: BooleanEditor;
    NoLate: BooleanEditor;
    NoAbsence: BooleanEditor;
    NoEarlyLeaving: BooleanEditor;
    ExemptUnpaidLeave: BooleanEditor;
    ExemptHospitalisationLeave: BooleanEditor;
    ExemptSickLeave: BooleanEditor;
    ExemptAnnualLeave: BooleanEditor;
    ExemptMaternityLeave: BooleanEditor;
    ExemptPaternityLeave: BooleanEditor;
    ExemptMarriageLeave: BooleanEditor;
    ExemptCompassionateLeave: BooleanEditor;
    ExemptEmergencyLeave: BooleanEditor;
    ExemptGatepassLeave: BooleanEditor;
    SubjectionEis: BooleanEditor;
    SubjectionEpf: BooleanEditor;
    SubjectionHrdf: BooleanEditor;
    SubjectionPcb: BooleanEditor;
    SubjectionSocso: BooleanEditor;
    SubjectionOt: BooleanEditor;
}

export class EmployeeAllowanceForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.EmployeeAllowance';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeAllowanceForm.init)  {
            EmployeeAllowanceForm.init = true;

            var w0 = TextAreaEditor;
            var w1 = StringEditor;
            var w2 = DecimalEditor;
            var w3 = DateEditor;
            var w4 = BooleanEditor;

            initFormType(EmployeeAllowanceForm, [
                'Description', w0,
                'AllowanceCode', w1,
                'Amount', w2,
                'EffectiveFrom', w3,
                'EffectiveUntil', w3,
                'Recurring', w4,
                'OneTime', w4,
                'PaidOneTime', w4,
                'AllowanceSubjections', w4,
                'FullAttendance', w4,
                'NoLate', w4,
                'NoAbsence', w4,
                'NoEarlyLeaving', w4,
                'ExemptUnpaidLeave', w4,
                'ExemptHospitalisationLeave', w4,
                'ExemptSickLeave', w4,
                'ExemptAnnualLeave', w4,
                'ExemptMaternityLeave', w4,
                'ExemptPaternityLeave', w4,
                'ExemptMarriageLeave', w4,
                'ExemptCompassionateLeave', w4,
                'ExemptEmergencyLeave', w4,
                'ExemptGatepassLeave', w4,
                'SubjectionEis', w4,
                'SubjectionEpf', w4,
                'SubjectionHrdf', w4,
                'SubjectionPcb', w4,
                'SubjectionSocso', w4,
                'SubjectionOt', w4
            ]);
        }
    }
}